
// deps
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Heading, Pane, TextInputField, Textarea, FormField, Button } from "evergreen-ui";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Services, Queries, Loading } from "../index";

//
// Adultletics Admin / Views / Panel / Panels / Workouts / Add Version
//


export default function AddWorkoutVersionPanel ({ props }) {
	const { id, workoutId, emit } = props;
	const { data: workoutData, loading: workoutLoading } = useQuery( Queries.workouts.getOne,{ variables: { id: workoutId }});
	const { data, loading } = useQuery( Queries.workouts.getVersion, { variables: { id }});
	const [ addVersion ] = useMutation( Queries.workouts.addVersion, { refetchQueries: [{ query: Queries.workouts.getOne, variables: { id: workoutId }}], awaitRefetchQueries: true }); 
	const { closePanel } = useContext( Services.UI );
	const { authUser } = useContext( Services.Auth );
	const [ errors, setErrors ] = useState( null );

	if ( loading || workoutLoading ) return <Loading />;

	const version = _.get( data, "workouts_versions_by_pk" );
	const highestExistingVersion = _.reduce( _.get( workoutData, "workouts_by_pk.versions" ), ( total, curr ) => curr.version_num > total ? curr.version_num : total, 0 );
	const newVersionNum = highestExistingVersion + 1;

	const initialValues = {
		body: _.get( version, "body" ),
		running_km: _.get( version, "stats.running_km", 0 ),
		running_minutes: _.get( version, "stats.running_minutes", 0 ),
	};
    
	return ( <>
		<Pane marginBottom={ 56 }>
			<Heading size={ 600 }>Adding a new version of workout: { _.get( version, "workout.title", "" ) }</Heading>
		</Pane>
		<Formik
			initialValues={{ ...initialValues }}
			onSubmit={ async ({ body, running_km, running_minutes }) => {
				setErrors( null );
				try {
					const res = await addVersion({ variables: { objects: [{
						body, 
						version_num: newVersionNum,
						_workout: workoutId,
						_owner: authUser.id,
						stats: {
							data: { running_km, running_minutes },
						},
					}]}});
					closePanel();
					const id = _.get( res, "data.insert_workouts_versions.returning[0].id" );
					if ( emit ) emit( id );
				} catch ( error ) {
					console.error( error );
					setErrors( error.message );
				}
			}}
		>{
				({ values, dirty, handleChange, handleSubmit, isSubmitting }) => {
					return (
						<>
							<form>
								<FormField label="Workout Description" marginBottom={ 8 }>
									<Textarea
										name="body"
										value={ values.body }
										onChange={ handleChange }
										rows={ 24 }
									/>
								</FormField>
								<TextInputField
									label="Total Running KM"
									name="running_km"
									type="number"
									value={ values.running_km }
									onChange={ handleChange }
								/>
								<TextInputField
									label="Total Running Minutes"
									name="running_minutes"
									type="number"
									value={ values.running_minutes }
									onChange={ handleChange }
								/>
								<Button iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty } onClick={ handleSubmit }>Add</Button>
								{ errors && <p>{ errors }</p>}
							</form> 
						</>
					);
				}}
		</Formik>
	</> );
}
AddWorkoutVersionPanel.propTypes = {
	props: PropTypes.object,
	id: PropTypes.string,
	workoutId: PropTypes.string,
	emit: PropTypes.func,
};

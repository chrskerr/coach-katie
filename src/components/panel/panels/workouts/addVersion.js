
// deps
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Heading, Pane, TextInputField, Textarea, FormField,Text, Select, IconButton, Paragraph } from "evergreen-ui";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Services, Queries, Loading } from "../index";

//
// Adultletics / Views / Panel / Panels / Workouts / Add Version
//


export default function AddWorkoutVersionPanel ({ props }) {
	const { id, workoutId, emit } = props;
	const { data: workoutData, loading: workoutLoading } = useQuery( Queries.workouts.getOne, { variables: { id: workoutId }});
	const { data: drillsData, loading: drillsLoading } = useQuery( Queries.drills.getAll );
	const { data, loading } = useQuery( Queries.workouts.getVersion, { variables: { id }});
	const [ addVersion ] = useMutation( Queries.workouts.addVersion ); 
	const [ selectedDrills, setSelectedDrills ] = useState([]);
	const { closePanel } = useContext( Services.UI );
	const { authUser } = useContext( Services.Auth );
	const [ errors, setErrors ] = useState( null );

	const version = _.get( data, "workouts_versions_by_pk" );
	useEffect(() => setSelectedDrills( _.map( _.get( version, "drills", []), "drill" )), [ version ]);

	if ( loading || workoutLoading || drillsLoading ) return <Loading />;

	const highestExistingVersion = _.reduce( _.get( workoutData, "workouts_by_pk.versions" ), ( total, curr ) => curr.version_num > total ? curr.version_num : total, 0 );
	const newVersionNum = highestExistingVersion + 1;

	const initialValues = {
		body: _.get( version, "body" ),
		running_km: _.get( version, "stats.running_km", 0 ),
		running_minutes: _.get( version, "stats.running_minutes", 0 ),
	};
    
	const allDrills = _.get( drillsData, "drills" );
	const unselectedDrills = _.filter( allDrills, drill => !_.some( selectedDrills, [ "id", drill.id ]));
    
	return ( <>
		<Pane marginBottom={ 56 }>
			<h2>Adding a new version of workout: { _.get( version, "workout.title", "" ) }</h2>
		</Pane>
		<Formik
			initialValues={{ ...initialValues }}
			onSubmit={ async ({ body, stats }) => {
				setErrors( null );
				try {
					const drills_insert_data = _.map( selectedDrills, ({ id }) => ({ _drill: id }));
					const res = await addVersion({ variables: { objects: [{
						body, 
						version_num: newVersionNum,
						_workout: workoutId,
						_owner: authUser.id,
						stats: {
							data: stats ? stats : {},
						},
						drills: {
							data: drills_insert_data,
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
								<div className="row uniform">
									<div className="12u$">
										<FormField label="Workout Description" marginBottom={ 8 }>
											<Textarea
												name="body"
												value={ values.body }
												onChange={ handleChange }
												rows={ 24 }
											/>
										</FormField>
									</div>
									<div className="12u$">
										<FormField label="Add Drills" marginBottom={ 16 }>
											<Pane marginBottom={ 8 } display="flex" justifyContent="space-between">
												<Select name="drill" value={ values.drill } onChange={ handleChange } height={ 32 }>
													<option key="empty" value="">Please select an option...</option>
													{ unselectedDrills && _.map( unselectedDrills, ({ id, title }) => ( <option key={ id } value={ id }>{ title }</option> ))}
												</Select>
												<button
													className='special' 
													iconBefore="tick"
													disabled={ !values.drill } 
													onClick={ e => {
														e.preventDefault();
														setSelectedDrills([ ...selectedDrills, _.find( allDrills, [ "id", values.drill ]) ]); 
													}} 
													style={{ marginLeft: 8, marginRight: 8 }}
												>
                                                        Attach drill
												</button>
											</Pane>
											<Pane>
												{ errors && <p>{ errors }</p>}
											</Pane>
										</FormField>
									</div>
									<div className="12u$">
										<FormField label="Selected drills" marginBottom={ 16 }>
											<Pane>
												{ !_.isEmpty( selectedDrills ) ? _.map( selectedDrills, ({ id, title }) => (
													<Pane display="flex" flexDirection="row" elevation={ 1 } height={ 32 } alignItems="center" background="white" marginBottom={ 16 } key={ id } paddingLeft={ 16 } paddingRight={ 8 }>
														<Text flex={ 1 }>{ title }</Text>
														<IconButton icon="small-cross" intent="danger" appearance="minimal" onClick={ e => {
															e.preventDefault();
															setSelectedDrills( _.filter( selectedDrills, drill => drill.id !== id ));
														}}/> 
													</Pane> )) : <Paragraph marginBottom={ 16 } >No drills selected</Paragraph>}
											</Pane>
										</FormField>
									</div>
									<div className="12u$">
										<FormField label="Stats" marginBottom={ 16 }>
											<table className="stats-input-table">
												<thead>
													<tr>
														<th></th>
														<th colSpan={ 2 }><Heading size={ 200 }>5/10km</Heading></th>
														<th colSpan={ 2 }><Heading size={ 200 }>half/ultra</Heading></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td><Heading size={ 200 }>Beginner</Heading></td>
														<td><TextInputField
															label="km"
															name="stats.running_km_beginner_short"
															type="number"
															onChange={ handleChange }
														/></td>
														<td><TextInputField
															label="mins"
															name="stats.running_minutes_beginner_short"
															type="number"
															onChange={ handleChange }
														/></td>
														<td><TextInputField
															label="km"
															name="stats.running_km_beginner_long"
															type="number"
															onChange={ handleChange }
														/></td>
														<td><TextInputField
															label="mins"
															name="stats.running_minutes_beginner_long"
															type="number"
															onChange={ handleChange }
														/></td>
													</tr>
													<tr>
														<td><Heading size={ 200 }>Intermediate</Heading></td>
														<td><TextInputField
															label="km"
															name="stats.running_km_intermediate_short"
															type="number"
															onChange={ handleChange }
														/></td>
														<td><TextInputField
															label="mins"
															name="stats.running_minutes_intermediate_short"
															type="number"
															onChange={ handleChange }
														/></td>
														<td><TextInputField
															label="km"
															name="stats.running_km_intermediate_long"
															type="number"
															onChange={ handleChange }
														/></td>
														<td><TextInputField
															label="mins"
															name="stats.running_minutes_intermediate_long"
															type="number"
															onChange={ handleChange }
														/></td>
													</tr>
													<tr>
														<td><Heading size={ 200 }>Advanced</Heading></td>
														<td><TextInputField
															label="km"
															name="stats.running_km_advanced_short"
															type="number"
															onChange={ handleChange }
														/></td>
														<td><TextInputField
															label="mins"
															name="stats.running_minutes_advanced_short"
															type="number"
															onChange={ handleChange }
														/></td>
														<td><TextInputField
															label="km"
															name="stats.running_km_advanced_long"
															type="number"
															onChange={ handleChange }
														/></td>
														<td><TextInputField
															label="mins"
															name="stats.running_minutes_advanced_long"
															type="number"
															onChange={ handleChange }
														/></td>
													</tr>
												</tbody>
											</table>
										</FormField>
									</div>
									<div className="12u$">
										<button className="special" iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty } onClick={ handleSubmit }>Add</button>
									</div>
									{ errors && <p>{ errors }</p> }
								</div>
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

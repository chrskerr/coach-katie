
// deps
import React, { useContext, useState } from "react";
import { SelectField, Pane } from "evergreen-ui";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { addDays, format, formatISO, startOfWeek, parseISO } from "date-fns";

// app
import { Services, Queries } from "../index";

//
// Adultletics / Views / Panel / Panels / Weeks / Add
//


const today = new Date();

export default function AddWeekPanel () {
	const { data: daysData, loading: daysLoading } = useQuery( Queries.days.getAll );
	const { data: weeksData, loading: weeksLoading } = useQuery( Queries.weeks.getAll );
	const [ addWeek ] = useMutation( Queries.weeks.add, { refetchQueries: [{ query: Queries.weeks.getAll }], awaitRefetchQueries: true });
	const { authUser } = useContext( Services.Auth );
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const history = useHistory();

	if ( daysLoading || weeksLoading ) return null;
    
	const takenDays = _.map( _.get( weeksData, "weeks" ), ({ week_start }) => formatISO( parseISO( week_start )));
	const dateSelectOptions = _.map( _.range( 7, 29, 7 ) , day => {
		const date = addDays( startOfWeek( today, { weekStartsOn: 1 }), day );
		return {
			value: formatISO( date ),
			label: `Week starting: ${ format( date, "do MMMM" ) }`,
			disabled: takenDays.includes( formatISO( date )),
		};});

	return ( <>
		<Pane marginBottom={ 56 }>
			<h2>Adding a new week</h2>
		</Pane>
		<Formik
			initialValues={{}}
			onSubmit={ async ({ week_start }) => {
				setErrors( null );
				try {
					const res = await addWeek({ variables: { objects: [{
						_owner: authUser.id,
						title: _.get( _.find( dateSelectOptions, [ "value", week_start ]), "label" ),
						week_start,
						days: {
							data: _.map( _.get( daysData, "days" ), day => ({ _day: day.id })),
						},
					}]}});
					closePanel();
					const id = _.get( res, "data.insert_weeks.returning[0].id" );
					history.push( `/admin/weeks/${ id }` );
				} catch ( error ) {
					console.error( error );
					setErrors( error.message );
				}
			}}
		>{
				({ values, dirty, handleChange, handleSubmit, isSubmitting }) => {
					return (
						<form>
							<div className="row uniform">
								<div className="12u$">
									<div className="select-wrapper">
										<SelectField label="Please choose which upcoming week to create" name="week_start" value={ values.type } onChange={ handleChange } height={ 40 }>
											<option key="empty" value="">Please select an option...</option>
											{ dateSelectOptions && _.map( dateSelectOptions, ({ value, label, disabled }) => ( 
												<option key={ value } value={ value } disabled={ disabled }>{ label }</option> 
											))}
										</SelectField>
									</div>
								</div>
								<div className="12u$">
									<button className="special" iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty || !values.week_start } onClick={ handleSubmit }>Add</button>
								</div>
								{ errors && <p>{ errors }</p> }
							</div>
						</form> 
					);
				}}
		</Formik>
	</> );
}

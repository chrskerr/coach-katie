
// deps
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Radio, Select, TextInputField, Textarea, FormField, Pane, Heading, Text, IconButton, Paragraph } from "evergreen-ui";
import { Formik } from "formik";
import { useMutation, useQuery } from "@apollo/react-hooks";
import _ from "lodash";
import { useHistory } from "react-router-dom";

// app
import { Services, Queries, constants, Loading } from "../index";

//
// Adultletics / Views / Panel / Panels / Workouts / Add
//


export default function AddWorkoutPanel ({ props }) {
	const { emit } = props;
	const { data: drillsData, loading: drillsLoading } = useQuery( Queries.drills.getAll );
	const [ addVersion ] = useMutation( Queries.workouts.addVersion, { refetchQueries: [{ query: Queries.workouts.getAll }], awaitRefetchQueries: true }); 
	const { authUser } = useContext( Services.Auth );
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const [ selectedDrills, setSelectedDrills ] = useState([]);
	const { intensityOptions, workoutTypes } = constants;
	const history = useHistory();
    
	const allDrills = _.get( drillsData, "drills" );
	const unselectedDrills = _.filter( allDrills, drill => !_.some( selectedDrills, [ "id", drill.id ]));

	if ( drillsLoading ) return <Loading />;

	return (
		<>
			<Pane marginBottom={ 56 }>
				<h2 size={ 600 }>Adding a new workout</h2>
			</Pane>
			<Formik
				initialValues={{ running_km: 0, running_minutes: 0, intensity: "3" }}
				onSubmit={ async ({ title, body, stats, intensity, type }) => {
					setErrors( null );
					try {
						const drills_insert_data = _.map( selectedDrills, ({ id }) => ({ _drill: id }));
						const res = await addVersion({ variables: { objects: [{
							version_num: 1,
							_owner: authUser.id,
							body,
							workout: {
								data: {
									title, type,
									intensity,
								},
							},
							stats: {
								data: stats ? stats : {},
							},
							drills: {
								data: drills_insert_data,
							},

						}]}});
						closePanel();
						const versionId = _.get( res, "data.insert_workouts_versions.returning[0].id" );
						const workoutId = _.get( res, "data.insert_workouts_versions.returning[0].workout.id" );
						if ( emit ) emit( versionId );
						if ( !emit ) history.push( `/admin/workouts/${ workoutId }` );
					} catch ( error ) {
						console.error( error );
						setErrors( error.message );
					}
				}}
			>{
					({ values, dirty, handleChange, handleSubmit, isSubmitting, setFieldValue }) => {
						return (
							<>
								<form>
									<div className="row uniform">
										<div className="12u$">
											<TextInputField
												label="Workout Title"
												name="title"
												onChange={ handleChange }
												autoFocus
											/>
										</div>
										<div className="12u$">
											<FormField label="Workout Intensity" onChange={ e => setFieldValue( "intensity", e.target.value ) } marginBottom={ 16 }>
												<Pane display="flex" flexDirection="row" justifyContent="space-between">
													{ _.map( intensityOptions, ({ label, value }) => (
														<Radio key={ value } name="intensity" value={ value } label={ label } checked={ value === values.intensity } />
													))}
												</Pane>
											</FormField>
										</div>
										<div className="12u$">
											<FormField label="Workout Type" marginBottom={ 16 }>
												<Select name="type" value={ values.type } onChange={ handleChange } height={ 32 } >
													<option key="empty" value="">Please select an option...</option>
													{ workoutTypes && _.map( workoutTypes, ({ value, label }) => ( <option key={ value } value={ value }>{ label }</option> ))}
												</Select>
											</FormField>
										</div>
										<div className="12u$">
											<FormField label="Add Drills to Workout" marginBottom={ 16 }>
												<Pane display="flex" justifyContent="space-between">
													<Select name="drill" value={ values.drill } onChange={ handleChange } height={ 32 }>
														<option key="empty" value="">Please select an option...</option>
														{ unselectedDrills && _.map( unselectedDrills, ({ id, title }) => ( <option key={ id } value={ id }>{ title }</option> ))}
													</Select>
													<button 
														className="special"
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
											<FormField label="Selected Drills" marginBottom={ 16 }>
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
											<FormField label="Workout Description" marginBottom={ 16 }>
												<Textarea
													name="body"
													onChange={ handleChange }
													rows={ 24 }
												/>
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
											<button className="special" iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty || !values.title } onClick={ handleSubmit }>Add</button>
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
AddWorkoutPanel.propTypes = {
	props: PropTypes.object,
	emit: PropTypes.func,
};

// deps
import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Radio, Select, TextInputField, Heading, Pane, Textarea, FormField, Text, IconButton, Paragraph } from "evergreen-ui";
import { Formik } from "formik";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

// app
import { Services, Queries, constants, Loading } from "../index";

//
// Adultletics / Views / Panel / Panels / Workouts / Edit
//


export default function EditWorkoutVersionPanel ({ props }) {
	const { id } = props;
	const { data, loading } = useQuery( Queries.workouts.getVersion, { variables: { id }});
	const { data: drillsData, loading: drillsLoading } = useQuery( Queries.drills.getAll );
	const [ updateVersion ] = useMutation( Queries.workouts.updateVersion, { refetchQueries: [{ query: Queries.workouts.getVersion, variables: { id }}], awaitRefetchQueries: true });
	const [ addDrill, { addDrillsLoading }] = useMutation( Queries.workouts.addDrill, { refetchQueries: [{ query: Queries.workouts.getVersion, variables: { id }}], awaitRefetchQueries: true });
	const [ removeDrill ] = useMutation( Queries.workouts.removeDrill, { refetchQueries: [{ query: Queries.workouts.getVersion, variables: { id }}], awaitRefetchQueries: true });
	const { closePanel } = useContext( Services.UI );
	const [ errors, setErrors ] = useState( null );
	const { intensityOptions, workoutTypes } = constants;

	if ( loading || drillsLoading ) return <Loading />;

	const version = _.get( data, "workouts_versions_by_pk" );

	const initialValues = {
		body: _.get( version, "body" ),
		title: _.get( version, "workout.title", "" ),
		stats: _.reduce( _.get( version, "stats", {}), ( total, value, key ) => ({ ...total, [ key ]: _.isNull( value ) ? "" : value }), {}),
		intensity: _.get( version, "workout.intensity", "3" ),
		type: _.get( version, "workout.type", "" ),
	};
    
	const workoutsDrills = _.get( version, "drills", []);
	const selectedDrills = _.map( workoutsDrills, drill => ({ workoutsDrillId: drill.id, ...drill.drill }));
	const allDrills = _.get( drillsData, "drills" );
	const unselectedDrills = _.filter( allDrills, drill => !_.some( selectedDrills, [ "id", drill.id ]));

	return (
		<>
			<Pane marginBottom={ 56 }>
				<h2>Editing version { _.get( version, "version_num" ) } of workout: { _.get( version, "workout.title", "" ) }</h2>
			</Pane>
			<Formik
				initialValues={{ ...initialValues }}
				onSubmit={ async ({ title, body, stats, type, intensity }) => {
					setErrors( null );
					try {
						const stats_update_data = _.reduce( stats, ( total, value, key ) => {
							if ( key === "id" || key === "__typename" ) return total;
							return { ...total, [ key ]: value === "" ? null : value };
						}, {});
						await updateVersion({ variables: {
							version_id: id,
							workout_id: _.get( version, "workout.id" ),
							stats_id: _.get( version, "stats.id" ),
							body,
							workout_data: {
								title,
								type,
								intensity,
							},
							stats_data: stats_update_data,
						}});
						closePanel();
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
												label="Workout Title (effects all versions)"
												name="title"
												value={ values.title }
												onChange={ handleChange }
												autoFocus
											/>
										</div>
										<div className="12u$">
											<FormField label="Workout Intensity (effects all versions)" onChange={ e => setFieldValue( "intensity", e.target.value ) } marginBottom={ 16 }>
												<Pane display="flex" flexDirection="row" justifyContent="space-between">
													{ _.map( intensityOptions, ({ label, value }) => (
														<Radio key={ value } name="intensity" value={ value } label={ label } checked={ value === values.intensity }/>
													))}
												</Pane>
											</FormField>
										</div>
										<div className="12u$">
											<FormField label="Workout Type (effects all versions)" marginBottom={ 16 }>
												<Select name="type" value={ values.type } onChange={ handleChange } height={ 32 } >
													<option key="empty" value="">Please select an option...</option>
													{ workoutTypes && _.map( workoutTypes, ({ value, label }) => ( <option key={ value } value={ value }>{ label }</option> ))}
												</Select>
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
														className="special" 
														iconBefore={ addDrillsLoading ? "" : "tick"} 
														isLoading={ addDrillsLoading } 
														disabled={ !values.drill } 
														onClick={ e => {
															e.preventDefault();
															addDrill({ variables: { objects: [{ _drill: values.drill, _workouts_version: _.get( version, "id" ) }]}}); 
														}} 
														style={{ marginRight: 8, marginLeft: 8 }}
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
													{ !_.isEmpty( selectedDrills ) ? _.map( selectedDrills, ({ id, title, workoutsDrillId }) => (
														<Pane display="flex" flexDirection="row" elevation={ 1 } height={ 32 } alignItems="center" background="white" marginBottom={ 16 } key={ id } paddingLeft={ 16 } paddingRight={ 8 }>
															<Text flex={ 1 }>{ title }</Text>
															<IconButton icon="small-cross" intent="danger" appearance="minimal" onClick={ e => {
																e.preventDefault();
																removeDrill({ variables: { id: workoutsDrillId }});
															}}/> 
														</Pane> )) : <Paragraph marginBottom={ 16 } >No drills selected</Paragraph>}
												</Pane>
											</FormField>
										</div>
										<div className="12u$">
											<FormField label="Workout Description" marginBottom={ 16 }>
												<Textarea
													name="body"
													value={ values.body }
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
																value={ values.stats.running_km_beginner_short }
																type="number"
																onChange={ handleChange }
															/></td>
															<td><TextInputField
																label="mins"
																name="stats.running_minutes_beginner_short"
																value={ values.stats.running_minutes_beginner_short }
																type="number"
																onChange={ handleChange }
															/></td>
															<td><TextInputField
																label="km"
																name="stats.running_km_beginner_long"
																value={ values.stats.running_km_beginner_long }
																type="number"
																onChange={ handleChange }
															/></td>
															<td><TextInputField
																label="mins"
																name="stats.running_minutes_beginner_long"
																value={ values.stats.running_minutes_beginner_long }
																type="number"
																onChange={ handleChange }
															/></td>
														</tr>
														<tr>
															<td><Heading size={ 200 }>Intermediate</Heading></td>
															<td><TextInputField
																label="km"
																name="stats.running_km_intermediate_short"
																value={ values.stats.running_km_intermediate_short }
																type="number"
																onChange={ handleChange }
															/></td>
															<td><TextInputField
																label="mins"
																name="stats.running_minutes_intermediate_short"
																value={ values.stats.running_minutes_intermediate_short }
																type="number"
																onChange={ handleChange }
															/></td>
															<td><TextInputField
																label="km"
																name="stats.running_km_intermediate_long"
																value={ values.stats.running_km_intermediate_long }
																type="number"
																onChange={ handleChange }
															/></td>
															<td><TextInputField
																label="mins"
																name="stats.running_minutes_intermediate_long"
																value={ values.stats.running_minutes_intermediate_long }
																type="number"
																onChange={ handleChange }
															/></td>
														</tr>
														<tr>
															<td><Heading size={ 200 }>Advanced</Heading></td>
															<td><TextInputField
																label="km"
																name="stats.running_km_advanced_short"
																value={ values.stats.running_km_advanced_short }
																type="number"
																onChange={ handleChange }
															/></td>
															<td><TextInputField
																label="mins"
																name="stats.running_minutes_advanced_short"
																value={ values.stats.running_minutes_advanced_short }
																type="number"
																onChange={ handleChange }
															/></td>
															<td><TextInputField
																label="km"
																name="stats.running_km_advanced_long"
																value={ values.stats.running_km_advanced_long }
																type="number"
																onChange={ handleChange }
															/></td>
															<td><TextInputField
																label="mins"
																name="stats.running_minutes_advanced_long"
																value={ values.stats.running_minutes_advanced_long }
																type="number"
																onChange={ handleChange }
															/></td>
														</tr>
													</tbody>
												</table>
											</FormField>
										</div>
										<div className="12u$">
											<button className="special" iconBefore={ isSubmitting ? "" : "tick"} isLoading={ isSubmitting } disabled={ !dirty } onClick={ handleSubmit }>Update</button>
										</div>
										{ errors && <p>{ errors }</p> }
									</div>
								</form> 
							</>
						);
					}}
			</Formik>
		</>
	);
}
EditWorkoutVersionPanel.propTypes = {
	props: PropTypes.object,
	id: PropTypes.string,
};

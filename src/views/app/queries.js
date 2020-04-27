
// deps
import gql from "graphql-tag";

//
// Adultletics Admin / Views / App / Queries
//


// AUTH
const GET_USER = gql`
	query getUser ( $uid: String! ) {
		users_by_pk( uid: $uid ) {
			email first_name id
		}
	}
`;


// DRILLS
const GET_ALL_DRILLS = gql`
	query getAllDrills {
		drills ( order_by: { title: asc }) {
			id title url description
		}
	}
`;

const GET_DRILL_BY_ID = gql`
	query getAllDrills ( $id: uuid! ) {
		drills_by_pk ( id: $id ) {
			id title url description
			workouts_drills {
				workouts_version {
					workout { title }
					version_num
				}
			}
		}
	}
`;

const INSERT_DRILL = gql`
	mutation insertDrills ( $objects: [drills_insert_input!]! ) {
		insert_drills ( objects: $objects ) {
			returning { id }
		}
	}
`;

const UPDATE_DRILL = gql`
	mutation updateDrills ( $id: uuid!, $data: drills_set_input! ) {
		update_drills( where: { id: { _eq: $id }}, _set: $data ) {
			returning { id }
		}
	}
`;


// WORKOUTS
const GET_ALL_WORKOUTS = gql`
	query getWorkouts {
		workouts {
			id title type intensity
		}
	}
`;

const GET_WORKOUT = gql`
	query getWorkout ( $id: uuid! ) {
		workouts_by_pk( id: $id ) {
			id title type
            intensity
			versions ( order_by: { version_num: asc } ){
				id body
				version_num
				owner {
					first_name
				}
				drills {
					id
					drill {
						title id
					}
				}
				stats {
					running_km id
					running_minutes
				}
			}
		}
	}
`;

const GET_WORKOUT_VERSION = gql`
	query getWorkout ( $id: uuid! ) {
		workouts_versions_by_pk ( id: $id ) {
			id body
			version_num
			owner {
				first_name
			}
			drills {
				id
				drill {
					title id
				}
			}
			stats {
				id
				running_km
				running_minutes
			}
			workout {
				id title type
                intensity
			}
		}
	}
`;

const INSERT_WORKOUT_VERSION = gql`
	mutation insertWorkoutVersion ( $objects: [workouts_versions_insert_input!]! ) {
		insert_workouts_versions ( objects: $objects ) {
			returning { id }
		}
	}
`;

const UPDATE_WORKOUT_VERSION = gql`
	mutation updateWorkoutVersion ( $version_id: uuid!, $stats_id: uuid!, $workout_id: uuid!, $body: String!, $workout_data: workouts_set_input!, $stats_data: workouts_stats_set_input! ) {
		update_workouts_versions( where: { id: { _eq: $version_id }}, _set: { body: $body }) {
			returning { id }
		}
		update_workouts_stats( where: { id: { _eq: $stats_id }}, _set: $stats_data ) {
			returning { id }
		}
		update_workouts( where: { id: { _eq: $workout_id }}, _set: $workout_data ) {
			returning { id }
		}
	}
`;

const INSERT_WORKOUTS_DRILL = gql`
	mutation insertWorkoutsDrills ( $objects: [workouts_drills_insert_input!]! ) {
		insert_workouts_drills( objects: $objects ) {
			returning { id }
		}
	}
`;

const DELETE_WORKOUTS_DRILL = gql`
	mutation deleteWorkoutsDrills ( $id: uuid! ) {
		delete_workouts_drills( where: { id: { _eq: $id }}) {
			returning { id }
		}
	}
`;

const DELETE_WORKOUT = gql`
    mutation deleteWorkout ( $id: uuid! ) {
        delete_workouts_drills( where: { workouts_version: { workout: { id: { _eq: $id }}}}) {
            returning { id }
        }
        delete_workouts_versions( where: { workout: { id: { _eq: $id }}}) {
            returning { id }
        }
        delete_workouts_stats( where: { workouts_version: { workout: { id: { _eq: $id }}}}) {
            returning { id }
        }
        delete_workouts( where: { id: { _eq: $id }}) {
            returning { id }
        }
    }
`;

const DELETE_VERSION = gql`
    mutation deleteWorkout ( $id: uuid! ) {
        delete_workouts_drills( where: { workouts_version: { id: { _eq: $id }}}) {
            returning { id }
        }
        delete_workouts_versions( where: { id: { _eq: $id }}) {
            returning { id }
        }
        delete_workouts_stats( where: { workouts_version: { id: { _eq: $id }}}) {
            returning { id }
        }
    }
`;


export default {
	auth: {
		getUser: GET_USER,
	},
	drills: {
		getAll: GET_ALL_DRILLS,
		getOne: GET_DRILL_BY_ID,
		add: INSERT_DRILL,
		update: UPDATE_DRILL,
	},
	workouts: {
		getAll: GET_ALL_WORKOUTS,
		getOne: GET_WORKOUT,
		getVersion: GET_WORKOUT_VERSION,
		addVersion: INSERT_WORKOUT_VERSION,
		updateVersion: UPDATE_WORKOUT_VERSION,
		addDrill: INSERT_WORKOUTS_DRILL,
		removeDrill: DELETE_WORKOUTS_DRILL,
		deleteWorkout: DELETE_WORKOUT,
		deleteVersion: DELETE_VERSION,
	},
};
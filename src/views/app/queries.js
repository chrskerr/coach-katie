
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
			id title url description embed_url
		}
	}
`;

const GET_DRILL_BY_ID = gql`
	query getAllDrills ( $id: uuid! ) {
		drills_by_pk ( id: $id ) {
			id title url description embed_url
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


// DAILY_CHALLENGES
const GET_ALL_CHALLENGES = gql`
	query getAllChallenges {
		daily_challenges ( order_by: { title: asc }) {
			id title description
		}
	}
`;

const GET_CHALLENGE_BY_ID = gql`
	query getChallenge ( $id: uuid! ) {
		daily_challenges_by_pk ( id: $id ) {
			id title description
            weeks { id }
		}
	}
`;

const INSERT_CHALLENGE = gql`
	mutation insertChalleenge ( $objects: [daily_challenges_insert_input!]! ) {
		insert_daily_challenges ( objects: $objects ) {
			returning { id }
		}
	}
`;

const UPDATE_CHALLENGE = gql`
	mutation updateChallenge ( $id: uuid!, $data: daily_challenges_set_input! ) {
		update_daily_challenges ( where: { id: { _eq: $id }}, _set: $data ) {
			returning { id }
		}
	}
`;


// WORKOUTS
const GET_ALL_WORKOUTS = gql`
	query getWorkouts {
		workouts {
			id title type intensity
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
					id
					running_minutes_beginner_short running_km_beginner_short
					running_minutes_intermediate_short running_km_intermediate_short
					running_minutes_advanced_short running_km_advanced_short
					running_minutes_beginner_long running_km_beginner_long
					running_minutes_intermediate_long running_km_intermediate_long
					running_minutes_advanced_long running_km_advanced_long
				}
			}
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
					id
					running_minutes_beginner_short running_km_beginner_short
					running_minutes_intermediate_short running_km_intermediate_short
					running_minutes_advanced_short running_km_advanced_short
					running_minutes_beginner_long running_km_beginner_long
					running_minutes_intermediate_long running_km_intermediate_long
					running_minutes_advanced_long running_km_advanced_long
				}
			}
		}
	}
`;

const SUBSCRIBE_WORKOUT = gql`
	subscription getWorkout ( $id: uuid! ) {
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
					id
					running_minutes_beginner_short running_km_beginner_short
					running_minutes_intermediate_short running_km_intermediate_short
					running_minutes_advanced_short running_km_advanced_short
					running_minutes_beginner_long running_km_beginner_long
					running_minutes_intermediate_long running_km_intermediate_long
					running_minutes_advanced_long running_km_advanced_long
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
                running_minutes_beginner_short running_km_beginner_short
                running_minutes_intermediate_short running_km_intermediate_short
                running_minutes_advanced_short running_km_advanced_short
                running_minutes_beginner_long running_km_beginner_long
                running_minutes_intermediate_long running_km_intermediate_long
                running_minutes_advanced_long running_km_advanced_long
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
			returning { id workout { id } }
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
        update_weeks_days( where: { workout: { _workout: {_eq: $id }}}, _set: { _workouts_version: null }) {
            returning { id }
        }
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
        update_weeks_days( where: { _workouts_version: { _eq: $id }}, _set: { _workouts_version: null }) {
            returning { id }
        }
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


// WEEKS
const GET_ALL_WEEKS = gql`
    query getAllWeeks {
        weeks {
            id title updated_at week_start _challenge
            days ( order_by: { _day: asc }) {
                id
                day { id title uid }
                workout {
                    body id
                    version_num
                    drills {
                        id
                        drill {
                            description
                            id title url
                        }
                    }
                    workout {
                        id intensity
                        title type
                    }
                    stats {
                        id
                        running_minutes_beginner_short running_km_beginner_short
                        running_minutes_intermediate_short running_km_intermediate_short
                        running_minutes_advanced_short running_km_advanced_short
                        running_minutes_beginner_long running_km_beginner_long
                        running_minutes_intermediate_long running_km_intermediate_long
                        running_minutes_advanced_long running_km_advanced_long
                    }
                }
            }
        }
    }
`;

const SUBSCRIBE_ALL_WEEKS = gql`
    subscription getAllWeeks {
        weeks {
            id title updated_at week_start
            days ( order_by: { _day: asc }) {
                id
                day { id title uid }
                workout {
                    body id
                    version_num
                    drills {
                        id
                        drill {
                            description
                            id title url
                        }
                    }
                    workout {
                        id intensity
                        title type
                    }
                    stats {
                        id
                        running_minutes_beginner_short running_km_beginner_short
                        running_minutes_intermediate_short running_km_intermediate_short
                        running_minutes_advanced_short running_km_advanced_short
                        running_minutes_beginner_long running_km_beginner_long
                        running_minutes_intermediate_long running_km_intermediate_long
					    running_minutes_advanced_long running_km_advanced_long
                    }
                }
            }
        }
    }
`;

const SUBSCRIBE_WEEK = gql`
    subscription weekSubscription ( $id: uuid! ) {
        weeks_by_pk( id: $id ) {
            created_at id week_start
            title updated_at
            days ( order_by: { _day: asc }) {
                id
                day { id title uid }
                workout {
                    body id
                    version_num
                    drills {
                        id
                        drill {
                            description
                            id title url
                        }
                    }
                    workout {
                        id intensity
                        title type
                    }
                    stats {
                        id
                        running_minutes_beginner_short running_km_beginner_short
                        running_minutes_intermediate_short running_km_intermediate_short
                        running_minutes_advanced_short running_km_advanced_short
                        running_minutes_beginner_long running_km_beginner_long
                        running_minutes_intermediate_long running_km_intermediate_long
                        running_minutes_advanced_long running_km_advanced_long
                    }
                }
            }
            daily_challenge { id title description }
        }
    }
`;

const UPDATE_WEEK = gql`
    mutation updateWeek ( $id: uuid!, $data: weeks_set_input! ) {
        update_weeks( where: { id: { _eq: $id }}, _set: $data ) {
            returning { id }
        }
    }
`;

const UPDATE_WEEK_DAY = gql`
    mutation updateWeeksDays ( $id: uuid!, $data: weeks_days_set_input! ) {
        update_weeks_days( where: { id: { _eq: $id }}, _set: $data ) {
            returning { id }
        }
    }
`;

const CREATE_WEEK = gql`
    mutation updateWeeksDays ( $objects: [weeks_insert_input!]! ) {
        insert_weeks( objects: $objects ) {
            returning { id }
        }
    }
`;

const GET_ALL_DAYS = gql`
    query getAllDays {
        days {
            id title  uid
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
	dailyChallenges: {
		getAll: GET_ALL_CHALLENGES,
		getOne: GET_CHALLENGE_BY_ID,
		add: INSERT_CHALLENGE,
		update: UPDATE_CHALLENGE,
	},
	workouts: {
		getAll: GET_ALL_WORKOUTS,
		getOne: GET_WORKOUT,
		subscribe: SUBSCRIBE_WORKOUT,
		getVersion: GET_WORKOUT_VERSION,
		addVersion: INSERT_WORKOUT_VERSION,
		updateVersion: UPDATE_WORKOUT_VERSION,
		addDrill: INSERT_WORKOUTS_DRILL,
		removeDrill: DELETE_WORKOUTS_DRILL,
		deleteWorkout: DELETE_WORKOUT,
		deleteVersion: DELETE_VERSION,
	},
	weeks: {
		getAll: GET_ALL_WEEKS,
		subscribe: SUBSCRIBE_WEEK,
		subscribeAll: SUBSCRIBE_ALL_WEEKS,
		updateWeek: UPDATE_WEEK,
		updateWeekday: UPDATE_WEEK_DAY,
		add: CREATE_WEEK,
	},
	days: {
		getAll: GET_ALL_DAYS,
	},
};

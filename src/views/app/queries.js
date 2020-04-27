
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
        drills {
            id title url
        }
    }
`;

const GET_DRILL_BY_ID = gql`
    query getAllDrills ( $id: uuid! ) {
        drills_by_pk ( id: $id ) {
            id title url
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


export default {
	auth: {
		getUser: GET_USER,
	},
	drills: {
		getDrills: GET_ALL_DRILLS,
		getDrillById: GET_DRILL_BY_ID,
		addDrill: INSERT_DRILL,
		updateDrill: UPDATE_DRILL,
	},
};
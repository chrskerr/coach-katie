
// deps
import gql from "graphql-tag";

//
// Adultletics Admin / Views / App / Queries
//

const GET_USER = gql`
    query getUser ( $uid: Text! ) {
        users_by_pk ( uid: $uid ) {
            email first_name id
        }
    }
`;

export default {
	admin: {
		getUser: GET_USER,
	},
};
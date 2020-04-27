
//
// Adultletics Admin / Views / Panel / Panels / Index 
//

import SignIn from "./auth/sign-in.js";
import DrillsAdd from "./drills/add";
import DrillsEdit from "./drills/edit";

export default {
	"auth/sign-in": SignIn,
	"drills/add": DrillsAdd,
	"drills/edit": DrillsEdit,
};

export { Services, Queries } from "../../../views/index";

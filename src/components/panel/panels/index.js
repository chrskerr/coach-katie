
//
// Adultletics Admin / Views / Panel / Panels / Index 
//

import SignIn from "./auth/sign-in.js";
import DrillsAdd from "./drills/add";
import DrillsEdit from "./drills/edit";
import WorkoutsAdd from "./workouts/add";
import WorkoutsVersionAdd from "./workouts/addVersion";
import WorkoutsEdit from "./workouts/edit";
import WorkoutsDrillsEdit from "./workouts/edit-drills";

export default {
	"auth/sign-in": SignIn,
	"drills/add": DrillsAdd,
	"drills/edit": DrillsEdit,
	"workouts/add": WorkoutsAdd,
	"workouts/add-version": WorkoutsVersionAdd,
	"workouts/edit": WorkoutsEdit,
	"workouts/edit-drills": WorkoutsDrillsEdit,
};

export { Services, Queries, constants } from "../../../views/index";

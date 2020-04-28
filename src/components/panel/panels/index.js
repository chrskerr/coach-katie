
//
// Adultletics Admin / Views / Panel / Panels / Index 
//

import SignIn from "./auth/sign-in.js";
import DrillsAdd from "./drills/add";
import DrillsEdit from "./drills/edit";
import WorkoutsAdd from "./workouts/add";
import WorkoutsVersionAdd from "./workouts/addVersion";
import WorkoutsEdit from "./workouts/edit";
import WeeksAdd from "./weeks/add";
import WeeksDayWorkoutUpdate from "./weeks/update-workout";

export default {
	"auth/sign-in": SignIn,
	"drills/add": DrillsAdd,
	"drills/edit": DrillsEdit,
	"workouts/add": WorkoutsAdd,
	"workouts/add-version": WorkoutsVersionAdd,
	"workouts/edit": WorkoutsEdit,
	"weeks/add": WeeksAdd,
	"weeks/update-workout": WeeksDayWorkoutUpdate,
};

export { Services, Queries, constants, Loading } from "../../../views/index";


// deps
import { createContext } from "react";

//
// Adultletics Admin / Views / App / Services
//


export const Auth = createContext({
	authUser: {},
	token: "",
	uid: "",
	isAuthenticating: false,
	isAuthenticated: false,
	updateAuth: () => {},
	signIn: () => {},
	signOut: () => {},
});

export const UI = createContext({
	panel: {},
	openPanel: () => {},
	closePanel: () => {},
	notifications: [{}],
	addNotification: () => {},
});

export default { 
	Auth,
	UI,
};
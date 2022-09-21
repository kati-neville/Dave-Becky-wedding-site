import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Children, createContext, useContext, useState } from "react";

interface contextValues {
	authenticateUser: () => void;
	isAuthenticated: boolean;
}

export const AuthCtxt = createContext({
	authenticateUser: () => {},
	isAuthenticated: false,
});

const authenticateUser = () => {
	if (typeof window !== "undefined") {
		localStorage.setItem("user", "isAuthenticated");
	}
};

//@ts-ignore
const UseAuthContext = ({ children }) => {
	const isAuthenticated = true;
	// typeof window !== "undefined" && !!localStorage.getItem("user");

	return (
		<AuthCtxt.Provider value={{ authenticateUser, isAuthenticated }}>
			{children}
		</AuthCtxt.Provider>
	);
};

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<UseAuthContext>
				<Component {...pageProps} />
			</UseAuthContext>
		</>
	);
}

export default MyApp;

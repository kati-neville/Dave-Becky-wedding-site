import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Children, createContext, useContext, useState } from "react";

interface ContextValues {
	authenticateUser: () => void;
	isAuthenticated: boolean;
	showPreview: boolean;
	setShowPreview: (showPreview: boolean) => void;
}

export const AuthCtxt = createContext<ContextValues>({
	authenticateUser: () => {},
	isAuthenticated: false,
	showPreview: false,
	setShowPreview: () => {},
});

const authenticateUser = () => {
	if (typeof window !== "undefined") {
		localStorage.setItem("user", "isAuthenticated");
	}
};

//@ts-ignore
const UseAuthContext = ({ children }) => {
	const isAuthenticated = true;
	const [showPreview, setShowPreview] = useState(false);
	// typeof window !== "undefined" && !!localStorage.getItem("user");

	return (
		<AuthCtxt.Provider
			value={{
				authenticateUser,
				isAuthenticated,
				showPreview,
				setShowPreview,
			}}>
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

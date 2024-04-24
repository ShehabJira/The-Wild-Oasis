import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useContext } from "react";
const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
	// const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(
		window.matchMedia("(prefers-color-scheme: dark)").matches, // to set the value as the use system mode, it returns true if the user system is dark mode else return false
		"isDarkMode"
	);

	function toggleDarkMode() {
		setIsDarkMode((isDark) => !isDark);
	}

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (context === undefined)
		throw new Error("DarkModeContext was used outside of DarkModeProvider");
	return context;
}

export { DarkModeProvider, useDarkMode };

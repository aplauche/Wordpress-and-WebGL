import { createContext, useContext, useState } from 'react'

// Create Context object.
export const AppContext = createContext()



// Export Provider.
export function AppProvider({value, children}) {	

	const [info, setInfo] = useState({
		isOpen: false,
		title: 'test',
		content: ''
	})

	return (
	   <AppContext.Provider value={{info, setInfo}}>
		{children}
	   </AppContext.Provider>
	)
}

// Export useContext Hook.
export function useAppContext() {
	return useContext(AppContext);
}

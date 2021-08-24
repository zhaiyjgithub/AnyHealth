import React, {useReducer, createContext} from 'react'

const reducer = (state, action) => {
	return {...state, selectedIndex: action.index}
};

const initState = {
	selectedIndex: 0
}
export const DoctorProfileContext = createContext({
	state: initState,
	onClickItem: () => null
})


export const DoctorProfileProvider = ({ children }) => {
	const [state, onClickItem] = useReducer(reducer, initState);
	return (
		<DoctorProfileContext.Provider value={{state, onClickItem}}>{children}</DoctorProfileContext.Provider>
	);
};

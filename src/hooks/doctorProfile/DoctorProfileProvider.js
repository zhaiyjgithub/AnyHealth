import React, {useReducer, createContext} from 'react'

const reducer = (state, action) => {
	console.log('action')
	return state
};

const initState = {
	doctorProfile: null
}

export const DoctorProfileContext = createContext({
	state: initState,
	dispatch: () => null
})


export const DoctorProfileProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initState);
	return (
		<DoctorProfileContext.Provider value={[state, dispatch]}>{children}</DoctorProfileContext.Provider>
	);
};

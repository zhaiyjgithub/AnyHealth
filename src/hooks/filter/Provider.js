import React, {} from 'react'
import {initialState, Reducer} from './Reducer'
export const FilterContext = React.createContext({
	state: initialState,
	dispatch: () => null
})

export const FilterProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(Reducer, initialState)

	return (
		<FilterContext.Provider value={[state, dispatch]}>
			{children}
		</FilterContext.Provider>
	)
}

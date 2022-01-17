import jwt_decode from "jwt-decode"

export const initState = {
    logedIn: false,
    token: "",
    tokenDetails: [],
    routesData: [],
};

export const appReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TOKEN":
            return {
                ...state,
                logedIn: true,
                token: action.payload,
                tokenDetails: jwt_decode(action.payload),
            }
        case "ADD_DATA":
            if (action.payload === "") {
                return state
            }
            else
                return {
                    ...state,
                    routesData: action.payload
                }
        case "ADD_ADDRESS":
            if (action.payload === "") {
                return state
            }
            else {
                const newRoutesData = state.routesData.map(route => {
                    if (route.id === action.payload.id) {
                        return {
                            ...route,
                            sourceAddress: action.payload.sourceAddress,
                            destinationAddress: action.payload.destinationAddress
                        }
                    } else return route
                })
                return {
                    ...state,
                    routesData: newRoutesData
                }
            }
        case "LOGOUT_USER":
            return (
                state = initState
            )

        default:
            return state
    }
}
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"



export const checkingAuthentication = (email, password)  => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}


export const startGoogleSignIn = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await signInWithGoogle()


        if( !result.ok) {
           return dispatch(logout(result.errorMessage))
        }
        //? delete result.ok con esto podemos quitar una propiedad de un objeto
        dispatch(login(result))
    }

}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName})

        if(!ok) return dispatch(logout({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        
        const {ok, photoURL, uid, errorMessage, displayName} = await loginWithEmailPassword({email, password})
        if(!ok) return dispatch(logout({errorMessage}))
        
        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLogout = () => {
    return async(dispatch) => {
       await logoutFirebase()

       dispatch(logout({}))
    }
}
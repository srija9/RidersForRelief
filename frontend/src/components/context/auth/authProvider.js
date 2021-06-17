import { createContext, useReducer, React } from "react";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SETERROR":
      return { ...state, loading:false,error: action.payload };
    
    case "ISRIDER":
      return { ...state, isRequester: false };
    case "AUTHENTICATED":
      return { ...state,token:action.payload.token,user:action.payload.user, isAuthenticated: true };
    case "SETUSER":
      return { ...state, loading : true, user: action.payload };
    case "SETLOADING":
      return { ...state, loading: !state.loading };
    case "VERIFIED":
      return { ...state, loading: false, user: action.payload };
    case "LOGOUT":
      return initState;
    
  }
};

const initState = {
  isRequester: true,
  user: null,
  loading: false,
  isAuthenticated: false,
  token:null,
  error: "",
};

export const AuthContext = createContext();

export const AuthProvider = (prop) => {

  const [state, dispatch] = useReducer(AuthReducer,
    initState,
  );
  console.log(state);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token:state.token,
        isRequester: state.isRequester,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        dispatch,
      }}
    >
      {prop.children}
    </AuthContext.Provider>
  );
};

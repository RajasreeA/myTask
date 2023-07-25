import {
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAILURE,
  } from "./ActionTypes";
  
  const initialState = {
    loading:false,
    data: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_OTP_REQUEST:
        return { ...state, loading: true, data: null, error: null };
      case SEND_OTP_SUCCESS:
        return { ...state, loading: false, data: action.payload, error: null };
      case SEND_OTP_FAILURE:
        return { ...state, loading: false, data: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;
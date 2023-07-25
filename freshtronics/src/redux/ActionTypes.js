import { sendOTP } from "../utils/whatsapp";

// Action Types
export const SEND_OTP_REQUEST = "SEND_OTP_REQUEST";
export const SEND_OTP_SUCCESS = "SEND_OTP_SUCCESS";
export const SEND_OTP_FAILURE = "SEND_OTP_FAILURE";

// Action Creators
const sendOTPRequest = () => ({ type: SEND_OTP_REQUEST });
const sendOTPSuccess = (data) => ({ type: SEND_OTP_SUCCESS, payload: data });
const sendOTPFailure = (error) => ({ type: SEND_OTP_FAILURE, payload: error });

// Thunk function to handle the API call
export const sendOTPAsync = (phone, OTP) => {
  return (dispatch) => {
    dispatch(sendOTPRequest());

    return sendOTP(phone, OTP)
      .then((data) => {
        dispatch(sendOTPSuccess(data));
      })
      .catch((error) => {
        dispatch(sendOTPFailure(error.message));
      });
  };
};
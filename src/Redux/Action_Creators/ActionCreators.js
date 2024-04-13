import { ACTION_TYPES } from "../Action_Types/ActionTypes";

export const setsearchtrain = (traindetails) => {
  return {
    type: ACTION_TYPES.SEARCHTRAIN,
    payload: traindetails,
  };
};
export const setenteredtrainnum = (trainum) => {
  return {
    type: ACTION_TYPES.ENTERED_TRAIN_NUMBER,
    payload: trainum,
  };
};
export const setfromstation = (from) => {
  return {
    type: ACTION_TYPES.SET_ENTERED_FROM_LOCATION,
    payload: from,
  };
};

export const settostation = (to) => {
  return {
    type: ACTION_TYPES.SET_ENTERED_TO_LOCATION,
    payload: to,
  };
};
export const setdate = (date) => {
  return {
    type: ACTION_TYPES.SET_JOURNEY_DATE,
    payload: date,
  };
};
export const fetchTrainListSuccess = (list_train) => ({
  type: ACTION_TYPES.FETCH_TRAIN_LIST_SUCCESS,
  payload: list_train,
});
export const fetchTrainListFailure = (error) => ({
  type: ACTION_TYPES.FETCH_TRAIN_LIST_FAILURE,
  payload: error,
});
export const availablityRequest = (req) => ({
  type: ACTION_TYPES.SEAT_AVAILABLE_REQUEST,
  payload: req,
});
export const availabiltySuccess = (success) => ({
  type: ACTION_TYPES.SEAT_AVAILABLE_SUCCESS,
  payload: success,
});
export const availabiltyFailure = (failure) => ({
  type: ACTION_TYPES.SEAT_AVAILABLE_FAILURE,
  payload: failure,
});

export const livetrainnumber = (statustrainnum) => ({
  type: ACTION_TYPES.STATUS_TRAIN_NUMBER,
  payload: statustrainnum,
});
export const liveStatusData = (statusdata) => ({
  type: ACTION_TYPES.SETDAY,
  payload: statusdata,
});

export const fetchLiveTrainStatusRequest = (statusreq) => ({
  type: ACTION_TYPES.FETCH_LIVE_TRAIN_STATUS_REQUEST,
  payload: statusreq,
});

export const fetchLiveTrainStatusSuccess = (statussuccess) => ({
  type: ACTION_TYPES.FETCH_LIVE_TRAIN_STATUS_SUCCESS,
  payload: statussuccess,
});

export const fetchLiveTrainStatusFailure = (statuserror) => ({
  type: ACTION_TYPES.FETCH_LIVE_TRAIN_STATUS_FAILURE,
  payload: statuserror,
});

export const setTrainNumber = (recerivedtrainnum) => ({
  type: ACTION_TYPES.SET_TRAIN_NUMBER,
  payload: recerivedtrainnum,
});
export const setSelectedClass = (selectedClass) => ({
  type: ACTION_TYPES.SET_SELECTED_CLASS,
  payload: selectedClass,
});

export const fetchClassDetailsSuccess = (trainNumber, data) => {
  return {
    type: ACTION_TYPES.FETCH_CLASS_DETAILS_SUCCESS,
    payload: {
      trainNumber,
      data,
    },
  };
};

export const fetchClassDetailsFailure = (classerror) => ({
  type: ACTION_TYPES.FETCH_CLASS_DETAILS_FAILURE,
  payload: classerror,
});

export const selectedtraintime = (traintime) => ({
  type: ACTION_TYPES.SET_SELECTED_TIME,
  payload: traintime,
});

export const setSeatAvailabilityDetails = (data) => ({
  type: ACTION_TYPES.SET_SEAT_AVAILABILITY_DETAILS,
  payload: data,
});

export const loginpage = (userlogin) => ({
  type: ACTION_TYPES.SET_LOGIN,
  payload: userlogin,
});
export const logout = () => ({
  type: ACTION_TYPES.SET_LOGOUT,
});
export const signuppage = (usersignup) => ({
  type: ACTION_TYPES.SET_SIGNUP,
  payload: usersignup,
});
export const setToStationCode = (stationCode) => ({
  type: ACTION_TYPES.SET_TO_STATION_CODE,
  payload: stationCode,
});

export const fetchSeatDetailsRequest = () => ({
  type: ACTION_TYPES.FETCH_SEAT_DETAILS_REQUEST,
});

export const fetchSeatDetailsSuccess = (seatDetails) => ({
  type: ACTION_TYPES.FETCH_SEAT_DETAILS_SUCCESS,
  payload: seatDetails,
});

export const fetchSeatDetailsFailure = (error) => ({
  type: ACTION_TYPES.FETCH_SEAT_DETAILS_FAILURE,
  payload: error,
});

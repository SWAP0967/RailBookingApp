import { ACTION_TYPES } from "../Redux/Action_Types/ActionTypes";

const globalState = {
  searchtraindetails: [],
  enteredtrain_number: "",
  enteredFromLocation: "",
  enteredToLocation: "",
  journeyDate: null,
  fetchedtrainlist: [],
  fetchTrainListError: null,
  toStationCode: "",
  seat_aval_req: null,
  aval_success: null,
  aval_fail: null,
  statusnumber: [],
  statusday: "",
  statusdata: null,
  statusloading: false,
  statuserror: null,
  gettrainnum: "",
  selectedClass: "",
  classDetails: {},
  seatloading: null,
  fetchedtime: null,
  user: {},
  seatDetails: null,
  seatLoading: false,
  seatError: null,
};
export const IrctcReducer = (state = globalState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SEARCHTRAIN:
      return { ...state, searchtraindetails: action.payload };

    case ACTION_TYPES.ENTERED_TRAIN_NUMBER:
      return { ...state, enteredtrain_number: action.payload };

    case ACTION_TYPES.SET_ENTERED_FROM_LOCATION:
      return { ...state, enteredFromLocation: action.payload };

    case ACTION_TYPES.SET_ENTERED_TO_LOCATION:
      return { ...state, enteredToLocation: action.payload };

    case ACTION_TYPES.SET_JOURNEY_DATE:
      return { ...state, journeyDate: action.payload };

    case ACTION_TYPES.FETCH_TRAIN_LIST_SUCCESS:
      return {
        ...state,fetchedtrainlist: action.payload,
        fetchTrainListError: null,
      };

    case ACTION_TYPES.FETCH_TRAIN_LIST_FAILURE:
      return { ...state, fetchedtrainlist: [],fetchTrainListError: action.payload };

    case ACTION_TYPES.SEAT_TOSTATION:
      return { ...state, toStationCode: action.payload };

    case ACTION_TYPES.SEAT_AVAILABLE_REQUEST:
      return {
        ...state,
        seat_aval_req: action.payload,
        aval_success: null,
        aval_fail: null,
      };

    case ACTION_TYPES.SEAT_AVAILABLE_SUCCESS:
      return { ...state, aval_success: action.payload, aval_fail: null };

    case ACTION_TYPES.SEAT_AVAILABLE_FAILURE:
      return { ...state, aval_fail: action.payload, aval_success: null };

    case ACTION_TYPES.STATUS_TRAIN_NUMBER:
      return { ...state, statusnumber: action.payload };

    case ACTION_TYPES.SETDAY:
      return { ...state, statusday: action.payload };

    case ACTION_TYPES.FETCH_LIVE_TRAIN_STATUS_REQUEST:
      return { ...state, statusloading: true, statuserror: null };

    case ACTION_TYPES.FETCH_LIVE_TRAIN_STATUS_SUCCESS:
      return {
        ...state,
        statusloading: false,
        statusdata: action.payload,
        statuserror: null,
      };
    case ACTION_TYPES.FETCH_LIVE_TRAIN_STATUS_FAILURE:
      return { ...state, statusloading: false, statuserror: action.payload };

    case ACTION_TYPES.SET_TRAIN_NUMBER:
      return { ...state, gettrainnum: action.payload };

    case ACTION_TYPES.FETCH_CLASS_DETAILS_SUCCESS:
      return {
        ...state,
        classDetails: {
          ...state.classDetails,
          [action.payload.trainNumber]: action.payload.data || [],
        },
        error: null,
      };

    case ACTION_TYPES.FETCH_CLASS_DETAILS_FAILURE:
      return {
        ...state,
        classDetails: null,
        error: action.payload,
      };

    case ACTION_TYPES.SET_SELECTED_CLASS:
      return {
        ...state,
        selectedClass: action.payload,
        classDetails: null,
        error: null,
      };

    case ACTION_TYPES.SEAT_LOADING_STATUS:
      return {
        ...state,
        seatloading: action.payload,
      };

    case ACTION_TYPES.SET_SELECTED_TIME:
      return {
        ...state,
        fetchedtime: action.payload,
      };
    case ACTION_TYPES.SET_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case ACTION_TYPES.SET_LOGOUT:
      return {
        ...state,
        user: {},
      };

    case ACTION_TYPES.SET_SIGNUP:
      return {
        ...state,
        user: action.payload,
      };

    case ACTION_TYPES.FETCH_SEAT_DETAILS_REQUEST:
      return {
        ...state,
        seatLoading: true,
        seatError: null,
      };
    case ACTION_TYPES.FETCH_SEAT_DETAILS_SUCCESS:
      return {
        ...state,
        seatDetails: action.payload,
        seatLoading: false,
        seatError: null,
      };
    case ACTION_TYPES.FETCH_SEAT_DETAILS_FAILURE:
      return {
        ...state,
        seatLoading: false,
        seatError: action.payload,
      };

    default:
      return state;
  }
};

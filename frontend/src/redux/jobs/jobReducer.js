import { GET_JOBS, CREATE_JOB, UPDATE_JOB, DELETE_JOB } from "./jobActionTypes"

const initialState = {
  jobs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    case CREATE_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
    case UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
      };
    default:
      return state;
  }
}
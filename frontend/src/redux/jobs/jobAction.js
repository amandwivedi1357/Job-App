import api from '../../utils/api';
import { GET_JOBS, CREATE_JOB, UPDATE_JOB, DELETE_JOB } from './jobActionTypes';

export const getJobs = () => async (dispatch) => {
  try {
    const res = await api.get('/jobs');
    dispatch({ type: GET_JOBS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const createJob = (jobData) => async (dispatch) => {
  try {
    const res = await api.post('/jobs', jobData);
    dispatch({ type: CREATE_JOB, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const updateJob = (id, jobData) => async (dispatch) => {
  try {
    const res = await api.put(`/jobs/${id}`, jobData);
    dispatch({ type: UPDATE_JOB, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const deleteJob = (id) => async (dispatch) => {
  try {
    await api.delete(`/jobs/${id}`);
    dispatch({ type: DELETE_JOB, payload: id });
  } catch (err) {
    console.error(err);
  }
};
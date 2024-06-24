import axios from 'axios';
import {axiosInstance} from './defineAPI';

export const getAllActivityFromTask = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.get(
      `/activities/get-all-activities-from-task/${id}`,
      {
        headers: {
          authorization: token,
        },
      },
    );
    if (response) {
      console.log(response.data.message);
      return response.data.data;
    } else {
      throw new Error('get all activity from task error');
    }
  } catch (error) {
    console.log(`get all activity from task error: ${error}`);
    return null;
  }
};

export const createActivity = async (data: any, token: any) => {
  try {
    const response = await axiosInstance.post(
      `http://localhost:3050/activities/create`,
      data,
      {
        headers: {
          authorization: token,
        },
      },
    );
    if (response) {
      console.log(response.data.message);
      return response.data;
    } else {
      throw new Error('create activity from task error');
    }
  } catch (error) {
    console.log(`create activity from task error: ${error}`);
    return null;
  }
};

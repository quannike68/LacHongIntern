import axios from 'axios';
import {axiosInstance} from './defineAPI';

//Lấy danh sách user trong project
export const getStaffJoinProject = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.get(
      `/assignments/getAllUserPropertyFromProject/${id}`,
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
      throw new Error('Get user join project error');
    }
  } catch (error) {
    console.log(`Get user join project error ${error}`);
    return null;
  }
};

//Xoa nhan vien khoi du an
export const deleteStaffIntoProject = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.delete(
      `/assignments/removeStaffFromProject/${id}`,
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
      throw new Error('Get user join project error');
    }
  } catch (error) {
    console.log(`Get user join project error ${error}`);
    return null;
  }
};

//Them nhan vien vào du an
export const UpdateStaffIntoProject = async (
  id: any,
  data: any,
  token: any,
) => {
  try {
    const response = await axiosInstance.post(
      `/assignments/update/${id}`,
      data,
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
      throw new Error('Get user join project error');
    }
  } catch (error) {
    console.log(`Get user join project error ${error}`);
    return null;
  }
};

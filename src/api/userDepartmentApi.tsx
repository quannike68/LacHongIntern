import axios from 'axios';
import {axiosInstance} from './defineAPI';

//Lấy ra tất cả nhan vien trong phong ban
export const getAllStaffDepartment = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.post(
      `/users/admin/getAllStaffInDepartment/${id}`,
      {
        headers: {
          authorization: token,
        },
      },
    );
    if (response) {
      return response.data.data;
    } else {
      throw new Error('Get staff department error');
    }
  } catch (error) {
    console.log(`Get staff department error: ${error}`);
  }
};

//Thêm nhân viên vào phòng ban
export const addStaffIntoDepartment = async (
  id: any,
  data: any,
  token: any,
) => {
  try {
    const response = await axiosInstance.post(
      `/users/addUserIntoDepartment/${id}`,
      data,
      {
        headers: {
          authorization: token,
        },
      },
    );
    if (response) {
      console.log(response.data.message);
    } else {
      throw new Error('Add staff into department error');
    }
  } catch (error) {
    console.log(`Add staff into department error: ${error}`);
  }
};

//Xoa nhan vien trong phong ban
export const deleteStaffIntoDepartment = async (
  id: any,
  data: any,
  token: any,
) => {
  try {
    const response = await axiosInstance.delete(
      `/users/removeStaffFromDepartment/${id}`,
      {
        headers: {
          authorization: token,
        },
        data: data,
      },
    );
    if (response) {
      console.log(response.data.message);
    } else {
      throw new Error('Add staff into department error');
    }
  } catch (error) {
    console.log(`Add staff into department error: ${error}`);
  }
};

//Lay ra danh sach cac nhan vien chua co phong ban
export const getAllStaffNotHaveDepartment = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.get(
      `/users/getListOfStaffDoesNotHaveDepartment`,
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
      throw new Error('Get staff error');
    }
  } catch (error) {
    console.log(`Get staff error: ${error}`);
    return null;
  }
};

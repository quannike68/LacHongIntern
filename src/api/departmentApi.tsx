import axios from 'axios';
import {axiosInstance} from './defineAPI';

//Tao phòng ban mới
export const createDepartment = async (data: any, token: any) => {
  try {
    console.log(data);

    const response = await axiosInstance.post(
      `/departments/admin/create`,
      data,
      {
        headers: {
          authorization: token,
        },
      },
    );
    if (response) {
      return response.data;
    } else {
      throw new Error('Create department error');
    }
  } catch (error) {
    console.log(`Create department error: ${error}`);
  }
};

//Cập nhật thông tin phong ban
export const updateDepartment = async (id: any, data: any, token: any) => {
  try {
    const response = await axiosInstance.put(
      `/departments/admin/update/${id}`,
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
      throw new Error('Update infor department error');
    }
  } catch (error) {
    console.log(`Update infor department error: ${error}`);
  }
};

//Lay ra tat ca phong ban
export const getAllDepartment = async (token: any) => {
  try {
    const response = await axiosInstance.get(`/departments/admin/get-all`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
      return response.data;
    } else {
      throw new Error('Get all department error');
    }
  } catch (error) {
    console.log(`Get all department error: ${error}`);
    return null;
  }
};

//Lấy ra thông tin phong ban
export const getDetailDepartment = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.get(`/departments/detail/${id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
      return response.data.data;
    } else {
      throw new Error('Create department error');
    }
  } catch (error) {
    console.log(`Create department error: ${error}`);
    return null;
  }
};

//Xoá phong ban
export const deleteDepartment = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.delete(
      `http://localhost:3050/departments/admin/delete/${id}`,
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
      throw new Error('Create department error');
    }
  } catch (error) {
    console.log(`Create department error: ${error}`);
    return null;
  }
};

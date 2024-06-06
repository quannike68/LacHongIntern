import axios from 'axios';
import {axiosInstance} from './defineAPI';
//Lay thong tin User
export const getDetailUser = async (token: any) => {
  try {
    const response = await axiosInstance.get(`/users/detail`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      return response.data;
    } else {
      throw new Error('Get data user error');
    }
  } catch (error) {
    console.log(`Get detail data error: ${error}`);
    return null;
  }
};

//Tao tai khoan moi(Admin, Manager)
export const createUser = async (data: any, token: any) => {
  try {
    console.log('data', data);

    const response = await axiosInstance.post(`/users/create`, data, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log('Create user success');
      return response.data;
    } else {
      throw new Error('Create user error');
    }
  } catch (error) {
    console.log(`Create user error : ${error}`);
  }
};

//Cap nhat thong tin tai khoan(All role)
export const updateUser = async (id: any, data: any, token: any) => {
  try {
    const response = await axiosInstance.put(
      `/users/admin/update/${id}`,
      data,
      {
        headers: {
          authorization: token,
        },
      },
    );
    if (response) {
      console.log(response);

      return response.data;
    } else {
      throw new Error('Update user error');
    }
  } catch (error) {
    console.log(`Update user error : ${error}`);
  }
};

//Doi mat khau (All role)
export const changePassword = async (data: any, token: any) => {
  try {
    const response = await axiosInstance.post(`/users/change-password`, data, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log('Change password success');
    } else {
      throw new Error('Change password error');
    }
  } catch (error) {
    console.log(`Change password error : ${error}`);
  }
};

//Lay tat ca user(Admin)
export const getAllUser = async (token: any) => {
  try {
    const response = await axiosInstance.get(`/users/admin/get-all`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      return response.data.data;
    } else {
      throw new Error('Get all user error');
    }
  } catch (error) {
    console.log(`Get all user error : ${error}`);
  }
};

//Xoa tai khoan
export const deleteUser = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.delete(`/users/admin/delete/${id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
    } else {
      throw new Error('Delete user error');
    }
  } catch (error) {
    console.log(`Delete user error: ${error}`);
  }
};

export const getDetailUserById = async (token: any  , Id : any) => {
  try {
    const response = await axiosInstance.get(`/users/information/${Id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      return response.data;
    } else {
      throw new Error('Get data user error');
    }
  } catch (error) {
    console.log(`Get detail data error: ${error}`);
    return null;
  }
};
import axios from 'axios';
import {axiosInstance} from './defineAPI';
// Lấy tất cả dự án
export const getAllProject = async (token: any) => {
  try {
    const response = await axiosInstance.get(`/projects/admin/get-all`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
      return response.data;
    } else {
      throw new Error('get all project error');
    }
  } catch (error) {
    console.log(`get all project error: ${error}`);
    return null;
  }
};

//Lấy tất cả dự án trong phòng ban
export const getAllProjectinDepartment = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.get(
      `/projects/get-all-project-in-department/${id}`,
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
      throw new Error('Get all project in department error');
    }
  } catch (error) {
    console.log(`Get all project in department error: ${error}`);
    return null;
  }
};

//Xoa dự án
export const deleteProject = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.delete(
      `/projects/admin/delete/${id}`,
      {
        headers: {
          authorization: token,
        },
      },
    );
    if (response) {
      console.log(response.data.message);
    } else {
      throw new Error('delete project error');
    }
  } catch (error) {
    console.log(`delete project error: ${error}`);
  }
};

//Tạo dự án mới
export const createProject = async (data: any, token: any) => {
  try {
    const response = await axiosInstance.post(`/projects/create`, data, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
      return response.data;
    } else {
      throw new Error('create project error');
    }
  } catch (error) {
    console.log(`create project error: ${error}`);
  }
};

//Lấy thông tin phong ban
export const getDetailProject = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.get(`/projects/detail/${id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
      return response.data.data;
    } else {
      throw new Error('create project error');
    }
  } catch (error) {
    console.log(`create project error: ${error}`);
  }
};

//Cập nhật thông tin project
export const updateDetailProject = async (id: any, data: any, token: any) => {
  try {
    const response = await axiosInstance.put(`/projects/update/${id}`, data, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
      return response.data.data;
    } else {
      throw new Error('update project error');
    }
  } catch (error) {
    console.log(`update project error: ${error}`);
  }
};


export const reportProject = async (id : any ,token: any) => {
  try {
    const response = await axiosInstance.get(`/report/report-for-project/${id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
      return response.data;
    } else {
      throw new Error('get report project error');
    }
  } catch (error) {
    console.log(`get report project error ${error}`);
    return null;
  }
};
import axios from 'axios';
import {axiosInstance} from './defineAPI';
//Lấy ra tất cả task
export const getAllTask = async (token: any) => {
  try {
    const response = await axiosInstance.get(`/tasks/admin/get-all`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
      return response.data.data;
    } else {
      throw new Error('get all task error');
    }
  } catch (error) {
    console.log(`get all task error: ${error}`);
    return null;
  }
};

//Lấy ra danh sách task trong một dự án
export const getAllTaskFromProject = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.get(
      `/assignments/getAllTaskPropertyFromProject/${id}`,
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
      throw new Error('get all task from project error');
    }
  } catch (error) {
    console.log(`get all task from project error: ${error}`);
    return null;
  }
};

//Lấy ra thông tin task
export const getDetailTask = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.get(`/tasks/detail/${id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
      return response.data.data;
    } else {
      throw new Error('get details task error');
    }
  } catch (error) {
    console.log(`get details task error: ${error}`);
    return null;
  }
};

//Cập nhật thông tin task
export const updateDetailTask = async (id: any, data: any, token: any) => {
  try {
    const response = await axiosInstance.put(`/tasks/update/${id}`, data, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
    } else {
      throw new Error('Update details task error');
    }
  } catch (error) {
    console.log(`Update details task error: ${error}`);
  }
};

//Tạo 1 task mới
export const createTask = async (
  dataTask: any,
  dataAssignment: any,
  token: any,
) => {
  try {
    const response = await axiosInstance.post(`/tasks/create`, dataTask, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      const {user_property_id, project_property_id} = dataAssignment;
      const responseAssignment = await axiosInstance.post(
        '/assignments/create',
        {
          user_property_id: user_property_id,
          project_property_id: project_property_id,
          task_property_id: response.data.data.task_property.task_property_id,
        },
        {
          headers: {
            authorization: token,
          },
        },
      );
      if (responseAssignment) {
        return responseAssignment.data.data;
      }
    } else {
      throw new Error('Create task error');
    }
  } catch (error) {
    console.log(`Create task error: ${error}`);
  }
};

//Xoa task
export const deleteTask = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.delete(`/tasks/admin/delete/${id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response) {
      console.log(response.data.message);
      return response.data;
    } else {
      throw new Error('Delete task error');
    }
  } catch (error) {
    console.log(`Delete task error: ${error}`);
  }
};

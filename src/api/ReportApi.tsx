import {axiosInstance} from './defineAPI';

export const ReportDepartments = async (id: any, token: any) => {
  try {
    const response = await axiosInstance.get(
      `/report/report-for-department/${id}`,
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
      throw new Error('get report department error');
    }
  } catch (error) {
    console.log(`get report department error: ${error}`);
    return null;
  }
};

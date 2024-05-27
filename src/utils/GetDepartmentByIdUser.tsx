import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GetDepartmentByIdUser = async (Id: any) => {
  try {
    if (Id) {
      const token = await AsyncStorage.getItem('authorization');

      const response = await axios.get(
        `http://localhost:3050/departments/detail/${Id}`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (response.data) {

        return response.data.data;
      } else {
        throw new Error('Email not found in token');
      }
    }
  } catch (error) {
    console.error('Error getting user data from token:', error);
    return null;
  }
};

export default GetDepartmentByIdUser;

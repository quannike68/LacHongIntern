import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GetdDetallProject = async (Id: any) => {
  try {
    if (Id) {
      const token = await AsyncStorage.getItem('authorization');
      const response = await axios.get(
        `http://localhost:3050/projects/detail/${Id}`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (response.data) {

        return response.data.data;
      } else {
        throw new Error('project not found in token');
      }
    }
  } catch (error) {
    console.error('Error getting project data from token:', error);
    return null;
  }
};

export default GetdDetallProject;

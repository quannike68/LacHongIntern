import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GetAllActivityByYourProperty = async () => {
  try {
    const token = await AsyncStorage.getItem('authorization');

    if (token) {
      const response = await axios.get(
        'http://localhost:3050/activities/getAllActivitiesByYourProperty',
        {
          headers: {
            authorization: token,
          },
        },
      );
      if (response) {
        return response.data.data;
      } else {
        throw new Error('Report not found in token');
      }
    }
  } catch (error) {
    console.error('Error getting report from token:', error);
    return null;
  }
};

export default GetAllActivityByYourProperty;

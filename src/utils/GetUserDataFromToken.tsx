import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const getUserDataFromToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authorization');

    if (token) {
      const decodedToken: any = jwtDecode(token);

      const userEmail = decodedToken.email;
      if (userEmail) {
        const response = await axios.get(
          `http://localhost:3050/users/findByEmail/${userEmail}`,
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
      throw new Error('Email not found in token');
    }
    throw new Error('Token not found');
  } catch (error) {
    console.error('Error getting user data from token:', error);
    return null;
  }
};

export default getUserDataFromToken;

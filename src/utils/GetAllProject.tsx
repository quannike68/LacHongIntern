import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GetAllProject = async (id : any) => {
    try {
      
        const token = await AsyncStorage.getItem('authorization');
        if (token) {
            
        const response = await axios.get(
          `http://localhost:3050/projects/getAllProjectInDepartment/${id}`,
          {
            headers: {
              authorization: token,
            },
          },
        );
  
        if (response.data) {
          return await response.data.data.data;
        } else {
          throw new Error('Department not found ');
        }
      }
    } catch (error) {
      console.error('Error getting user data from token 1:', error);
      return null;
    }
  };
  
  export default GetAllProject;
  
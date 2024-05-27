import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { resetCache } from '../../metro.config';


const GetAllTaskInProject = async(id : any) => {

    try {
        const token = await AsyncStorage.getItem('authorization');
        if(token){
            const reponse = await axios.post(`http://localhost:3050/tasks/getAllTaskByTaskProperty` , id , {
                headers : {
                    authorization: token,
                }
            }) 
            if(reponse){
                console.log(reponse.data.data);
                return reponse.data.data;
            }
        }else{
            console.log('token not found');
            
        }
    } catch (error) {
        console.log(error);
        
    }
}

export default GetAllTaskInProject;
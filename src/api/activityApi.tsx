import axios from "axios";

export const getAllTask = async ( token: any) => {
    try {
        const response = await axios.get(`http://localhost:3050/tasks/admin/getAll` ,{
            headers:{
                authorization : token,
            }
        })
        if(response){
           console.log(response.data.message);
           return response.data.data.data
        }
        else{
            throw new Error('get all task error')
        }        
    } catch (error) {
        console.log(`get all task error: ${error}`); 
        return null; 
    }
        
}
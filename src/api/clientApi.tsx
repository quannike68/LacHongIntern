import axios from "axios";


//Tạo 1 khách hàng 
export const createClient = async (data: any, token: any ) => {
    try {
        const response = await axios.post(`http://localhost:3050/clients/create`, data ,{
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
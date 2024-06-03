import axios from "axios";

//Lấy ra tất cả task
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

//Lấy ra danh sách task trong một dự án
export const getAllTaskFromProject = async (id: any, token: any) => {
    try {
        const response = await axios.get(`http://localhost:3050/assignments/getAllTaskPropertyFromProject/${id}` ,{
            headers:{
                authorization : token,
            }
        })
        if(response){
           console.log(response.data.message);
           return response.data.data
        }
        else{
            throw new Error('get all task from project error')
        }        
    } catch (error) {
        console.log(`get all task from project error: ${error}`); 
        return null; 
    }
        
}

//Lấy ra thông tin task
export const getDetailTask = async ( id:any ,token: any) => {
    try {
        const response = await axios.get(`http://localhost:3050/tasks/detail/${id}` ,{
            headers:{
                authorization : token,
            }
        })
        if(response){
           console.log(response.data.message);
           return response.data.data
        }
        else{
            throw new Error('get details task error')
        }        
    } catch (error) {
        console.log(`get details task error: ${error}`); 
        return null; 
    }
        
}

//Cập nhật thông tin task
export const updateDetailTask = async ( id:any , data: any , token: any) => {
    try {
        const response = await axios.put(`http://localhost:3050/tasks/update/${id}` , data , {
            headers:{
                authorization : token,
            }
        })
        if(response){
           console.log(response.data.message);
        }
        else{
            throw new Error('Update details task error')
        }        
    } catch (error) {
        console.log(`Update details task error: ${error}`); 
    }
        
}

//Tạo 1 task mới

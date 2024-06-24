// import React, { useEffect, useState } from 'react'
// import { View , Text  ,StyleSheet } from 'react-native';
// import { Input } from '@rneui/base';

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function Information() {
    
//     const [infor , setInfor] = useState({
//         name : '',
//         description : '',
//         manager_id : ''
//     })

//     useEffect(() => {
//         const getInforDepartment = async() =>{
//             try {
//                 const inforUser = await getUserDataFromToken();
//                 const idDepartment = inforUser.UserProperty.department_id;
//                 const token = await AsyncStorage.getItem('authorization');
//                     if(idDepartment && token){
//                         const response = await axios.get(`http://localhost:3050/departments/detail/${idDepartment}` ,{
//                             headers:{
//                                 authorization: token,
//                             },
//                         })
//                         if(response) {
//                             setInfor((prevFormData) => ({
//                             ...prevFormData,
//                             name : response.data.data.name,
//                             description : response.data.data.description,
//                             manager_id : response.data.data.manager_id  
//                             }))
//                         }else{
//                             console.log("connect database error");
//                         }
//                     }else{
//                         console.log('Token not found'); 
//                     }
//             } catch (error) {
//                 console.log(error);   
//             }
//         }
          
//         getInforDepartment();
//     },[])

        

//   return (
//     <View style = {{paddingHorizontal : 20 , backgroundColor : 'white' , height : '100%' , paddingVertical : 20 , marginHorizontal : 20 , borderRadius : 20}}>
//         <View>
//             <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Department name</Text>
//             <Input placeholder={infor.name}/>
//         </View>
//         <View>
//             <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Manager</Text>
//             <Input placeholder={infor.manager_id}/>
//         </View>
//         {/* <View>
//             <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>The project had finished</Text>
//             <Input placeholder='20'/>
//         </View> */}
//         <View>
//             <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Description</Text>
//             <Input placeholder={infor.description}/>
//         </View>
//     </View>
//   )
// }

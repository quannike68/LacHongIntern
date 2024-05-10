import React, { useState } from 'react'
import { View , Text ,TouchableOpacity ,StyleSheet } from 'react-native';
import { Icon ,Button , LinearProgress , ListItem } from "@rneui/themed";
import moment from "moment";

export default function Department() {

        const datas = [
        { id: 1, projectCode : 'DDA01' ,time: '2024-04-25' , task: 10 , task_complete : 4},
        { id: 2,  projectCode : 'DDA02' ,time: '2024-04-15' , task: 15 ,task_complete : 4},
        { id: 3,  projectCode : 'DDA03' ,time: '2024-02-27' , task: 5 ,task_complete : 4},
        { id: 4,  projectCode : 'DDA04' ,time: '2024-01-28' , task: 8 ,task_complete : 4},
      ];

      const currentTime = moment();



  return (
    <View>
         {datas.map((data , index) => {
                    const dataMoment = moment(data.time);
                    const duration = moment.duration(currentTime.diff(dataMoment))
                    const days = duration.asDays();

                    const taskUnfinished = data.task - data.task_complete ; 
                    const value = taskUnfinished/data.task;
                    
                return(
            <TouchableOpacity style = {styles.project_data}>
                    <View style = {{flexDirection : 'row' , justifyContent : 'space-between'}}>
                    <Text style = {{fontSize : 25 , fontWeight : 'bold' , marginBottom : 5}}>{data.projectCode}</Text>                        
                        
                        <View style={{flexDirection : 'row' , alignItems : 'center'}}>
                            <Icon type="font-awesome-5" name="users" color={"black"} solid size={20} style={{marginHorizontal : 10}} /> 
                            <Text style = {{fontSize : 20}}>12</Text>
                        </View>

 
                    </View>
                    <Text style = {{marginBottom : 5}}>Nguyễn Văn Diệp</Text>
                    <Text style = {{marginBottom : 5 , fontSize : 20 ,fontWeight : 'bold'  , color : days <= 7 ? "rgba(243, 60, 60, 1)": days <= 14 ? "rgba(228, 129, 38, 1)" : "rgba(22, 159, 40, 1)"   }} >{data.time}</Text>
                    <LinearProgress value={value } animation = {{duration : 1000}} style={{height : 15 , borderRadius : 15 }} color={value <= 0.3 ? "rgba(243, 60, 60, 1)": value <= 0.6 ? "rgba(228, 129, 38, 1)" : "rgba(22, 159, 40, 1)" } />
            </TouchableOpacity>
                );
                })}
    </View>
  )
}

const styles = StyleSheet.create({

    project_data :{
        marginHorizontal : 20 , 
        marginVertical : 20,
        paddingHorizontal : 20 , 
        paddingVertical : 20,
        borderWidth : 1,
        borderColor : 'black',
        borderRadius : 20
    }
})


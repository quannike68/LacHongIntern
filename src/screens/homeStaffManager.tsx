import { Icon ,Button , LinearProgress , ListItem } from "@rneui/themed";
import React, { useState , useEffect } from "react";
import { StyleSheet, View, Text,  ScrollView , TouchableOpacity} from "react-native";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
import NavButton from "../components/layout/NavButton";
import Report from "../components/layout/Report";

const HomeStaffManager = () => {

    const navigation = useNavigation();

    // const datas = [
    //     { id: 1, projectCode : 'DDA01' ,time: '2024-04-25' , task: 10 , task_complete : 4},
    //     { id: 2,  projectCode : 'DDA02' ,time: '2024-04-15' , task: 15 ,task_complete : 4},
    //     { id: 3,  projectCode : 'DDA03' ,time: '2024-02-27' , task: 5 ,task_complete : 4},
    //     { id: 4,  projectCode : 'DDA04' ,time: '2024-01-28' , task: 8 ,task_complete : 4},
    //   ];

    const datas = [
    {Time:"6/6/2023",Name:"Pannier",NameTask:"Kwilith",Title:"Pharmacist",Auth:"tdearn0"},
    {Time:"10/9/2023",Name:"Job",NameTask:"Thoughtworks",Title:"Actuary",Auth:"ogoggin1"},
    {Time:"10/9/2023",Name:"Flexidy",NameTask:"Topiczoom",Title:"Marketing Manager",Auth:"lmallon2"},
    {Time:"2/6/2024",Name:"Domainer",NameTask:"Pixonyx",Title:"Administrative Assistant IV",Auth:"mdeevey3"},
    {Time:"6/6/2023",Name:"Tresom",NameTask:"Brightbean",Title:"Senior Cost Accountant",Auth:"scaizley4"},
    {Time:"2/6/2024",Name:"Pannier",NameTask:"Jaxnation",Title:"Financial Analyst",Auth:"kthrift5"},
    {Time:"3/14/2024",Name:"Aerified",NameTask:"Twitterbeat",Title:"Media Manager IV",Auth:"ckerss6"},
    {Time:"1/10/2024",Name:"Zamit",NameTask:"Eire",Title:"Software Consultant",Auth:"kdambrosio7"},
    {Time:"1/10/2024",Name:"Bitwolf",NameTask:"Avamba",Title:"Help Desk Technician",Auth:"rbortoli8"},
    {Time:"2/6/2024",Name:"Konklux",NameTask:"Zoombeat",Title:"Project Manager",Auth:"jparmer9"}
    ];
    
      const currentTime = moment();

  return (
    <View style={styles.container}>
             {/* header */}
             <View style={styles.header}>

             <View style={styles.headerUser}>

            <View style = {styles.userHeader}>
            <View>
            <Icon type="font-awesome-5" name="user" color={"black"} solid 
            size={35}
             />
            </View>
            <View style = {{paddingLeft : 20}}>
                <Text style = {styles.text_1}>Name account</Text>
                <Text style = {styles.text_2}>Role</Text>
            </View>
            </View>
            
            <View>
                <Button icon = {<Icon type="font-awesome-5" name="sign-out-alt" color={'black'} size={35}  />} type="clear" />
            </View>
            </View>

            <View style={styles.headerTitle}>

            <View style={styles.KeyTitle}>
                <View style = {{borderRightWidth: 2}}>
                <Text style={{fontSize : 15 , color : '#898989'}}>
                    Department
                </Text>              
                </View>
                <View  style = {{borderRightWidth: 2}}>
                <Text style={{fontSize : 15 , color : '#898989'}}>
                    Manager
                </Text>              
                </View>
                <View  style = {{borderRightWidth: 2}}>
                <Text style={{fontSize : 15 , color : '#898989'}}>
                    Staffs
                </Text>              
                </View>

            </View>

            <View style={styles.Title}>

                <Text style={{fontSize : 18 , fontWeight: 'bold' }}>
                    Department
                </Text>              

                <Text style={{fontSize : 18 ,  fontWeight: 'bold'}}>
                    Manager
                </Text>              

                <Text style={{fontSize : 18 , fontWeight: 'bold' }}>
                    Staffs
                </Text>              

            </View>

            </View>

        </View>
        
        <View style={styles.body}>
        
        <View style = {styles.project} >
            <ScrollView>
            {/* {datas.map((data , index) => {
                    const dataMoment = moment(data.time);
                    const duration = moment.duration(currentTime.diff(dataMoment))
                    const days = duration.asDays();

                    const taskUnfinished = data.task - data.task_complete ; 
                    const value = taskUnfinished/data.task;
                    
                return(
            <TouchableOpacity style = {styles.project_data}>
                
                    <Text style = {{fontSize : 25 , fontWeight : 'bold' , marginBottom : 5}}>{data.projectCode}</Text>
                    <Text style = {{marginBottom : 5}}>Nguyễn Văn Diệp</Text>
                    <Text style = {{marginBottom : 5 , fontSize : 20 ,fontWeight : 'bold'  , color : days <= 7 ? "rgba(243, 60, 60, 1)": days <= 14 ? "rgba(228, 129, 38, 1)" : "rgba(22, 159, 40, 1)"   }} >{data.time}</Text>
                    <LinearProgress value={value } animation = {{duration : 1000}} style={{height : 15 , borderRadius : 15 }} color={value <= 0.3 ? "rgba(243, 60, 60, 1)": value <= 0.6 ? "rgba(228, 129, 38, 1)" : "rgba(22, 159, 40, 1)" } />
            </TouchableOpacity>
                );
                })} */}
                {datas.map((data , index) => {
                    return(
                        <Report/>

                );
                })} 
            </ScrollView>
        </View>
        </View>

        <NavButton/>
    </View>
  )
}



const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        backgroundColor : '#CFDFE4'
    },
    header :{
        flex : 1.5 ,
        backgroundColor : '#ffffff',
        marginVertical : 10,
        borderRadius : 30,
        marginHorizontal : 20
    },
    
    userHeader :{
        flexDirection : 'row',
        alignItems : 'center',

    },
    headerUser :{
        flex : 0.5 ,
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginHorizontal : 30,
        borderBottomWidth : 1,
    },
    headerTitle : {
            flex : 1,
            flexDirection : 'row',
            marginHorizontal : 30,
    },

    KeyTitle:{
        flex:2,
        marginBottom :10 ,
        justifyContent : 'space-around'
    },
    Title:{
        flex:5,
        marginBottom :10 ,
        marginLeft : 20,
        justifyContent : 'space-around'
    },

    text_1 :{
        fontSize : 20,
        color : 'rgba(0, 0, 0, 1)',
        fontWeight : 'bold'
    },
    text_2 : {
        color : 'rgba(0, 0, 0, 0.5)',
        fontSize : 16,
    },
    body :{
        flex : 6
    },
    header_project :{
        flex : 1,
        justifyContent : 'center'
    },
    text_project :{
        fontSize : 25,
        fontWeight : 'bold',
        marginHorizontal : 20,
        marginVertical : 10,
        
    },
    project :{
        flex : 8 ,
        backgroundColor : "#ffffff",
        marginHorizontal : 20,
        borderRadius : 30,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
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

export default HomeStaffManager ;

import { Icon ,Button , LinearProgress , ListItem } from "@rneui/themed";
import React, { useState , useEffect } from "react";
import { StyleSheet, View, Text,  ScrollView , TouchableOpacity ,  Animated, Easing, FlatList } from "react-native";

import Department from "../components/layout/Department";
import NavButton from "../components/layout/NavButton";
import Staff from "../components/layout/Staff";
import Information from "../components/layout/Information";

export default function Departments() {

    const [titleBtn , setTitleBtn]  = useState('Infor')

    let bodys = null ; 

    if(titleBtn == 'Project') {
        bodys= (
        <Department/>
        )
    }
    if(titleBtn == 'Staff') {
        bodys = (<Staff/>)
        
    }
    if(titleBtn == 'Infor') {
        bodys = (<Information/>)
        
    }

    return (
            <View style ={{backgroundColor : '#CFDFE4' , height : '100%' , flex : 1}}>
                <View style = {{flex : 1}}>
                    <View style={{justifyContent : 'center' , alignItems : "center"}}>
                    <Text style={{fontSize: 20 , fontWeight : 'bold' , color : '#929CB1' , justifyContent : 'center' , alignItems : "center"}}>
                    APPLICATION DEVELOPMENT
                    </Text>
                    <Text style={{fontSize: 20 , fontWeight : 'bold' , color : '#929CB1' }}>DEPARTMENT</Text>
                    <Text style={{fontSize: 15 , color : '#929CB1' }}> The department's main task is to develop</Text>
                    <Text style={{fontSize: 15 , color : '#929CB1' }}>applications to serve the project including mobile</Text>
                    <Text style={{fontSize: 15 , color : '#929CB1' }}>applications and web applications</Text>
                </View>
                <View style={{justifyContent : 'center' , alignItems : "center", marginVertical : 10 , width : '100%' , height : 70 }}> 
                    <View style = {{flexDirection : 'row' , alignItems : 'center' , justifyContent : 'space-around' , backgroundColor : 'white' , width : '90%' , height : '100%' , borderRadius : 40}}>
                        <Button title={'Project'} buttonStyle = {{backgroundColor : '#1D61AE' , borderRadius : 40 , width : 100 , height : 50}}/>
                        <Button title={'Information'} titleStyle = {{color :'rgba(0, 0, 0, 0.59)' }} buttonStyle = {{backgroundColor : 'white' , }}/>
                        <Button title={'Staff'} titleStyle = {{color :'rgba(0, 0, 0, 0.59)' }} buttonStyle = {{backgroundColor : 'white' , }}/>
                    </View>                    
                </View>
                
                </View>

                <View style = {{flex : 2.8}}>
                    <ScrollView style = {{backgroundColor : 'white' , marginHorizontal : 20 , borderRadius : 30}}>
                        {bodys}
                    </ScrollView>  

                </View>

                <View>
                    <NavButton/>
                </View>
                    

           </View>
    )
}






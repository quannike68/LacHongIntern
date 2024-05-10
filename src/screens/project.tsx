import React, { useState } from 'react'
import { View , Text ,TouchableOpacity ,StyleSheet ,ScrollView } from 'react-native';
import { Icon ,Button , LinearProgress , ListItem } from "@rneui/themed";
import NavButton from '../components/layout/NavButton';
import Report from '../components/layout/Report';
import InforProject from '../components/layout/InforProject';
import Task from '../components/layout/Task';


export default function  Project() {

  const [titleBtn , setTitleBtn] = useState('Task')
  
  let bodys = null;
  if(titleBtn =='Report' ) {
    bodys = (
      <Report/>
    )
  }
  if(titleBtn =='Infor' ) {
    bodys = (
      <InforProject/>
    )
  }
  if(titleBtn =='Task' ) {
    bodys = (
      <Task/>
    )
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

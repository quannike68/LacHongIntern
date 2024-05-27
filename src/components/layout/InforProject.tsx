import React, { useState } from 'react'
import { View , Text, ScrollView ,TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Input } from '@rneui/base';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function InforProject({data} : any) {
const navigation : any = useNavigation()


const [projectInfo, setProjectInfo] = useState({
    name: data.name,
    description: data.description,
    turnover: data.turnover,
    investor: data.investor,
  });

  const handleInputChange = (name: any, value: any) => {
    setProjectInfo(prev => ({ ...prev, [name]: value }));
  };

    const handleUpdateproject = async() =>{
        try {
        const token = await AsyncStorage.getItem('authorization');
        const response = await axios.put(`http://localhost:3050/projects/update/${data.project_id}` ,projectInfo , {
            headers: {
              authorization: token,
            },
          },)
          if(response) {
            console.log('update project success');
          }
        } catch (error) {
            console.log(error);
        }
       
    } 

  return (
    <View style = {{paddingHorizontal : 20, backgroundColor : 'white' , height : 550 , paddingVertical : 20 , marginHorizontal : 20 , borderRadius : 20 }}>
        <ScrollView style = {{marginVertical : 20}}>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Project name</Text>
            <TextInput  value={projectInfo.name} onChangeText={(text : any) => handleInputChange('name', text)} style={styles.input} />
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Project end times</Text>
            <Input placeholder={data.endAt}/>
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Depcription</Text>
            <TextInput  value={projectInfo.description} onChangeText={(text) => handleInputChange('description', text)} style={styles.input} />
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Investor</Text>
            <TextInput  value={projectInfo.investor} onChangeText={(text) => handleInputChange('investor', text)} style={styles.input} />
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Investment</Text>
            <TextInput value={projectInfo.turnover} onChangeText={(text) => handleInputChange('turnover', text)} style={styles.input} />
        </View>
        <View>
        </View>
        </ScrollView>
        <View style = {{flexDirection : 'row' , justifyContent : 'flex-end'}}>
            <Button title='Update' buttonStyle = {{borderRadius : 20, paddingHorizontal: 20  }} onPress={() => handleUpdateproject()} />
            
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 20,
      marginVertical : 20,
      fontSize : 20,
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
    }
  });
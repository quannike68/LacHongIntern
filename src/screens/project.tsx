import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Icon, Button, LinearProgress, ListItem} from '@rneui/themed';
import NavButton from '../components/layout/NavButton';
import Report from '../components/layout/Report';
import InforProject from '../components/layout/InforProject';
import Task from '../components/layout/Task';
import { useNavigation, useRoute } from '@react-navigation/native';
import GetdDetallProject from '../utils/GetDetailProject';
import axios from 'axios';
import GetAllTaskInProject from '../utils/GetAllTask';

export default function Project() {
  const navigation : any = useNavigation()
  const [titleBtn, setTitleBtn] = useState('Report');
  const route = useRoute();
  const { projectId }: any = route.params;

  const [detailProject , setDetailProject] = useState<any>({})
  const [task , setTask] = useState<any>([]);
  
  useEffect(() => {
      const detailProjects = async() =>{
        const response = await GetdDetallProject(projectId);
        if(response){
            setDetailProject(response)
        }else{
          console.log('Get project by id error');
        }
      }
      detailProjects();
  },[])

  useEffect(() => {
    const getTask = async() => {
        const response: any = await GetAllTaskInProject(projectId)
        if(response){
          setTask(response.data)
          console.log(task);
          
        }
    }
    getTask()
  }, [])



  return (
    <View style={{backgroundColor: '#CFDFE4', height: '100%', flex: 1}}>
      <View style={{flex: 1}}>
        <View style = {{height: 80 , width: '100%' , backgroundColor : 'white' , borderBottomEndRadius: 20 , borderBottomStartRadius: 20 , marginBottom : 20}}>
            <View style = {{justifyContent: 'center' , alignItems: 'center'}}>
                  <Text style={{fontSize : 40 , fontWeight : 'bold' }}>{detailProject.name}</Text>
            </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            width: '100%',
            height: 70,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: 'white',
              width: '90%',
              height: '100%',
              borderRadius: 40,
            }}>
            <Button
              title={'Report'}
              buttonStyle={{
                backgroundColor: '#1D61AE',
                borderRadius: 40,
                width: 100,
                height: 50,
              }}
              onPress={() => setTitleBtn('Report')}
            />
            <Button
              title={'Task'}
              titleStyle={{color: 'rgba(0, 0, 0, 0.59)'}}
              buttonStyle={{backgroundColor: 'white'}}
              onPress={() => setTitleBtn('Task')}
            />
            <Button
              title={'Information'}
              titleStyle={{color: 'rgba(0, 0, 0, 0.59)'}}
              buttonStyle={{backgroundColor: 'white'}}
              onPress={() => setTitleBtn('Infor')}
            />
          </View>
        </View>
      </View>

      <View style={{flex: 2.8}}>
        
        {titleBtn == 'Report' && <Report />}
        {titleBtn == 'Infor' && <View>
          <InforProject data = {detailProject}/>
          </View>}
        {titleBtn == 'Task' && <Task data = {task}/>}
        
      </View>

      <View>
        <NavButton />
      </View>
    </View>
  );
}

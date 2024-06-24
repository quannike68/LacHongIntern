import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Icon, Button, LinearProgress, ListItem} from '@rneui/themed';
import NavButton from '../../components/layout/StaffManagerLayout/NavButton';

import InforProject from '../../components/layout/InforProject';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getDetailProject, reportProject} from '../../api/projectApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Timeline from 'react-native-timeline-flatlist';
import {getAllTaskFromProject} from '../../api/taskApi';

interface UserInformation {
  user_id: string;
  username: string;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  name: string;
  birthday: string | null;
  createdAt: string;
  createdBy: string;
  deletedMark: boolean;
  UserProperty: {
    user_property_id: string;
    department_id: string | null;
    role: {
      name: string;
    };
  };
}

interface ActivityProperty {
  activity_property_id: string;
  user_property_id: string;
  activity_id: string;
  task_property_id: string;
}

interface Activity {
  activity_id: string;
  description: string;
  createdBy: string;
  modifiedBy: string | null;
  createdAt: string;
  ActivityProperty: ActivityProperty;
  user_information: UserInformation;
}

interface Activities {
  [date: string]: Activity[];
}

interface Task {
  task_id: string;
  description: string;
  createdBy: string;
  modifiedBy: string | null;
  createdAt: string;
  TaskProperty: {
    task_property_id: string;
    task_id: string;
  };
  activities: Activities;
}

interface Information {
  total_user: number;
  total_task: {
    total_task_is_done: number;
    total_task_is_not_done: number;
  };
}

interface ProjectProperty {
  project_property_id: string;
  project_id: string;
  department_id: string;
  client_id: string;
}

interface IReportProject {
  data: {
    project_id: string;
    projectCode: string;
    description: string | null;
    startAt: string;
    endAt: string;
    turnover: string | null;
    document: string[] | null;
    investor: string | null;
    createdBy: string | null;
    modifiedBy: string;
    createdAt: string;
    ProjectProperty: ProjectProperty;
    information: Information;
    tasks: Task[];
  };
  message: string;
  status: number;
}

interface NewProjectFormat {
  time: string;
  projectCode: string;
  time2: string;
  task: {
    task_id: string;
    description: string;
    activities: {
      task_id: string;
      description: string;
      user_information: {
        user_id: string;
        username: string;
      };
    };
  };
}

export default function Project() {
  const [titleBtn, setTitleBtn] = useState('Report');
  const route = useRoute();
  const {idProject}: any = route.params;

  const [detailProject, setDetailProject] = useState<any>({});

  const [task, setTask] = useState<any>([]);

  const [listReport, setListReport] = useState<IReportProject[]>([]);

  const [newReportFormat, setNewReportFormat] = useState<NewProjectFormat[]>(
    [],
  );

  const getReportproject = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const dataReport = await reportProject(idProject, token);
        if (dataReport) {
          setListReport(dataReport);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertReport = (listReport: IReportProject[]): NewProjectFormat[] => {
    const newProjectFormats: NewProjectFormat[] = [];
    listReport.forEach(data => {
      const list = data.data;
      list.tasks.forEach(tasks => {
        Object.entries(tasks.activities).forEach(([date, activityList]) => {
          activityList?.forEach(activity => {
            const newReport: NewProjectFormat = {
              time: date,
              time2: activity.createdAt,
              projectCode: data.data.projectCode,
              task: {
                task_id: task.task_id,
                description: task.description,
                activities: {
                  task_id: activity.activity_id,
                  description: activity.description,
                  user_information: {
                    user_id: activity.user_information?.user_id,
                    username: activity.user_information?.username,
                  },
                },
              },
            };
            newProjectFormats.push(newReport);
          });
        });
      });
    });

    return newProjectFormats;
  };

  const departmentDetail = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await getDetailProject(idProject, token);
        if (response) {
          setDetailProject(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const headelGetTask = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      const response = await getAllTaskFromProject(
        detailProject.ProjectProperty.project_property_id,
        token,
      );
      if (response) {
        setTask(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    departmentDetail();
    getReportproject();
  }, []);

  return (
    <View style={{backgroundColor: '#CFDFE4', height: '100%', flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            height: 80,
            width: '100%',
            backgroundColor: 'white',
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            marginBottom: 20,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>
              {detailProject.projectCode}
            </Text>
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
              onPress={() => {
                headelGetTask();
                setTitleBtn('Task');
              }}
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

      <View style={{flex: 3}}>
        <View
          style={{
            height: '100%',
            marginTop: 10,
            padding: 15,
            backgroundColor: '#ffffff',
            marginHorizontal: 20,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: {width: 1, height: 1},
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 8,
          }}>
          {titleBtn == 'Report' && (
            <Timeline
              data={newReportFormat}
              showTime={true}
              timeStyle={{
                textAlign: 'center',
                backgroundColor: '#ff9797',
                color: 'white',
                padding: 2,
                borderRadius: 13,
                marginTop: 10,
              }}
              descriptionStyle={{color: 'gray'}}
              timeContainerStyle={{minWidth: 52, marginTop: -5}}
            />
          )}
        </View>

        {/* {titleBtn == 'Task' && <Task data = {task}/>} */}
      </View>

      <View>
        <NavButton />
      </View>
    </View>
  );
}

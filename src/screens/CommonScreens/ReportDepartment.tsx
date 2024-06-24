import {Icon, Button, LinearProgress, ListItem} from '@rneui/themed';
import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
// import NavButton from '../../components/layout/StaffManagerLayout/NavButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {getDetailUser} from '../../api/userApi';
// import NavButtonAdmin from '../../components/layout/AdminLayout/AdminNav';
import AdminHeader from '../../components/common/DetailHeader';

import {ReportDepartments} from '../../api/ReportApi';
import Timeline from 'react-native-timeline-flatlist';
import {getDetailDepartment} from '../../api/departmentApi';
import {schemaReportDepartment} from '../../Model/ModelReportDepartment';

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

interface ActivityProperty {
  activity_property_id: string;
  user_property_id: string;
  activity_id: string;
  task_property_id: string;
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

interface ProjectProperty {
  project_property_id: string;
  project_id: string;
  department_id: string;
  client_id: string;
}

interface information {
  total_user: number;
  total_task: {
    total_task_is_done: number;
    total_task_is_not_done: number;
  };
}

interface IReportDepartment {
  project_id: string;
  projectCode: string;
  description: string | null;
  startAt: string;
  endAt: string;
  turnover: string | null;
  document: string | null;
  investor: string | null;
  createdBy: string;
  modifiedBy: string;
  createdAt: string;
  ProjectProperty: ProjectProperty;
  information: information;
  tasks: Task[];
}

interface NewDepartmentFormat {
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

const ReportDepartment = () => {
  const navigation: any = useNavigation();

  const [formDataAccount, setFormDataAcount] = useState({
    id: '',
    username: '',
    role: '',
    departent_id: '',
  });

  const [newReportFormat, setNewReportFormat] = useState<NewDepartmentFormat[]>(
    [],
  );
  console.log('====================================');
  console.log(newReportFormat);
  console.log('====================================');
  const [listReport, setListReport] = useState<IReportDepartment[]>([]);

  const Logout = async () => {
    await AsyncStorage.removeItem('authorization');
    navigation.navigate('Login');
  };

  const Report = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await ReportDepartments(
          formDataAccount.departent_id,
          token,
        );
        if (response) {
          setListReport(response.data);
        } else {
          console.log(`Get detail user error`);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const detailUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await getDetailUser(token);
        if (response) {
          setFormDataAcount(prev => ({
            ...prev,
            username: response.data.username,
            role: response.data.UserProperty.role.name,
            id: response.data.user_id,
            departent_id: response.data.UserProperty.department_id,
          }));
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertReport = (
    listReport: IReportDepartment[],
  ): NewDepartmentFormat[] => {
    const newDepartmentFormats: NewDepartmentFormat[] = [];
    listReport.forEach(report => {
      report.tasks.forEach(task => {
        Object.entries(task.activities)?.forEach(([date, activityList]) => {
          activityList?.forEach(activity => {
            const newReport: NewDepartmentFormat = {
              time: date,
              time2: activity.createdAt,
              projectCode: report.projectCode,
              task: {
                task_id: task.task_id,
                description: task.description,
                activities: {
                  task_id: task.task_id,
                  description: activity?.description,
                  user_information: {
                    user_id: activity.user_information?.user_id,
                    username: activity.user_information?.username,
                  },
                },
              },
            };
            newDepartmentFormats.push(newReport);
          });
        });
      });
    });
    return newDepartmentFormats;
  };

  useEffect(() => {
    detailUser();
    Report();
    const convertedReports = convertReport(listReport);
  }, []);

  useCallback(() => {
    const convertedReports = convertReport(listReport);
    setNewReportFormat(convertedReports);
  }, [listReport]);

  return (
    <View style={styles.container}>
      {/* header */}

      {formDataAccount.role == 'ADMIN' && (
        <View>
          <AdminHeader data={formDataAccount} />
          {/* <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              padding: 20,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 8,
            }}>
            <Text
              style={{
                fontSize: 20,
              }}>
              Department:
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}>{` ${dataDe.Name}`}</Text>
          </View> */}
        </View>
      )}
      {(formDataAccount.role == 'STAFF' ||
        formDataAccount.role == 'MANAGER' ||
        formDataAccount.role == 'PROJECT_MANAGER') && (
        <View style={styles.header}>
          <View style={styles.headerUser}>
            <View style={styles.userHeader}>
              <View>
                <Icon
                  type="font-awesome-5"
                  name="user"
                  color={'black'}
                  solid
                  size={35}
                />
              </View>
              <View style={{paddingLeft: 20}}>
                <Text style={styles.text_1}>{formDataAccount.username}</Text>
                <Text style={styles.text_2}>{formDataAccount.role}</Text>
              </View>
            </View>

            <View>
              <Button
                icon={
                  <Icon
                    type="font-awesome-5"
                    name="sign-out-alt"
                    color={'black'}
                    size={35}
                  />
                }
                type="clear"
                onPress={Logout}
              />
            </View>
          </View>

          {/* <View style={styles.headerTitle}>
            <View style={styles.KeyTitle}>
              <View style={{borderRightWidth: 1}}>
                <Text style={{fontSize: 15, color: '#898989'}}>Department</Text>
              </View>
              <View style={{borderRightWidth: 1}}>
                <Text style={{fontSize: 15, color: '#898989'}}>
                  Total staff
                </Text>
              </View>
              <View style={{borderRightWidth: 1}}>
                <Text style={{fontSize: 15, color: '#898989'}}>Manager</Text>
              </View>
            </View>

            <View style={styles.Title}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {dataDe.Name}
              </Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {dataDe.Total_staff}
              </Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {dataDe.Manager}
              </Text>
            </View>
          </View> */}
        </View>
      )}

      <View style={styles.body}>
        <View style={styles.project}>
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
            timeContainerStyle={{minWidth: 52, marginTop: 5}}
          />
        </View>
      </View>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 8,
        }}>
        {/* {formDataAccount.role == 'ADMIN' && <NavButtonAdmin />}
        {(formDataAccount.role == 'STAFF' ||
          formDataAccount.role == 'MANAGER' ||
          formDataAccount.role == 'PROJECT_MANAGER') && <NavButton />} */}
        {/* <TabNavbar /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    borderRadius: 30,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },

  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerUser: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    borderBottomWidth: 1,
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 30,
  },

  KeyTitle: {
    flex: 2,
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  Title: {
    flex: 5,
    marginBottom: 10,
    marginLeft: 20,
    justifyContent: 'space-around',
  },

  text_1: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 'bold',
  },
  text_2: {
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 16,
  },
  body: {
    flex: 6,
    marginBottom: 20,
  },
  header_project: {
    flex: 1,
    justifyContent: 'center',
  },
  text_project: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  project: {
    flex: 8,
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
  },
  project_data: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
});

export default ReportDepartment;

import {Icon, Button, LinearProgress, ListItem} from '@rneui/themed';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import NavButton from '../components/layout/NavButton';
import Report from '../components/layout/Report';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUserDataFromToken from '../utils/GetUserDataFromToken';
import GetDepartmentByIdUser from '../utils/GetDepartmentByIdUser';
import GetAllActivityByYourProperty from '../utils/GetAllActivity';



const HomeStaffManager = () => {
  const navigation: any = useNavigation();
  const [nameUser, setNameUser] = useState('');
  const [role, setRole] = useState('');
  const [Reports, setReports] = useState<any>({});

  const [Department, setDepartment] = useState('');

  //   const [Department, setDepartment] = useState('');

  const Logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    navigation.navigate('Login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user: any = await getUserDataFromToken();

      if (user) {
        setNameUser(user.username);
        setRole(user.UserProperty.role.name);

        const department: any = await GetDepartmentByIdUser(
          user.UserProperty.department_id,
        );
        if (department) {
          setDepartment(department.name);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() =>{
    const dataReport = async () =>{
      const Report : any = await GetAllActivityByYourProperty();
      
      if(Array.isArray(Report)){
        setReports(Report)
        
        
      }
    }
    dataReport()
  }, [])

  const currentTime = moment();

  return (
    <View style={styles.container}>
      
      {/* header */}
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
              <Text style={styles.text_1}>{nameUser}</Text>
              <Text style={styles.text_2}>{role}</Text>
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

        <View style={styles.headerTitle}>
          <View style={styles.KeyTitle}>
            <View style={{borderRightWidth: 2}}>
              <Text style={{fontSize: 15, color: '#898989'}}>Department</Text>
            </View>
            <View style={{borderRightWidth: 2}}>
              <Text style={{fontSize: 15, color: '#898989'}}>Manager</Text>
            </View>
          </View>

          <View style={styles.Title}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{Department}</Text>

            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Manager</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.project}>
          <Report />
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
        <NavButton />
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

export default HomeStaffManager;

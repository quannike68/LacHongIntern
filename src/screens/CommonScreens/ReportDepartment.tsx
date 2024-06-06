import {Icon, Button, LinearProgress, ListItem} from '@rneui/themed';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import NavButton from '../../components/layout/NavButton';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {getDetailUser} from '../../api/userApi';
import NavButtonAdmin from '../../components/layout/AdminLayout/AdminNav';
import AdminHeader from '../../components/layout/AdminLayout/AdminHeader';
import TimelineC from '../../components/layout/TimeLineC';
import {ReportDepartments} from '../../api/ReportApi';
const ReportDepartment = () => {
  const navigation: any = useNavigation();

  const route = useRoute();
  const {idDepartment}: any = route.params;

  const [formDataAccount, setFormDataAcount] = useState({
    username: '',
    role: '',
  });

  const [listReport, setListReport] = useState();
  console.log(listReport);

  const Report = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await ReportDepartments(idDepartment, token);
        if (response) {
          setListReport(response.data);
          console.log(response);
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

  const Logout = async () => {
    await AsyncStorage.removeItem('authorization');
    navigation.navigate('Login');
  };

  useEffect(() => {
    const detailUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authorization');
        if (token) {
          const response = await getDetailUser(token);
          if (response) {
            setFormDataAcount(() => ({
              username: response.data.username,
              role: response.data.UserProperty.role.name,
            }));
            console.log(response);
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
    detailUser();
  }, []);

  useEffect(() => {
    Report();
  }, []);

  return (
    <View style={styles.container}>
      {/* header */}

      {formDataAccount.role == 'ADMIN' && (
        <AdminHeader data={formDataAccount} />
      )}

      {formDataAccount.role == 'STAFF' && (
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
                <Text style={styles.text_1}>{0}</Text>
                <Text style={styles.text_2}>{0}</Text>
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
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{0}</Text>

              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Manager</Text>
            </View>
          </View>
        </View>
      )}
      {formDataAccount.role == 'MANAGER' && (
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
                <Text style={styles.text_1}>{0}</Text>
                <Text style={styles.text_2}>{0}</Text>
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
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{0}</Text>

              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Manager</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.body}>
        <View style={styles.project}>
          <TimelineC
            data={listReport}
            showTime={true}
            columnFormat="single-column-left"
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
        {formDataAccount.role == 'ADMIN' && <NavButtonAdmin />}
        {formDataAccount.role == 'STAFF' && <NavButton />}
        {formDataAccount.role == 'MANAGER' && <NavButton />}
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

export default ReportDepartment;

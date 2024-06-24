import React, {useEffect, useReducer, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import DetailHeader from '../../components/common/DetailHeader';

import {useNavigation} from '@react-navigation/native';
import {getDetailUser} from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authReducer} from '../../reducers/authReducer';

const HomeAdminNavigate = () => {
  const navigation: any = useNavigation();
  const [authState, dispatch] = useReducer(authReducer, {
    role: null,
    username: null,
  });

  const detailAccount = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await getDetailUser(token);
        console.log(response.data.role.name);
        if (response.status == 200 && response) {
          dispatch({
            type: 'SET_AUTH',
            payload: {
              role: response.data.role.name,
              user: response.data.name,
            },
          });
        } else {
          console.log(response);
        }
      } else {
        console.log('token invalue');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    detailAccount();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DetailHeader data={authState} />
      </View>
      <View style={{marginHorizontal: 20, height: '100%'}}>
        <ScrollView contentContainerStyle={styles.departmentsContainer}>
          <View style={styles.departmentCard}>
            <TouchableOpacity
              style={styles.touchableO}
              onPress={() => navigation.navigate('AdminDepartmentScreen')}>
              <Image
                source={require('../../assets/imgAdminNavigate/Department.jpg')}
                style={styles.departmentImage}
              />
              <Text style={styles.departmentText}>Department</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.departmentCard}>
            <TouchableOpacity
              style={styles.touchableO}
              onPress={() => navigation.navigate('ProjectAdminScreen')}>
              <Image
                source={require('../../assets/imgAdminNavigate/Project.png')}
                style={styles.departmentImage}
              />
              <Text style={styles.departmentText}>Project</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.departmentCard}>
            <TouchableOpacity style={styles.touchableO}>
              <Image
                source={require('../../assets/imgAdminNavigate/Task.jpg')}
                style={styles.departmentImage}
              />
              <Text style={styles.departmentText}>Task</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.departmentCard}>
            <TouchableOpacity style={styles.touchableO}>
              <Image
                source={require('../../assets/imgAdminNavigate/User.jpg')}
                style={styles.departmentImage}
              />
              <Text style={styles.departmentText}>User</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.departmentCard}>
            <TouchableOpacity style={styles.touchableO}>
              <Image
                source={require('../../assets/imgAdminNavigate/Client.jpg')}
                style={styles.departmentImage}
              />
              <Text style={styles.departmentText}>Client</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 120,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  position: {
    fontSize: 14,
    color: 'white',
  },
  departmentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  departmentCard: {
    width: '48%',
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  touchableO: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  departmentImage: {
    width: 100,
    height: 80,
    marginBottom: 10,
    borderRadius: 5,
  },
  departmentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default HomeAdminNavigate;

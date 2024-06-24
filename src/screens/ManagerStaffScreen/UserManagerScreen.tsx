import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import NavButtonAdmin from '../../components/layout/AdminLayout/AdminNav';
import UserList from '../../components/common/ListUser';
import HeaderAdmin from '../../components/common/DetailHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllUser, getDetailUser} from '../../api/userApi';
const UserManager = () => {
  //info user
  const [formDataAccount, setFormDataAcount] = useState({
    username: '',
    role: '',
  });

  const [formDataAllUser, setFormDataAllUser] = useState<any>();

  //Lấy thông tin Account
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

  //Lấy tất thong tin tat ca user
  const getDataAllUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await getAllUser(token);
        if (response) {
          setFormDataAllUser(response.users);
        } else {
          console.log(`Get all user error`);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataAllUser();
  }, []);

  useEffect(() => {
    detailUser();
  }, []);
  return (
    <View style={{flex: 1}}>
      <HeaderAdmin data={formDataAccount} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          padding: 20,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 8,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>User</Text>
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          height: '65%',
          width: 'auto',
          marginTop: 20,
          marginHorizontal: 20,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 8,
        }}>
        <UserList data={formDataAllUser} refreshData={getDataAllUser} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 8,
        }}>
        {/* <NavButtonAdmin /> */}
      </View>
    </View>
  );
};

export default UserManager;

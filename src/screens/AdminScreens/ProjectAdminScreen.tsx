import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NavButtonAdmin from '../../components/layout/AdminLayout/AdminNav';
import AdminProject from '../../components/common/ListProject';
import HeaderAdmin from '../../components/layout/AdminLayout/AdminHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDetailUser} from '../../api/userApi';
const ProjectAdmin = () => {
  //info user
  const [formDataAccount, setFormDataAcount] = useState({
    username: '',
    role: '',
  });

  //Lấy thông tin Account
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
  }, [formDataAccount, setFormDataAcount]);

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
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Project</Text>
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          height: '65%',
          width: 'auto',
          paddingTop: 10,
          marginTop: 20,
          marginHorizontal: 20,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 8,
        }}>
        <AdminProject />
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
        <NavButtonAdmin />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 16,
    backgroundColor: '#ffffff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  adminName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adminRole: {
    fontSize: 14,
    color: '#6c757d',
  },
  shareIconContainer: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  shareIcon: {
    width: 20,
    height: 20,
  },
});

export default ProjectAdmin;

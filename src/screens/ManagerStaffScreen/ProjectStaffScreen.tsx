import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ListProject from '../../components/common/ListProject';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllProjectinDepartment} from '../../api/projectApi';
// import NavButton from '../../components/layout/StaffManagerLayout/NavButton';
import {getDetailDepartment} from '../../api/departmentApi';


const ProjectStaff = () => {
  // const route = useRoute();
  // const {idDepartments}: any = route.params;
  const [listProject, setListProject] = useState<any>({});
  const [detailDepartment, setdetailDepartment] = useState<any>({});

  //Lấy tất cả project
  const listAllProjectDepartment = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      const idDepartment = await AsyncStorage.getItem('IdDepartment');

      if (token) {
        const response = await getAllProjectinDepartment(idDepartment, token);
        if (response) {
          setListProject(response.data.data);
        } else {
          console.log(`Get all error`);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const detalDepartment = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      const idDepartment = await AsyncStorage.getItem('IdDepartment');
      if (token) {
        const response = await getDetailDepartment(idDepartment, token);
        if (response) {
          setdetailDepartment(response);
        } else {
          console.log(`Get all error`);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listAllProjectDepartment();
  }, []);

  useEffect(() => {
    detalDepartment();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            color: '#929CB1',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {detailDepartment.name}
        </Text>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 25,
            color: '#929CB1',
            width: '80%',
          }}>
          {detailDepartment.description}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#ffffff',
          height: '70%',
          width: 'auto',
          paddingTop: 10,
          marginTop: 20,
          paddingVertical: 20,
          marginHorizontal: 20,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 8,
        }}>
        <ListProject
          data={listProject}
          refreshData={listAllProjectDepartment}
          id={detailDepartment.department_id}
        />
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
        {/* <NavButton /> */}
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

export default ProjectStaff;

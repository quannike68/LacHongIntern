import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllProject} from '../../../api/projectApi';
import {Icon} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';

const ProjectAdminScreen = () => {
  const [listProject, setListProject] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const navigation: any = useNavigation();
  // //Lấy tất cả project
  // const listAllProject = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('authorization');
  //     if (token) {
  //       const response = await getAllProject(token);
  //       if (response) {
  //         setListProject(response.data.data);
  //       } else {
  //         console.log(`Get all error`);
  //       }
  //     } else {
  //       console.log(`Token invalid`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   listAllProject();
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="ionicon"
            name="arrow-back-outline"
            size={35}
            style={{alignItems: 'flex-start', marginBottom: 10}}
          />
        </TouchableOpacity>
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
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Dự án hiện có</Text>
        </View>

        <View
          style={{
            backgroundColor: '#ffffff',
            height: '85%',
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
          {/* {loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}>
              <ActivityIndicator size="large" color="#277DDE" />
            </View>
          ) : listProject && listProject.length > 0 ? (
            <ListProject data={listProject} />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}>
              <Text>No data available</Text>
            </View>
          )} */}
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
    </SafeAreaView>
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

export default ProjectAdminScreen;

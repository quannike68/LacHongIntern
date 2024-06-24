import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useReducer, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getDetailDepartment,
  updateDepartment,
} from '../../../api/departmentApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, ListItem} from '@rneui/themed';
import {departmentReducer} from '../../../reducers/departmenReducer';
import {useQueryClient} from 'react-query';
import {getAllUser} from '../../../api/userApi';
import {schemaDepartment} from '../../../Model/ModelDepartment';
import {showToastMessage} from '../../../components/common/ToastMessageCustom';
import Toast from 'react-native-toast-message';

interface State {
  detailDepartments: schemaDepartment;
  dataUsers: any[];
}

export default function InfoDepartment() {
  const navigation: any = useNavigation();
  const route = useRoute();
  const {IdDepartment}: any = route.params;
  const [colorById, setColorById] = useState<any>();
  const [loading, setloading] = useState({
    detailDapartment: true,
    listUsers: true,
  });
  const [data, setData] = useState<State>({
    detailDepartments: {
      name: '',
      description: '',
      manager_id: '',
      manager: '',
    },
    dataUsers: [],
  });
  const [chooseUser, setChooseUser] = useState<any>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    InfoDepartments();
  }, []);

  const InfoDepartments = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await getDetailDepartment(IdDepartment, token);
        if (response) {
          setData((prevData: any) => ({
            ...prevData,
            detailDepartments: {
              ...prevData.detailDepartments,
              name: response.name,
              description: response.description,
              manager: response.manager_info?.name,
              manager_id: response.manager_id,
            },
          }));

          setloading((prev: any) => ({...prev, detailDapartment: false}));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await getAllUser(token);
        if (response) {
          setData((prevData: any) => ({
            ...prevData,
            dataUsers: response.users,
          }));
          setChooseUser(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handUpdate = async () => {
    try {
      const {manager, ...dataWithoutManager} = data.detailDepartments;
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await updateDepartment(
          IdDepartment,
          dataWithoutManager,
          token,
        );
        if (response) {
          queryClient.invalidateQueries('itemsD');
          Toast.show({
            type: 'success',
            text1: 'Update Department',
            text2: 'Cập nhật phòng ban mới thành công',
            autoHide: true,
            visibilityTime: 2500,
          });
          navigation.navigate('AdminDepartmentScreen');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Update Department',
            text2: 'Cập nhật phòng ban mới thất bại',
            autoHide: true,
            visibilityTime: 2500,
          });
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Create Department',
        text2: 'Network Error',
        autoHide: true,
        visibilityTime: 2500,
      });
    }
  };

  const handleInputChange = (field: any, value: any) => {
    setData(prevState => ({
      ...prevState,
      detailDepartments: {
        ...prevState.detailDepartments,
        [field]: value,
      },
    }));
  };

  const renderDataUser = ({item}: any) => {
    const backgroundColor = item.user_id === colorById ? '#277DDE' : '#fff';

    return (
      <TouchableOpacity
        style={[styles.userItem, {backgroundColor}]}
        onPress={() => {
          setColorById(item.user_id),
            setData((prev: any) => ({
              ...prev,
              detailDepartments: {
                ...prev.detailDepartments,
                manager: item.username,
                manager_id: item.user_id,
              },
            }));
        }}>
        <ListItem.Content>
          <ListItem.Title>{item.username}</ListItem.Title>
        </ListItem.Content>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" type="feather" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {loading.detailDapartment ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}>
          <ActivityIndicator size="large" color="#277DDE" />
        </View>
      ) : (
        <View style={styles.View}>
          <Text style={styles.Label}>Department name</Text>
          <TextInput
            style={styles.Input}
            value={data.detailDepartments.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <Text style={styles.Label}>Description</Text>
          <TextInput
            style={styles.Input}
            value={data.detailDepartments.description}
            onChangeText={text => handleInputChange('description', text)}
          />
          <View style={{}}>
            <Text style={styles.Label}>Manager</Text>
            <TextInput
              style={styles.Input}
              value={data.detailDepartments.manager}
              editable={false}
            />
          </View>
          <View style={styles.ViewManager}>
            <View style={styles.styleHM}>
              <TouchableOpacity onPress={() => handleGetUsers()}>
                <Text style={styles.Labels}>Choose a manager</Text>
              </TouchableOpacity>
              {chooseUser && (
                <TouchableOpacity onPress={() => setChooseUser(false)}>
                  <Icon type="font-awesome-5" name="times" size={25} />
                </TouchableOpacity>
              )}
            </View>
            {chooseUser ? (
              <FlatList
                data={data.dataUsers}
                renderItem={renderDataUser}
                keyExtractor={item => item.user_id.toString()}
                style={styles.userList}
              />
            ) : (
              <></>
            )}
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
            }}>
            <Button title="Save" onPress={() => handUpdate()} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  View: {
    height: '90%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  ViewManager: {
    width: '100%',
    height: 300,
    marginVertical: 15,
  },
  styleHM: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  Labels: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  Input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  managerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userList: {
    maxHeight: 200,
  },
});

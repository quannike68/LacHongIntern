import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Button,
  Modal,
} from 'react-native';
import {deleteDepartment, getAllDepartment} from '../../../api/departmentApi';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {useQuery, useQueryClient} from 'react-query';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetAllDepartment = async () => {
  try {
    const token = await AsyncStorage.getItem('authorization');
    if (token) {
      const response: any = await getAllDepartment(token);
      if (response) {
        return response;
      }
    }
  } catch (error) {
    return error;
  }
};

const DepartmentScreen = () => {
  const navigation: any = useNavigation();
  const [datas, setDatas] = useState<any>({
    id: '',
    name: '',
  });
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);

  const {data, error, isLoading} = useQuery('itemsD', GetAllDepartment);

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await deleteDepartment(datas.id, token);
        if (response) {
          queryClient.invalidateQueries('itemsD');
          Toast.show({
            type: 'success',
            text1: 'Delete Department',
            text2: 'Xoá phòng thành công',
            autoHide: true,
            visibilityTime: 2500,
          });
          setModal(false);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Delete Department',
            text2: 'Xoá phòng không thành công',
            autoHide: true,
            visibilityTime: 2500,
          });
          setModal(false);
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Delete Department',
        text2: 'Network error',
        autoHide: true,
        visibilityTime: 2500,
      });
    }
  };

  const renderItem = useCallback(({item}: any) => {
    const manager = item.information?.manager?.name;
    const staff = item.information.total_staff;
    return (
      <TouchableOpacity>
        <View style={styles.Container}>
          <View style={styles.itemContainer}>
            <View>
              <Text style={styles.departmentName}>{item.name}</Text>
              <View style={styles.leadContainer}>
                <Text style={styles.leadType}>Manager: {manager || NaN}</Text>
              </View>
              <Text style={styles.memberCount}>{staff} memberss</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.infodeleteButton}
                onPress={() =>
                  navigation.navigate('InfoDepartments', {
                    IdDepartment: item.department_id,
                  })
                }>
                <Icon
                  type="font-awesome-5"
                  name="info-circle"
                  color="#063B77"
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.infodeleteButton}
                onPress={() => {
                  setDatas((prev: any) => ({
                    ...prev,
                    id: item.department_id,
                    name: item.name,
                  })),
                    setModal(true);
                }}>
                <Icon
                  type="font-awesome-5"
                  name="trash"
                  color="red"
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{alignItems: 'flex-start', marginHorizontal: 20}}
        onPress={() => navigation.goBack()}>
        <Icon type="ionicon" name="arrow-back-outline" size={35} />
      </TouchableOpacity>
      <View
        style={{
          height: '90%',
          width: '100%',
          marginTop: 20,
        }}>
        {isLoading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}>
            <ActivityIndicator size="large" color="#277DDE" />
          </View>
        ) : data && data.length > 0 ? (
          <>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.department_id.toString()}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('CreateDepartment')}>
              <Icon type="font-awesome-5" name="plus" color="#fff" />
            </TouchableOpacity>
          </>
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
        )}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => setModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa phòng:{' '}
              <Text style={{color: 'red'}}>{datas.name}</Text> không?
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Hủy"
                onPress={() => setModal(false)}
                color="#2196F3"
              />
              <Button
                title="Xóa"
                onPress={() => handleDelete()}
                color="#FF0000"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    margin: 10,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    backgroundColor: '#ffffff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  departmentName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  leadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  leadType: {
    padding: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  leadName: {
    fontSize: 14,
  },
  memberCount: {
    fontSize: 12,
    color: '#666',
  },
  actionsContainer: {
    width: '30%',
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },

  infodeleteButton: {
    height: '100%',
    padding: 8,
    width: '50%',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#277DDE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  //Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default DepartmentScreen;

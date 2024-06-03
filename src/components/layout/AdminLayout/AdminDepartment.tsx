import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllUser} from '../../../api/userApi';
import {deleteDepartment} from '../../../api/departmentApi';

const DepartmentList = ({data}: any) => {
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [modalCreate, setModalCreate] = useState<any>(false);
  const [userVisible, setUserVisible] = useState<any>(false);
  const [dataUser, setDataUser] = useState<any>();

  const [projectDetails, setProjectDetails] = useState({
    department_id: '',
    name: '',
    description: '',
    manager_id: '',
  });

  const handleGetAlluser = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await getAllUser(token);
        if (response) {
          setDataUser(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelDelete = async (id: any) => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      console.log(id);

      if (token) {
        const response = await deleteDepartment(id, token);
        if (response) {
          console.log(`Xoa thanh cong phong ban`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigation: any = useNavigation();

  const handleInputChange = (name: any, value: any) => {
    setProjectDetails(prev => ({...prev, [name]: value}));
  };

  const renderItem = ({item}: any) => {
    const manager = item.description.information?.manager || {};

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Departments', {idDepartment: item.department_id})
        }>
        <View style={styles.itemContainer}>
          <Text style={styles.departmentName}>{item.name}</Text>
          <View style={styles.leadContainer}>
            <Text style={styles.leadType}>
              Manager: {manager.username || 'N/A'}
            </Text>
          </View>
          <Text style={styles.memberCount}>
            {item.information.total_staff} members
          </Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => {
                setProjectDetails(prev => ({
                  ...prev,
                  department_id: item.department_id,
                  name: item.name,
                  description: item.description,
                }));
                setModalVisible(true);
              }}>
              <Text>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                handelDelete(item.department_id);
              }}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderUser = ({data}: any) => (
    <TouchableOpacity>
      <View style={{}}>
        <Text style={{}}>{data.username}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => {setModalCreate(true)}}>
        <Icon type="font-awesome-5" name="plus" color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalLabel}>Department name</Text>
            <TextInput
              style={styles.modalInput}
              value={projectDetails.name}
              onChangeText={text => handleInputChange('name', text)}
            />

            <Text style={styles.modalLabel}>Description</Text>
            <TextInput
              style={styles.modalInput}
              value={projectDetails.description}
              onChangeText={text => handleInputChange('description', text)}
            />

            <Text style={styles.modalLabel}>Manager</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{
                  backgroundColor: '#f0f0f0',
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 15,
                  fontSize: 16,
                  width: '90%',
                }}
                value={projectDetails.manager_id}
                onChangeText={text => handleInputChange('manager_id', text)}
              />
              <TouchableOpacity
                onPress={() => {
                  handleGetAlluser();
                  setUserVisible(true);
                }}>
                <Icon
                  type="font-awesome"
                  name="angle-down"
                  size={34}
                  color="#000"
                  style={{marginHorizontal: 10, paddingBottom: 10}}
                />
              </TouchableOpacity>
            </View>
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
            <Button title="Save" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: 10,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  leadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  leadType: {
    backgroundColor: '#eee',
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
    flexDirection: 'row',
    marginTop: 8,
  },
  infoButton: {
    marginRight: 16,
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#f00',
    borderRadius: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalInput: {
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
});

export default DepartmentList;

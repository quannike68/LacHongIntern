import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {createUser, deleteUser, updateUser} from '../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  user_id: string;
  username: string;
  name?: string;
  email?: string;
  phone?: string;
  UserProperty?: {
    role?: {
      name?: string;
    };
  };
}

interface Props {
  data: User[];
  refreshData: () => void;
}

const UserList: React.FC<Props> = ({data, refreshData}) => {
  const [userData, setUserData] = useState<User[]>(data);
  const [updateModal, setUpdateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [idUser, setIdUser] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
  });

  const [newUserInfo, setNewUserInfo] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    department_id: '665f5fb5b1355429dcbcaf39',
    role: '',
  });

  console.log(newUserInfo);

  const handleSetModal = (item: User) => {
    setUserInfo({
      username: item.username,
      name: item.name || '',
      email: item.email || '',
      phone: item.phone || '',
    });
    setIdUser(item.user_id);
    setUpdateModal(true);
  };

  const handleChange = (name: any, value: any) => {
    setUserInfo(prevState => ({...prevState, [name]: value}));
  };

  const handleNewUserChange = (name: any, value: any) => {
    setNewUserInfo(prevState => ({...prevState, [name]: value}));
  };

  const headleUpdate = async (idUser: any, userInfo: any) => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response = await updateUser(idUser, userInfo, token);
        console.log(response);
        if (response) {
          console.log(response.message);
          refreshData();
        } else {
          console.log(`Update user error`);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await deleteUser(id, token);
        if (response) {
          console.log(response.message);
          refreshData();
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await createUser(newUserInfo, token);
        if (response) {
          console.log(response.message);
          refreshData();
        } else {
          console.log(`Add user error`);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Item = useCallback(
    ({item}: {item: User}) => {
      const navigation: any = useNavigation();

      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProfileStaffScreen', {idUser: item.user_id})
          }>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.username}</ListItem.Title>
              <ListItem.Subtitle>
                {item.UserProperty?.role?.name}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Content right style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => handleSetModal(item)}>
                <Icon
                  name="edit"
                  type="font-awesome"
                  color="gray"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.user_id)}>
                <Icon name="trash" type="font-awesome" color="red" />
              </TouchableOpacity>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      );
    },
    [userData],
  );

  useEffect(() => {
    setUserData(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>Name</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>Edit</Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.user_id.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModal(true)}>
        <Icon name="plus" type="font-awesome-5" color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModal}
        onRequestClose={() => {
          setUpdateModal(!updateModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={userInfo.username}
              onChangeText={value => handleChange('username', value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={userInfo.name}
              onChangeText={value => handleChange('name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={userInfo.email}
              onChangeText={value => handleChange('email', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={userInfo.phone}
              onChangeText={value => handleChange('phone', value)}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  headleUpdate(idUser, userInfo);
                  setUpdateModal(!updateModal);
                }}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setUpdateModal(!updateModal)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addModal}
        onRequestClose={() => {
          setAddModal(!addModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add User</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              value={newUserInfo.username}
              onChangeText={value => handleNewUserChange('username', value)}
            />

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newUserInfo.name}
              onChangeText={value => handleNewUserChange('name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newUserInfo.email}
              onChangeText={value => handleNewUserChange('email', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={newUserInfo.password}
              onChangeText={value => handleNewUserChange('password', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Department ID"
              value={newUserInfo.department_id}
              onChangeText={value =>
                handleNewUserChange('department_id', value)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Role"
              value={newUserInfo.role}
              onChangeText={value => handleNewUserChange('role', value)}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  handleAddUser();
                  setAddModal(!addModal);
                }}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setAddModal(!addModal)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonCancel: {
    backgroundColor: '#FF0000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default UserList;

import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {Button, Icon, LinearProgress} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createProject,
  deleteProject,
  updateDetailProject,
} from '../../api/projectApi';
import {useNavigation} from '@react-navigation/native';

const ListProject = ({data, refreshData, id}: any) => {
  const navigation: any = useNavigation();
  const [projects, setProjects] = useState<any>(data);

  const [createModal, setCreateModal] = useState<any>(false);
  const [updateModal, setUpdateModal] = useState<any>(false);
  const [idProject, setIdProject] = useState<any>();
  const [role, setRole] = useState();
  const [idUser, setIdUser] = useState();

  const [newProject, setNewProject] = useState({
    name: 'code thanh toán zalopay1',
    projectCode: 'ASA',
    description: 'làm vào ứng dụng abc',
    endAt: '2024-05-10T03:09:26.363Z',
    department_id: id || '',
    client_id: '',
  });

  const [updateProject, setUpdateProject] = useState({
    name: '',
    projectCode: '',
    description: '',
    endAt: '2024-05-10T03:09:26.363Z',
    department_id: id || '',
    client_id: idUser || '',
  });

  const formatDate = (dateString: string) => {
    return dateString.split('T')[0];
  };

  const calculateDaysBetween = (endDateString: string) => {
    const endDate = new Date(endDateString);
    const currentDate = new Date();

    const timeDifference = endDate.getTime() - currentDate.getTime();

    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysDifference <= 0 ? 0 : daysDifference;
  };

  const handlCreateProject = async (data: any) => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await createProject(data, token);
        console.log('Project', response);
        if (response) {
          console.log(response.message);
          refreshData();
        } else {
          console.log(`Add user error `);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handDeleteProject = async (id: any) => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await deleteProject(id, token);
        if (response) {
          console.log(response.message);
          refreshData();
        } else {
          console.log(`delete project error `);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handUpdateProject = async (id: any, data: any) => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await updateDetailProject(id, data, token);
        if (response) {
          console.log(response.message);
          refreshData();
        } else {
          console.log(`update project error `);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Item = useCallback(
    ({item}: any) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Project', {idProject: item.project_id})
          }>
          <View style={styles.item}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: 5,
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Text style={styles.code}>{item.projectCode}</Text>
              </TouchableOpacity>

              {(role == 'MANAGER' || role == 'ADMIN') && (
                <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
                  <Button
                    icon={
                      <Icon
                        name="trash"
                        type="font-awesome-5"
                        size={20}
                        color="red"
                      />
                    }
                    onPress={() => handDeleteProject(item.project_id)}
                    type="clear"
                  />
                  <Button
                    icon={
                      <Icon
                        name="edit"
                        type="font-awesome-5"
                        size={20}
                        color="green"
                      />
                    }
                    type="clear"
                    onPress={() => {
                      setIdProject(item.project_id);
                      setUpdateProject(prev => ({
                        ...prev,
                        name: item.name,
                        projectCode: item.projectCode,
                        description: item.description,
                        endAt: item.endAt,
                        department_id: item.department_id,
                        client_id: item.client_id,
                      }));
                      setUpdateModal(true);
                    }}
                  />
                </View>
              )}
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <Text style={[styles.date, {color: data.color}]}>
                {formatDate(item.startAt)}
              </Text>
              <Text> - </Text>
              <Text style={[styles.date, {color: data.color}]}>
                {formatDate(item.endAt)}
              </Text>
            </View>
            <LinearProgress
              value={calculateDaysBetween(item.endAt) / 30}
              animation={{duration: 1000}}
              style={{height: 15, borderRadius: 15}}
              color={
                calculateDaysBetween(item.endAt) <= 7
                  ? 'rgba(243, 60, 60, 1)'
                  : calculateDaysBetween(item.endAt) <= 14
                  ? 'rgba(228, 129, 38, 1)'
                  : 'rgba(22, 159, 40, 1)'
              }
            />
          </View>
        </TouchableOpacity>
      );
    },
    [role, projects],
  );
  useEffect(() => {
    const getData = async () => {
      const role: any = await AsyncStorage.getItem('role');
      // const idUser: any = await AsyncStorage.getItem('idUser');
      if (role) {
        setRole(role);
        // setNewProject(prev => ({
        //   ...prev,
        //   client_id: idUser,
        // }));
        // setUpdateProject(prev => ({
        //   ...prev,
        //   client_id: idUser,
        // }));
        // setIdUser(idUser);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setProjects(data);
  }, [data]);

  return (
    <View style={{height: '100%'}}>
      <FlatList
        data={data}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.project_id}
        contentContainerStyle={styles.container}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setCreateModal(true)}>
        <Icon type="font-awesome-5" name="plus" color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={updateModal}
        onRequestClose={() => setUpdateModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={updateProject.name}
              onChangeText={text =>
                setUpdateProject({...updateProject, name: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Project Code"
              value={updateProject.projectCode}
              onChangeText={text =>
                setUpdateProject({...updateProject, projectCode: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={updateProject.description}
              onChangeText={text =>
                setUpdateProject({...updateProject, description: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="End Date (YYYY-MM-DD)"
              value={updateProject.endAt}
              onChangeText={text =>
                setUpdateProject({...updateProject, endAt: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Department ID"
              value={updateProject.department_id}
              onChangeText={text =>
                setUpdateProject({...updateProject, department_id: text})
              }
            />
            
            {/* <TextInput
              style={styles.input}
              placeholder="Client ID"
              value={updateProject.client_id}
              onChangeText={text =>
                setUpdateProject({...updateProject, client_id: text})
              }
            /> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginVertical: 20,
              }}>
              <Button
                title="Update"
                onPress={() => handUpdateProject(idProject, updateProject)}
              />
              <Button title="Cancel" onPress={() => setUpdateModal(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={createModal}
        onRequestClose={() => setCreateModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newProject.name}
              onChangeText={text => setNewProject({...newProject, name: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Project Code"
              value={newProject.projectCode}
              onChangeText={text =>
                setNewProject({...newProject, projectCode: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newProject.description}
              onChangeText={text =>
                setNewProject({...newProject, description: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="End Date (YYYY-MM-DD)"
              value={newProject.endAt}
              onChangeText={text => setNewProject({...newProject, endAt: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="Department ID"
              value={newProject.department_id}
              onChangeText={text =>
                setNewProject({...newProject, department_id: text})
              }
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Client ID"
              value={newProject.client_id}
              onChangeText={text =>
                setNewProject({...newProject, client_id: text})
              }
            /> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginVertical: 20,
              }}>
              <Button
                title="Create"
                onPress={() => {
                  handlCreateProject(newProject);
                  setCreateModal(false);
                }}
              />
              <Button title="Cancel" onPress={() => setCreateModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  code: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  daysRemaining: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
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
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
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
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingLeft: 8,
  },
});

export default ListProject;

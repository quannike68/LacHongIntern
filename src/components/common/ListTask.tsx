import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import {createTask, deleteTask} from '../../api/taskApi';
import {getAllProject} from '../../api/projectApi';
import {getDetailUser} from '../../api/userApi';
import {useNavigation} from '@react-navigation/native';

const TaskList = ({data, refreshData}: any) => {
  const navigation: any = useNavigation();

  const [viewDelete, setViewDelete] = useState<any>(false);
  const [createModal, setCreateModal] = useState<any>(false);

  const [dataTask, setDataTask] = useState<any>(data);

  const [newDescription, setNewDescription] = useState<any>({
    description: '',
  });

  const [idPropertyAccoutProject, setIdPropertyAccoutProject] = useState<any>({
    user_property_id: '',
    project_property_id: '',
  });
  console.log(idPropertyAccoutProject.project_property_id);

  const [idTask, setIdTask] = useState<any>({
    id: '',
    name: '',
  });

  const [listProject, setListPlistProject] = useState<any>();

  const createNewTask = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await createTask(
          newDescription,
          idPropertyAccoutProject,
          token,
        );
        if (response) {
          refreshData();
        } else {
          console.log(`Create new task error `);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allProject = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await getAllProject(token);
        if (response) {
          setListPlistProject(response.data.data);
        } else {
          console.log(`Get all Project error `);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailAccount = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await getDetailUser(token);
        if (response) {
          setIdPropertyAccoutProject({
            ...idPropertyAccoutProject,
            user_property_id: response.data.UserProperty?.user_property_id,
          });
        } else {
          console.log(`Get detail account error `);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DepartmentItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() =>
          setIdPropertyAccoutProject({
            ...idPropertyAccoutProject,
            project_property_id: item.ProjectProperty?.project_property_id,
          })
        }>
        <View style={styles.departmentItem}>
          <Text style={styles.departmentText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const deleteTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await deleteTask(idTask.id, token);
        if (response) {
          refreshData();
          console.log(response);
        } else {
          console.log(`Delete Task error `);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TaskItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setIdTask({...idTask, id: item.task_id, name: item.description});
            setViewDelete(true);
          }}>
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={{flexDirection: 'row', width: '70%'}}
              onPress={() =>
                navigation.navigate('ActivityScreen', {
                  idTask: item.task_id,
                })
              }>
              <Text style={styles.itemNo}>{index + 1}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </TouchableOpacity>

            <View
              style={[
                styles.statusIndicator,
                item?.document === 'active'
                  ? styles.active
                  : item?.document === 'pending'
                  ? styles.pending
                  : styles.inactive,
              ]}
            />
          </View>
        </TouchableOpacity>
      );
    },
    [dataTask],
  );

  useEffect(() => {
    getDetailAccount();
  }, []);

  useEffect(() => {
    setDataTask(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item, index}) => <TaskItem item={item} index={index} />}
        keyExtractor={item => item.id}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              allProject();
              setCreateModal(true);
            }}>
            <Text style={styles.addButtonText}>+ Add activity</Text>
          </TouchableOpacity>
        )}
      />
      {/* Modal Create */}
      <Modal
        visible={createModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCreateModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={{width: '100%'}}>
              <Text style={styles.modalText}>Enter Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={newDescription.description}
                onChangeText={text => setNewDescription({description: text})}
              />
            </View>

            <View style={{width: '100%', height: '50%'}}>
              <Text style={styles.modalText}>Enter Project</Text>
              <View style={{paddingHorizontal: 20}}>
                <FlatList
                  data={listProject}
                  renderItem={({item}) => <DepartmentItem item={item} />}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setCreateModal(false)} />
              <Button title="Save" onPress={createNewTask} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={viewDelete}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setViewDelete(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalViews}>
            <Text style={styles.modalText}>
              Do you want to delete task : {idTask.name}
            </Text>
            <View style={styles.buttonContainers}>
              <Button title="Cancel" onPress={() => setViewDelete(false)} />
              <Button
                title="Delete"
                onPress={() => {
                  deleteTasks();
                  setViewDelete(false);
                }}
              />
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
    backgroundColor: '#ffffff',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  itemNo: {
    width: 30,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  itemDescription: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  active: {
    backgroundColor: 'green',
  },
  pending: {
    backgroundColor: 'orange',
  },
  inactive: {
    backgroundColor: 'gray',
  },
  addButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'gray',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    justifyContent: 'space-between',
    height: '60%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViews: {
    justifyContent: 'space-between',
    height: '20%',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginVertical: 10,
    marginTop: 10,
    textAlign: 'left',
    fontSize: 18,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 100,
  },
  buttonContainers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
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
  departmentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  departmentText: {
    fontSize: 16,
    color: '#333',
  },
});

export default TaskList;

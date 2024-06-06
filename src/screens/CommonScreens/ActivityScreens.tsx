import {useNavigation, useRoute} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from 'react-native';
import {getDetailTask} from '../../api/taskApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createActivity, getAllActivityFromTask} from '../../api/activityApi';
import {getDetailUserById} from '../../api/userApi';

const App = () => {
  const route = useRoute();
  const {idTask}: any = route.params;

  const [isModalVisible, setModalVisible] = useState(false);

  const [task, setTask] = useState({
    description: '',
    createdBy: '',
    task_property_id: '',
  });

  const [data, setData] = useState({
    description: '',
    task_property_id: '',
  });

  const [listActivity, setListActivity] = useState();
  console.log(listActivity);

  //   const detailUser = async (id: any) => {
  //     try {
  //       const token = await AsyncStorage.getItem('authorization');
  //       if (token) {
  //         const response: any = await getDetailUserById(token, id);
  //         if (response) {
  //           return response.data;
  //         } else {
  //           console.log(`get detail error `);
  //         }
  //       } else {
  //         console.log(`Token invalid`);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const processData = async (listActivity: any) => {
  //     const descriptionsAndUsers = await Promise.all(
  //       data.map(async item => {
  //         const user = await detailUser(item);
  //         return {
  //           description: item.description,
  //           user: user,
  //         };
  //       }),
  //     );

  //     console.log(descriptionsAndUsers);
  //   };

  //   processData(listActivity);

  const getDetailTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await getDetailTask(idTask, token);
        if (response) {
          setTask({
            ...task,
            description: response.description,
            task_property_id: response.TaskProperty.task_property_id,
          });
          setData({
            ...data,
            task_property_id: response.TaskProperty.task_property_id,
          });
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

  const getAllActivity = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await getAllActivityFromTask(
          data.task_property_id,
          token,
        );
        if (response) {
          setListActivity(response.data);
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

  const createActivitys = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        const response: any = await createActivity(data, token);
        if (response) {
          console.log(response);
        } else {
          console.log(`Create activity error`);
        }
      } else {
        console.log(`Token invalid`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllActivity();
  }, []);
  
  useEffect(() => {
    getDetailTasks();
  }, []);
  const navigation: any = useNavigation();
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.taskDescription}>{item.description}</Text>
        <Text style={styles.taskStaff}>by {item.staff}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon type="font-awesome-5" name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{task.description}</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={listActivity}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Add activity</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>

            <TextInput
              style={styles.input}
              placeholder="Description"
              value={data.description}
              onChangeText={text => setData({...task, description: text})}
            />

            <Button
              title="Save"
              onPress={() => {
                createActivitys(), setModalVisible(!isModalVisible);
              }}
            />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(!isModalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
  },
  taskContainer: {
    paddingVertical: 8,
  },
  taskDescription: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskStaff: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#929CB1',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  addButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addButtonText: {
    fontSize: 16,
    color: '#D32F2F',
  },
  openButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default App;

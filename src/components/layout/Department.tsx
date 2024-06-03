import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';
import {Icon, Button, LinearProgress, ListItem} from '@rneui/themed';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import GetAllProject from '../../utils/GetAllProject';
import getUserDataFromToken from '../../utils/GetUserDataFromToken';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Department() {
  const navigation: any = useNavigation();
  const [IdDepartment, setIdDepartment] = useState('');
  const [maPrj, setMaPrj] = useState<any>({});
  const [modal, setModal] = useState<any>('false');

  const [idDelete, SetIdDelete] = useState('');

  // useEffect(() => {
  //   idDelete
  // } , [SetIdDelete])

  useEffect(() => {
    const fetchUserData = async () => {
      const user: any = await getUserDataFromToken();
      if (user) {
        const getAllprj: any = await GetAllProject(
          user.UserProperty.department_id,
        );
        if (Array.isArray(getAllprj)) {
          setMaPrj(getAllprj);
        }
      }
    };

    fetchUserData();
  }, []);

  const DeleteProject = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');

      const response = await axios.delete(
        `http://localhost:3050/projects/delete/${idDelete}`,
        {
          headers: {
            authorization: token,
          },
        },
      );
      if (response) {
        console.log('delete success');
      } else {
        console.log('error delete');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDaysLeft = (endAt: any) => {
    const endDate: any = new Date(endAt);
    const currentDate: any = new Date();
    const timeDifference = endDate - currentDate;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  const renderItem = ({item}: any) => {
    const taskUnfinished = item.task - item.task_complete;
    const value = taskUnfinished / item.task;

    const time = calculateDaysLeft(item.endAt);

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Do you want to delete?</Text>
              <View style={styles.buttonView}>
                <Button
                  title="Cancel"
                  onPress={() => setModal(false)}
                  color="#2196F3"
                />
                <Button
                  title="Delete"
                  onPress={() => {
                    DeleteProject();
                    setModal(false);
                  }}
                  color="#f44336"
                />
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={styles.project_data}
          onPress={() => {
            navigation.navigate('Project', {projectId: item.project_id});
          }}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 5}}>
                {item.projectCode}
              </Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  type="font-awesome-5"
                  name="users"
                  color={'black'}
                  solid
                  size={20}
                  style={{marginHorizontal: 10}}
                />
                <Text style={{fontSize: 20}}>12</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Button
                  icon={
                    <Icon
                      type="font-awesome-5"
                      name="trash"
                      color={'red'}
                      solid
                      size={20}
                      style={{marginHorizontal: 10}}
                    />
                  }
                  type="clear"
                  onPress={() => {
                    SetIdDelete(item.project_id);
                    setModal(true);
                  }}
                />
              </View>
            </View>
            <Text style={{marginBottom: 5}}>Nguyễn Văn Diệp</Text>
            <Text
              style={{
                marginBottom: 5,
                fontSize: 20,
                fontWeight: 'bold',
                color:
                  time <= 7
                    ? 'rgba(243, 60, 60, 1)'
                    : item.days <= 14
                    ? 'rgba(228, 129, 38, 1)'
                    : 'rgba(22, 159, 40, 1)',
              }}>
              {time}
            </Text>
            <LinearProgress
              value={value}
              animation={{duration: 1000}}
              style={{height: 15, borderRadius: 15}}
              color={
                value <= 0.3
                  ? 'rgba(243, 60, 60, 1)'
                  : value <= 0.6
                  ? 'rgba(228, 129, 38, 1)'
                  : 'rgba(22, 159, 40, 1)'
              }
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const currentTime = moment();

  return (
    <View>
      <FlatList
        data={maPrj}
        renderItem={renderItem}
        keyExtractor={item => item.project_id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  project_data: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

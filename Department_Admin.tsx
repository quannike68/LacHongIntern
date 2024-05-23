import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import DepartmentItem from '../components/DepartmentItem';
import {FAB} from '@rneui/themed';
import Iconn from '../components/Iconn';
import Add_Department_Modal from './Add_Department_Modal';

const Department_Admin = ({navigation}: any) => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      department_name: 'APPLICATION DEVELOPMENT DEPARTMENT',
      manager_name: 'Van Diep Doan',
      avatar: require('../assets/image/avatar.png'),
      number_of_staffs: 20,
    },
    {
      id: 2,
      department_name: 'INFORMATION SECURITY DEPARTMENT',
      manager_name: 'Tung Hoang',
      avatar: require('../assets/image/avatar.png'),
      number_of_staffs: 7,
    },
    {
      id: 3,
      department_name: 'NETWORK INFRASTRUCTURE DEPARTMENT',
      manager_name: 'Manh Truong Nguyen',
      avatar: require('../assets/image/avatar.png'),
      number_of_staffs: 2,
    },
    {
      id: 4,
      department_name: 'INSURANCE DEPARTMENT',
      manager_name: 'Duc Pham',
      avatar: require('../assets/image/avatar.png'),
      number_of_staffs: 4,
    },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const tonggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addDeparment = (newDeparment: {
    department_name: string;
    description: string;
  }) => {
    setDepartments(prevDepartments => [
      ...prevDepartments,
      {
        ...newDeparment,
        id: prevDepartments.length + 1,
        avatar: require('../assets/image/avatar.png'),
        manager_name: '',
        number_of_staffs: 0,
      },
    ]);
  };
  const deleteDepartment = (id: number) => {
    setDepartments(prevDepartments =>
      prevDepartments.filter(department => department.id !== id),
    );
  };

  const renderItem = (itemData: {
    item: {
      id: number;
      department_name: string;
      manager_name: string;
      avatar: any;
      number_of_staffs: number;
    };
  }) => {
    const pressHandler = () => {
      navigation.navigate('DepartmentDetail', {
        DepartmentName: itemData.item.department_name,
      });
    };

    const handleDelete = () => {
      deleteDepartment(itemData.item.id);
    };

    return (
      <DepartmentItem
        department_name={itemData.item.department_name}
        avatar={itemData.item.avatar}
        manager_name={itemData.item.manager_name}
        number_of_Staff={itemData.item.number_of_staffs}
        onPress={pressHandler}
        onDelete={handleDelete}
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Iconn
            name="person"
            size={40}
            color={'#929CB1'}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerText}>Van Diep Tran</Text>
            <Text
              style={[
                styles.headerText,
                {color: '#929CB1', fontStyle: 'italic'},
              ]}>
              ADMIN
            </Text>
          </View>
          <Iconn
            name="logout"
            size={40}
            color={'#929CB1'}
            style={styles.headerLogout}
          />
        </View>
        <View style={styles.explainContainer}>
          <Text style={styles.explainText}>Department</Text>
        </View>
        <FlatList
          data={departments}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
        <FAB
          visible={true}
          icon={{name: 'add'}}
          placement="right"
          color="white"
          size="small"
          onPress={tonggleModal}
        />
      </View>
      <Add_Department_Modal
        isVisible={isModalVisible}
        onClose={tonggleModal}
        onAdd={addDeparment}
      />
    </>
  );
};

export default Department_Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#E9F7FB',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 4,
  },
  headerAvatar: {
    marginRight: 20,
    overflow: 'hidden',
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerLogout: {
    marginLeft: 150,
  },
  explainContainer: {
    backgroundColor: '#929CB1',
    borderRadius: 15,
    padding: 8,
    elevation: 4,
    marginTop: 10,
    marginHorizontal: 32,
  },
  explainText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  department_name: {
    fontWeight: 'bold',
    color: '#929CB1',
    fontSize: 18,
    textAlign: 'center',
  },
  icon: {
    justifyContent: 'flex-end',
  },
});

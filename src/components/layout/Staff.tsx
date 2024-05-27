import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import getUserDataFromToken from '../../utils/GetUserDataFromToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const ListComponent = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState([]);


  useEffect(() =>{
        const getAllUserDepartment = async () =>{
            const inforUser = await getUserDataFromToken();
            const idDepartment =await inforUser.UserProperty.department_id;
            const token = await AsyncStorage.getItem('authorization');
            if(idDepartment && token ){
                    const response  = await axios.get(`http://localhost:3050/users/admin/getAllStaffInDepartment/${idDepartment}` , {
                        headers:{
                            authorization: token,
                        }})
                        if (response) {
                            setFormData(response.data.data.users)
                            
                        }
                    
            }
        }
        
        
        getAllUserDepartment();
  },[])

  const renderItem = ({ item } : any) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.text}>{item.username}</Text>
      {/* <Text style={styles.text}>{item.role}</Text>
      <Text style={styles.text}>{item.department}</Text> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        
      <FlatList
        data={formData}
        renderItem={renderItem}
        keyExtractor={item => item.user_id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          {selectedItem && (
            <View>
              <Text style={styles.modalText}>Name: {selectedItem.username}</Text>
              <Text style={styles.modalText}>Role: {selectedItem.role}</Text>
              <Text style={styles.modalText}>Department: {selectedItem.department}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    marginHorizontal : 20
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom : 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  text: {
    flex: 1,
    fontSize: 16
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default ListComponent;

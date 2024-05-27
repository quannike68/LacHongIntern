import {Icon, Button, LinearProgress, ListItem} from '@rneui/themed';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Department from '../components/layout/Department';
import NavButton from '../components/layout/NavButton';
import Staff from '../components/layout/Staff';
import Information from '../components/layout/Information';
import axios from 'axios';
import getUserDataFromToken from '../utils/GetUserDataFromToken';


export default function Departments() {
  const [titleBtn, setTitleBtn] = useState('Project');
  const [modal, setModal] = useState<any>(false);
  const [modalStaff, setModalStaff] = useState<any>(false);

  const navigation: any = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    projectCode: '',
    description: '',
    endAt: '',
    department_id: ''
  });

  const [formDataInput, setFormDataInput] = useState({
    username: '',
    email: '',
    password: '',
    role_id: '',
    department_id: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
     const inforUser = await getUserDataFromToken();
     
      const idDepartment = inforUser.UserProperty.department_id;
      if(idDepartment){
        setFormData(prevFormData => ({
          ...prevFormData,
          department_id: idDepartment
        }));
        setFormDataInput(prevFormData => ({
          ...prevFormData,
          role_id: inforUser.UserProperty.role.role_id,
          department_id: idDepartment
        }));
      }
      }

    fetchUserData();
  }, []);
     

  const handleInputChange = (name: any, value : any) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleInputChanges = (name : any, value : any) => {
    setFormDataInput({...formDataInput, [name]: value});
  };

  const handleCreateProject = async () =>{
    try {
      const token = await AsyncStorage.getItem('authorization');

     if (token ) {
      const createProject = await axios.post('http://localhost:3050/projects/create' , formData,
      { 
        headers: {
        authorization: token,
      },
    })
    if(createProject){
      setModal(!modal)
      console.log('succsess');
    }else{
      console.log('create project false');
      
    }
    }else{
      console.log('Department not found');
      
    }
 
    } catch (error) {
      console.log('Error getting data from token');
      
    }
  }

    const createData = async() => {
      try {
        const token = await AsyncStorage.getItem('authorization');
        if(token){
          const response = await axios.post(`http://localhost:3050/users/create` , formDataInput ,{
            headers : {
              authorization: token,
            }
          },)
          if(response){
            setModalStaff(false)
            console.log('create user succsess');
            
          }
        }else{
          console.log('token not found');
          
        }
      } catch (error) {
        console.log(error);
        
      }
    }

  

  return (
    <View style={{backgroundColor: 'white', height: '100%', flex: 1}}>
           <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Project Information</Text>
            
            <TextInput
              style={styles.input}
              onChangeText={value => handleInputChange('name', value)}
              value={formData.name}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={value => handleInputChange('projectCode', value)}
              value={formData.projectCode}
              placeholder="Project Code"
            />
            <TextInput
              style={styles.input}
              onChangeText={value => handleInputChange('description', value)}
              value={formData.description}
              placeholder="Description"
            />
            <TextInput
              style={styles.input}
              onChangeText={value => handleInputChange('endAt', value)}
              value={formData.endAt}
              placeholder="End At"
            />
            <TextInput
              style={styles.input}
              onChangeText={value => handleInputChange('department_id', value)}
              value={formData.department_id}
              placeholder="Department ID"
            />
            
            <Button
              title="Save"
              onPress={handleCreateProject}
            />
            <Button
              title="Close"
              onPress={() => setModal(!modal)}
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalStaff}
        onRequestClose={() => {
          setModalStaff(!modalStaff);
        }}
      >
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChanges('username', value)}
            value={formDataInput.username}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChanges('email', value)}
            value={formDataInput.email}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChanges('password', value)}
            value={formDataInput.password}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChanges('role_id', value)}
            value={formDataInput.role_id}
            placeholder="Role ID"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChanges('department_id', value)}
            value={formDataInput.department_id}
            placeholder="Department ID"
          />
          <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={() => setModalStaff(false)} />
          <Button title="Save" onPress={() => createData()} />
          
          </View>
          
        </View>
        </View>

      </Modal>
      <View
        style={{
          position: 'absolute',
          top: '85%',
          zIndex: 1,
          right: 10,
          borderRadius: 50,
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 4,
        }}>
          {titleBtn == "Project"  && (
        <Button
          icon={<Icon type="feather" name="plus" color={'black'} size={30} />}
          type="clear"
          buttonStyle={{
            backgroundColor: 'white',
            width: 55,
            height: 55,

            borderRadius: 50,
          }}
          onPress={() => {
            setModal(true);
            
          }}
        />
        )}

        {titleBtn == "Staff"  && (
        <Button
          icon={<Icon type="feather" name="plus" color={'black'} size={30} />}
          type="clear"
          buttonStyle={{
            backgroundColor: 'white',
            width: 55,
            height: 55,

            borderRadius: 50,
          }}
          onPress={() => {
            setModalStaff(true);
            
          }}
        />
        )}
      </View>

      <View style={{flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#929CB1',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            APPLICATION DEVELOPMENT
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#929CB1'}}>
            DEPARTMENT
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              color: '#929CB1',
              width: '80%',
            }}>
            The department's main task is to develop applications to serve the
            project including mobile applications and web applications
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            width: '100%',
            height: 70,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: 'white',
              width: '90%',
              height: '100%',
              borderRadius: 40,
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 8,
            }}>
            <Button
              title={'Project'}
              titleStyle={{
                color: titleBtn == 'Project' ? 'white' : 'rgba(0, 0, 0, 0.59)',
              }}
              buttonStyle={{
                backgroundColor:
                  titleBtn == 'Project' ? '#1D61AE' : 'transparent',
                borderRadius: 40,
                width: 100,
                height: 50,
              }}
              onPress={() => {
                setTitleBtn('Project');
              }}
            />
            <Button
              title={'Information'}
              titleStyle={{
                color: titleBtn == 'Infor' ? 'white' : 'rgba(0, 0, 0, 0.59)',
              }}
              buttonStyle={{
                backgroundColor:
                  titleBtn == 'Infor' ? '#1D61AE' : 'transparent',
                borderRadius: 40,
                width: 100,
                height: 50,
              }}
              onPress={() => {
                setTitleBtn('Infor');
              }}
            />
            <Button
              title={'Staff'}
              titleStyle={{
                color: titleBtn == 'Staff' ? 'white' : 'rgba(0, 0, 0, 0.59)',
              }}
              buttonStyle={{
                backgroundColor:
                  titleBtn == 'Staff' ? '#1D61AE' : 'transparent',
                borderRadius: 40,
                width: 100,
                height: 50,
              }}
              onPress={() => {
                setTitleBtn('Staff');
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 2.5,
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.35,
          shadowRadius: 8,
          elevation: 6,
        }}>
        {titleBtn == 'Project' && <Department />}
        {titleBtn == 'Infor' && <Information />}
        {titleBtn == 'Staff' && <Staff />}
      </View>

      <View
        style={{
          zIndex: 1,
          shadowOffset: {width: 1, height: 1},
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 6,
        }}>
        <NavButton />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width : '80%',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    width: 200,
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%' ,
    justifyContent: 'space-between'
  },
});
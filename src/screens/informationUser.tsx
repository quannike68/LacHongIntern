import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {Icon, Button, LinearProgress, ListItem} from '@rneui/themed';
import NavButton from '../components/layout/NavButton';
import getUserDataFromToken from '../utils/GetUserDataFromToken';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const informationUser = () => {

const navigation : any = useNavigation()

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const setModal = () => {
    setModalVisible(true);
  }
  

  useEffect(() => {
    const InforUser = async () => {
      const User = await getUserDataFromToken();
      if (User) {
        setUsername(User.username);
        setEmail(User.email);
        setPhone(User.phone);
        setBirthday(User.birthday);
        setRole(User.UserProperty.role.name)

        
      }
    };
    InforUser();
  }, []);

  const handleUpdateInforUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authorization');
      const User = await getUserDataFromToken();
      if(token && User){
      const update = await axios.put(`http://localhost:3050/users/update`, {

        username: username || User.username ,
        email: User.email,
        phone: phone || User.phone,
        birthday: birthday || User.birthday,
      } , { 
        headers: {
        authorization: token,
      },
    }
    
    );
      if (update) {
        console.log(`Update ${username} succsess`);
      } else {
        console.log('Update false');
      }}
    } catch (error) {
      console.log(`Server error : ${error}`);
    }
  };


  const handleChangePassword = async () =>{
    
      try {
        const token = await AsyncStorage.getItem('authorization');
        const User = await getUserDataFromToken();
        if(token && User ){
        const update = await axios.put(`http://localhost:3050/users/change-password`, {
          email: User.email,
          password : password ,
        } , { 
          headers: {
          authorization: token,
        },
      }
      
      );
        if (update) {
          console.log(`Update password succsess`);
        } else {
          console.log('Update password false');
        }}
      } catch (error) {
        console.log(`Server error : ${error}`);
      }
    
  }

const Logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    navigation.navigate('Login');
  };

  return (
    <View style={{backgroundColor: '#CFDFE4', flex: 1}}>
          <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
            
          <View style={styles.modalView}>
              <Button
              icon = {<Icon type="font-awesome-5" name="times" color={'rgba(216, 73, 73, 1)'} size={30} />}
              type='clear'
              onPress={() => setModalVisible(!modalVisible)}
              />
            <View style={styles.bodyModal}>
              <View>
                <Text style = {{fontSize : 25}}>Nhập mật khẩu mới</Text>
                 <TextInput
              style={{
                height: 40,
                width: '100%',
                padding: 10,
                borderRadius: 15,
                backgroundColor: 'white',
                marginVertical: 10,
              }}
              
              onChangeText={password => setPassword(password)}
              value={password}
              placeholder={password}
              secureTextEntry = {true}
              keyboardType="default"
            />
              </View>
             <View style ={{alignItems : 'flex-end'}}>
             <Button
              title={'Đổ mật khẩu'}
              titleStyle={{color : 'black' , margin : 10}} 
              buttonStyle = {{borderRadius : 15}}
              onPress={() => handleChangePassword()}
              />
             </View>
           </View>

          </View>
        </View>
      </Modal>
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Icon
            type="font-awesome-5"
            name="user"
            color={'black'}
            solid
            size={40}
            style={{marginHorizontal: 30}}
          />
          <View>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>
              {username}
            </Text>
            <Text style={{fontSize: 20}}>{role}</Text>
          </View>
        </View>

        <View style={{margin: 30, borderBottomWidth: 1}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 20}}>
            Profile
          </Text>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 20}}>Full name</Text>
            <TextInput
              style={{
                height: 40,
                width: '100%',
                padding: 10,
                borderRadius: 15,
                backgroundColor: 'white',
                marginVertical: 10,
              }}
              onChangeText={username => setUsername(username)}
              value={username}
              placeholder={username}
              keyboardType="default"
            />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 20}}>Email</Text>
            <TextInput
              style={{
                height: 40,
                width: '100%',
                padding: 10,
                borderRadius: 15,
                backgroundColor: 'white',
                marginVertical: 10,
              }}
              onChangeText={email => setEmail(email)}
              value={email}
              placeholder={email}
              keyboardType="default"
            />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 20}}>Phone number</Text>
            <TextInput
              style={{
                height: 40,
                width: '100%',
                padding: 10,
                borderRadius: 15,
                backgroundColor: 'white',
                marginVertical: 10,
              }}
              onChangeText={phone => setPhone(phone)}
              value={phone}
              placeholder={phone}
              keyboardType="default"
            />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 20}}>Birthday</Text>
            <TextInput
              style={{
                height: 40,
                width: '100%',
                padding: 10,
                borderRadius: 15,
                backgroundColor: 'white',
                marginVertical: 10,
                
              }}
              onChangeText={birthday => setBirthday(birthday)}
              value={birthday}
              placeholder={birthday}
              keyboardType="default"
            />
          </View>
          <View style={{width: '100%', alignItems: 'flex-end'}}>
            <Button
              title={'Update now'}
              titleStyle={{fontWeight: 'bold'}}
              buttonStyle={{
                height: 50,
                width: 150,
                borderRadius: 30,
                marginVertical: 10,
              }}
              onPress={() => handleUpdateInforUser()}
            />
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 30,
            paddingBottom: 30,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity onPress={() => setModal()}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                textDecorationLine: 'underline',
              }}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: 30,
            paddingVertical: 30,
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => Logout()}
            >
            <Icon
              type="font-awesome-5"
              name="sign-out-alt"
              color={'red'}
              size={35}
              style={{marginHorizontal: 10}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'red'}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <NavButton />
      </View>
    </View>
  );
};

export default informationUser;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor : 'rgba(0, 0, 0, 0.42)'
  },
  modalView: {
    margin: 20,
    height: 300,
    width : 400,
    backgroundColor: 'rgba(214, 214, 214, 1)',
    borderRadius: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    padding : 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bodyModal : {
    height : "80%",
    width : '100%',
    padding :15,
    justifyContent : "space-between"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
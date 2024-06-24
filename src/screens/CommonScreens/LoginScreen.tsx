import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../api/defineAPI';
import {showToastMessage} from '../../components/common/ToastMessageCustom';
import {SafeAreaView} from 'react-native';

import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

export default function Login() {
  const navigation: any = useNavigation();
  const [username, setUsername] = useState('quannike68@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = async () => {
    try {
      const data = {
        email: username,
        password: password,
      };
      const response = await axiosInstance.post('/gateway/api/access/login', {
        email: username,
        password: password,
      });
      if (response.data.status == 200 && response.data) {
        await AsyncStorage.setItem(
          'authorization',
          response.data.data.tokens.accessToken,
        );
        await AsyncStorage.setItem('role', response.data.data.role);
        const Role = await AsyncStorage.getItem('role');
        if (Role == 'ADMIN') {
          navigation.navigate('HomeAdminNavigate');
        } else if (Role == 'MANAGER') {
          navigation.navigate('ReportDepartment');
        } else {
          navigation.navigate('ReportDepartment');
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login false',
          text2: 'Tai khoản mật khẩu không chính xác',
          autoHide: true,
          visibilityTime: 2500,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login false',
        text2: 'Network Error',
        autoHide: true,
        visibilityTime: 2500,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require('../../assets/imgLogin/Logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.middle}>
        <View>
          <Image
            source={require('../../assets/imgLogin/Text-logo.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={text => setUsername(text)}
              value={username}
              placeholder="Tên đăng nhập"
              keyboardType="default"
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={password => setPassword(password)}
              value={password}
              placeholder="Mật khẩu"
              keyboardType="default"
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>

      {/* View chứa nút Đăng Nhập */}
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Đăng Nhập</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.forget_password}
        onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forget_password_text}>Quên mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  middle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  bottom: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  image: {
    width: 200,
  },
  button: {
    backgroundColor: 'rgba(29, 97, 174, 1)',
    paddingHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 15,
  },
  text: {
    color: 'white',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'black',
    borderRadius: 15,
  },
  forget_password: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  forget_password_text: {
    textDecorationLine: 'underline',
    fontSize: 15,
    color: 'rgba(29, 97, 174, 1)',
  },
});

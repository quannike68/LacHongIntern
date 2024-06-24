import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {forgetPassword} from '../../api/userApi';
import Toast from 'react-native-toast-message';
import {Icon} from '@rneui/themed';

const ForgetPassword = () => {
  const [data, setdata] = useState<any>({
    email: '',
    token: '',
  });
  const navigation: any = useNavigation();
  const [body, setbody] = useState(false);

  const handleForgetPassword = async () => {
    try {
      if (!data.email) {
        Toast.show({
          type: 'error',
          text1: 'Email error',
          text2: 'Chưa hập nội dung email',
          autoHide: true,
          visibilityTime: 2500,
        });
      } else {
        const response = await forgetPassword(data);
        console.log(response);
        if (response.status == 200) {
          Toast.show({
            type: 'success',
            text1: 'Vui lòng kiểm tra email của bạn',
            autoHide: true,
            visibilityTime: 2500,
          });
          setbody(true);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Email error',
            text2: 'Email không tồn tại',
            autoHide: true,
            visibilityTime: 2500,
          });
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        autoHide: true,
        visibilityTime: 2500,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttomBack}
        onPress={() => navigation.goBack()}>
        <Icon type="ionicon" name="arrow-back-outline" size={35} />
      </TouchableOpacity>

      {body == false ? (
        <View style={styles.body}>
          <Text style={styles.title}>Nhập email của bạn</Text>
          <TextInput
            style={styles.input}
            placeholder="VD: abc@gmail.com"
            value={data.email}
            onChangeText={text => {
              setdata({...data, email: text});
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleForgetPassword}>
            <Text style={styles.buttonText}>Gửi OTP</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.body}>
          <Text style={styles.title}>Nhập mã OTP</Text>
          <TextInput
            style={styles.input}
            value={data.email}
            onChangeText={text => {
              setdata({...data, email: text});
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={data.token}
            onChangeText={text => {
              setdata({...data, token: text});
            }}
            keyboardType="number-pad"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Xác thực OTP</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'rgba(29, 97, 174, 1)',
    paddingHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttomBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 15,
  },
});

export default ForgetPassword;

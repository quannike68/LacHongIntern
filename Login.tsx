import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Login({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Thông báo', 'Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require('../assets/image/Logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.middle}>
        <View>
          <Image
            source={require('../assets/image/Text-logo.png')}
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
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Mật khẩu"
              keyboardType="default"
              secureTextEntry={true}
            />
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <Pressable style={styles.buttom} onPress={handleLogin}>
          <Text style={styles.text}>Đăng Nhập</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  top: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  image: {
    width: 200,
  },
  buttom: {
    backgroundColor: 'rgba(29, 97, 174, 1)',
    paddingHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 15,
  },
  text: {color: 'white'},
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'black',
    borderRadius: 15,
  },
});

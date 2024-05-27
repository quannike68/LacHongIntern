import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Login() {
    const navigation:any = useNavigation();
    const [username, setUsername] = useState('quannikess@gmail.com');
    const [password , setPassword] = useState('123456');
    const [role , setRole] = useState('')

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3050/gateway/api/access/login' , {
                email:username,
                password:password,
            });
            if(response.data.status == 200 && response.data){

                await AsyncStorage.setItem('authorization' , response.data.data.tokens.accessToken)
                const accessToken = await AsyncStorage.getItem('authorization');
                console.log('authorization:', accessToken);
                
                if(response.data.data.role == 'ADMIN'){
                    navigation.navigate('HomeStaffManager')
                }
                if(response.data.data.role == 'STAFF' || response.data.data.role == 'MANAGER' ){
                    navigation.navigate('HomeStaffManager')
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.top}>
                <Image source={require('../assets/img/Logo.png')} style={styles.logoImage} resizeMode="contain" />
            </View>

            
            <View style={styles.middle}>
                <View >
                    <Image source={require('../assets/img/Text-logo.png')} style={styles.image} resizeMode="contain" />
                </View>
                <View >
                <View>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setUsername(text)}
                    value= {username}
                    placeholder="Tên đăng nhập"
                    keyboardType="default"
                />
                </View>
                <View>
                <TextInput
                    style={styles.input}
                    onChangeText={password => setPassword(password)}
                    value= {password}
                    placeholder="Mật khẩu"
                    keyboardType="default"
                    secureTextEntry = {true}
                />
                </View>
                </View>
            </View>

            {/* View chứa nút Đăng Nhập */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.buttom} onPress={handleLogin}>
                    <Text style = {styles.text}>Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    top: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        paddingHorizontal : 20
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
        height: 100 
    },
    image: {
        width: 200 
    },
    buttom: {
        backgroundColor: 'rgba(29, 97, 174, 1)',
        paddingHorizontal : 80,
        paddingVertical : 15,
        borderRadius: 15,
        
    },
    text :{color: 'white'},
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

import {Icon} from '@rneui/themed';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminHeader = ({data}: any) => {
  const navigation: any = useNavigation();

  //Hàm đăng xuẩt
  const Logout = async () => {
    await AsyncStorage.removeItem('authorization');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity
          style={{width: '50%'}}
          onPress={() => navigation.navigate('ProfileScreen')}>
          <View style={styles.userHeader}>
            <Icon type="font-awesome-5" name="user" color={'black'} size={35} />
            <View style={styles.textContainer}>
              <Text style={styles.adminName}>{data.username}</Text>
              <Text style={styles.adminRole}>{data.role}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.shareIconContainer}>
          <TouchableOpacity onPress={Logout}>
            <Icon
              type="font-awesome-5"
              name="sign-out-alt"
              color={'black'}
              size={35}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 16,
    backgroundColor: '#ffffff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  userHeader: {
    width: '100%',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  adminName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adminRole: {
    fontSize: 14,
    color: '#6c757d',
  },
  shareIconContainer: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});

export default AdminHeader;

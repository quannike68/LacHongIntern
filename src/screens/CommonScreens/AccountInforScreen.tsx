import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

const ProfileScreen = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            type="font-awesome-5"
            name="arrow-left"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.headerUser}>
          <View
            style={{
              marginHorizontal: 10,
              padding: 10,
              height: 50,
              width: 50,
              borderWidth: 1,
              borderColor: '#00000',
              borderRadius: 30,
            }}>
            <Icon type="font-awesome-5" name="user" size={24} color="black" />
          </View>
          <View>
            <Text style={styles.profileName}>Trần Hán Quân</Text>
            <Text style={styles.profileRole}>Role</Text>
          </View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Profile</Text>
      <View style={styles.inputContainer}>
        <ScrollView>
          <Text style={styles.label}>Full name</Text>
          <TextInput style={styles.input} value="Trần Hán Quân" />
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value="email@gmail.com" />
          <Text style={styles.label}>Phone number</Text>
          <TextInput style={styles.input} value="0123456789" />
          <Text style={styles.label}>Birthday</Text>
          <TextInput style={styles.input} value="01/01/2001" />
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity>
        <Text style={styles.changePasswordText}>Change Password</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.logoutContainer}>
        <Icon type="font-awesome-5" name="sign-out-alt" size={24} color="red" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerUser: {
    flexDirection: 'row',
  },
  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileRole: {
    fontSize: 18,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
  changePasswordText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;

import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  ScrollView,
} from 'react-native';

const Account_Detail = ({route}: any) => {
  const {avatar, fullname, role, username, email, phonenumber, birthday} =
    route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={avatar ? {uri: avatar} : require('../assets/image/avatar.png')}
      />
      <Text style={styles.textFullName}>{fullname}</Text>
      <Text style={styles.textRole}>{role}</Text>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textProfile}>Username</Text>
            <TextInput style={styles.textInputContainer} editable={false}>
              <Text style={styles.textInput}>{username}</Text>
            </TextInput>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textProfile}>Email</Text>
            <TextInput style={styles.textInputContainer} editable={false}>
              <Text style={styles.textInput}>{email}</Text>
            </TextInput>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textProfile}>Phone Number</Text>
            <TextInput style={styles.textInputContainer} editable={false}>
              <Text style={styles.textInput}>{phonenumber}</Text>
            </TextInput>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textProfile}>Birthday</Text>
            <TextInput style={styles.textInputContainer} editable={false}>
              <Text style={styles.textInput}>{birthday}</Text>
            </TextInput>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Account_Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#3F6F7E',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 20,
  },
  textFullName: {
    marginTop: 10,
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textRole: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  profileContainer: {
    flex: 1,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 4,
    padding: 15,
    width: '90%',
  },
  textContainer: {
    marginTop: 10,
  },
  textProfile: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  textInputContainer: {
    backgroundColor: '#F1F1F1',
    borderRadius: 17,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  textInput: {
    fontSize: 20,
    paddingVertical: 8,
  },
});

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';

const ProfileStaffScreen = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const {idUser}: any = router.params;

  console.log(idUser);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" type="feather" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View
          style={{
            padding: 10,
            height: 150,
            width: 150,
            borderWidth: 1,
            borderColor: '#00000',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon type="font-awesome-5" name="user" size={70} color="black" />
        </View>
        <Text style={styles.profileName}>Trần Văn Diệp</Text>
        <Text style={styles.profileRole}>Technical department management</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value="email@gmail.com"
          editable={false}
        />
        <Text style={styles.label}>Phone number</Text>
        <TextInput style={styles.input} value="0123456789" editable={false} />
        <Text style={styles.label}>Birthday</Text>
        <TextInput style={styles.input} value="11/9/1998" editable={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42687e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#42687e',
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  profileRole: {
    fontSize: 16,
    color: 'white',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: '#6c757d',
  },
});

export default ProfileStaffScreen;

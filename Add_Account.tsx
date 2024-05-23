import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Icon} from '@rneui/themed';
import {Picker} from '@react-native-picker/picker';

const Add_Account = ({
  isVisible,
  onClose,
  onAdd,
}: {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (newAccount: {
    avatar: string;
    fullname: string;
    description: string;
    role: string;
    department: string;
    username: string;
    email: string;
    phonenumber: string;
    birthday: string;
  }) => void;
}) => {
  const [newAccount, setNewAccount] = useState({
    avatar: '',
    fullname: '',
    description: '',
    role: '',
    department: '',
    username: '',
    email: '',
    phonenumber: '',
    birthday: '',
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (date: Date) => {
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
    setNewAccount({...newAccount, birthday: formattedDate});
    hideDatePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleAddAccount = () => {
    onAdd(newAccount);
    onClose();
    setNewAccount({
      avatar: '',
      fullname: '',
      description: '',
      role: '',
      department: '',
      username: '',
      email: '',
      phonenumber: '',
      birthday: '',
    });
  };

  const pickImage = () => {
    launchImageLibrary(
      {mediaType: 'photo', includeBase64: false, maxHeight: 200, maxWidth: 200},
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const source: string = response.assets[0].uri || '';
          setNewAccount({...newAccount, avatar: source});
        }
      },
    );
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add New Staff</Text>
        <View style={styles.avatarContainer}>
          <Pressable onPress={pickImage}>
            {newAccount.avatar ? (
              <Image source={{uri: newAccount.avatar}} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="camera-alt" size={30} color="#ccc" />
              </View>
            )}
          </Pressable>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={newAccount.fullname}
          onChangeText={text => setNewAccount({...newAccount, fullname: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newAccount.description}
          onChangeText={text =>
            setNewAccount({...newAccount, description: text})
          }
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={newAccount.role}
            style={styles.picker}
            onValueChange={itemValue =>
              setNewAccount({...newAccount, role: itemValue})
            }>
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Manager" value="Manager" />
            <Picker.Item label="Staff" value="Staff" />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={newAccount.department}
            style={styles.picker}
            onValueChange={itemValue =>
              setNewAccount({...newAccount, department: itemValue})
            }>
            <Picker.Item label="Select Department" value="" />
            <Picker.Item label="Technique" value="Technique" />
            <Picker.Item label="Marketing" value="Marketing" />
          </Picker>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={newAccount.username}
          onChangeText={text => setNewAccount({...newAccount, username: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newAccount.email}
          onChangeText={text => setNewAccount({...newAccount, email: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Phonenumber"
          value={newAccount.phonenumber}
          onChangeText={text =>
            setNewAccount({...newAccount, phonenumber: text})
          }
        />
        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.input, styles.birthdayInput]}
            placeholder="Birthday (dd/mm/yyyy)"
            value={newAccount.birthday}
            editable={false}
          />
          <Pressable onPress={showDatePicker} style={styles.iconContainer}>
            <Icon name="date-range" size={24} color="black" />
          </Pressable>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.modalButtonContainer}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.addButton]}
            onPress={handleAddAccount}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default Add_Account;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  birthdayInput: {
    flex: 1,
  },
  iconContainer: {
    padding: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: 'blue',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    marginTop: 10,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: 'black',
  },
});

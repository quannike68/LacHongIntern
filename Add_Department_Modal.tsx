import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

const Add_Department_Modal = ({
  isVisible,
  onClose,
  onAdd,
}: {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (newDepartment: any) => void;
}) => {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (departmentName && description) {
      onAdd({department_name: departmentName, description});
      setDepartmentName('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add New Department</Text>
        <TextInput
          style={styles.inputName}
          placeholder="Department Name"
          value={departmentName}
          onChangeText={setDepartmentName}
        />
        <TextInput
          style={styles.inputDescription}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
        />
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.addButton]}
            onPress={handleAdd}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default Add_Department_Modal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputName: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputDescription: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
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
});

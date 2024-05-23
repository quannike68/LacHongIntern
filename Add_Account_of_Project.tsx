import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Modal, Pressable} from 'react-native';

const Add_Account_of_Project = ({
  visible,
  onClose,
  onSelect,
  staffList,
}: any) => {
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    if (selectedStaff.includes(id)) {
      setSelectedStaff(selectedStaff.filter(item => item !== id));
    } else {
      setSelectedStaff([...selectedStaff, id]);
    }
  };

  const handleSelect = () => {
    onSelect(selectedStaff);
    setSelectedStaff([]);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Select Staff</Text>
        <FlatList
          data={staffList}
          renderItem={({item}) => (
            <Pressable
              onPress={() => toggleSelection(item.id)}
              style={[
                styles.staffItem,
                selectedStaff.includes(item.id) && styles.selectedItem,
              ]}>
              <Text style={styles.staffName}>{item.name}</Text>
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
        <Pressable style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={styles.addButton}
          onPress={handleSelect}
          disabled={selectedStaff.length === 0}>
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

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
  staffItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: 'lightblue',
  },
  staffName: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Add_Account_of_Project;

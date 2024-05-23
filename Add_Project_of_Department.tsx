import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Icon} from '@rneui/themed';

const Add_Project_of_Department = ({
  isVisible,
  onClose,
  onAdd,
}: {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (newProject: {
    project_code: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    manager: string;
  }) => void;
}) => {
  const [newProject, setNewProject] = useState({
    project_code: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    manager: '',
  });

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleStartDateConfirm = (date: Date) => {
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
    setNewProject({...newProject, startDate: formattedDate});
    setStartDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (date: Date) => {
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
    setNewProject({...newProject, endDate: formattedDate});
    setEndDatePickerVisibility(false);
  };

  const handleManagerSelection = (manager: any) => {
    setSelectedManager(manager);
    setNewProject({...newProject, manager: manager.name});
    setShowManagerModal(false);
  };

  const handleAddProject = () => {
    onAdd(newProject);
    onClose();
    setNewProject({
      project_code: '',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      manager: '',
    });
    setSelectedManager(null);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add New Project</Text>
        <TextInput
          style={styles.input}
          placeholder="Project Code"
          value={newProject.project_code}
          onChangeText={text =>
            setNewProject({...newProject, project_code: text})
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={newProject.name}
          onChangeText={text => setNewProject({...newProject, name: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newProject.description}
          onChangeText={text =>
            setNewProject({...newProject, description: text})
          }
        />
        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder="Start Date (dd/mm/yyyy)"
            value={newProject.startDate}
            editable={false}
          />
          <Pressable
            onPress={() => setStartDatePickerVisibility(true)}
            style={styles.iconContainer}>
            <Icon name="date-range" size={24} color="black" />
          </Pressable>
        </View>
        <DateTimePickerModal
          isVisible={isStartDatePickerVisible}
          mode="date"
          onConfirm={handleStartDateConfirm}
          onCancel={() => setStartDatePickerVisibility(false)}
        />
        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder="End Date (dd/mm/yyyy)"
            value={newProject.endDate}
            editable={false}
          />
          <Pressable
            onPress={() => setEndDatePickerVisibility(true)}
            style={styles.iconContainer}>
            <Icon name="date-range" size={24} color="black" />
          </Pressable>
        </View>
        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={handleEndDateConfirm}
          onCancel={() => setEndDatePickerVisibility(false)}
        />
        <View style={styles.input}>
          <Pressable onPress={() => setShowManagerModal(true)}>
            <Text style={styles.managerText}>
              {selectedManager ? selectedManager.name : 'Select Manager'}
            </Text>
          </Pressable>
        </View>
        <Modal
          visible={showManagerModal}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Manager</Text>
            <FlatList
              data={[
                {id: '1', name: 'Bùi Văn Phú'},
                {id: '2', name: 'Trần Văn Diệp'},
                // Add more employees here
              ]}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Pressable onPress={() => handleManagerSelection(item)}>
                  <Text style={styles.managerItem}>{item.name}</Text>
                </Pressable>
              )}
            />
            <Pressable
              style={styles.button}
              onPress={() => setShowManagerModal(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </Modal>
        <View style={styles.modalButtonContainer}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.addButton]}
            onPress={handleAddProject}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default Add_Project_of_Department;

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
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  iconContainer: {
    padding: 10,
  },
  managerText: {
    fontSize: 16,
  },
  managerItem: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
});

import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const mockData = [
  {id: '1', description: 'Design UI', status: 'active'},
  {id: '2', description: 'Develop authentication feature', status: 'pending'},
  {id: '3', description: 'Performance', status: 'inactive'},
];

const TaskItem = ({item}: any) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemNo}>{item.id}</Text>
    <Text style={styles.itemDescription}>{item.description}</Text>
    <View
      style={[
        styles.statusIndicator,
        item.status === 'active'
          ? styles.active
          : item.status === 'pending'
          ? styles.pending
          : styles.inactive,
      ]}
    />
  </View>
);

const TaskList = () => (
  <View style={styles.container}>
    <FlatList
      data={mockData}
      renderItem={({item}) => <TaskItem item={item} />}
      keyExtractor={item => item.id}
      ListFooterComponent={() => (
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add activity</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemNo: {
    width: 30,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  itemDescription: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  active: {
    backgroundColor: 'green',
  },
  pending: {
    backgroundColor: 'orange',
  },
  inactive: {
    backgroundColor: 'gray',
  },
  addButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'gray',
    fontSize: 16,
  },
});

export default TaskList;

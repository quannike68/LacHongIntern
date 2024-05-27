import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';




const TaskItem = ({ item } : any) => (
  <TouchableOpacity >
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Text style={styles.itemNo}>{item.description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Task = (data : any) => (

  <View style={styles.container}>
    <FlatList
      data={data}
      renderItem={TaskItem}
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
    backgroundColor: 'white',
    padding: 20 , 
    marginHorizontal : 20,
   borderRadius : 20
  },
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemNo: {
    width: 20,
    marginRight: 10,
    color: 'black'
  },
  itemName: {
    flex: 1,
    color: 'black'
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  active: {
    backgroundColor: 'green',
  },
  inactive: {
    backgroundColor: 'red',
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

export default Task;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import getUserDataFromToken from '../../utils/GetUserDataFromToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Icon } from '@rneui/themed';

const data = [
  { id: '1', name: 'Trần Văn Điệp', role: 'Manager', department: 'Kĩ thuật' },
  { id: '2', name: 'Trần Văn A', role: 'Manager', department: 'Thiết Kế' },
  { id: '3', name: 'Trần Văn B', role: 'Staff', department: 'Kĩ thuật' },
  { id: '4', name: 'Trần Văn C', role: 'Staff', department: 'Kĩ thuật' },
  { id: '5', name: 'Trần Văn D', role: 'Staff', department: 'Kĩ thuật' },
  { id: '6', name: 'Trần Văn E', role: 'Staff', department: 'Kĩ thuật' },
];


const ListComponent = () => {
 

  const renderItem = ({ item } :  any) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.role}</Text>
      <Text style={styles.itemText}>{item.department}</Text>
      <TouchableOpacity style={styles.iconButton}>
          {<Icon type="feather" name="user" color={'black'} size={30} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
          {<Icon type="feather" name="user" color={'black'} size={30} />}
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Role</Text>
        <Text style={styles.headerText}>Department</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F4F8',
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#007bff',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});


export default ListComponent;

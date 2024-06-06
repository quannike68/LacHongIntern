import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: '1',
    name: 'Trần Văn Diệp',
    role: 'Manager',
    department: 'Kĩ thuật',
  },
  {
    id: '2',
    name: 'Trần Văn A',
    role: 'Manager',
    department: 'Thiết Kế',
  },
  {
    id: '3',
    name: 'Trần Văn B',
    role: 'Staff',
    department: 'Kĩ thuật',
  },
  {
    id: '4',
    name: 'Trần Văn C',
    role: 'Staff',
    department: 'Kĩ thuật',
  },
  {
    id: '5',
    name: 'Trần Văn D',
    role: 'Staff',
    department: 'Kĩ thuật',
  },
  {
    id: '6',
    name: 'Trần Văn E',
    role: 'Staff',
    department: 'Kĩ thuật',
  },
];

const Item = (data: any) => {
  
  return (
    <TouchableOpacity>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{data.name}</ListItem.Title>
          <ListItem.Subtitle>{data.role}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content>
          <ListItem.Subtitle>{data.department}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Icon
              name="edit"
              type="font-awesome"
              color="gray"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="trash" type="font-awesome" color="red" />
          </TouchableOpacity>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

const UserListModal = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>Name</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>Department</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>Edit</Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item
            name={item.name}
            role={item.role}
            department={item.department}
          />
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" type="font-awesome-5" color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#277DDE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default UserListModal;

import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Button, Icon} from '@rneui/themed';

const data = [
  {
    id: '1',
    code: 'DA6582',
    name: 'Nguyễn Văn Diệp',
    date: '12/4/2024',
    color: 'red',
    peopleCount: 7,
  },
  {
    id: '2',
    code: 'DA8642',
    name: 'Nguyễn Văn Diệp',
    date: '12/3/2024',
    color: 'green',
    peopleCount: 7,
  },
  {
    id: '3',
    code: 'DA1263',
    name: 'Vương',
    date: '19/3/2024',
    color: 'orange',
    peopleCount: 7,
  },
];

const Item = (data: any) => (
  <TouchableOpacity>
    <View style={styles.item}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: 5,
          alignItems: 'center',
        }}>
        <Text style={styles.code}>{data.code}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            style={{marginHorizontal: 5}}
            name="users"
            type="font-awesome-5"
            size={20}
            color="#000"
          />
          <Text style={{fontSize: 20}}>{data.peopleCount}</Text>
        </View>
        <View style={{alignItems: 'flex-start'}}>
          <Button
            icon={
              <Icon name="trash" type="font-awesome-5" size={20} color="red" />
            }
            type="clear"
          />
        </View>
      </View>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={[styles.date, {color: data.color}]}>{data.date}</Text>
    </View>
  </TouchableOpacity>
);

const AdminProject = () => {
  return (
    <View style={{height: '100%'}}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item
            code={item.code}
            name={item.name}
            date={item.date}
            color={item.color}
            peopleCount={item.peopleCount}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      />
      <TouchableOpacity style={styles.addButton}>
        <Icon type="font-awesome-5" name="plus" color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  code: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default AdminProject;

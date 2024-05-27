import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Icon} from '@rneui/themed';

// const rawData: TimelineItem[] = [
//   {
//     time: '12/1/2024',
//     title: 'Thực hiện làm trang home',
//     description: 'by Van Tuan Tran',
//     circleColor: '#BEBEBE',
//   },
//   {
//     time: '15/1/2024',
//     title: 'Thực hiện làm trang quản trị',
//     description: 'by Van Tuan Tran',
//     circleColor: '#FFA500',
//   },
//   {
//     time: '17/1/2024',
//     title: 'Thực hiện làm trang thống kê',
//     description: 'by Van Tuan Tran',
//     circleColor: '#008000',
//   },
// ];

const onEventPress = (event: any) => {
  console.log('Event pressed: ', event);
  // handle the event press action here
};

const Activity: React.FC<any> = (props: any) => {
  const renderItem = (item: any) => (
    <TouchableOpacity
      onPress={() => onEventPress(item)}
      style={styles.itemContainer}>
      {/* <View style={styles.circle(item.circleColor)} /> */}
      <Icon
        style={{margin: 4}}
        type="font-awesome-5"
        name="circle"
        color={'#000'}
        size={15}
        solid
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={({item, index}) => renderItem(item)}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add activity</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 5,
  },
  time: {
    fontSize: 14,
    color: 'gray',
  },
  description: {
    color: 'gray',
    fontSize: 12,
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

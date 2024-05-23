import {View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import AddActivity from '../screens/Add_Activity';
const initialActivities = [
  {
    id: 1,
    title: 'Thực hiện làm trang home',
    date: '12/1/2024 - 15/1/2024',
    status: 'gray',
    author: 'Van Tuan Tran',
  },
  {
    id: 2,
    title: 'Thực hiện làm trang quản trị',
    date: '12/1/2024 - 15/1/2024',
    status: 'orange',
    author: 'Van Tuan Tran',
  },
  {
    id: 3,
    title: 'Thực hiện làm trang thống kê',
    date: '15/1/2024 - 17/1/2024',
    status: 'green',
    author: 'Van Tuan Tran',
  },
];

const Activity = ({route}: any) => {
  const backbutton = useNavigation();
  const handleBackButton = () => {
    backbutton.goBack();
  };
  const {title} = route.params;
  const [activities, setActivities] = useState(initialActivities);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({item}: any) => (
    <View style={styles.listItem}>
      <View style={styles.statusDotContainer}>
        <View style={styles.blackDot} />
        <View style={styles.listItemContent}>
          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.author}>by {item.author}</Text>
        </View>
      </View>
      <View
        style={{borderBottomColor: 'black', borderBottomWidth: 1, marginTop: 5}}
      />
    </View>
  );

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddActivity = (newActivity: any) => {
    setActivities([
      ...activities,
      {...newActivity, id: (activities.length + 1).toString()},
    ]);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.back_button} onPress={() => handleBackButton()}>
        <Icon name="arrow-back" size={16} color="#5F93FB" />
      </Pressable>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.dateRange}>12/1/2024 - 12/3/2024</Text>
      <View style={styles.personDoingWork}>
        <Text style={styles.text}>Person doing the work</Text>
        <View style={styles.avatarContainer}>
          {[...Array(5)].map((_, index) => (
            <Image
              key={index}
              source={require('../assets/image/avatar.png')}
              style={styles.avatar}
            />
          ))}
        </View>
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
        Activity
      </Text>
      <View style={styles.box}>
        <FlatList
          data={activities}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
        />
        <Pressable onPress={toggleModal}>
          <Text style={styles.addActivityText}>+ Add activity</Text>
        </Pressable>
      </View>
      <AddActivity
        isVisible={modalVisible}
        onClose={toggleModal}
        onAdd={handleAddActivity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  back_button: {
    zIndex: 9999,
    position: 'absolute',
    top: 20,
    left: 16,
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 24,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
  dateRange: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 16,
    textAlign: 'center',
  },
  personDoingWork: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  avatarContainer: {
    marginTop: 5,
    flexDirection: 'row',
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  box: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
    flex: 1,
  },
  listContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
  },
  listItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  statusDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blackDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginRight: 10,
  },
  statusDot: {
    width: 15,
    height: 15,
    borderRadius: 12,
    marginLeft: 10,
  },
  listItemContent: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
  },
  date: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 4,
  },
  addActivityText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Activity;

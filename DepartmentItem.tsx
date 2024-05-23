import React from 'react';
import {View, Text, StyleSheet, Image, Pressable, Alert} from 'react-native';
import Iconn from '../components/Iconn';

interface DepartmentItemProps {
  department_name: string;
  manager_name: string;
  avatar: any;
  number_of_Staff: number;
  onPress?: () => void;
  onDelete?: () => void;
}

const DepartmentItem: React.FC<DepartmentItemProps> = ({
  department_name,
  manager_name,
  avatar,
  number_of_Staff,
  onPress,
  onDelete,
}) => {
  const handleDeleteIconClick = () => {
    Alert.alert(
      'Confirmation',
      `Are you sure you want to delete ${department_name}`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: onDelete},
      ],
    );
  };

  return (
    <Pressable
      // android_ripple={{color: '#ccc'}}
      style={({pressed}) => [pressed ? styles.buttonPressed : null]}
      onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.department_name_text}>{department_name}</Text>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <View style={styles.textContainer}>
              <Image style={styles.avatar} source={avatar} />
              <Text style={styles.manager_name}>{manager_name}</Text>
            </View>
            <View style={styles.textContainer}>
              <Iconn name="groups" size={30} color={'#54B052'} />
              <Text style={styles.manager_name}>{number_of_Staff}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <Iconn
              name="info"
              size={24}
              color={'#929CB1'}
              style={styles.icon}
            />
            <Iconn
              name="delete"
              size={24}
              color={'#FD2E2E'}
              style={styles.icon}
              onPresss={handleDeleteIconClick}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default DepartmentItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  department_name_text: {
    color: '#929CB1',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  avatar: {
    height: 30,
    width: 30,
  },
  manager_name: {
    fontSize: 18,
    marginLeft: 10,
    color: '#929CB1',
    textAlign: 'center',
  },
  iconContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  icon: {
    marginTop: 5,
  },
});

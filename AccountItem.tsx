import {View, Text, StyleSheet, Alert, Pressable} from 'react-native';
import Iconn from './Iconn';
const AccountItem = ({
  fullname,
  role,
  department,
  onDelete,
  onPress,
}: {
  fullname: string;
  role: string;
  department: string;
  onDelete?: () => void;
  onPress?: () => void;
}) => {
  const handleDeleteIconClick = () => {
    Alert.alert('Confirmation', `Are you sure you want to delete ${fullname}`, [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: onDelete},
    ]);
  };
  return (
    <Pressable android_ripple={{color: '#ccc'}} onPress={onPress}>
      <View style={styles.container}>
        <Text style={[styles.text, styles.name]}>{fullname}</Text>
        <Text style={[styles.text, styles.role]}>{role}</Text>
        <Text style={[styles.text, styles.department]}>{department}</Text>
        <View style={styles.iconContainer}>
          <Iconn
            name="delete"
            size={16}
            color="black"
            onPresss={handleDeleteIconClick}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default AccountItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    padding: 8,
    margin: 8,
    alignItems: 'center',
  },
  text: {
    flex: 1,
    fontSize: 14,
  },
  name: {
    flex: 3,
    marginRight: 10,
  },
  role: {
    flex: 2,
    marginRight: 10,
  },
  department: {
    flex: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    marginEnd: 10,
    justifyContent: 'flex-end',
  },
});

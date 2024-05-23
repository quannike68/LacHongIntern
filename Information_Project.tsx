import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Pressable,
} from 'react-native';

const Information_Project = () => {
  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.text}>Project name </Text>
        <TextInput style={styles.textInputContainer}>
          <Text style={styles.textInput}>Quản Lý Nhân Viên</Text>
        </TextInput>
      </View>
      <View style={styles.viewContainer}>
        <Text style={styles.text}>Project start and end times </Text>
        <TextInput style={styles.textInputContainer}>
          <Text style={styles.textInput}>10/1/2024 - 12/4/2024</Text>
        </TextInput>
      </View>
      <View style={styles.viewContainer}>
        <Text style={styles.text}>Description </Text>
        <TextInput style={styles.textInputContainer}>
          <Text style={styles.textInput}>
            Thiết kế và code ứng dụng quản lý
          </Text>
        </TextInput>
      </View>
      <View style={styles.viewContainer}>
        <Text style={styles.text}>Investor </Text>
        <TextInput style={styles.textInputContainer}>
          <Text style={styles.textInput}>Facebook</Text>
        </TextInput>
      </View>
      <View style={styles.viewContainer}>
        <Text style={styles.text}>Investor </Text>
        <TextInput style={styles.textInputContainer}>
          <Text style={styles.textInput}>30.000.000 VNĐ</Text>
        </TextInput>
      </View>
      <View style={styles.viewContainer}>
        <Text style={styles.text}>Staff </Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/image/avatar.png')}
          />
          <Image
            style={styles.image}
            source={require('../assets/image/avatar.png')}
          />
          <Image
            style={styles.image}
            source={require('../assets/image/avatar.png')}
          />
          <Image
            style={styles.image}
            source={require('../assets/image/avatar.png')}
          />
        </View>
      </View>
      <Pressable android_ripple={{color: '#ccc'}}>
        <View style={styles.button}>
          <Text style={styles.textButton}>Edit</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Information_Project;

const styles = StyleSheet.create({
  box: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
    width: '90%',
  },
  viewContainer: {
    marginTop: 20,
  },
  text: {
    color: '#004A9E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInputContainer: {
    borderBottomWidth: 1,
  },
  textInput: {
    fontWeight: '800',
    fontSize: 16,
  },
  imageContainer: {
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
    padding: 10,
    flexDirection: 'row',
  },
  image: {
    marginRight: 15,
    width: 30,
    height: 30,
  },
  button: {
    position: 'absolute',
    right: 5,
    top: 80,
    width: 80,
    padding: 10,
    borderRadius: 28,
    backgroundColor: '#1D61AE',
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
  },
});

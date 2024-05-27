import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Icon, Button} from '@rneui/themed';
import Activity from '../components/layout/Activity';
import { useNavigation } from '@react-navigation/native';
const rawData = [
  {
    time: '12/1/2024',
    title: 'Thực hiện làm trang home',
    description: 'by Van Tuan Tran',
    circleColor: '#BEBEBE',
  },
  {
    time: '15/1/2024',
    title: 'Thực hiện làm trang quản trị',
    description: 'by Van Tuan Tran',
    circleColor: '#FFA500',
  },
  {
    time: '17/1/2024',
    title: 'Thực hiện làm trang thống kê',
    description: 'by Van Tuan Tran',
    circleColor: '#008000',
  },
];

const HomeActivites: React.FC = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'flex-start' , justifyContent : 'flex-start'}}>
        <Button
          icon={
            <Icon
              style={{margin: 4}}
              type="font-awesome-5"
              name="arrow-left"
              color={'#000'}
              size={30}
              solid
            />
          }
          type='clear'
          onPress={() => navigation.goBack()}
        />

        <Text style={{fontSize: 45, fontWeight: 'bold', marginBottom: 40}}>
          Xử lý frontend
        </Text>
      </View>
      <View style={{flex: 6}}>
        <Activity data={rawData} id={'10'} />
      </View>
    </View>
  );
};

export default HomeActivites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },

  staff: {
    flex: 1,
    backgroundColor: 'green',
    marginTop: 10,
  },
});

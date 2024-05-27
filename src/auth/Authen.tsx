import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation  , useFocusEffect} from '@react-navigation/native';

const Authen = ({ component: Component } : any) => {
  const navigation : any = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(() => {
    const checkAccessToken = async () => {
      const token = await AsyncStorage.getItem('authorization');
      if (!token) {
        navigation.navigate('Login');
      } 
      else {
        setIsLoading(false);
      }
    };
    checkAccessToken();
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <Component />;
};

export default Authen;

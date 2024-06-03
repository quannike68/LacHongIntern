import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Authen = ({ component: Component, allowedRoles } : any) => {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const checkAccessTokenAndRole = async () => {
        const token = await AsyncStorage.getItem('authorization');
        const role = await AsyncStorage.getItem('role');

        if (!token || !allowedRoles.includes(role)) {
          navigation.navigate('Login');
        } else {
          setIsLoading(false);
        }
      };

      checkAccessTokenAndRole();
    }, [navigation, allowedRoles])
  );

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

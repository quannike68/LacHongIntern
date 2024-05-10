import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import HomeStaffManager from '../screens/homeStaffManager';
import Departments from '../screens/departments';
import Project from '../screens/project';

const Stack = createNativeStackNavigator()

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Project'>
            <Stack.Screen name="Login" component={Login} options={{headerShown : false }} />
            <Stack.Screen name="HomeStaffManager" component={HomeStaffManager} options={{headerShown : false}} />
            <Stack.Screen name="Departments" component={Departments} options={{headerShown : false}} />
            <Stack.Screen name="Project" component={Project} options={{headerShown : false}} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

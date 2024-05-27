import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import HomeStaffManager from '../screens/homeStaffManager';
import Departments from '../screens/departments';
import Project from '../screens/project';
import InformationUser from '../screens/informationUser';
import HomeActivites from '../screens/homeActivites';
import Authen from '../auth/Authen';



const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen name="HomeActivites" options={{headerShown: false}}>
          {props => <Authen {...props} component={HomeActivites} />}
        </Stack.Screen>

        <Stack.Screen name="HomeStaffManager" options={{headerShown: false}}>
          {props => <Authen {...props} component={HomeStaffManager} />}
        </Stack.Screen>

        <Stack.Screen name="Departments" options={{headerShown: false}}>
          {props => <Authen {...props} component={Departments} />}
        </Stack.Screen>

        <Stack.Screen name="Project" options={{headerShown: false}}>
          {props => <Authen {...props} component={Project} />}
        </Stack.Screen>

        <Stack.Screen name="InformationUser" options={{headerShown: false}}>
          {props => <Authen {...props} component={InformationUser} />}
        </Stack.Screen>


        {/* <Stack.Screen name="Activites" component={Activites} options={{headerShown : false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

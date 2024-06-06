import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/CommonScreens/LoginScreen';
import ReportDepartment from '../screens/CommonScreens/ReportDepartment';
import Departments from '../screens/departments';
import Project from '../screens/project';
import HomeActivites from '../screens/homeActivites';
import Authen from '../auth/Authen';
import HomeAdmin from '../screens/AdminScreens/HomeAdminScreen';
import ProjectAdmin from '../screens/AdminScreens/ProjectAdminScreen';
import UserAdmin from '../screens/AdminScreens/UserAdminScreen';
import TaskAdmin from '../screens/AdminScreens/TaskAdminScreen';
import ProfileScreen from '../screens/CommonScreens/AccountInforScreen';
import ProfileStaffScreen from '../screens/CommonScreens/ProfileStaffScreen';
import ActivityScreen from '../screens/CommonScreens/ActivityScreens';
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{animation: 'fade'}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ProfileScreen" options={{headerShown: false}}>
          {props => (
            <Authen
              {...props}
              component={ProfileScreen}
              allowedRoles={['STAFF', 'MANAGER', 'ADMIN']}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ActivityScreen" options={{headerShown: false}}>
          {props => (
            <Authen
              {...props}
              component={ActivityScreen}
              allowedRoles={['STAFF', 'MANAGER', 'ADMIN']}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ProfileStaffScreen" options={{headerShown: false}}>
          {props => (
            <Authen
              {...props}
              component={ProfileStaffScreen}
              allowedRoles={['STAFF', 'MANAGER', 'ADMIN']}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="HomeActivites" options={{headerShown: false}}>
          {props => (
            <Authen
              {...props}
              component={HomeActivites}
              allowedRoles={['STAFF', 'MANAGER', 'ADMIN']}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ReportDepartment" options={{headerShown: false}}>
          {props => (
            <Authen
              {...props}
              component={ReportDepartment}
              allowedRoles={['STAFF', 'MANAGER', 'ADMIN']}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Departments" options={{headerShown: false}}>
          {props => (
            <Authen
              {...props}
              component={Departments}
              allowedRoles={['STAFF', 'MANAGER', 'ADMIN']}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Project" options={{headerShown: false}}>
          {props => (
            <Authen
              {...props}
              component={Project}
              allowedRoles={['STAFF', 'MANAGER', 'ADMIN']}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ProjectAdmin" options={{headerShown: false}}>
          {props => (
            <Authen
              {...props}
              component={ProjectAdmin}
              allowedRoles={['ADMIN']}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="TaskAdmin" options={{headerShown: false}}>
          {props => (
            <Authen {...props} component={TaskAdmin} allowedRoles={['ADMIN']} />
          )}
        </Stack.Screen>
        <Stack.Screen name="HomeAdmin" options={{headerShown: false}}>
          {props => (
            <Authen {...props} component={HomeAdmin} allowedRoles={['ADMIN']} />
          )}
        </Stack.Screen>
        <Stack.Screen name="UserAdmin" options={{headerShown: false}}>
          {props => (
            <Authen {...props} component={UserAdmin} allowedRoles={['ADMIN']} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import ProfileScreen from './screens/CommonScreens/AccountInforScreen';
import ProfileStaffScreen from './screens/CommonScreens/ProfileStaffScreen';
import ActivityScreen from './screens/CommonScreens/ActivityScreens';
import Login from './screens/CommonScreens/LoginScreen';
import Project from './screens/ManagerStaffScreen/DetailProjectScreen';
import HomeActivites from './screens/homeActivites';
import Authen from './auth/Authen';

import AdminDepartmentScreen from './screens/AdminScreens/Department/DepartmentAdminScreen';
import ReportDepartment from './screens/CommonScreens/ReportDepartment';

import HomeAdminNavigate from './screens/AdminScreens/HomeAdminNavigateScreen';

import UserAdmin from './screens/AdminScreens/UserAdminScreen';
import TaskAdmin from './screens/AdminScreens/TaskAdminScreen';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import ForgetPassword from './screens/CommonScreens/ForGetPassword';
import InfoDepartments from './screens/AdminScreens/Department/InfoDepartment';
import {QueryClient, QueryClientProvider} from 'react-query';
import CreateDepartment from './screens/AdminScreens/Department/CreateDepartment';
import ProjectAdminScreen from './screens/AdminScreens/Project/ProjectAdminScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{animation: 'fade'}}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPassword}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="HomeAdminNavigate"
              options={{headerShown: false}}>
              {props => (
                <Authen
                  {...props}
                  component={HomeAdminNavigate}
                  allowedRoles={['ADMIN']}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="AdminDepartmentScreen"
              options={{headerShown: false}}>
              {props => (
                <Authen
                  {...props}
                  component={AdminDepartmentScreen}
                  allowedRoles={['ADMIN']}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="InfoDepartments" options={{headerShown: false}}>
              {props => (
                <Authen
                  {...props}
                  component={InfoDepartments}
                  allowedRoles={['ADMIN']}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="CreateDepartment"
              options={{headerShown: false}}>
              {props => (
                <Authen
                  {...props}
                  component={CreateDepartment}
                  allowedRoles={['ADMIN']}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="ProjectAdminScreen"
              options={{headerShown: false}}>
              {props => (
                <Authen
                  {...props}
                  component={ProjectAdminScreen}
                  allowedRoles={['ADMIN']}
                />
              )}
            </Stack.Screen>
            {/* 

            
          <Stack.Screen name="ProjectStaff" options={{headerShown: false}}>
            {props => (
              <Authen
                {...props}
                component={ProjectStaff}
                allowedRoles={['STAFF', 'MANAGER', 'ADMIN', 'PROJECT_MANAGER']}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="ActivityScreen" options={{headerShown: false}}>
            {props => (
              <Authen
                {...props}
                component={ActivityScreen}
                allowedRoles={['STAFF', 'MANAGER', 'ADMIN', 'PROJECT_MANAGER']}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="ProfileStaffScreen"
            options={{headerShown: false}}>
            {props => (
              <Authen
                {...props}
                component={ProfileStaffScreen}
                allowedRoles={['STAFF', 'MANAGER', 'ADMIN', 'PROJECT_MANAGER']}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="HomeActivites" options={{headerShown: false}}>
            {props => (
              <Authen
                {...props}
                component={HomeActivites}
                allowedRoles={['STAFF', 'MANAGER', 'ADMIN', 'PROJECT_MANAGER']}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="ReportDepartment" options={{headerShown: false}}>
            {props => (
              <Authen
                {...props}
                component={ReportDepartment}
                allowedRoles={['STAFF', 'MANAGER', 'ADMIN', 'PROJECT_MANAGER']}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Project" options={{headerShown: false}}>
            {props => (
              <Authen
                {...props}
                component={Project}
                allowedRoles={['STAFF', 'MANAGER', 'ADMIN', 'PROJECT_MANAGER']}
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
              <Authen
                {...props}
                component={TaskAdmin}
                allowedRoles={['ADMIN']}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="UserAdmin" options={{headerShown: false}}>
            {props => (
              <Authen
                {...props}
                component={UserAdmin}
                allowedRoles={['ADMIN']}
              />
            )}
          </Stack.Screen> */}
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;

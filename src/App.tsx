import React from 'react';
import { SafeAreaView } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
// import { AuthProvider } from './context/authContext';
function  App () {
  return (

    <SafeAreaView style={{ flex: 1 }}>
       <AppNavigation/>
    </SafeAreaView>

  );
}

export default App;
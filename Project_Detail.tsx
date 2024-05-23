import {StyleSheet, View, Text, Pressable} from 'react-native';
import {useState} from 'react';
import Report from '../components/Report';
import Information_Project from '../components/Information_Project';
import Account_of_Project from '../components/Account_of_Project';
import Task_of_Project from '../components/Task_of_Project';
import {Icon} from '@rneui/themed';
const Project_Detail = ({route, navigation}: any) => {
  const {project_code, manager_project} = route.params || {};
  // const {project_code} = route.params;
  // const {manager_project} = route.params;
  const [selectedTab, setSelectedTeb] = useState('Report');
  const handleBackButton = () => {
    navigation.goBack();
  };
  const renderContent = () => {
    switch (selectedTab) {
      case 'Report':
        return <Report />;
      case 'Tasks':
        return <Task_of_Project navigation={navigation} />;
      case 'Information':
        return <Information_Project />;
      case 'Staff':
        return <Account_of_Project navigation={navigation} />;
    }
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.back_button} onPress={() => handleBackButton()}>
        <Icon name="arrow-back" size={16} color="#5F93FB" />
      </Pressable>
      <View style={styles.header_container}>
        <Text style={styles.text_project_code}>{project_code || 'N/A'}</Text>
      </View>
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, selectedTab === 'Report' && styles.tabSelected]}
          onPress={() => setSelectedTeb('Report')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Report' && styles.tabTextSelected,
            ]}>
            Report
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === 'Tasks' && styles.tabSelected]}
          onPress={() => setSelectedTeb('Tasks')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Tasks' && styles.tabTextSelected,
            ]}>
            Task
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tab,
            selectedTab === 'Information' && styles.tabSelected,
          ]}
          onPress={() => setSelectedTeb('Information')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Information' && styles.tabTextSelected,
            ]}>
            Information
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === 'Staff' && styles.tabSelected]}
          onPress={() => setSelectedTeb('Staff')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Staff' && styles.tabTextSelected,
            ]}>
            Staff
          </Text>
        </Pressable>
      </View>
      {renderContent()}
    </View>
  );
};

export default Project_Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  back_button: {
    zIndex: 9999,
    position: 'absolute',
    top: 20,
    left: 16,
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 24,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_container: {
    marginTop: 10,
    alignItems: 'center',
  },
  text_project_code: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  text_manager_project: {
    fontSize: 24,
  },
  tabContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 28,
    elevation: 4,
    marginHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    justifyContent: 'center',
  },
  tabSelected: {
    borderRadius: 28,
    backgroundColor: '#1D61AE',
    margin: 5,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  tabTextSelected: {
    color: 'white',
  },
});

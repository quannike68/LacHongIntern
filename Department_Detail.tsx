import {Text, View, Pressable, StyleSheet} from 'react-native';
import {useState} from 'react';
import Report from '../components/Report';
import Project_of_Department from '../screens/Project_of_Department';
import Account_of_Department from './Account_of_Department';
import {Icon} from '@rneui/themed';
const Department_Detail = ({route, navigation}: any) => {
  const {DepartmentName} = route.params;
  const [selectedTab, setSelectedTeb] = useState('Report');
  const handleBackButton = () => {
    navigation.navigate('DepartmentAdmin');
  };
  const renderContent = () => {
    switch (selectedTab) {
      case 'Report':
        return (
          <View>
            <Report />
          </View>
        );
      case 'Project':
        return <Project_of_Department navigation={navigation} />;
      case 'Staff':
        return (
          <View>
            <Account_of_Department navigation={navigation} />
          </View>
        );
    }
  };
  return (
    <View style={styles.container}>
      <Pressable style={styles.back_button} onPress={() => handleBackButton()}>
        <Icon name="arrow-back" size={16} color="#5F93FB" />
      </Pressable>
      <Text style={styles.departmentName}>{DepartmentName}</Text>

      <Text style={styles.decreption}>
        The department's main task is to develop applications to serve the
        project including mobile applications and web applications
      </Text>
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
          style={[styles.tab, selectedTab === 'Project' && styles.tabSelected]}
          onPress={() => setSelectedTeb('Project')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'Project' && styles.tabTextSelected,
            ]}>
            Project
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

export default Department_Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
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
  departmentName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#929CB1',
  },
  decreption: {
    fontSize: 16,
    textAlign: 'center',
    color: '#929CB1',
  },
  tabContainer: {
    elevation: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 28,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    margin: 5,
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

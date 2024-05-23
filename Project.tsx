import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable, FlatList} from 'react-native';
import Iconn from '../components/Iconn';
import ProjectItem from '../components/ProjectItem';
const departments = [
  {
    id: '1',
    title: 'APPLICATION DEVELOPMENT DEPARTMENT',
    data: [
      {
        project_code: 'DA6582',
        number_of_staff: 7,
        name: 'Nguyễn Văn Diệp',
        date: '12/4/2024',
      },
      {
        project_code: 'DA6583',
        number_of_staff: 7,
        name: 'Trần Văn Diệp',
        date: '15/4/2024',
      },
    ],
    expanded: false,
  },
  {
    id: '2',
    title: 'INFORMATION SECURITY DEPARTMENT',
    data: [],
    expanded: false,
  },
  {
    id: '3',
    title: 'NETWORK INFRASTRUCTURE DEPARTMENT',
    data: [],
    expanded: false,
  },
];
const Project = () => {
  const [list, setList] = useState(departments);
  const toggleExpand = (id: string) => {
    setList(
      list.map(item => ({
        ...item,
        expanded: item.id === id ? !item.expanded : item.expanded,
      })),
    );
  };
  const renderItem = ({item}: any) => {
    return (
      <View>
        <Pressable
          onPress={() => toggleExpand(item.id)}
          style={styles.dropdownHeader}>
          <Text style={styles.dropdownHeaderText}>{item.title}</Text>
        </Pressable>
        {item.expanded && (
          <FlatList
            data={item.data}
            keyExtractor={project => project.project_code}
            renderItem={({item: project}) => (
              <ProjectItem
                project_code={project.project_code}
                number_of_staff={project.number_of_staff}
                manager={project.manager}
                endDate={project.date}
                tab="Project"
              />
            )}
          />
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Iconn
          name="person"
          size={40}
          color={'#929CB1'}
          style={styles.headerAvatar}
        />
        <View>
          <Text style={styles.headerText}>Van Diep Tran</Text>
          <Text
            style={[
              styles.headerText,
              {color: '#929CB1', fontStyle: 'italic'},
            ]}>
            ADMIN
          </Text>
        </View>
        <Iconn
          name="logout"
          size={40}
          color={'#929CB1'}
          style={styles.headerLogout}
        />
      </View>
      <View style={styles.explainContainer}>
        <Text style={styles.explainText}>Project</Text>
      </View>
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};
export default Project;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#E9F7FB',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 4,
  },
  headerAvatar: {
    marginRight: 20,
    overflow: 'hidden',
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerLogout: {
    marginLeft: 150,
  },
  explainContainer: {
    backgroundColor: '#929CB1',
    borderRadius: 15,
    padding: 8,
    marginTop: 20,
    marginHorizontal: 32,
  },
  explainText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dropdownHeader: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 16,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  dropdownHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

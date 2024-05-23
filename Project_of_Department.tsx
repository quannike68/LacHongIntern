import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {FAB} from '@rneui/themed';
import ProjectItem from '../components/ProjectItem';
import Add_Project_of_Department from './Add_Project_of_Department';

const Project_of_Department = ({navigation}: any) => {
  const [projects, setProjects] = useState([
    {
      id: '1',
      project_code: 'DA6582',
      name: 'Project A',
      description: 'Description for Project A',
      startDate: '01/01/2024',
      endDate: '12/04/2024',
      investor: 'Investor A',
      investment: '1000000',
      number_of_staff: 7,
      manager: 'Tran Van Diep',
    },
    {
      id: '2',
      project_code: 'DA8642',
      name: 'Project B',
      description: 'Description for Project B',
      startDate: '01/02/2024',
      endDate: '12/03/2024',
      investor: 'Investor B',
      investment: '2000000',
      number_of_staff: 7,
      manager: 'Nguyen Van Diep',
    },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  const deleteProject = (id: string) => {
    setProjects(prevProject =>
      prevProject.filter(project => project.id !== id),
    );
  };

  const addNewProject = (newProject: {
    project_code: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    investor: string;
    investment: string;
  }) => {
    setProjects(prevProjects => [
      ...prevProjects,
      {
        ...newProject,
        id: (prevProjects.length + 1).toString(),
        number_of_staff: 0,
        manager: '',
      },
    ]);
  };

  const renderItem = (itemData: {
    item: {
      id: string;
      project_code: string;
      number_of_staff: number;
      manager: string;
      endDate: string;
    };
  }) => {
    const pressHandler = () => {
      navigation.navigate('Project_Detail', {
        project_code: itemData.item.project_code,
        manager_project: itemData.item.manager,
      });
    };
    const handleDelete = () => {
      deleteProject(itemData.item.id);
    };

    return (
      <ProjectItem
        project_code={itemData.item.project_code}
        number_of_staff={itemData.item.number_of_staff}
        manager={itemData.item.manager}
        endDate={itemData.item.endDate}
        onPress={pressHandler}
        onDelete={handleDelete}
        tab="Department"
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FAB
        visible={true}
        icon={{name: 'add'}}
        size="small"
        placement="right"
        color="white"
        onPress={() => setModalVisible(true)}
      />
      <Add_Project_of_Department
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addNewProject}
      />
    </View>
  );
};

export default Project_of_Department;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 4,
    width: ' 100%',
  },
});

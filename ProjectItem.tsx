import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {Icon} from '@rneui/themed';
import Iconn from '../components/Iconn';

const ProjectItem = ({
  project_code,
  number_of_staff,
  manager,
  endDate,
  tab,
  onPress,
  onDelete,
}: {
  project_code: string;
  number_of_staff: number;
  manager: string;
  endDate: string;
  tab: string;
  onPress?: () => void;
  onDelete?: () => void;
}) => {
  let changeMargin = tab === 'Project';
  return (
    <Pressable onPress={onPress}>
      <View
        style={[styles.container, {marginHorizontal: changeMargin ? 32 : 16}]}>
        <View style={styles.project_id}>
          <Text style={styles.text_id}>{project_code}</Text>
          <View style={styles.group}>
            <Icon name="group" size={30} />
            <Text style={styles.text_group}>{number_of_staff}</Text>
          </View>
        </View>
        <View style={styles.manager_container}>
          <Text style={styles.text_manager}>{manager || 'No manager yet'}</Text>
          <Iconn name="info" color={'#929CB1'} size={20} />
        </View>
        <View style={styles.manager_container}>
          <Text style={styles.text_date}>{endDate}</Text>
          <Iconn
            name="delete"
            color={'#FD2E2E'}
            size={20}
            onPresss={onDelete}
          />
        </View>
        <View style={styles.process_container}>
          <View style={styles.process}></View>
        </View>
      </View>
    </Pressable>
  );
};

export default ProjectItem;

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 26,
    padding: 10,
    marginHorizontal: 32,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  project_id: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_id: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  group: {
    flexDirection: 'row',
  },
  text_group: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 10,
  },
  manager_container: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_manager: {
    fontSize: 18,
  },
  text_date: {
    fontSize: 14,
    color: '#F33C3C',
    fontWeight: 'bold',
  },
  process_container: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#219F16',
    width: '100%',
    height: 20,
  },
  process: {
    borderRadius: 10,
    height: 20,
    width: '80%',
    backgroundColor: '#169F28',
  },
});

import {View, StyleSheet, Text, FlatList, Pressable} from 'react-native';
import {FAB} from '@rneui/themed';

const Task_of_Project = ({navigation}: any) => {
  const tasks = [
    {id: '1', title: 'Design UI', status: 'green'},
    {id: '2', title: 'Develop authentication feature', status: 'orange'},
    {id: '3', title: 'Performance', status: 'grey'},
  ];

  const TaskItem = ({item}: any) => {
    let statusColor = 'grey';
    if (item.status === 'green') {
      statusColor = 'green';
    } else if (item.status === 'orange') {
      statusColor = 'orange';
    }

    return (
      <Pressable
        onPress={() => navigation.navigate('Activity', {title: item.title})}>
        <View style={styles.item}>
          <View
            style={{
              flex: 1,
              borderRightWidth: 2,
              borderRightColor: 'white',
              minHeight: 40,
              justifyContent: 'center',
            }}>
            <Text style={styles.index}>{item.id}</Text>
          </View>
          <View
            style={{
              flex: 6,
              minHeight: 40,
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={[
                styles.statusIndicator,
                {backgroundColor: statusColor},
              ]}></View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            borderRightWidth: 2,
            borderRightColor: 'white',
            minHeight: 40,
          }}>
          <Text style={[styles.headerText, {verticalAlign: 'middle'}]}>
            No.
          </Text>
        </View>
        <View
          style={{
            flex: 6,
            minHeight: 40,
            justifyContent: 'center',
            paddingHorizontal: 5,
          }}>
          <Text
            style={[
              styles.headerText,
              {verticalAlign: 'middle', textAlign: 'center'},
            ]}>
            Task
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}></View>
      </View>
      <View>
        <FlatList
          data={tasks}
          renderItem={TaskItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      <FAB
        visible={true}
        icon={{name: 'add'}}
        size="small"
        placement="right"
        color="white"
        // onPress={}
      />
    </View>
  );
};

export default Task_of_Project;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    elevation: 4,
    width: '90%',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  index: {
    width: 50,
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  verticalSeparator: {
    height: '100%',
    width: 2,
    backgroundColor: 'white',
    marginRight: 10,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

type TimelineItem = {
  time: string;
  title: string;
  description: string;
  circleColor: string;
  lineColor: string;
};

const rawData: TimelineItem[] = [
  {
    time: '2015-09-01',
    title: 'Create a services site 1',
    description: 'Create a services site 2015-09-01',
    circleColor: '#86C166',
    lineColor: '#86C166',
  },
  {
    time: '2015-09-01',
    title: 'Create a services site 2',
    description: 'Create a services site 2015-09-01',
    circleColor: '#86C166',
    lineColor: '#86C166',
  },
  {
    time: '2015-09-01',
    title: 'Solve initial network problems 3',
    description: 'Solve initial network problems 3 2015-09-01',
    circleColor: '#E94B3C',
    lineColor: '#E94B3C',
  },
  {
    time: '2015-09-02',
    title: 'Technical testing 1',
    description: 'Technical testing 3 2015-09-01',
    circleColor: '#3B5998',
    lineColor: '#3B5998',
  },
  {
    time: '2015-09-02',
    title: 'Technical testing 2',
    description: 'Technical testing 3 2015-09-01',
    circleColor: '#3B5998',
    lineColor: '#3B5998',
  },
  {
    time: '2015-09-03',
    title: 'Technical testing 3',
    description: 'Technical testing 3 2015-09-01',
    circleColor: '#3B5998',
    lineColor: '#3B5998',
  },
];



const Report = (Data :any) => {
  return (
    <View style={styles.container}>
      <Timeline
        data={rawData}
        circleSize={20}
        circleColor="rgba(0,0,0,0)"
        lineColor="rgb(45,156,219)"
        timeContainerStyle={{minWidth: 52, marginTop: 0}}
        timeStyle={{
          textAlign: 'center',
          color: 'black',
          padding: 5,
          borderRadius: 13,
        }}
        descriptionStyle={{color: 'gray'}}
        innerCircle="dot"
      
      />
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: 'gray',
  },
});

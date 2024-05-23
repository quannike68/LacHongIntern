import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from '@rneui/themed';

const Report = ({}) => {
  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <View
          style={{
            flex: 1.8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>19/3/2024</Text>
        </View>
        <View style={{flex: 0.8, justifyContent: 'center'}}>
          <Icon
            type="font-awesome-5"
            name="circle"
            color={'black'}
            solid
            size={35}
          />
        </View>

        <View style={{flex: 4}}></View>
      </View>

      <View style={styles.Title}>
        <View style={{flex: 1.85}}></View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <View></View>
          <View
            style={{
              height: '100%',
              borderColor: '#D22115',
              borderWidth: 8,
            }}></View>
          <View></View>
        </View>

        <View
          style={{
            flex: 4,
            flexDirection: 'column',
            paddingLeft: 10,
            paddingBottom: 20,
          }}>
          <View
            style={{
              backgroundColor: '#f5f5f5',
              width: '50%',
              height: 50,
              marginBottom: 20,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>DA6582</Text>
          </View>
          <View style={{marginBottom: 10, flexDirection: 'column'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Design UI</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18}}>
                Design UI mockup 3 screens: home, detail, report
                <Text style={{fontSize: 18, color: '#929Cb1'}}>
                  - by Van Tuan Tran
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 4,
    width: '100%',
    height: 550,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  Title: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
});

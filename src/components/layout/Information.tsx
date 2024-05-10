import React from 'react'
import { View , Text ,TouchableOpacity ,StyleSheet } from 'react-native';
import { Icon ,Button , LinearProgress , ListItem } from "@rneui/themed";
import { Input } from '@rneui/base';


export default function Information() {
  return (
    <View style = {{paddingHorizontal : 20}}>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Department name</Text>
            <Input placeholder='Devolopment'/>
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Manager</Text>
            <Input placeholder='Nguyễn Văn Diệp'/>
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>The project had finished</Text>
            <Input placeholder='20'/>
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Ongoing projects</Text>
            <Input placeholder='3'/>
        </View>
    </View>
  )
}

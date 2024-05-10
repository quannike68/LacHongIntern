import React from 'react'
import { View , Text ,TouchableOpacity ,StyleSheet } from 'react-native';
import { Icon ,Button , LinearProgress , ListItem } from "@rneui/themed";
import { Input } from '@rneui/base';


export default function InforProject() {
  return (
    <View style = {{paddingHorizontal : 20}}>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Project name</Text>
            <Input placeholder='Manager project'/>
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Project start and end times</Text>
            <Input placeholder='10/1/2024  -  12/4/2024'/>
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Depcription</Text>
            <Input placeholder='Thiết kế và code ứng dụng quản lý'/>
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Investor</Text>
            <Input placeholder='Facebook'/>
        </View>
        <View>
            <Text style = {{fontSize : 20 , fontWeight : 'bold'}}>Investment</Text>
            <Input placeholder='30.000.000 VNĐ'/>
        </View>
    </View>
  )
}

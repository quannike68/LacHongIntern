import React from 'react'

import { useNavigation } from '@react-navigation/native';
import { Icon ,Button  } from "@rneui/themed";
import { StyleSheet, View} from "react-native";

export default function NavButton() {

  const navigation = useNavigation();

  return (
    <View>
        <View style = {{ backgroundColor : '#ffffff', marginTop: 20 , justifyContent : 'space-around' , flexDirection :'row' , alignItems : 'flex-end'}}>
            <Button icon = {<Icon type="feather" name="user" color={'black'} size={30}  />} type="clear" />
            <Button icon = {<Icon type="feather" name="home" color={'black'} size={30}  />} type="clear" />
            <Button icon = {<Icon type="feather" name="archive" color={'black'} size={30}  />} type="clear"  onPress={() => navigation.navigate("Project")}  />
        </View>
    </View>
  )
}

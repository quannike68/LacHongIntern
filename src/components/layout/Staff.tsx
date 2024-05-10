import React from 'react'
import { View , Text ,TouchableOpacity ,StyleSheet } from 'react-native';
import { Icon ,Button , LinearProgress , ListItem } from "@rneui/themed";

export default function Staff() {
    const dataUser = [{"id":1,"name":"Agnesse Sculley","role":"manager"},
    {"id":2,"name":"Leupold Creboe","role":"staff"},
    {"id":3,"name":"Chandler Basindale","role":"staff"},
    {"id":4,"name":"Yuri Baxster","role":"staff"},
    {"id":5,"name":"Elsa Rosendale","role":"staff"},
    {"id":6,"name":"Ed Spendlove","role":"staff"},
    {"id":7,"name":"Regine Rutter","role":"staff"},
    {"id":8,"name":"Christoper Raincin","role":"staff"},
    {"id":9,"name":"Minetta Prattington","role":"staff"},
    {"id":10,"name":"Allyn Hallmark","role":"staff"}]


  return (
    <View>
           <View >
           <ListItem style = {{flex : 1 , borderBottomWidth : 2  , backgroundColor : '#D9D9D9'}}>
                <ListItem.Content style = {{flex : 1.5 , alignItems : 'center'}}>
                    <ListItem.Title style = {{fontWeight : 'bold'}}>Name</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content style = {{flex : 1 ,alignItems : 'center'}}>
                    <ListItem.Title style = {{fontWeight : 'bold'}}>Role</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content style = {{flex : 1}}>
                    <ListItem.Title></ListItem.Title>
                </ListItem.Content>
           </ListItem>

           {dataUser.map((user , index) =>
                <ListItem key={index} style={{flex: 1 ,justifyContent : 'space-between' , alignItems : 'center'} }>
                    <ListItem.Content  style = {{flex : 1.5 , alignItems : 'center'}}>
                        <ListItem.Title>{user.name}</ListItem.Title>
                    </ListItem.Content >
                    <ListItem.Content style = {{flex : 1 ,alignItems : 'center'}}>
                        <ListItem.Title>{user.role}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Content style = {{flex : 1 , justifyContent : 'space-around' , flexDirection : 'row'}}>
                        <Button 
                         icon={
                            <Icon type="font-awesome-5" name="pen" color={"black"} solid size={20} /> 
                                    }
                             type="clear"
                        />
                        <Button 
                            icon={
                                <Icon type="font-awesome-5" name="trash" color={"red"} solid size={20} />
                                    }
                                type="clear"
                            />    
                    </ListItem.Content>
                </ListItem>
             )}

        </View>
</View>
  )
}

import React from 'react'
import { View , Text} from 'react-native'

export default function Task() {
  return (
    <View style = {{flex : 1 , marginHorizontal : 20 , marginTop : 20,}}>
      <View style = {{flexDirection : 'row' , flex : 1 , borderBottomWidth : 3}}> 
      <View style = {{flex : 1 }}>
             <Text style = {{fontSize : 20 , fontWeight: 'bold'  }}>
                    No.
            </Text>
      </View>
        <View style = {{flex : 7  , alignItems : 'center'}}>
            <Text style = {{fontSize : 20 , fontWeight: 'bold' }}>
                    Task
            </Text>
        </View>

      </View>
    </View>
  )
}

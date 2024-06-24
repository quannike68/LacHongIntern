// import React from 'react';

// import {useNavigation} from '@react-navigation/native';
// import {Icon, Button} from '@rneui/themed';
// import {View} from 'react-native';

// export default function NavButtonAdminDepartment() {
//   const navigation: any = useNavigation();

//   return (
//     <View>
//       <View
//         style={{
//           backgroundColor: '#ffffff',
//           marginTop: 20,
//           justifyContent: 'space-around',
//           flexDirection: 'row',
//           alignItems: 'flex-end',
//         }}>
//         <Button
//           icon={<Icon type="feather" name="home" color={'black'} size={30} />}
//           type="clear"
//           onPress={() => {
//             navigation.navigate('HomeAdmin');
//           }}
//         />
//         <Button
//           icon={<Icon type="feather" name="user" color={'black'} size={30} />}
//           type="clear"
//           onPress={() => {
//             navigation.navigate('UserAdmin');
//           }}
//         />
//         <Button
//           icon={
//             <Icon type="feather" name="archive" color={'black'} size={30} />
//           }
//           type="clear"
//           onPress={() => navigation.navigate('ProjectAdmin')}
//         />

//         <Button
//           icon={
//             <Icon
//               type="font-awesome-5"
//               name="tasks"
//               color={'black'}
//               size={30}
//             />
//           }
//           type="clear"
//           onPress={() => navigation.navigate('TaskAdmin')}
//         />
//       </View>
//     </View>
//   );
// }

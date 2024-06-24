// import React from 'react';

// import {useNavigation} from '@react-navigation/native';
// import {Icon, Button} from '@rneui/themed';
// import {View} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function NavButton() {
//   const navigation: any = useNavigation();

//   const handleNagigateProfile = async () => {
//     const [role, idUser] = await Promise.all([
//       AsyncStorage.getItem('role'),
//       AsyncStorage.getItem('idUser'),
//     ]);
//     if (role === 'MANAGER') {
//       navigation.navigate('ProfileScreen', {idUser: idUser});
//     } else {
//       navigation.navigate('ProfileScreen', {idUser: idUser});
//     }
//   };

//   const handleNagigateProject = async () => {
//     const [idDepartment] = await Promise.all([
//       AsyncStorage.getItem('IdDepartment'),
//     ]);
//     console.log('====================================');
//     console.log(idDepartment);
//     console.log('====================================');
//     navigation.navigate('ProjectStaff', {idDepartments: idDepartment});
//   };

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
//           icon={<Icon type="feather" name="user" color={'black'} size={30} />}
//           type="clear"
//           onPress={handleNagigateProfile}
//         />
//         <Button
//           icon={<Icon type="feather" name="home" color={'black'} size={30} />}
//           type="clear"
//           onPress={() => {
//             navigation.navigate('ReportDepartment');
//           }}
//         />
//         <Button
//           icon={
//             <Icon type="feather" name="archive" color={'black'} size={30} />
//           }
//           type="clear"
//           onPress={handleNagigateProject}
//         />
//       </View>
//     </View>
//   );
// }

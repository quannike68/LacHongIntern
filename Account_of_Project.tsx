import {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Iconn from '../components/Iconn';
import {FAB} from '@rneui/themed';
import AccountItem from '../components/AccountItem';
const Account = ({navigation}: any) => {
  const [accounts, setAccounts] = useState([
    {
      id: '1',
      fullname: 'Trần Văn Diệp',
      role: 'Manager',
      department: 'Kĩ thuật',
    },
    {
      id: '2',
      fullname: 'Trần Văn A',
      role: 'Manager',
      department: 'Thiết Kế',
    },
    {id: '3', fullname: 'Trần Văn B', role: 'Staff', department: 'Kĩ thuật'},
    {id: '4', fullname: 'Trần Văn C', role: 'Staff', department: 'Kĩ thuật'},
    {id: '5', fullname: 'Trần Văn D', role: 'Staff', department: 'Kĩ thuật'},
    {id: '6', fullname: 'Trần Văn E', role: 'Staff', department: 'Kĩ thuật'},
  ]);
  const deleteAccount = (id: string) => {
    setAccounts(prevAccount =>
      prevAccount.filter(account => account.id !== id),
    );
  };
  const renderItem = (itemData: {
    item: {
      id: string;
      fullname: string;
      role: string;
      department: string;
    };
  }) => {
    const pressHandler = () => {
      navigation.navigate('AccountDetail', {
        FullName: itemData.item.fullname,
      });
    };
    const handleDelete = () => {
      deleteAccount(itemData.item.id);
    };
    return (
      <AccountItem
        fullname={itemData.item.fullname}
        role={itemData.item.role}
        department={itemData.item.department}
        onDelete={handleDelete}
        onPress={pressHandler}
      />
    );
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.AccountContainer}>
          <View style={styles.textHeader}>
            <Text style={[styles.text, styles.nameHeader]}>Name</Text>
            <Text style={[styles.text, styles.roleHeader]}>Role</Text>
            <Text style={[styles.text, styles.departmentHeader]}>
              Department
            </Text>
          </View>
          <View>
            <FlatList
              data={accounts}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <FAB
          visible={true}
          icon={{name: 'add'}}
          placement="right"
          color="white"
          size="small"
        />
      </View>
    </>
  );
};

export default Account;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'stretch',
  },
  AccountContainer: {
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    elevation: 4,
    borderRadius: 20,
    height: '70%',
    width: '90%',
  },
  textHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 10,
    width: '100%',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  nameHeader: {
    flex: 2,
    marginRight: 10,
  },
  roleHeader: {
    flex: 3,
    marginRight: 10,
  },
  departmentHeader: {
    flex: 3,
  },
  icon: {
    justifyContent: 'flex-end',
  },
});

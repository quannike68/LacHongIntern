import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {FAB} from '@rneui/themed';
import AccountItem from '../components/AccountItem';
import Add_Account_Of_Department from './Add_Account_of_Department';

const Account_of_Department = ({navigation}: any) => {
  const [accounts, setAccounts] = useState([
    {
      id: '1',
      avatar: '',
      fullname: 'Trần Văn Diệp',
      description: '',
      role: 'Manager',
      username: '',
      email: '',
      phonenumber: '',
      birthday: '01/01/2000',
    },
    {
      id: '2',
      avatar: '',
      fullname: 'Trần Văn A',
      description: '',
      role: 'Manager',
      username: '',
      email: '',
      phonenumber: '',
      birthday: '01/01/2000',
    },
    {
      id: '3',
      avatar: '',
      fullname: 'Trần Văn B',
      description: '',
      role: 'Staff',
      username: '',
      email: '',
      phonenumber: '',
      birthday: '01/01/2000',
    },
    {
      id: '4',
      avatar: '',
      fullname: 'Trần Văn C',
      description: '',
      role: 'Staff',
      username: '',
      email: '',
      phonenumber: '',
      birthday: '01/01/2000',
    },
    {
      id: '5',
      avatar: '',
      fullname: 'Trần Văn D',
      description: '',
      role: 'Staff',
      username: '',
      email: '',
      phonenumber: '',
      birthday: '01/01/2000',
    },
    {
      id: '6',
      avatar: '',
      fullname: 'Trần Văn E',
      description: '',
      role: 'Staff',
      username: '',
      email: '',
      phonenumber: '',
      birthday: '01/01/2000',
    },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  const deleteAccount = (id: string) => {
    setAccounts(prevAccount =>
      prevAccount.filter(account => account.id !== id),
    );
  };

  const addNewAccount = (newAccount: {
    avatar: string;
    fullname: string;
    description: string;
    role: string;
    username: string;
    email: string;
    phonenumber: string;
    birthday: string;
  }) => {
    setAccounts(prevAccounts => [
      ...prevAccounts,
      {...newAccount, id: (prevAccounts.length + 1).toString()},
    ]);
  };

  const renderItem = (itemData: {
    item: {
      id: string;
      avatar: string;
      fullname: string;
      description: string;
      role: string;
      username: string;
      email: string;
      phonenumber: string;
      birthday: string;
    };
  }) => {
    const pressHandler = () => {
      navigation.navigate('AccountDetail', {
        id: itemData.item.id,
        avatar: itemData.item.avatar,
        fullname: itemData.item.fullname,
        description: itemData.item.description,
        role: itemData.item.role,
        username: itemData.item.username,
        email: itemData.item.email,
        phonenumber: itemData.item.phonenumber,
        birthday: itemData.item.birthday,
      });
    };
    const handleDelete = () => {
      deleteAccount(itemData.item.id);
    };
    return (
      <AccountItem
        fullname={itemData.item.fullname}
        role={itemData.item.role}
        department=""
        onDelete={handleDelete}
        onPress={pressHandler}
      />
    );
  };

  return (
    <>
      <View style={styles.AccountContainer}>
        <View style={styles.textHeader}>
          <Text style={[styles.text, styles.nameHeader]}>Name</Text>
          <Text style={[styles.text, styles.roleHeader]}>Role</Text>
        </View>
        <View>
          <FlatList
            data={accounts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>

        <FAB
          visible={true}
          icon={{name: 'add'}}
          size="small"
          placement="right"
          color="white"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <Add_Account_Of_Department
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addNewAccount}
      />
    </>
  );
};

export default Account_of_Department;

const styles = StyleSheet.create({
  AccountContainer: {
    backgroundColor: 'white',
    padding: 10,
    elevation: 4,
    borderRadius: 20,
    width: '100%',
    height: '85%',
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
    marginLeft: 10,
  },
  roleHeader: {
    marginRight: 90,
    flex: 5,
  },
});

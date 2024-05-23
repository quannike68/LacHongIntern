import {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Iconn from '../components/Iconn';
import {FAB} from '@rneui/themed';
import AccountItem from '../components/AccountItem';
import Add_Account from './Add_Account';
const Account = ({navigation}: any) => {
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
      department: 'Kĩ thuật',
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
      department: 'Thiết Kế',
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
      department: 'Kĩ thuật',
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
      department: 'Kĩ thuật',
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
      department: 'Kĩ thuật',
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
      department: 'Kĩ thuật',
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
    department: string;
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
        <View style={styles.header}>
          <Iconn
            name="person"
            size={40}
            color={'#929CB1'}
            style={styles.headerAvatar}
          />
          <View>
            <Text style={styles.headerText}>Van Diep Tran</Text>
            <Text
              style={[
                styles.headerText,
                {color: '#929CB1', fontStyle: 'italic'},
              ]}>
              ADMIN
            </Text>
          </View>
          <Iconn
            name="logout"
            size={40}
            color={'#929CB1'}
            style={styles.headerLogout}
          />
        </View>
        <View style={styles.explainContainer}>
          <Text style={styles.explainText}>Account</Text>
        </View>
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
          onPress={() => setModalVisible(true)}
        />
        <Add_Account
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={addNewAccount}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#E9F7FB',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 4,
  },
  headerAvatar: {
    marginRight: 20,
    overflow: 'hidden',
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerLogout: {
    marginLeft: 150,
  },
  explainContainer: {
    backgroundColor: '#929CB1',
    borderRadius: 15,
    padding: 8,
    width: '70%',
    margin: 10,
    marginStart: 60,
  },
  explainText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  AccountContainer: {
    margin: 10,
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    elevation: 4,
    borderRadius: 20,
    height: '70%',
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

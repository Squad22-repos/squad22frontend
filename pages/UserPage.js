import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserInfo from '../components/UserInfoContainer';
import PostButton from '../components/CreatePost';
import Collapsible from '../components/Collapsible';

const UserPage = ({ route }) => {
  const { userToken, username } = route.params;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchAllUsersData();
  }, []);

  const fetchAllUsersData = () => {
    fetch('https://squad22-web-app-container.azurewebsites.net/api/usuarios', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`,
        }
      })
        .then((response) => {
          console.log(response.status); 
          return response.json();
        })
        .then((usersData) => {
          console.log(usersData);
          const user = usersData.find(user => user.username === username);
          if (user) {
            setUserData(user);
            console.log(user);
          }
        })
        .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      {userData ? <UserInfo userDataInThePage={userData} /> : <Text>Loading User Data...</Text>}
      <Collapsible title='Post'>
        {userToken ? <PostButton userToken={userToken} /> : <Text>Loading Post Button...</Text> }
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '8%',
    flexDirection: 'row',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UserPage;

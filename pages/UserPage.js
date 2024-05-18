import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'; 
import UserInfo from '../components/UserInfoContainer';
import PostButton from '../components/CreatePost';
import Collapsible from '../components/Collapsible';
import CommunityButton from '../components/CreateCommunity';
import PostSection from '../components/UserPostsSection';

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
        .then(response => response.json())
        .then(usersData => {
          console.log(usersData);
          const user = usersData.find(user => user.username === username);
          if (user) {
            setUserData(user);
            console.log(user);
          }
        })
        .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <ScrollView>
          <View style={styles.mainContentWrapper}>
            {userData ? <UserInfo userDataInThePage={userData} /> : <Text>Loading User Data...</Text>}
            {userData ? <PostSection userToken={userToken} userId={userData.id} username={userData.username} /> : <Text>Loading Post Data...</Text>}
          </View>
        </ScrollView>
      </View>
      <View style={styles.asideContainer}>
        <ScrollView>
          <View style={styles.aside}>
            <Collapsible title='Post'>
              {userToken ? <PostButton userToken={userToken} /> : <Text>Loading Post Button...</Text>}
            </Collapsible>
            <Collapsible title='Community'>
              {userToken ? <CommunityButton userToken={userToken} /> : <Text>Loading Community Button...</Text>}
            </Collapsible>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100vh',
  },
  mainContent: {
    width: '80%',
  },
  mainContentWrapper: {
    flexDirection: 'column',
    padding: '2%',
  },
  asideContainer: {
    width: '20%',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
  },
  aside: {
    alignItems: 'center',
    padding: '2%',
  },
  component: {
    marginBottom: 0,
  },
});

export default UserPage;

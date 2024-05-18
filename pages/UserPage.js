import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserPage = ({ route }) => {
  const { userToken, username } = route.params;
  console.log(userToken);
  console.log(username);

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
        .then((response) => {console.log(response.status); return response.json()})
        .then((usersData) => {
          console.log(usersData);
            let userData;

            for (let user of usersData) {
                if (user.username === username) {
                    userData = user;
                    console.log(userData);
                }
            }

        })
        .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default UserPage;

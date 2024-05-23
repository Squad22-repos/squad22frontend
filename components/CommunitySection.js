import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Community from './CommunityComponent';

const CommunitySection = ({ userId, userToken, username }) => {
    const [userCommunities, setUserCommunities] = useState(null);

    useEffect(() => {
        fetchAllUserCommunities();
    }, []);

    const fetchAllUserCommunities = () => {
        fetch(`https://squad22-web-app-container.azurewebsites.net/api/usuarios/${userId}/comunidades`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
        .then(response => response.json())
        .then(userCommunities => {
            console.log(userCommunities);
            setUserCommunities(userCommunities);
        })
        .catch(error => console.error(error));
    };

    return (
        <View style={styles.container}>
                {userCommunities && userCommunities.map((community, index) => (
                    <Community key={index} communityData={community} userToken={userToken} />
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        textAlign:'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default CommunitySection;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Community from './CommunityComponent';

const CommunitySection = ({ userId, userToken, username }) => {
    const [userCommunities, setUserCommunities] = useState(null);

    useEffect(() => {
        fetchAllUserCommunities();
    }, []);

    const fetchAllUserCommunities = () => {
        fetch(`http://localhost:8000api/usuarios/${userId}/comunidades`, {
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
            <Text style={styles.sectionTitle}>{username} Communities</Text>
            <ScrollView>
                {userCommunities && userCommunities.map((community, index) => (
                    <Community key={index} communityData={community} userToken={userToken} />
                ))}
            </ScrollView>
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

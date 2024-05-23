import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Post from './PostComponent';

const PostSection = ({ userId, userToken, username }) => {
    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {
        fetchAllUserPosts();
    }, []);

    const fetchAllUserPosts = () => {
        fetch(`https://squad22-web-app-container.azurewebsites.net/api/posts/usuario/${username}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
        })
        .then(response => response.json())
        .then(userPosts => {
            setUserPosts(userPosts.sort((a, b) => b.likes - a.likes));
        })
        .catch(error => console.error(error));
    };

    return (
        <View style={styles.container}>
                {userPosts && userPosts.map((post, index) => (
                    <Post key={index} postData={post} userToken={userToken} />
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

export default PostSection;

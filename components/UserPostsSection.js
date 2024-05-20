import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Post from './PostComponent';

const PostSection = ({ userId, userToken, username }) => {
    const [userPosts, setUserPosts] = useState(null);

    useEffect(() => {
        fetchAllUserPosts();
    }, []);

    const fetchAllUserPosts = () => {
        fetch(`http://localhost:8000/api/posts/usuario/${userId}`, {
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
            <Text style={styles.sectionTitle}>{username} Posts</Text>
            <ScrollView>
                {userPosts && userPosts.map((post, index) => (
                    <Post key={index} postData={post} userToken={userToken} />
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

export default PostSection;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const PostButton = ({userToken}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('');
    const [communityId, setCommunityId] = useState('');
    const [communityPostStatus, setCommunityPostStatus] = useState('');

    const createPost = () => {
        let likes = 0;

        console.log(JSON.stringify({ title, content, likes, visibility, communityId, communityPostStatus }));
        fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, likes, visibility, communityId, communityPostStatus }),
        })
        .then((response) => {console.log(response.status); return response.text()})
        .then((postId) => {
            console.log(postId);
    
            setTitle('');
            setContent('');
            setVisibility('');
            setCommunityId('');
            setCommunityPostStatus('');
        })
        .catch((error) => console.error(error));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Post Title"
            />
            <TextInput
                style={styles.input}
                onChangeText={setContent}
                value={content}
                placeholder="Post Content"
            />
            <TextInput
                style={styles.input}
                onChangeText={setVisibility}
                value={visibility}
                placeholder="Post Visibility"
            />
            <TextInput
                style={styles.input}
                onChangeText={setCommunityId}
                value={communityId}
                placeholder="Post In Community"
            />
            <TextInput
                style={styles.input}
                onChangeText={setCommunityPostStatus}
                value={communityPostStatus}
                placeholder="Post Status In Community"
            />
            <Button style={styles.submitButton} title="Send Post" onPress={createPost} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    input: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    submitButton: {
        margin: '4%'
    }
});

export default PostButton;
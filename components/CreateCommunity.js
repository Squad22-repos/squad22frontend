import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const CommunityButton = ({userToken}) => {
    const [creatorId, setCreatorId] = useState('');
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState('');

    const createCommunity = () => {
        let creator = {id : creatorId};

        console.log(JSON.stringify({ creator, title, theme, description, visibility }));
        fetch('http://localhost:8000/api/comunidades', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ creator, title, theme, description, visibility }),
        })
        .then((response) => {console.log(response.status); return response.text()})
        .then((communityId) => {
            console.log(communityId);
    
            setCreatorId('');
            setTitle('');
            setTheme('');
            setDescription('');
            setVisibility('');
        })
        .catch((error) => console.error(error));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Community Title"
            />
            <TextInput
                style={styles.input}
                onChangeText={setTheme}
                value={theme}
                placeholder="Community Theme"
            />
            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="Community Description"
            />
            <TextInput
                style={styles.input}
                onChangeText={setVisibility}
                value={visibility}
                placeholder="Community Visibility"
            />
            <Button style={styles.submitButton} title="Send Community" onPress={createCommunity} />
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

export default CommunityButton;
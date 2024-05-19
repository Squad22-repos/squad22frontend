import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Like = ({ postId, userToken }) => {
    const [hasLiked, setHasLiked] = useState(false);
    let action = hasLiked ? "unlike" : "like";
    let interactionObj = { actionType: action, actionStatus: null, isLiked: !hasLiked, isCommented: false };

    const findPostInteraction = () => {
        fetch(`https://squad22-web-app-container.azurewebsites.net/api/posts/interacao?postId=${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            let data;
            try {
                data = text ? JSON.parse(text) : null;
            } catch (error) {
                console.error('Error parsing JSON:', error);
                throw new Error('Invalid JSON response');
            }

            if (data) {
                interactionObj.isLiked = !data.isLiked;
                updateInteraction();
            } else {
                postInteraction();
            }
        })
        .catch(error => console.error('Fetch error:', error));
    };

    const updateInteraction = () => {
        fetch(`https://squad22-web-app-container.azurewebsites.net/api/posts/interacao/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify(interactionObj),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setHasLiked(!hasLiked);
        })
        .catch(error => console.error('Fetch error:', error));
    };

    const postInteraction = () => {
        fetch(`https://squad22-web-app-container.azurewebsites.net/api/posts/interacao/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify(interactionObj),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setHasLiked(!hasLiked);
        })
        .catch(error => console.error('Fetch error:', error));
    };

    return (
        <TouchableOpacity onPress={findPostInteraction}>
            <Icon name="arrow-up-outline" size={20} color="#000" />
        </TouchableOpacity>
    );
};

export default Like;

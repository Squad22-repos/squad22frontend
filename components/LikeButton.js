import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Like = ({ postId, userToken }) => {
    const [hasLiked, setHasLiked] = useState(false);

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
                postInteraction();
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                console.log(data);
                updateInteraction(!data.isLiked);
            }
        })
        .catch(error => console.error('Fetch error:', error));
    };

    const updateInteraction = (isLiked) => {
        const interactionObj = {
            actionType: isLiked ? "like" : "unlike",
            actionStatus: '',
            isLiked: isLiked,
            isCommented: false
        };
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
                console.log(response);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setHasLiked(isLiked);
        })
        .catch(error => console.error('Fetch error:', error));
    };

    const postInteraction = () => {
        const interactionObj = {
            actionType: "like",
            actionStatus: '',
            isLiked: true,
            isCommented: false
        };
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
            setHasLiked(true);
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

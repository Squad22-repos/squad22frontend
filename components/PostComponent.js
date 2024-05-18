import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Post = ({ postData }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{postData.title}</Text>
            <Text style={styles.content}>{postData.content}</Text>
            <Text style={styles.likes}>Likes: {postData.likes}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 16,
        marginVertical: 8,
    },
    likes: {
        fontSize: 14,
        color: 'gray',
    }
});

export default Post;

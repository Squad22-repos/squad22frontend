import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Community = ({ communityData, userToken }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{communityData.title}</Text>
            <Text style={styles.theme}>{communityData.theme}</Text>
            <Text style={styles.description}>{communityData.description}</Text>
            <Text style={styles.creator}>Creator: {communityData.creator.username}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    theme: {
        fontSize: 24,
        color: '#666',
        marginBottom: 10,
    },
    description: {
        fontSize: 20,
        color: '#999',
        marginBottom: 10,
    },
    creator: {
        fontSize: 16,
        color: '#777',
        marginBottom: 10,
    },
    sectionTitle: {
        textAlign:'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 16,
    },
});

export default Community;

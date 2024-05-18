import { useEffect, useState } from 'react';
import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PostSection from './UserPostsSection';

const UserInfo = ({ userDataInThePage }) => {
    const [specificInfo, setSpecificInfo] = useState(null);
    console.log(userDataInThePage);

    useEffect(() => {
        identifyUserType();
    }, []);

    const formatObject = (obj) => {
        const formatValue = (value) => {
          if (Array.isArray(value)) {
            return value.map(formatValue).join(', ');

          } else if (typeof value === 'object' && value !== null) {
            return formatObject(value);

          } else if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
            return value.slice(1, -1).split(',').map(v => v.trim()).join(', ');

          } else {
            return String(value);
          }
        };
    
        return Object.keys(obj)
            .map(key => `${key}: ${formatValue(obj[key])}`)
            .join(', ');
    };

    const identifyUserType = () => {
        if (userDataInThePage.accountType === 'ESTUDANTE') {
            setSpecificInfo(userDataInThePage.course);

        } else if (userDataInThePage.accountType === 'PROFESSOR') {
            setSpecificInfo(formatObject(userDataInThePage.courses).replace('0: ', '').replace(/"/g, ''));

        } else if (userDataInThePage.accountType === 'COMERCIAL') {
            setSpecificInfo(formatObject(userDataInThePage.stores).replace('0: ', '').replace(/"/g, ''));
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.username}>{userDataInThePage.username}</Text>
                <Text style={styles.fullName}>{userDataInThePage.name}</Text>
                <Text style={styles.specificData}>{specificInfo}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 200,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        overflow: 'hidden',
    }, 
    username: {
        fontSize: 40,
        fontFamily: 'Calibri',
    }, 
    fullName: {
        fontSize: 32,
    }, 
    specificData: {
        fontSize: 24,
    }
});

export default UserInfo;

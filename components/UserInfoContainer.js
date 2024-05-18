import { useEffect, useState } from 'react';
import React from "react";
import { View, Text, StyleSheet } from 'react-native';

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
            <Text style={styles.username}>{ userDataInThePage.username }</Text>
            <Text style={styles.fullName}>{ userDataInThePage.name }</Text>
            <Text  style={styles.specificData}>{ specificInfo }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }, 
    username: {
        fontSize: '40px',
        fontFamily: 'Calibri',
    }, 
    fullName: {
        fontSize: '32px',
    }, 
    specificData: {
        fontSize: '24px'
    }
});

export default UserInfo;
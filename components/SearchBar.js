import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SearchBar = ({ userToken }) => {
    const [searchSubject, setSearchSubject] = useState('');
    const navigation = useNavigation();

    const findUser = () => {
        fetch(`https://squad22-web-app-container.azurewebsites.net/api/usuarios/username/${searchSubject}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            }
            })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    navigation.navigate('UserPage', { userToken: userToken, username: searchSubject });
                } else {
                    alert('User Not Found')
                }
            })
            .catch(error => console.error(error));
    }

    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.input}
                onChangeText={setSearchSubject}
                value={searchSubject}
                placeholder="Search"
            />
            <TouchableOpacity style={styles.searchButton} onPress={findUser}>
                <Icon name="search" size={20} color="#000" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
    },
    input: {
        flex: 1,
    },
    searchButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchBar;

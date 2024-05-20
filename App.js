import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/Login';
import RegisterScreen from './pages/Register';
import UserPage from './pages/UserPage';
import SearchBar from './components/SearchBar';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen 
                    name="UserPage" 
                    component={UserPage} 
                    options={({ route }) => ({ 
                        headerRight: () => <SearchBar userToken={route.params?.userToken} />
                    })} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

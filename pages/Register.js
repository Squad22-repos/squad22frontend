import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker, StatusBar } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registration, setRegistration] = useState('');
  const [accountType, setAccountType] = useState('');
  const [course, setCourse] = useState('');
  const [classes, setClasses] = useState('');
  const [courses, setCourses] = useState('');
  const [degrees, setDegrees] = useState('');
  const [stores, setStores] = useState('');
  const [services, setServices] = useState('');
  const [opening, setOpening] = useState('');
  const [closing, setClosing] = useState('');

  const postRegister = () => {
    const body = {
      username,
      name,
      password,
      registration,
      accountType,
      activityStatus: 'ativo',
      course,
      classes: [],
      courses: [],
      degrees: [],
      stores: [],
      services: [],
      opening: '',
      closing: '',
    };

    if (accountType === 'ESTUDANTE') {
      body.course = course;
      body.classes = classes.split(',').map((item) => item.trim());
    } else if (accountType === 'PROFESSOR') {
      body.courses = courses.split(',').map((item) => item.trim());
      body.classes = classes.split(',').map((item) => item.trim());
      body.degrees = degrees.split(',').map((item) => item.trim());
    } else if (accountType === 'COMERCIAL') {
      body.stores = stores.split(',').map((item) => item.trim());
      body.services = services.split(',').map((item) => item.trim());
      body.opening = opening;
      body.closing = closing;
    }

    fetch('https://squad22-web-app-container.azurewebsites.net/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then(() => {
        setUsername('');
        setPassword('');
        setName('');
        setRegistration('');
        setAccountType('');
        setCourse('');
        setClasses('');
        setCourses('');
        setDegrees('');
        setStores('');
        setServices('');
        setOpening('');
        setClosing('');
        navigation.navigate('Login');
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          onChangeText={setRegistration}
          value={registration}
          placeholder="Registration"
        />
        <Picker
          selectedValue={accountType}
          style={styles.input}
          onValueChange={(itemValue) => setAccountType(itemValue)}
        >
          <Picker.Item label="Estudante" value="ESTUDANTE" />
          <Picker.Item label="Professor" value="PROFESSOR" />
          <Picker.Item label="Comercial" value="COMERCIAL" />
        </Picker>
        {accountType === 'ESTUDANTE' && (
          <>
            <TextInput
              style={styles.input}
              onChangeText={setCourse}
              value={course}
              placeholder="Course"
            />
            <TextInput
              style={styles.input}
              onChangeText={setClasses}
              value={classes}
              placeholder="Classes (comma separated)"
            />
          </>
        )}
        {accountType === 'PROFESSOR' && (
          <>
            <TextInput
              style={styles.input}
              onChangeText={setCourses}
              value={courses}
              placeholder="Courses (comma separated)"
            />
            <TextInput
              style={styles.input}
              onChangeText={setClasses}
              value={classes}
              placeholder="Classes (comma separated)"
            />
            <TextInput
              style={styles.input}
              onChangeText={setDegrees}
              value={degrees}
              placeholder="Degrees (comma separated)"
            />
          </>
        )}
        {accountType === 'COMERCIAL' && (
          <>
            <TextInput
              style={styles.input}
              onChangeText={setStores}
              value={stores}
              placeholder="Stores (comma separated)"
            />
            <TextInput
              style={styles.input}
              onChangeText={setServices}
              value={services}
              placeholder="Services (comma separated)"
            />
            <TextInput
              style={styles.input}
              onChangeText={setOpening}
              value={opening}
              placeholder="Opening time"
            />
            <TextInput
              style={styles.input}
              onChangeText={setClosing}
              value={closing}
              placeholder="Closing time"
            />
          </>
        )}
        <Button title="Register" onPress={postRegister} />
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '5%',
  },
});

export default RegisterScreen;

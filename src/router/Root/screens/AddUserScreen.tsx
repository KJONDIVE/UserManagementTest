// *** IMPORTS ***
import React, { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AddUserScreenNavigationProp } from '../RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './UsersScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useValidation from '../../../hooks/useValidation';
import { TextInput } from 'react-native-paper'

// *** TYPES ***
interface IProps {
    navigation: AddUserScreenNavigationProp;
}

const AddUsersScreen = ({ navigation }: IProps): JSX.Element => {
    const [username, setUserName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { validateFields, validateWithServer } = useValidation(
        username.trim(),
        login.trim(),
        password.trim(),
        confirmPassword.trim(),
        {
            checkConfirmPassword: true,
        }
    );

    // *** HEADER CONFIGURATION ***
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => addUserHandler()}>
                    <Ionicons name="checkmark-outline" size={25} color="white" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, username, login, password, confirmPassword]);

    // *** ADD USER HANDLER ***
    const addUserHandler = async () => {
        if (!validateFields()) return;

        const isValidOnServer = await validateWithServer();
        if (!isValidOnServer) return;

        const storedUsers = await AsyncStorage.getItem('users');
        let users = storedUsers ? JSON.parse(storedUsers) : [];

        if (users.find((user: User) => user.username === username)) {
            Alert.alert('Error', 'User with this login already exists');
            return;
        }

        const newUser: User = {
            username: username.trim(),
            login: login.trim(),
            password: password.trim()
        };
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Название"
                value={username}
                onChangeText={setUserName}
                underlineColor='white'
                textColor='white'
                activeUnderlineColor='white'
                placeholderTextColor="#A5A5A6"
                style={styles.input}
            />
            <TextInput
                placeholder="Логин"
                value={login}
                onChangeText={setLogin}
                underlineColor='white'
                textColor='white'
                activeUnderlineColor='white'
                placeholderTextColor="#A5A5A6"
                style={[styles.input, styles.inputMargin]}
            />
            <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showConfirmPassword}
                underlineColor='white'
                textColor='white'
                activeUnderlineColor='white'
                placeholderTextColor="#A5A5A6"
                textContentType="none"
                autoComplete="off"
                right={
                    <TextInput.Icon
                        icon={showConfirmPassword ? 'eye-off' : 'eye'}
                        color={'white'}
                        size={20}
                        onPress={() => setShowConfirmPassword(prev => !prev)}
                    />
                }
                style={[styles.input, styles.inputMargin]}
            />
            <TextInput
                placeholder="Повтор пароля"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                textColor='white'
                underlineColor='white'
                activeUnderlineColor='white'
                placeholderTextColor="#A5A5A6"
                textContentType="none"
                autoComplete="off"
                right={
                    <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        color={'white'}
                        size={20}
                        onPress={() => setShowPassword(prev => !prev)}
                    />
                }
                style={[styles.input, styles.inputMargin]}
            />
        </View>
    );
};

// *** STYLES ***
const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#141517',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontWeight: '600',
        paddingLeft: 10,
        fontSize: 16,
    },
    input: {
        fontSize: 18,
        color: 'white',
        backgroundColor: '#141517',
        borderColor: 'white',
    },
    inputMargin: {
        marginTop: 30,
    },
});

export default AddUsersScreen;
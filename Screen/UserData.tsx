import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import CustomTextInput from '../Components/Textinput';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const UserDataScreen: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userImage, setUserImage] = useState<string | null>(null);

    const [usernameError, setUsernameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [phoneNumberError, setPhoneNumberError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');


    const handleSave = async () => {

        if (!username.trim()) {
            setUsernameError('Username is required');
            return;
        } else {
            setUsernameError('');
        }

        const emailRegex = /\S+@\S+\.\S+/

        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
            return;
        } else {
            setEmailError('');
        }


        if (!phoneNumber.trim()) {
            setPhoneNumberError('Phone Number is required');
            return;
        } else if (phoneNumber.trim().length !== 10) {
            setPhoneNumberError('Phone Number should be exactly 10 digits');
            return;
        } else {
            setPhoneNumberError('');
        }


        if (!password.trim()) {
            setPasswordError('Password is required');
            return;
        } else if (password.trim().length < 6) {
            setPasswordError('Password should be at least 6 characters long');
            return;
        } else {
            setPasswordError('');
        }

        const userData = {
            username,
            email,
            phoneNumber,
            password,
            userImage
        }
        // console.log(userData)
        try {
            const response = await fetch("http://192.168.1.6:3000/UserData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            if (response.ok) {
                console.log('User data saved on the server');
                clearForm();
            } else {
                console.error('Failed to save user data on the server');
            }
        } catch (error) {
            console.error('Error while sending data to the server:', error);
        }
    };

    const clearForm = () => {
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setUserImage(null);
        setUsernameError('');
        setEmailError('');
        setPhoneNumberError('');
        setPasswordError('');
    };


    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setUserImage(result.uri);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.ImageView}>
                    <TouchableOpacity onPress={pickImage} style={styles.profileImageButton}>
                        {userImage ? (
                            <Image source={{ uri: userImage }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="account-circle" size={100} color="#1d4ef098" />
                                <MaterialIcons name="camera-alt" size={28} color="lightblue" style={styles.cameraIcon} />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <CustomTextInput
                    label="User Name"
                    placeholder="Enter username"
                    value={username}
                    onChangeText={(text: string) => setUsername(text)}
                    icon="person-outline"
                    error={usernameError}
                />
                <CustomTextInput
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChangeText={(text: string) => setEmail(text)}
                    keyboardType="email-address"
                    icon="mail-outline"
                    error={emailError}
                />
                <CustomTextInput
                    label="Phone Number"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChangeText={(text: string) => setPhoneNumber(text)}
                    keyboardType="phone-pad"
                    icon="call-outline"
                    maxLength={10}
                    error={phoneNumberError}
                />
                <CustomTextInput
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                    secureTextEntry
                    icon="lock-closed-outline"
                    error={passwordError}
                />
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.ButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        padding: 40,
        backgroundColor: "#c2dfeb",
    },
    profileImageButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#9fdaf3',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    profileImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 60,
    },
    saveButton: {
        backgroundColor: '#1d4ef0',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10
    },
    ButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "900"
    },
    ImageView: {
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        position: 'absolute',
        backgroundColor: '#00000057',
        paddingHorizontal: 25,
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
        bottom: 12
    },
});

export default UserDataScreen;

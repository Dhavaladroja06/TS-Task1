import React, { useState } from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

interface CustomTextInputProps extends TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    icon?: string;
    label?: string;
    secureTextEntry?: boolean;
    error?: string;
    maxLength?: number;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    placeholder,
    value,
    onChangeText,
    style,
    icon,
    label,
    secureTextEntry,
    error,
    maxLength,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View
                style={[
                    styles.inputContainer,
                    { borderColor: isFocused ? '#1d4ef0' : '#ccc' }, // Change border color when focused
                    error ? { borderColor: 'red' } : null, // Add error border color
                ]}
            ></View>
            <View style={styles.inputContainer}>
                {icon && <Ionicons name={icon} style={styles.icon} size={20} color={"#1d4ef0"} />}
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={"#1d4ef098"}
                    maxLength={maxLength}
                    {...props}
                    style={styles.input}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: "#1d4ef0"
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1d4ef0',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
        width: 20,
        height: 20,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 14,
        color: "#1d4ef0"
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default CustomTextInput;

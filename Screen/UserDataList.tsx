import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

interface UserData {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    userImage: string | null;
}

const UserDataList: React.FC = () => {
    const [userData, setUserData] = useState<UserData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.1.6:3000/UserData');
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const renderUserDataItem = ({ item }: { item: UserData }) => (
        <View style={styles.userDataItem}>
            {item.userImage ? (
                <Image source={{ uri: item.userImage }} style={styles.userImage} />
            ) : (
                <Image source={require("../assets/7309681.jpg")} style={styles.userImage} />
            )}
            <View style={styles.userData}>
                <Text style={styles.username}>Username: {item.username}</Text>
                <Text style={styles.email}>Email: {item.email}</Text>
                <Text style={styles.phoneNumber}>Phone Number: {item.phoneNumber}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                {userData.length > 0 ? (
                    <FlatList
                        data={userData}
                        renderItem={renderUserDataItem}
                        keyExtractor={(item) => item.username}
                        style={styles.userContainer}
                    />
                ) : (
                    <Text>No user data available</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9fdaf3',
        padding: 5,
    },
    userContainer: {
        backgroundColor: '#4ac7fd',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10
    },
    userDataItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingBottom: 10,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userData: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 14,
        color: '#333',
    },
    phoneNumber: {
        fontSize: 14,
        color: '#555',
    },
});

export default UserDataList;

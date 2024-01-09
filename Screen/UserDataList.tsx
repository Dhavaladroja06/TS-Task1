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
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {item.userImage ? (
                    <Image source={{ uri: item.userImage }} style={styles.userImage} />
                ) : (
                    <Image source={require("../assets/7309681.jpg")} style={styles.userImage} />
                )}
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Username: {item.username}</Text>
                    <Text style={styles.userInfoText}>Email: {item.email}</Text>
                    <Text style={styles.userInfoText}>Phone Number: {item.phoneNumber}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                {userData.length > 0 ? (
                    <FlatList
                        data={userData}
                        renderItem={renderUserDataItem}
                        keyExtractor={(item) => item.username}
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
        padding: 3,
        backgroundColor:"#9fdaf3"
    },
    cardContainer: {
        width: '100%',
    },
    card: {
        backgroundColor: '#4ac7fd',
        borderRadius: 8,
        marginBottom: 5,
        elevation: 4,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    userInfo: {
        flex: 1,
    },
    userInfoText: {
        fontSize: 16,
        marginBottom: 4,
    },
});

export default UserDataList;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image,Modal,TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserData {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    userImage: string | null;
}

const UserDataList: React.FC = () => {
    const [userData, setUserData] = useState<UserData[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [updatedUsername, setUpdatedUsername] = useState<string>('');
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState<string>('');

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

    const handleRemoveItem = async (id: number) => {
        try {
            const response = await fetch(`http://192.168.1.6:3000/UserData/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUserData((prevData) => prevData.filter((item) => item.id !== id));
            } else {
                console.error('Failed to delete user data');
            }
        } catch (error) {
            console.error('Error deleting user data:', error);
        }
    };

    const handleUpdateItem = (item: UserData) => {
        setSelectedUser(item);
        setUpdatedUsername(item.username);
        setUpdatedPhoneNumber(item.phoneNumber);
        setModalVisible(true);
    };

    const handleUpdate = async () => {
        if (selectedUser) {
            try {
                const response = await fetch(`http://192.168.1.6:3000/UserData/${selectedUser.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: updatedUsername,
                        phoneNumber: updatedPhoneNumber,
                    }),
                });
                if (response.ok) {
                    setUserData(prevData =>
                        prevData.map(item =>
                            item.id === selectedUser.id
                                ? { ...item, username: updatedUsername, phoneNumber: updatedPhoneNumber }
                                : item
                        )
                    );
                    setModalVisible(false);
                } else {
                    console.error('Failed to update user data');
                }
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        }
    };


    const renderUserDataItem = ({ item }: { item: UserData }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.ImageView}>
                    <View style={styles.profileImageButton}>
                        {item.userImage ? (
                            <Image source={{ uri: item.userImage }} style={styles.userImage} />
                        ) : (
                            <Image source={require("../assets/7309681.jpg")} style={styles.userImage} />
                        )}
                    </View>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoText}>Username: {item.username}</Text>
                    <Text style={styles.userInfoText}>Number: {item.phoneNumber}</Text>
                </View>
                <TouchableOpacity
                    style={styles.updateIcon}
                    onPress={() => handleUpdateItem(item)}
                >
                    <Ionicons name="create-outline" size={24} color="#1d4ef0" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.removeIcon}
                    onPress={() => handleRemoveItem(item.id)}
                >
                    <Ionicons name="trash-bin-outline" size={24} color="#1d4ef0" />
                </TouchableOpacity>
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
                        keyExtractor={(item) => item.id.toString()}
                        bounces={false}
                    />
                ) : (
                    <Text>No user data available</Text>
                )}
            </View>
            {selectedUser && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TextInput
                                style={styles.input}
                                value={updatedUsername}
                                onChangeText={text => setUpdatedUsername(text)}
                                placeholder="Enter new username"
                            />
                            <TextInput
                                style={styles.input}
                                value={updatedPhoneNumber}
                                onChangeText={text => setUpdatedPhoneNumber(text)}
                                placeholder="Enter new phone number"
                            />
                            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 3,
        backgroundColor: "#9fdaf3"
    },
    cardContainer: {
        width: '100%',
    },
    card: {
        backgroundColor: '#1d4ef060',
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
        resizeMode: 'cover',
        borderRadius: 60,
    },
    ImageView: {
        justifyContent: "center",
        alignItems: "center"
    },
    profileImageButton: {
        width: 70,
        height: 70,
        borderRadius: 60,
        backgroundColor: '#9fdaf3',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginRight: 15
    },
    userInfo: {
        flex: 1,
    },
    userInfoText: {
        fontSize: 16,
        marginBottom: 4,
        color: "#1d4ef0"
    },
    removeIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    updateIcon: {
        position: 'absolute',
        top: 15,
        right: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    updateButton: {
        backgroundColor: '#1d4ef0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ec4d4de5',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default UserDataList;

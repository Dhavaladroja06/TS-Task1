import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserDataScreen from '../Screen/UserData';
import UserDataList from '../Screen/UserDataList';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="UserDataScreen"
                component={UserDataScreen}
                options={{
                    title: 'User Data',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="UserDataList"
                component={UserDataList}
                options={{
                    title: 'User List',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserDataScreen from '../Screen/UserData';
import UserDataList from '../Screen/UserDataList';
const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="UserDataScreen" component={UserDataScreen} options={{ title: 'User Data' }} />
            <Tab.Screen name="UserDataList" component={UserDataList} options={{ title: 'User List' }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;

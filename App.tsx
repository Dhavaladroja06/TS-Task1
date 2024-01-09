import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './Navigations/ButtomTab';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;

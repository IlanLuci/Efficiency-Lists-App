import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './ui/pages/Home';
import List from './ui/pages/List';

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen navigation={navigation} name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen navigation={navigation} name="General" component={List} options={{headerShown: false}} />
        <Stack.Screen navigation={navigation} name="Today" component={List} options={{headerShown: false}} />
        <Stack.Screen navigation={navigation} name="Upcoming" component={List} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

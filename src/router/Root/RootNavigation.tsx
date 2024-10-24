import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UsersScreen from './UsersScreen';
import AddUserScreen from './AddUserScreen';

export type TNavigationStackProps = {
  UsersScreen: undefined;
  AddUserScreen: undefined;
};

const Stack = createNativeStackNavigator<TNavigationStackProps>();

const RootNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="UsersScreen">
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{
          title: 'StartScreen',
          headerShown: false,
          headerBackTitle: 'Назад',
        }}></Stack.Screen>
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{
          title: 'Login',
          headerShown: false,
          headerBackTitle: 'Назад',
        }}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootNavigation;
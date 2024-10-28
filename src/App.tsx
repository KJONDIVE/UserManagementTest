import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './router/Root/RootNavigation';
import { PaperProvider } from 'react-native-paper';

const App = (): JSX.Element => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

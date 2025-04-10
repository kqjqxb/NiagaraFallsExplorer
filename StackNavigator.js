import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeWaterfallScreen from './src/screens/HomeWaterfallScreen';
import WaterFallLoadingAppScreen from './src/screens/WaterFallLoadingAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, UserContext } from './src/context/UserContext';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { loadUserData } from './src/redux/userSlice';


const Stack = createNativeStackNavigator();

const NiagaraFallsExplorerStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { user, setUser } = useContext(UserContext);

  const [initializingWaterfallApp, setInitializingWaterfallApp] = useState(true);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    const loadWaterfallUser = async () => {
      try {
        const waterfallDeviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${waterfallDeviceId}`;
        const storedWaterfallUser = await AsyncStorage.getItem(storageKey);
        
        if (storedWaterfallUser) {
          setUser(JSON.parse(storedWaterfallUser));
        } 
      } catch (error) {
        console.error('Error load focus user', error);
      } finally {
        setInitializingWaterfallApp(false);
      }
    };
    loadWaterfallUser();
  }, [setUser]);

  if (initializingWaterfallApp) {
    return (
      <View style={{
        justifyContent: 'center',
        backgroundColor: '#1B5838',
        flex: 1,
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={'WaterFallLoadingAppScreen'}>
          <Stack.Screen name="Home" component={HomeWaterfallScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WaterFallLoadingAppScreen" component={WaterFallLoadingAppScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default NiagaraFallsExplorerStack;

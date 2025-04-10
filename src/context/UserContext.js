import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadWaterfallUser = async () => {
      try {
        const storedWaterfallUser = await AsyncStorage.getItem('currentUser');
        if (storedWaterfallUser) {
          setUser(JSON.parse(storedWaterfallUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadWaterfallUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

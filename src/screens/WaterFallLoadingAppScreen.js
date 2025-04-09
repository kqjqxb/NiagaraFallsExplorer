import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WaterFallLoadingAppScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 1500);
  }, []);

  return (
    <View style={{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#1B5838',
    }}>
      <Image
        style={{
          height: dimensions.height * 0.28,
          width: dimensions.height * 0.28,
        }}
        resizeMode='contain'
        source={require('../assets/images/splashImage.png')}
      />
    </View>
  );
};

export default WaterFallLoadingAppScreen;
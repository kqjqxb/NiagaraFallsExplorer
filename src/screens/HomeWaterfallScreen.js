import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import NiagaraFallsMyTripScreen from './NiagaraFallsMyTripScreen';
import NiagaraSettingsScreen from './NiagaraSettingsScreen';

import WaterfallQuizScreenScreen from './WaterfallQuizScreenScreen';
import encyclopediaOfWaterfallsData from '../components/encyclopediaOfWaterfallsData';
import NiagaraFallsArticlesScreen from './NiagaraFallsArticlesScreen';
import WaterfallObjectComponent from '../components/WaterfallObjectComponent';

const NiagaraScreensBttns = [
  {
    waterfallScreen: 'Home',
    title: 'Home',
    waterfallBottBtnImage: require('../assets/icons/niaButtons/niaHomeButton.png'),
    waterfallChoosenBottBtnImage: require('../assets/icons/selectedNiaButtons/niaHomeButton.png')
  },
  {
    waterfallScreen: 'MyTrip',
    title: 'My Trip',
    waterfallBottBtnImage: require('../assets/icons/niaButtons/niaTripButton.png'),
    waterfallChoosenBottBtnImage: require('../assets/icons/selectedNiaButtons/niaTripButton.png')
  },
  {
    waterfallScreen: 'WaterfallArticles',
    title: 'Articles',
    waterfallBottBtnImage: require('../assets/icons/niaButtons/niaArticleButton.png'),
    waterfallChoosenBottBtnImage: require('../assets/icons/selectedNiaButtons/niaArticleButton.png')
  },
  {
    waterfallScreen: 'WaterfallQuiz',
    title: 'Quiz',
    waterfallBottBtnImage: require('../assets/icons/niaButtons/niaQuizButton.png'),
    waterfallChoosenBottBtnImage: require('../assets/icons/selectedNiaButtons/niaQuizButton.png')
  },
  {
    waterfallScreen: 'WaterfallSettings',
    title: 'Settings',
    waterfallBottBtnImage: require('../assets/icons/niaButtons/niaSettingsButton.png'),
    waterfallChoosenBottBtnImage: require('../assets/icons/selectedNiaButtons/niaSettingsButton.png')
  },
];

const fontSFProTextHeavy = 'SFProText-Heavy';
const fontInterRegular = 'Inter-Regular';

const HomeWaterfallScreen = () => {

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedScreen, setSelectedScreen] = useState('Home');
  const [modalVisible, setModalVisible] = useState(false);

  const [isWaterfallQuizPlayed, setWaterfallQuizPlayed] = useState(false);
  const [selectedMarkAs, setSelectedMarkAs] = useState('');
  const [isVisibleMarkAs, setIsVisibleMarkAs] = useState(false);

  const [selectedWaterfall, setSelectedWaterfall] = useState(null);

  const saveSelectedPlaceStatus = async () => {
    if (selectedMarkAs && selectedMarkAs !== '') {
      if (selectedMarkAs === 'Planned') {
        try {
          const storedPlanned = await AsyncStorage.getItem('plannedPlaces');
          const plannedPlaces = storedPlanned ? JSON.parse(storedPlanned) : [];
          if (!plannedPlaces.includes(selectedWaterfall.id)) {
            plannedPlaces.push(selectedWaterfall.id);
          }
          await AsyncStorage.setItem('plannedPlaces', JSON.stringify(plannedPlaces));
        } catch (error) {
          console.error('Error saving plannedPlaces:', error);
        }
      } else if (selectedMarkAs === 'Visited') {
        try {
          const storedVisited = await AsyncStorage.getItem('visitedPlaces');
          const visitedPlaces = storedVisited ? JSON.parse(storedVisited) : [];
          if (!visitedPlaces.includes(selectedWaterfall.id)) {
            visitedPlaces.push(selectedWaterfall.id);
          }
          await AsyncStorage.setItem('visitedPlaces', JSON.stringify(visitedPlaces));
        } catch (error) {
          console.error('Error saving visitedPlaces:', error);
        }
      }
      setIsVisibleMarkAs(false);
      setSelectedMarkAs('');
    } else {
      setIsVisibleMarkAs(false);
    }
  };

  return (
    <View style={{
      alignItems: 'center',
      width: dimensions.width,
      backgroundColor: '#1B5838',
      flex: 1,
    }}>
      {selectedScreen === 'Home' ? (
        <SafeAreaView style={{
          height: dimensions.height * 0.9,
          width: dimensions.width,
        }}>
          <Text style={{
            color: 'white',
            alignSelf: 'center',
            fontFamily: fontSFProTextHeavy,
            fontSize: dimensions.width * 0.057,
            alignItems: 'center',
            textAlign: 'center',
          }}
          >
            Encyclopedia of Waterfalls
          </Text>

          <View style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: dimensions.width * 0.94,
            marginTop: dimensions.height * 0.03,
          }}>
            {encyclopediaOfWaterfallsData.map((niagaraPlace, index) => (
              <View key={niagaraPlace.id} style={{
                marginBottom: dimensions.height * 0.01,
                alignItems: 'center',
                height: dimensions.height * 0.2,
                backgroundColor: '#247B4D',
                borderRadius: dimensions.width * 0.06,
                width: dimensions.width * 0.45,
              }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedWaterfall(niagaraPlace);
                    setModalVisible(true);
                  }}
                  style={{
                    position: 'absolute',
                    top: dimensions.height * 0.005,
                    right: dimensions.width * 0.01,
                    zIndex: 555,
                  }}>
                  <Image
                    source={require('../assets/icons/arrow-right-up-Icon.png')}
                    style={{
                      width: dimensions.width * 0.12,
                      height: dimensions.width * 0.12,
                    }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>

                <Image
                  source={niagaraPlace.image}
                  style={{
                    borderTopRightRadius: dimensions.width * 0.06,
                    borderTopLeftRadius: dimensions.width * 0.06,
                    height: dimensions.height * 0.15,
                    width: dimensions.width * 0.45,
                  }}
                  resizeMode='stretch'
                />
                <Text style={{
                  marginLeft: dimensions.width * 0.03,
                  marginTop: dimensions.height * 0.015,
                  fontFamily: fontSFProTextHeavy,
                  fontSize: dimensions.width * 0.035,
                  alignSelf: 'flex-start',
                  color: 'white',
                  textAlign: 'left',
                }}
                >
                  {niagaraPlace.title}
                </Text>
              </View>
            ))}
          </View>
        </SafeAreaView>
      ) : selectedScreen === 'WaterfallSettings' ? (
        <NiagaraSettingsScreen setSelectedScreen={setSelectedScreen}
        />
      ) : selectedScreen === 'MyTrip' ? (
        <NiagaraFallsMyTripScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen}
        />
      ) : selectedScreen === 'WaterfallArticles' ? (
        <NiagaraFallsArticlesScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} />
      ) : selectedScreen === 'WaterfallQuiz' ? (
        <WaterfallQuizScreenScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} setWaterfallQuizPlayed={setWaterfallQuizPlayed} isWaterfallQuizPlayed={isWaterfallQuizPlayed} />
      ) : null}

      {!(selectedScreen === 'WaterfallQuiz' && isWaterfallQuizPlayed) && (
        <View
          style={{
            borderRadius: dimensions.width * 0.64,
            
            backgroundColor: '#247B4D',
            bottom: dimensions.height * 0.035,
            
            paddingBottom: dimensions.height * 0.01,
            
            justifyContent: 'space-between',
            height: dimensions.height * 0.079,
            
            width: dimensions.width * 0.95,
            
            zIndex: 3333,
            
            alignItems: 'center',
            alignSelf: 'center',
            
            position: 'absolute',
            flexDirection: 'row',
            paddingHorizontal: dimensions.width * 0.075,
          }}
        >
          {NiagaraScreensBttns.map((waterFallBtn, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedScreen(waterFallBtn.waterfallScreen)}
              style={{
                height: dimensions.height * 0.065,
                alignItems: 'center',
                textDecorationLineColor: 'white',
                borderTopWidth: selectedScreen === waterFallBtn.waterfallScreen ? dimensions.width * 0.005 : 0,
                textDecorationLine: 'underline',
                borderTopColor: 'white',
                textDecorationLineWidth: dimensions.width * 0.005,
                justifyContent: 'center',
              }}
            >
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: dimensions.height * 0.01,
              }}>
                <Image
                  source={selectedScreen === waterFallBtn.waterfallScreen ? waterFallBtn.waterfallChoosenBottBtnImage : waterFallBtn.waterfallBottBtnImage}
                  style={{
                    height: dimensions.height * 0.03,
                    textAlign: 'center',
                    width: dimensions.height * 0.03,
                  }}
                  resizeMode="contain"
                />
              </View>

              <Text
                style={{
                  maxWidth: dimensions.width * 0.25,
                  fontFamily: fontInterRegular,
                  color: selectedScreen === waterFallBtn.waterfallScreen ? 'white' : 'black',
                  fontWeight: 500,
                  fontSize: dimensions.width * 0.033,
                  alignSelf: 'flex-start',
                  marginTop: dimensions.height * 0.01,
                  textAlign: 'center',
                }}
              >
                {waterFallBtn.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: dimensions.width * 0.052,
            zIndex: 888,
            backgroundColor: '#1B5838',
            height: dimensions.height,
          }}
        >
          <SafeAreaView style={{
            width: dimensions.width,
            top: 0,
            zIndex: 999,
            position: 'absolute',
          }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setModalVisible(false);
                setSelectedWaterfall(null);
                setIsVisibleMarkAs(false);
                setSelectedMarkAs('');
              }}
              style={{
                position: 'absolute',
                top: dimensions.height * 0.07,
                left: dimensions.width * 0.05,
                zIndex: 555,
              }}>
              <Image
                source={require('../assets/icons/backNiagaraButton.png')}
                style={{
                  width: dimensions.width * 0.15,
                  height: dimensions.width * 0.15,
                }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </SafeAreaView>

          <ScrollView
            style={{
              width: dimensions.width,

              alignSelf: 'center',
            }}

            showsVerticalScrollIndicator={false}

            contentContainerStyle={{
              paddingBottom: dimensions.height * 0.15,
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <WaterfallObjectComponent selectedMarkedWaterfall={selectedWaterfall}/>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(selectedWaterfall?.waterfallMapsLink);
              }}
              style={{
                marginTop: dimensions.height * 0.015,
                width: dimensions.width * 0.9,
                backgroundColor: '#FEC10E',
                borderRadius: dimensions.width * 0.7,
                height: dimensions.height * 0.07,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{
                color: 'white',
                alignSelf: 'center',
                fontFamily: fontSFProTextHeavy,
                fontSize: dimensions.width * 0.05,
                textAlign: 'center',
              }}
              >
                Open in Maps
              </Text>
            </TouchableOpacity>

            {isVisibleMarkAs && (
              <View style={{
                width: dimensions.width * 0.9,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',

              }}>
                {['Planned', 'Visited'].map((status, index) => (
                  <TouchableOpacity
                    key={status}
                    onPress={() => {
                      if (selectedMarkAs === status) {
                        setSelectedMarkAs('');
                      } else setSelectedMarkAs(status);
                    }}
                    style={{
                      alignSelf: 'center',
                      width: dimensions.width * 0.43,
                      marginTop: dimensions.height * 0.015,
                      borderRadius: dimensions.width * 0.7,
                      height: dimensions.height * 0.07,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: selectedMarkAs === status ? '#FEC10E' : '#747474',
                    }}>
                    <Text style={{
                      color: 'white',
                      fontFamily: fontSFProTextHeavy,
                      fontSize: dimensions.width * 0.05,
                      textAlign: 'center',
                      alignSelf: 'center',
                    }}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                if(isVisibleMarkAs) {
                  saveSelectedPlaceStatus();
                } else setIsVisibleMarkAs(true);
              }}
              style={{
                backgroundColor: '#FEC10E',
                
                alignSelf: 'center',
                
                marginTop: dimensions.height * 0.015,
                
                borderRadius: dimensions.width * 0.7,
                
                height: dimensions.height * 0.07,
                
                alignItems: 'center',
                
                justifyContent: 'center',
                
                width: dimensions.width * 0.9,
              }}>
              <Text style={{
                color: 'white',
                fontFamily: fontSFProTextHeavy,
                alignSelf: 'center',
                fontSize: dimensions.width * 0.05,
                textAlign: 'center',
              }}>
                {!isVisibleMarkAs ? 'Mark as' : (!selectedMarkAs ? 'Hide' : 'Save')}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default HomeWaterfallScreen;

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import NiagaraFallsMyTripScreen from './NiagaraFallsMyTripScreen';
import NiagaraSettingsScreen from './NiagaraSettingsScreen';

import WaterfallQuizScreenScreen from './WaterfallQuizScreenScreen';
import encyclopediaOfWaterfallsData from '../components/encyclopediaOfWaterfallsData';
import NiagaraFallsArticlesScreen from './NiagaraFallsArticlesScreen';

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
    waterfallScreen: 'FocusTest',
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

const fontSFProTextRegular = 'SFProText-Regular';
const fontSFProTextHeavy = 'SFProText-Heavy';
const fontInterRegular = 'Inter-Regular';

const HomeWaterfallScreen = () => {

  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedScreen, setSelectedScreen] = useState('Home');
  const styles = createStyles(dimensions);

  const [modalVisible, setModalVisible] = useState(false);

  const [focusTestStarted, setFocusTestStarted] = useState(false);
  const [selectedMarkAs, setSelectedMarkAs] = useState('');
  const [isVisibleMarkAs, setIsVisibleMarkAs] = useState(false);

  const [focusHabits, setFocusHabits] = useState([])
  const [focusTime, setFocusTime] = useState(new Date());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPeriodicity, setSelectedPeriodicity] = useState('');
  const [selectedReminder, setSelectedReminder] = useState('');

  const [selectedFocusHabit, setSelectedFocusHabit] = useState(null);

  const [selectedWaterfall, setSelectedWaterfall] = useState(null);

  const saveFocusHabit = async () => {
    try {
      const exFocusBarHabbits = await AsyncStorage.getItem('focusHabits');
      const focusHabits = exFocusBarHabbits ? JSON.parse(exFocusBarHabbits) : [];
      const newFocusHabId = focusHabits.length > 0 ? Math.max(...focusHabits.map(fHabit => fHabit.id)) + 1 : 1;

      const fHabit = {
        id: newFocusHabId,
        title,
        description: description.replace(/\s/g, '').length === 0 ? 'No description' : description,
        time: focusTime,
        periodicity: selectedPeriodicity,
        reminder: selectedReminder,
        doneDays: [],
        notFullfilledDays: [],
        updatedDate: new Date(),
      };

      focusHabits.unshift(fHabit);
      await AsyncStorage.setItem('focusHabits', JSON.stringify(focusHabits));
      setFocusHabits(focusHabits);

      setTitle('');
      setDescription('');
      setFocusTime(new Date());
      setSelectedPeriodicity('');
      setSelectedReminder('');

      setModalVisible(false);
    } catch (error) {
      console.error('Error saving fHabit:', error);
    }
  };

  useEffect(() => {
    const loadFocusBarHabits = async () => {
      try {
        const exFocusBarHabbits = await AsyncStorage.getItem('focusHabits');
        if (exFocusBarHabbits) {
          setFocusHabits(JSON.parse(exFocusBarHabbits));
        }
      } catch (error) {
        console.error('Error loading focusHabits:', error);
      }
    };

    loadFocusBarHabits();
  }, [selectedScreen]);

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
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#1B5838',
      width: dimensions.width
    }}>
      {selectedScreen === 'Home' ? (
        <SafeAreaView style={{
          width: dimensions.width,
          height: dimensions.height * 0.9,
        }}>
          <Text style={{
            textAlign: 'center',
            fontFamily: fontSFProTextHeavy,
            fontSize: dimensions.width * 0.057,
            alignItems: 'center',
            alignSelf: 'center',
            color: 'white',
          }}
          >
            Encyclopedia of Waterfalls
          </Text>

          <View style={{
            width: dimensions.width * 0.94,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: dimensions.height * 0.03,
            flexWrap: 'wrap',
          }}>
            {encyclopediaOfWaterfallsData.map((niagaraPlace, index) => (
              <View key={niagaraPlace.id} style={{
                width: dimensions.width * 0.45,
                height: dimensions.height * 0.2,
                backgroundColor: '#247B4D',
                borderRadius: dimensions.width * 0.06,
                alignItems: 'center',
                marginBottom: dimensions.height * 0.01,
              }}>
                <TouchableOpacity
                  // activeOpacity={0.7}
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
                    width: dimensions.width * 0.45,
                    height: dimensions.height * 0.15,
                    borderTopLeftRadius: dimensions.width * 0.06,
                    borderTopRightRadius: dimensions.width * 0.06,
                  }}
                  resizeMode='stretch'
                />
                <Text style={{
                  textAlign: 'left',
                  fontFamily: fontSFProTextHeavy,
                  fontSize: dimensions.width * 0.035,
                  alignSelf: 'flex-start',
                  color: 'white',
                  marginTop: dimensions.height * 0.015,
                  marginLeft: dimensions.width * 0.03,
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
      ) : selectedScreen === 'FocusTest' ? (
        <WaterfallQuizScreenScreen setSelectedScreen={setSelectedScreen} selectedScreen={selectedScreen} setFocusTestStarted={setFocusTestStarted} focusTestStarted={focusTestStarted} />
      ) : null}

      {!(selectedScreen === 'FocusTest' && focusTestStarted) && selectedScreen !== 'HabitDetails' && (
        <View
          style={{
            paddingHorizontal: dimensions.width * 0.075,
            backgroundColor: '#247B4D',
            bottom: dimensions.height * 0.035,
            paddingBottom: dimensions.height * 0.01,
            zIndex: 3333,
            height: dimensions.height * 0.079,
            width: dimensions.width * 0.95,
            borderRadius: dimensions.width * 0.64,

            alignItems: 'center',
            alignSelf: 'center',
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {NiagaraScreensBttns.map((waterFallBtn, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedScreen(waterFallBtn.waterfallScreen)}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: dimensions.height * 0.065,
                borderTopWidth: selectedScreen === waterFallBtn.waterfallScreen ? dimensions.width * 0.005 : 0,
                textDecorationLine: 'underline',
                borderTopColor: 'white',
                textDecorationLineWidth: dimensions.width * 0.005,
                textDecorationLineColor: 'white',
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
                    textAlign: 'center',
                    width: dimensions.height * 0.03,
                    height: dimensions.height * 0.03,
                  }}
                  resizeMode="contain"
                />
              </View>

              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontFamily: fontInterRegular,
                  fontWeight: 500,
                  textAlign: 'center',
                  fontSize: dimensions.width * 0.033,
                  color: selectedScreen === waterFallBtn.waterfallScreen ? 'white' : 'black',
                  marginTop: dimensions.height * 0.01,
                  maxWidth: dimensions.width * 0.25,
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
            backgroundColor: '#1B5838',
            alignItems: 'center',
            width: '100%',
            zIndex: 888,
            paddingHorizontal: dimensions.width * 0.052,
            height: dimensions.height,
            alignSelf: 'center',
          }}
        >
          <SafeAreaView style={{
            position: 'absolute',
            top: 0,
            zIndex: 999,
            width: dimensions.width,
          }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setModalVisible(false);
                setSelectedWaterfall(null);
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
            <Image
              source={selectedWaterfall?.image}
              style={{
                width: dimensions.width,
                height: dimensions.height * 0.35,
                borderRadius: dimensions.width * 0.07,
              }}
              resizeMode='stretch'
            />

            <MapView
              style={{
                marginVertical: dimensions.height * 0.005,
                borderRadius: dimensions.width * 0.055,
                zIndex: 50,
                alignSelf: 'center',
                height: dimensions.height * 0.2,
                width: dimensions.width,
              }}
              region={{
                latitude: selectedWaterfall?.coordinates.latitude,
                longitude: selectedWaterfall?.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={selectedWaterfall?.coordinates}
                pinColor={"#247B4D"}
              />
            </MapView>

            <View style={{
              backgroundColor: '#247B4D',
              width: dimensions.width,
              borderRadius: dimensions.width * 0.07,
              paddingVertical: dimensions.height * 0.02,
              paddingHorizontal: dimensions.width * 0.05,
            }}>
              <Text style={{
                textAlign: 'left',
                fontFamily: fontSFProTextHeavy,
                fontSize: dimensions.width * 0.06,
                alignSelf: 'flex-start',
                color: 'white',
              }}
              >
                {selectedWaterfall?.title}
              </Text>

              <Text style={styles.modalTextTitles}>
                Coordinates
              </Text>

              <Text style={styles.modalTextofListBlock}>
                {selectedWaterfall?.coordinates.latitude}° N, {selectedWaterfall?.coordinates.longitude}° W
              </Text>

              <Text style={styles.modalTextTitles}>
                Geography and geology
              </Text>

              {selectedWaterfall?.geographyAndGeology.map((gAndG, index) => (
                <View key={gAndG.id} style={styles.modalRowView}>
                  <Text style={[styles.modalTextofListBlock, {
                    fontWeight: 400,
                    marginRight: dimensions.width * 0.02,
                  }]}>
                    •
                  </Text>
                  <Text style={styles.modalTextofListBlock}>
                    {gAndG.text}
                  </Text>
                </View>
              ))}

              <Text style={styles.modalTextTitles}>
                History of discovery
              </Text>

              {selectedWaterfall?.historyOfDiscovery.map((hOfD, index) => (
                <View key={hOfD.id} style={styles.modalRowView}>
                  <Text style={[styles.modalTextofListBlock, {
                    fontWeight: 400,
                    marginRight: dimensions.width * 0.02,
                  }]}>
                    •
                  </Text>
                  <Text style={styles.modalTextofListBlock}>
                    {hOfD.text}
                  </Text>
                </View>
              ))}

              <Text style={styles.modalTextTitles}>
                Features of the visit
              </Text>

              {selectedWaterfall?.fiaturesOfTheVisit.map((fiatureOfTeVisit, index) => (
                <View key={fiatureOfTeVisit.id} style={styles.modalRowView}>
                  <Text style={[styles.modalTextofListBlock, {
                    fontWeight: 400,
                    marginRight: dimensions.width * 0.02,
                  }]}>
                    •
                  </Text>
                  <Text style={styles.modalTextofListBlock}>
                    {fiatureOfTeVisit.text}
                  </Text>
                </View>
              ))}

              <Text style={styles.modalTextTitles}>
                Unique facts
              </Text>

              {selectedWaterfall?.uniqueFacts.map((uniqFact, index) => (
                <View key={uniqFact.id} style={styles.modalRowView}>
                  <Text style={styles.modalTextofListBlock}>
                    {uniqFact.id}.
                  </Text>
                  <Text style={styles.modalTextofListBlock}>
                    {uniqFact.text}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(selectedWaterfall?.waterfallMapsLink);
              }}
              style={{
                width: dimensions.width * 0.9,
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.7,
                height: dimensions.height * 0.07,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: dimensions.height * 0.015,
                backgroundColor: '#FEC10E',
              }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: fontSFProTextHeavy,
                fontSize: dimensions.width * 0.05,
                alignSelf: 'center',
                color: 'white',
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
                      width: dimensions.width * 0.43,
                      alignSelf: 'center',
                      borderRadius: dimensions.width * 0.7,
                      height: dimensions.height * 0.07,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: dimensions.height * 0.015,
                      backgroundColor: selectedMarkAs === status ? '#FEC10E' : '#747474',
                    }}>
                    <Text style={{
                      textAlign: 'center',
                      fontFamily: fontSFProTextHeavy,
                      fontSize: dimensions.width * 0.05,
                      alignSelf: 'center',
                      color: 'white',
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
                width: dimensions.width * 0.9,
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.7,
                height: dimensions.height * 0.07,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: dimensions.height * 0.015,
                backgroundColor: '#FEC10E',
              }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: fontSFProTextHeavy,
                fontSize: dimensions.width * 0.05,
                alignSelf: 'center',
                color: 'white',
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

const createStyles = (dimensions) => StyleSheet.create({
  modalTextTitles: {
    textAlign: 'left',
    fontFamily: fontSFProTextRegular,
    fontSize: dimensions.width * 0.045,
    alignSelf: 'flex-start',
    color: 'white',
    opacity: 0.7,
    marginTop: dimensions.height * 0.03,
  },
  modalTextofListBlock: {
    textAlign: 'left',
    fontFamily: fontSFProTextRegular,
    fontWeight: 700,
    fontSize: dimensions.width * 0.045,
    alignSelf: 'flex-start',
    color: 'white',
    marginTop: dimensions.height * 0.005,
    maxWidth: dimensions.width * 0.85,
  },
  modalRowView: {
    alignSelf: 'center',
    width: dimensions.width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default HomeWaterfallScreen;

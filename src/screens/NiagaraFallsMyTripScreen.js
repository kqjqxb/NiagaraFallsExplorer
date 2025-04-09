import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Modal,
  Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';

const fontSFProTextRegular = 'SFProText-Regular';
const fontSFProTextHeavy = 'SFProText-Heavy';

import encyclopediaOfWaterfallsData from '../components/encyclopediaOfWaterfallsData';

const NiagaraFallsMyTripScreen = ({ selectedScreen }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const styles = createStyles(dimensions);

  const [plannedPlaces, setPlannedPlaces] = useState([]);
  const [visitedPlaces, setVisitedPlaces] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarkedWaterfall, setSelectedMarkedWaterfall] = useState(null);
  const [deleteFrom, setDeleteFrom] = useState('');

  const loadTripArrays = async () => {
    try {
      const storedPlanned = await AsyncStorage.getItem('plannedPlaces');
      if (storedPlanned) {
        setPlannedPlaces(JSON.parse(storedPlanned));
      }
      const storedVisited = await AsyncStorage.getItem('visitedPlaces');
      if (storedVisited) {
        setVisitedPlaces(JSON.parse(storedVisited));
      }
    } catch (error) {
      console.error('Error loading trip arrays:', error);
    }
  };

  useEffect(() => {
    loadTripArrays();
  }, []);

  const removeSelectedPlace = async () => {
    if (!selectedMarkedWaterfall) return;
    try {
      if (deleteFrom === 'Visited') {
        const updatedVisited = visitedPlaces.filter(
          (id) => id !== selectedMarkedWaterfall.id
        );
        setVisitedPlaces(updatedVisited);
        await AsyncStorage.setItem('visitedPlaces', JSON.stringify(updatedVisited));
      } else if (deleteFrom === 'Planned') {
        const updatedPlanned = plannedPlaces.filter(
          (id) => id !== selectedMarkedWaterfall.id
        );
        setPlannedPlaces(updatedPlanned);
        await AsyncStorage.setItem('plannedPlaces', JSON.stringify(updatedPlanned));
      }
    } catch (error) {
      console.error('Error removing place:', error);
    }
    setModalVisible(false);
    setSelectedMarkedWaterfall(null);
    setDeleteFrom('');
  };

  return (
    <SafeAreaView style={{
      alignItems: 'center',
      width: dimensions.width,
      position: 'relative',
      flex: 1,
      justifyContent: 'flex-start',

    }} >
      <Text style={styles.screenTitleText}>
        My trip
      </Text>
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
          source={require('../assets/images/waterfallSettingsImage.png')}
          style={{
            width: dimensions.width * 0.7,
            height: dimensions.height * 0.3,
            alignSelf: 'center',

          }}
          resizeMode="contain"
        />

        <Text style={styles.leftTextStyles}>
          Planned trips
        </Text>

        {plannedPlaces.length > 0 ? (
          <>
            {encyclopediaOfWaterfallsData.filter(place =>
              plannedPlaces.includes(place.id)
            ).map((place, index) => (
              <View key={place.id} style={{
                width: dimensions.width * 0.93,
                height: dimensions.height * 0.3,
                backgroundColor: '#247B4D',
                borderRadius: dimensions.width * 0.06,
                alignSelf: 'center',
                marginBottom: dimensions.width * 0.015,
              }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMarkedWaterfall(place);
                    setDeleteFrom('Planned');
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
                  source={place.image}
                  style={{
                    width: '100%',
                    height: dimensions.height * 0.22,
                    borderTopLeftRadius: dimensions.width * 0.06,
                    borderTopRightRadius: dimensions.width * 0.06,
                  }}
                  resizeMode='stretch'
                />
                <Text style={{
                  textAlign: 'left',
                  fontFamily: fontSFProTextHeavy,
                  fontSize: dimensions.width * 0.04,
                  alignSelf: 'flex-start',
                  color: 'white',
                  marginTop: dimensions.height * 0.015,
                  marginLeft: dimensions.width * 0.03,
                }}
                >
                  {place.title}
                </Text>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.emptyGreenViewStyles}>
            <Text style={[styles.screenTitleText, {
              fontSize: dimensions.width * 0.04,
              fontFamily: fontSFProTextRegular,
              fontWeight: 700,
            }]}>
              You haven't added anything here yet
            </Text>
          </View>
        )}



        <Text style={styles.leftTextStyles}>
          Places visited
        </Text>

        {visitedPlaces.length > 0 ? (
          <>
            {encyclopediaOfWaterfallsData.filter(place =>
              visitedPlaces.includes(place.id)
            ).map((place, index) => (
              <View key={place.id} style={{
                width: dimensions.width * 0.93,
                height: dimensions.height * 0.3,
                backgroundColor: '#247B4D',
                borderRadius: dimensions.width * 0.06,
                alignSelf: 'center',
                marginBottom: dimensions.width * 0.015,
              }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMarkedWaterfall(place);
                    setDeleteFrom('Visited');
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
                  source={place.image}
                  style={{
                    width: '100%',
                    height: dimensions.height * 0.22,
                    borderTopLeftRadius: dimensions.width * 0.06,
                    borderTopRightRadius: dimensions.width * 0.06,
                  }}
                  resizeMode='stretch'
                />
                <Text style={{
                  textAlign: 'left',
                  fontFamily: fontSFProTextHeavy,
                  fontSize: dimensions.width * 0.04,
                  alignSelf: 'flex-start',
                  color: 'white',
                  marginTop: dimensions.height * 0.015,
                  marginLeft: dimensions.width * 0.03,
                }}
                >
                  {place.title}
                </Text>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.emptyGreenViewStyles}>
            <Text style={[styles.screenTitleText, {
              fontSize: dimensions.width * 0.04,
              fontFamily: fontSFProTextRegular,
              fontWeight: 700,
            }]}>
              You haven't added anything here yet
            </Text>
          </View>
        )}
      </ScrollView>


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
                setSelectedMarkedWaterfall(null);
                setDeleteFrom('');
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
              source={selectedMarkedWaterfall?.image}
              style={{
                width: dimensions.width,
                height: dimensions.height * 0.35,
                borderRadius: dimensions.width * 0.07,
              }}
              resizeMode='stretch'
            />

            <MapView
              style={{
                width: dimensions.width,
                marginVertical: dimensions.height * 0.005,
                height: dimensions.height * 0.2,
                zIndex: 50,
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.055,
              }}
              region={{
                longitudeDelta: 0.01,
                longitude: selectedMarkedWaterfall?.coordinates.longitude,
                latitudeDelta: 0.01,
                latitude: selectedMarkedWaterfall?.coordinates.latitude,
              }}
            >
              <Marker
                coordinate={selectedMarkedWaterfall?.coordinates}
                pinColor={"#247B4D"}
              />
            </MapView>

            <View style={{
              paddingHorizontal: dimensions.width * 0.05,
              width: dimensions.width,
              paddingVertical: dimensions.height * 0.02,
              borderRadius: dimensions.width * 0.07,
              backgroundColor: '#247B4D',
            }}>
              <Text style={{
                textAlign: 'left',
                color: 'white',
                fontFamily: fontSFProTextHeavy,
                fontSize: dimensions.width * 0.06,
                alignSelf: 'flex-start',
              }}
              >
                {selectedMarkedWaterfall?.title}
              </Text>

              <Text style={styles.modalTextTitles}>
                Coordinates
              </Text>

              <Text style={styles.modalTextofListBlock}>
                {selectedMarkedWaterfall?.coordinates.latitude}° N, {selectedMarkedWaterfall?.coordinates.longitude}° W
              </Text>

              <Text style={styles.modalTextTitles}>
                Geography and geology
              </Text>

              {selectedMarkedWaterfall?.geographyAndGeology.map((gAndG, index) => (
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

              {selectedMarkedWaterfall?.historyOfDiscovery.map((hOfD, index) => (
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

              {selectedMarkedWaterfall?.fiaturesOfTheVisit.map((fiatureOfTeVisit, index) => (
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

              {selectedMarkedWaterfall?.uniqueFacts.map((uniqFact, index) => (
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
                Linking.openURL(selectedMarkedWaterfall?.waterfallMapsLink);
              }}
              style={{
                backgroundColor: '#FEC10E',
                height: dimensions.height * 0.07,
                marginTop: dimensions.height * 0.015,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: dimensions.width * 0.7,
                alignSelf: 'center',
                width: dimensions.width * 0.9,
              }}>
              <Text style={{
                color: 'white',
                fontSize: dimensions.width * 0.05,
                fontFamily: fontSFProTextHeavy,
                textAlign: 'center',
                alignSelf: 'center',
              }}
              >
                Open in Maps
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={removeSelectedPlace}
              style={{
                width: dimensions.width * 0.9,
                backgroundColor: '#FF0000',
                borderRadius: dimensions.width * 0.7,
                justifyContent: 'center',
                height: dimensions.height * 0.07,
                alignSelf: 'center',
                marginTop: dimensions.height * 0.015,
                alignItems: 'center',
              }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: fontSFProTextHeavy,
                fontSize: dimensions.width * 0.05,
                alignSelf: 'center',
                color: 'white',
              }}>
                Remove from «{deleteFrom}»
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const createStyles = (dimensions) => StyleSheet.create({
  screenTitleText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: dimensions.width * 0.057,
    alignItems: 'center',
    fontFamily: fontSFProTextHeavy,
    color: 'white',
  },
  leftTextStyles: {
    marginBottom: dimensions.height * 0.01,
    fontFamily: fontSFProTextRegular,
    textAlign: 'left',
    fontSize: dimensions.width * 0.045,
    color: 'white',
    alignSelf: 'flex-start',
    marginTop: dimensions.height * 0.02,
    marginLeft: dimensions.width * 0.05,
  },
  emptyGreenViewStyles: {
    height: dimensions.height * 0.08,
    alignItems: 'center',
    borderRadius: dimensions.width * 0.06,
    backgroundColor: '#247B4D',
    justifyContent: 'center',
    width: dimensions.width * 0.9,
  },
  modalTextTitles: {
    marginTop: dimensions.height * 0.03,
    color: 'white',
    textAlign: 'left',
    fontSize: dimensions.width * 0.045,
    alignSelf: 'flex-start',
    opacity: 0.7,
    fontFamily: fontSFProTextRegular,
  },
  modalTextofListBlock: {
    alignSelf: 'flex-start',
    fontWeight: 700,
    fontSize: dimensions.width * 0.045,
    textAlign: 'left',
    color: 'white',
    marginTop: dimensions.height * 0.005,
    fontFamily: fontSFProTextRegular,
    maxWidth: dimensions.width * 0.85,
  },
  modalRowView: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: dimensions.width * 0.9,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default NiagaraFallsMyTripScreen;

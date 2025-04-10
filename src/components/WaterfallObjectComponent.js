import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const fontSFProTextRegular = 'SFProText-Regular';
const fontSFProTextHeavy = 'SFProText-Heavy';


const WaterfallObjectComponent = ({ selectedMarkedWaterfall }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const styles = createWaterfallComponentStyles(dimensions);

    return (
        <View style={{
            alignSelf: 'center',
            width: dimensions.width,
        }}>
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
        </View>
    );
};

const createWaterfallComponentStyles = (dimensions) => StyleSheet.create({
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

export default WaterfallObjectComponent;

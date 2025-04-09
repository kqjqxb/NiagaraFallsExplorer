import { ChevronRightIcon } from 'react-native-heroicons/solid';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Switch,
    Linking,
    Dimensions,
    Image,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const fontSFProTextHeavy = 'SFProText-Heavy';
const fontInterRegular = 'Inter-Regular';

const waterfallButtons = [
    {
        id: 2,
        waterfallBttnTitle: 'Privacy Policy',
        waterfallBttnLink: '',
    },
    {
        id: 1,
        waterfallBttnTitle: 'Terms of Use',
        waterfallBttnLink: '',
    },
    
]

const NiagaraSettingsScreen = ({ selectedScreen, }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const [isWaterfallNotificationOn, setIsWaterfallNotificationOn] = useState(false);
    const styles = createWaterfallSettingsStyles(dimensions);

    const waterfallNotificationSwitchAction = () => {
        const newWaterfallValue = !isWaterfallNotificationOn;
        setIsWaterfallNotificationOn(newWaterfallValue);
        saveWaterfallNotifications('isWaterfallNotificationOn', newWaterfallValue);
    };

    const saveWaterfallNotifications = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving settings:", error);
        }
    };

    useEffect(() => {
        loadWaterfallNotifications();
    }, [isWaterfallNotificationOn, selectedScreen]);

    const loadWaterfallNotifications = async () => {
        try {
            const waterfallNotificationValue = await AsyncStorage.getItem('isWaterfallNotificationOn');

            if (waterfallNotificationValue !== null) setIsWaterfallNotificationOn(JSON.parse(waterfallNotificationValue));
        } catch (error) {
            console.error("Error loading focus settings:", error);
        }
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            width: dimensions.width,
        }}>
            <Text style={styles.screenTitleText}>
                Settings
            </Text>

            <Image
                source={require('../assets/images/waterfallSettingsImage.png')}
                style={{
                    width: dimensions.width * 0.7,
                    height: dimensions.height * 0.3,
                    alignSelf: 'center',

                }}
                resizeMode="contain"
            />

            <View style={{
                width: dimensions.width * 0.93,
                borderRadius: dimensions.width * 0.06,
                backgroundColor: '#247B4D',
                alignSelf: 'center',

            }}>
                <View style={[styles.settingsButton, {
                    borderTopWidth: 0,
                }]}>
                    <Text style={styles.buttonsText}>
                        Notifications
                    </Text>

                    <Switch
                        trackColor={{ false: '#00440A', true: '#32D74B' }}
                        thumbColor={'#fff'}
                        ios_backgroundColor="#00440A"
                        onValueChange={waterfallNotificationSwitchAction}
                        value={isWaterfallNotificationOn}
                    />
                </View>

                {waterfallButtons.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.settingsButton}
                        onPress={() => {
                            Linking.openURL(item.waterfallBttnLink)
                        }}
                    >
                        <Text style={styles.buttonsText}>
                            {item.waterfallBttnTitle}
                        </Text>

                        <ChevronRightIcon size={dimensions.height * 0.025} color='white' />
                    </TouchableOpacity>
                ))}

            </View>


        </SafeAreaView>
    );
};

const createWaterfallSettingsStyles = (dimensions) => StyleSheet.create({
    settingsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: dimensions.width * 0.9,
        height: dimensions.height * 0.068,
        alignSelf: 'center',
        paddingHorizontal: dimensions.width * 0.05,
        alignItems: 'center',
        marginTop: dimensions.width * 0.015,
        width: '100%',
        borderTopColor: '#DBDBDB',
        borderTopWidth: dimensions.width * 0.002,
    },
    buttonsText: {
        color: 'white',
        fontSize: dimensions.width * 0.045,
        fontWeight: 700,
        fontFamily: fontInterRegular,
    },
    screenTitleText: {
        color: 'white',
        fontFamily: fontSFProTextHeavy,
        fontSize: dimensions.width * 0.057,
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
    }
});

export default NiagaraSettingsScreen;

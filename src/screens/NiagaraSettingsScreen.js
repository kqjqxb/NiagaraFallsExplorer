import { ChevronRightIcon } from 'react-native-heroicons/solid';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Linking,
    SafeAreaView,
    TouchableOpacity,
    Switch,
    Dimensions,
    Image,
    Text,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const fontSFProTextHeavy = 'SFProText-Heavy';
const fontInterRegular = 'Inter-Regular';

const waterfallButtons = [
    {
        id: 4,
        waterfallBttnTitle: 'Privacy Policy',
        waterfallBttnLink: '',
    },
    {
        id: 5,
        waterfallBttnTitle: 'Terms of Use',
        waterfallBttnLink: '',
    },
    
]

const NiagaraSettingsScreen = ({ selectedScreen, }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    const styles = createWaterfallSettingsStyles(dimensions);
    
    const [isWaterfallNotificationOn, setIsWaterfallNotificationOn] = useState(false);

    const saveWaterfallNotifications = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error saving settings:", error);
        }
    };

    const waterfallNotificationSwitchAction = () => {
        const newWaterfallValue = !isWaterfallNotificationOn;
        setIsWaterfallNotificationOn(newWaterfallValue);
        saveWaterfallNotifications('isWaterfallNotificationOn', newWaterfallValue);
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
                borderRadius: dimensions.width * 0.06,
                backgroundColor: '#247B4D',
                
                alignSelf: 'center',
                width: dimensions.width * 0.93,
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
        borderTopWidth: dimensions.width * 0.002,
        justifyContent: 'space-between',
        paddingHorizontal: dimensions.width * 0.05,
        height: dimensions.height * 0.068,
        marginTop: dimensions.width * 0.015,
        flexDirection: 'row',
        alignItems: 'center',
        width: dimensions.width * 0.9,
        width: '100%',
        borderTopColor: '#DBDBDB',
        alignSelf: 'center',
    },
    buttonsText: {
        color: 'white',
        fontSize: dimensions.width * 0.045,
        fontWeight: 700,
        fontFamily: fontInterRegular,
    },
    screenTitleText: {
        textAlign: 'center',
        fontFamily: fontSFProTextHeavy,
        alignItems: 'center',
        fontSize: dimensions.width * 0.057,
        color: 'white',
        alignSelf: 'center',
    }
});

export default NiagaraSettingsScreen;

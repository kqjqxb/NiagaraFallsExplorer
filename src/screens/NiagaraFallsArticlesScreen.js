
import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Modal,
    Text,
} from 'react-native';

import niagaraFallsArticlesData from '../components/niagaraFallsArticlesData';
import { ScrollView } from 'react-native-gesture-handler';

const fontSFProTextHeavy = 'SFProText-Heavy';
const fontInterRegular = 'Inter-Regular';

const NiagaraFallsArticlesScreen = ({ selectedScreen, }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const styles = createWaterfallSettingsStyles(dimensions);
    const [waterfallArticleModalVisible, setWaterfallArticleModalVisible] = useState(false);
    const [selectedWaterfallArticle, setSelectedWaterfallArticle] = useState(null);

    return (
        <SafeAreaView style={{
            flex: 1,
            width: dimensions.width,
        }}>
            <Text style={styles.screenTitleText}>
                Articles
            </Text>

            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: '#1B5838',
                    paddingBottom: dimensions.height * 0.05,
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop: dimensions.height * 0.02,
                    paddingBottom: dimensions.height * 0.12,
                }}
                showsVerticalScrollIndicator={false}
            >
                {niagaraFallsArticlesData.map((waterfallArticle) => (
                    <View key={waterfallArticle.id} style={{
                        width: dimensions.width * 0.93,
                        height: dimensions.height * 0.3,
                        backgroundColor: '#247B4D',
                        borderRadius: dimensions.width * 0.06,
                        alignSelf: 'center',
                        marginBottom: dimensions.width * 0.015,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedWaterfallArticle(waterfallArticle);
                                setWaterfallArticleModalVisible(true);
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
                            source={waterfallArticle.waterfallImage}
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
                            {waterfallArticle.title}
                        </Text>

                    </View>
                ))}
            </ScrollView>

            <Modal visible={waterfallArticleModalVisible} animationType="slide" transparent={true}>
                <View
                    style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: dimensions.height,
                        zIndex: 777,
                        paddingHorizontal: dimensions.width * 0.052,
                        backgroundColor: '#1B5838',
                    }}
                >
                    <SafeAreaView style={{
                        width: dimensions.width,
                        zIndex: 999,
                        top: 0,
                        position: 'absolute',
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                                setWaterfallArticleModalVisible(false);
                                setSelectedWaterfallArticle(null);
                            }}
                            style={{
                                left: dimensions.width * 0.05,
                                zIndex: 444,
                                top: dimensions.height * 0.07,
                                position: 'absolute',
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
                        }}
                    >
                        <Image
                            source={selectedWaterfallArticle?.waterfallImage}
                            style={{
                                width: dimensions.width,
                                height: dimensions.height * 0.35,
                                borderRadius: dimensions.width * 0.07,
                            }}
                            resizeMode='stretch'
                        />

                        <View style={{
                            paddingHorizontal: dimensions.width * 0.05,
                            marginTop: dimensions.height * 0.005,
                            width: dimensions.width,
                            borderRadius: dimensions.width * 0.07,
                            paddingVertical: dimensions.height * 0.02,
                            backgroundColor: '#247B4D',
                        }}>
                            <Text style={{
                                color: 'white',
                                fontFamily: fontSFProTextHeavy,
                                textAlign: 'left',
                                alignSelf: 'flex-start',
                                fontSize: dimensions.width * 0.06,
                            }}
                            >
                                {selectedWaterfallArticle?.title}
                            </Text>

                            <Text style={{
                                color: 'white',
                                fontFamily: fontInterRegular,
                                marginTop: dimensions.height * 0.02,
                                fontSize: dimensions.width * 0.04,
                                alignSelf: 'flex-start',
                                textAlign: 'left',
                            }}
                            >
                                {selectedWaterfallArticle?.waterfallArticle}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const createWaterfallSettingsStyles = (dimensions) => StyleSheet.create({
    screenTitleText: {
        color: 'white',
        fontFamily: fontSFProTextHeavy,
        fontSize: dimensions.width * 0.057,
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
    }
});

export default NiagaraFallsArticlesScreen;

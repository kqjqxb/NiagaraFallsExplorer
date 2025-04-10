import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Modal,
  Linking,
} from 'react-native';
import waterfallComplexQuestionsData from '../components/waterfallComplexQuestionsData';
import waterfallLightQuestionsData from '../components/waterfallLightQuestionsData';
import waterfallMediumQuestionsData from '../components/waterfallMediumQuestionsData';

const fontSFProTextRegular = 'SFProText-Regular';
const fontSFProTextHeavy = 'SFProText-Heavy';

const waterfallQuizLinks = [
  {
    id: 1,
    waterfallLink: 'https://www.worldwaterfalldatabase.com/',
  },
  {
    id: 2,
    waterfallLink: 'https://www.waterfallsoftheworld.com/',
  },
  {
    id: 3,
    waterfallLink: 'https://agupubs.onlinelibrary.wiley.com/journal/21699011',
  }
]

const WaterfallQuizScreenScreen = ({ setWaterfallQuizPlayed, isWaterfallQuizPlayed }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const styles = createWaterfallQuizStyles(dimensions);

  const [waterFallResultsQuizModalVisible, setWaterFallResultsQuizModalVisible] = useState(false);

  const [waterfallSelectedAnswer, setWaterfallSelectedAnswer] = useState(null);
  const [waterfallCurrentIndexOfQuestion, setWaterfallCurrentIndexOfQuestion] = useState(0);

  const [waterFallCorrects, setWaterFallCorrects] = useState(0);
  const [isDificultyVisible, setIsDificultyVisible] = useState(false);
  const [selectedDificulty, setSelectedDificulty] = useState('');
  const [isWaterfallButtonEnabled, setIsWaterfallButtonEnabled] = useState(true);
  const [waterfallResultLink, setWaterfallResultLink] = useState('');
  const [waterfallAnswerBorderColor, setWaterfallAnswerBorderColor] = useState('white');

  useEffect(() => {
    if (!isWaterfallQuizPlayed) {
      setWaterfallCurrentIndexOfQuestion(0);
      setWaterfallSelectedAnswer(null);
    }
  }, [isWaterfallQuizPlayed]);

  const handleFocusSelectAnswer = (isWaterfallCorrect) => {
    setWaterfallSelectedAnswer(null);
    if (isWaterfallCorrect) {
      setWaterFallCorrects(prev => prev + 1);
    }

    if (waterfallCurrentIndexOfQuestion === waterfallQuestionsData.length - 1) {
      setWaterfallQuizPlayed(false);
      setWaterFallResultsQuizModalVisible(true);
    } else setWaterfallCurrentIndexOfQuestion(prev => prev + 1);
  };

  useEffect(() => {
    if (selectedDificulty === 'Light') {
      setWaterfallResultLink(waterfallQuizLinks[0].waterfallLink);
    } else if (selectedDificulty === 'Medium') {
      setWaterfallResultLink(waterfallQuizLinks[1].waterfallLink);
    } else if (selectedDificulty === 'Hard') {
      setWaterfallResultLink(waterfallQuizLinks[2].waterfallLink);
    } else {
      setWaterfallResultLink('');
    }
  }, [selectedDificulty]);

  const getWaterfallQuizDificultyData = () => {
    switch (selectedDificulty) {
      case 'Light': {
        return waterfallLightQuestionsData;
      }
      case 'Medium': {
        return waterfallMediumQuestionsData;
      }
      case 'Hard': {
        return waterfallComplexQuestionsData;
      }
      default: {
        return [];
      }
    }
  }

  const waterfallQuestionsData = getWaterfallQuizDificultyData();

  return (
    <SafeAreaView style={{
      width: dimensions.width,
      paddingHorizontal: dimensions.width * 0.05,
      flex: 1,
    }}>
      {!isWaterfallQuizPlayed ? (
        <>
          <Text style={styles.screenTitleText}>
            Settings
          </Text>

          <Image
            source={require('../assets/images/waterfallSettingsImage.png')}
            style={{
              alignSelf: 'center',
              height: dimensions.height * 0.3,
              width: dimensions.width * 0.7,
              marginTop: dimensions.height * 0.03,
            }}
            resizeMode='contain'
          />

          {isDificultyVisible &&
            ['Light', 'Medium', 'Hard'].map((dificulty, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (selectedDificulty !== dificulty) {
                    setSelectedDificulty(dificulty);
                  } else setSelectedDificulty('');
                }}
                key={index} style={{
                  width: dimensions.width * 0.9,
                  alignSelf: 'center',
                  borderRadius: dimensions.width * 0.06,
                  backgroundColor: selectedDificulty === dificulty ? '#FEC10E' : '#247B4D',
                  marginTop: dimensions.height * 0.005,
                  height: dimensions.height * 0.06,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[styles.screenTitleText, {
                  fontSize: dimensions.width * 0.045,
                }]}>
                  {dificulty}
                </Text>
              </TouchableOpacity>
            ))
          }

          <TouchableOpacity
            disabled={isDificultyVisible && selectedDificulty === ''}
            onPress={() => {
              if (!isDificultyVisible)
                setIsDificultyVisible(true);
              else setWaterfallQuizPlayed(true);
            }}
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: dimensions.height * 0.03,
            }}>
            <Image
              source={require('../assets/images/niagaraPlayQuiz.png')}
              style={{
                alignSelf: 'center',
                height: dimensions.height * 0.15,
                width: dimensions.height * 0.15,
                opacity: isDificultyVisible && selectedDificulty === '' ? 0.3 : 1,
              }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </>
      ) : isWaterfallQuizPlayed ? (
        <View style={{
          alignSelf: 'center',
          width: dimensions.width,
        }}>
          <View style={{
            width: dimensions.width * 0.9,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{
              width: dimensions.width * 0.23
            }}></View>

            <TouchableOpacity onPress={() => {
              setWaterfallQuizPlayed(false);
              setWaterfallCurrentIndexOfQuestion(0);
              setWaterfallSelectedAnswer(null);
              setWaterFallCorrects(0);
              setSelectedDificulty('');
              setIsDificultyVisible(false);
            }}>
              <Image
                source={require('../assets/images/closeWaterfallQuiz.png')}
                style={{
                  width: dimensions.height * 0.06,
                  height: dimensions.height * 0.06,
                  right: -dimensions.width * 0.05,
                }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>

          <Image
            source={require('../assets/images/waterfallSettingsImage.png')}
            style={{
              alignSelf: 'center',
              height: dimensions.height * 0.2,
              width: dimensions.width * 0.4,
            }}
            resizeMode='contain'
          />

          <View style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            height: dimensions.height * 0.015,
            borderRadius: dimensions.width * 0.6,
            backgroundColor: '#002A06',
          }}>
            <View style={{
              width: dimensions.width * 0.9 * (waterfallCurrentIndexOfQuestion / waterfallQuestionsData.length),
              alignSelf: 'flex-start',
              height: dimensions.height * 0.015,
              borderRadius: dimensions.width * 0.6,
              backgroundColor: '#FEC10E',
            }}>
            </View>
          </View>


          <Text style={[styles.screenTitleText, {
            alignSelf: 'flex-end',
            marginRight: dimensions.width * 0.05,
            marginTop: dimensions.height * 0.007,
            fontSize: dimensions.width * 0.05,
          }]}>
            {waterfallCurrentIndexOfQuestion + 1}/{waterfallQuestionsData.length}
          </Text>

          <Text style={[styles.screenTitleText, { fontSize: dimensions.width * 0.049, maxWidth: dimensions.width * 0.9, marginTop: dimensions.height * 0.021 },]}>
            {waterfallQuestionsData[waterfallCurrentIndexOfQuestion]?.waterfallQuestion}
          </Text>

          <View style={{ marginTop: dimensions.height * 0.02, }}></View>

          {waterfallQuestionsData[waterfallCurrentIndexOfQuestion]?.waterfallAnswers.map((waterAnsw, index) => (
            <TouchableOpacity
              disabled={!isWaterfallButtonEnabled}
              onPress={() => {
                setWaterfallAnswerBorderColor(waterAnsw.isWaterfallCorrect ? '#22FF00' : '#FF0000');
                setWaterfallSelectedAnswer(waterAnsw);
                setIsWaterfallButtonEnabled(false);
                setTimeout(() => {
                  handleFocusSelectAnswer(waterAnsw.isWaterfallCorrect);
                  setIsWaterfallButtonEnabled(true);
                }, 1000)
              }}
              key={index}
              style={{
                borderRadius: dimensions.width * 0.6,
                borderColor: waterfallSelectedAnswer === waterAnsw ? waterfallAnswerBorderColor : 'transparent',
                flexDirection: 'row',
                backgroundColor: '#247B4D',
                alignItems: 'center',
                paddingHorizontal: dimensions.width * 0.02,
                marginTop: dimensions.height * 0.008,
                width: dimensions.width * 0.9,
                justifyContent: 'flex-start',
                alignSelf: 'center',
                height: dimensions.height * 0.069,
                borderWidth: dimensions.width * 0.01,
              }}>
              <View style={{
                width: dimensions.height * 0.045,
                height: dimensions.height * 0.045,
                borderRadius: dimensions.width * 0.6,
                backgroundColor: '#FEC10E',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: dimensions.width * 0.03,
              }}>
                <Text style={[styles.screenTitleText, { fontSize: dimensions.width * 0.05, }]}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={[styles.screenTitleText, { fontSize: dimensions.width * 0.042, textAlign: 'left', maxWidth: dimensions.width * 0.7, }]}>
                {waterAnsw.waterfallAnswer}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}

      <Modal visible={waterFallResultsQuizModalVisible} transparent={true} animationType="slide">
        <SafeAreaView style={{
          width: dimensions.width,
          height: dimensions.height,
          alignSelf: 'center',
          backgroundColor: '#1B5838',
          flex: 1,
        }}>
          <TouchableOpacity
            onPress={() => {
              setWaterFallResultsQuizModalVisible(false);
              setWaterfallQuizPlayed(false);
              setWaterfallCurrentIndexOfQuestion(0);
              setWaterfallSelectedAnswer(null);
              setWaterFallCorrects(0);
              setSelectedDificulty('');
              setIsDificultyVisible(false);
              setWaterfallResultLink('');
            }}
            style={{
              alignSelf: 'flex-end',
              marginRight: dimensions.width * 0.05,
            }}>
            <Image
              source={require('../assets/images/closeWaterfallQuiz.png')}
              style={{
                width: dimensions.height * 0.06,
                height: dimensions.height * 0.06,

              }}
              resizeMode='contain'
            />
          </TouchableOpacity>

          <Image
            source={require('../assets/images/waterfallSettingsImage.png')}
            style={{
              alignSelf: 'center',
              height: dimensions.height * 0.25,
              width: dimensions.width * 0.5,
              marginTop: dimensions.height * 0.007,
            }}
            resizeMode='contain'
          />

          <Text style={[styles.screenTitleText, {
            fontSize: dimensions.width * 0.06,
          }]}
          >
            You answered correctly
          </Text>

          <Text style={[styles.screenTitleText, {
            marginTop: dimensions.height * 0.01,
            paddingHorizontal: dimensions.width * 0.07,
            maxWidth: dimensions.width * 0.8,
            alignSelf: 'center',
            fontSize: dimensions.width * 0.1,
          }]}
          >
            {waterFallCorrects}/10
          </Text>

          <View style={{
            paddingHorizontal: dimensions.width * 0.05,
            alignSelf: 'center',
            borderRadius: dimensions.width * 0.06,
            paddingBottom: dimensions.height * 0.01,
            paddingTop: dimensions.height * 0.02,
            width: dimensions.width * 0.9,
            marginTop: dimensions.height * 0.05,
            backgroundColor: '#247B4D',
          }}>
            <Text style={[styles.screenTitleText, {
              fontSize: dimensions.width * 0.04,
              fontFamily: fontSFProTextRegular,
              fontWeight: 700,
            }]}
            >
              Sources for further reading
            </Text>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(waterfallResultLink);
              }}
              style={{
                backgroundColor: '#FEC10E',
                alignItems: 'center',
                borderRadius: dimensions.width * 0.7,
                height: dimensions.height * 0.06,
                justifyContent: 'center',
                width: dimensions.width * 0.85,
                marginTop: dimensions.height * 0.015,
                alignSelf: 'center',
              }}>
              <Text style={{
                color: 'white',
                fontFamily: fontSFProTextHeavy,
                alignSelf: 'center',
                fontSize: dimensions.width * 0.05,
                textAlign: 'center',
              }}>
                Link
              </Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const createWaterfallQuizStyles = (dimensions) => StyleSheet.create({
  screenTitleText: {
    alignSelf: 'center',
    fontFamily: fontSFProTextHeavy,
    alignItems: 'center',
    fontSize: dimensions.width * 0.057,
    color: 'white',
    textAlign: 'center',
  }
});

export default WaterfallQuizScreenScreen;

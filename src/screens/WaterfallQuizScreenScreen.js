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
import focusTestQuestionsData from '../components/focusTestQuestionsData';
import focusTestProductivityTexts from '../components/focusTestProductivityTexts';
import { XMarkIcon } from 'react-native-heroicons/solid';

const fontTTTravelsBlack = 'TTTravels-Black';
const fontTTTravelsRegular = 'TTTravels-Regular';

const fontSFProTextRegular = 'SFProText-Regular';
const fontSFProTextHeavy = 'SFProText-Heavy';
const fontInterRegular = 'Inter-Regular';

const WaterfallQuizScreenScreen = ({ setFocusTestStarted, focusTestStarted }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const styles = createStyles(dimensions);

  const [resultsFocusModalVisible, setResultsFocusModalVisible] = useState(false);

  const [selectedFocusAnswer, setSelectedFocusAnswer] = useState(null);
  const [currentFocusTestQuestIndex, setCurrentFocusTestQuestIndex] = useState(0);

  const [answersPoints, setAnswersPoints] = useState(0);


  useEffect(() => {
    if (!focusTestStarted) {
      setCurrentFocusTestQuestIndex(0);
      setSelectedFocusAnswer(null);
    }
  }, [focusTestStarted]);

  const handleFocusSelectAnswer = () => {


    setSelectedFocusAnswer(null);
    if (currentFocusTestQuestIndex === focusTestQuestionsData.length - 1) {
      setFocusTestStarted(false);
      setResultsFocusModalVisible(true);

    } else setCurrentFocusTestQuestIndex(prev => prev + 1);
  };

  return (
    <SafeAreaView style={{
      width: dimensions.width,
      paddingHorizontal: dimensions.width * 0.05,
      flex: 1,
    }}>
      {!focusTestStarted ? (
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
              marginTop: dimensions.height * 0.06,
            }}
            resizeMode='contain'
          />

          <TouchableOpacity
            onPress={() => {
              setFocusTestStarted(true);
            }}
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: dimensions.height * 0.05,
            }}>
            <Image
              source={require('../assets/images/niagaraPlayQuiz.png')}
              style={{
                alignSelf: 'center',
                height: dimensions.height * 0.15,
                width: dimensions.height * 0.15,

              }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </>
      ) : focusTestStarted ? (
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

            <Text style={styles.screenTitleText}
            >
              {currentFocusTestQuestIndex + 1}/{focusTestQuestionsData.length}
            </Text>

            <TouchableOpacity onPress={() => {
              setFocusTestStarted(false);
              setCurrentFocusTestQuestIndex(0);
              setSelectedFocusAnswer(null);
              setAnswersPoints(0);
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
              width: dimensions.width * 0.9 * (currentFocusTestQuestIndex / focusTestQuestionsData.length),
              alignSelf: 'flex-start',
              height: dimensions.height * 0.015,
              borderRadius: dimensions.width * 0.6,
              backgroundColor: '#FEC10E',
            }}>
            </View>
          </View>

          <Text style={[styles.screenTitleText, { fontSize: dimensions.width * 0.05, maxWidth: dimensions.width * 0.88, marginTop: dimensions.height * 0.01 },]}
          >
            {focusTestQuestionsData[currentFocusTestQuestIndex]?.question}
          </Text>

          <View style={{ marginTop: dimensions.height * 0.02, }}></View>

          {focusTestQuestionsData[currentFocusTestQuestIndex]?.answers.map((focusAnsw, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedFocusAnswer(focusAnsw);
                setTimeout(() => {
                  handleFocusSelectAnswer();
                }, 1000)
              }}
              key={index}
              style={{
                borderRadius: dimensions.width * 0.6,
                borderColor: selectedFocusAnswer === focusAnsw ? 'white' : 'transparent',
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
                <Text
                  style={[styles.screenTitleText, { fontSize: dimensions.width * 0.05, }]}
                >
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text
                style={[styles.screenTitleText, { fontSize: dimensions.width * 0.042, textAlign: 'left', maxWidth: dimensions.width * 0.7, }]}
              >
                {focusAnsw.answer}
              </Text>
            </TouchableOpacity>
          ))}


        </View>
      ) : null}

      <Modal visible={resultsFocusModalVisible} transparent={true} animationType="slide">
        <SafeAreaView style={{
          width: dimensions.width,
          height: dimensions.height,
          alignSelf: 'center',
          backgroundColor: '#1B5838',
          flex: 1,
        }}>
          <TouchableOpacity
            onPress={() => {
              setResultsFocusModalVisible(false);
              setFocusTestStarted(false);
              setCurrentFocusTestQuestIndex(0);
              setSelectedFocusAnswer(null);
              setAnswersPoints(0);
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
            fontSize: dimensions.width * 0.1,
            maxWidth: dimensions.width * 0.8,
            alignSelf: 'center',
            paddingHorizontal: dimensions.width * 0.07,
            marginTop: dimensions.height * 0.01,
          }]}
          >
            {answersPoints}/10
          </Text>

          <View style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            borderRadius: dimensions.width * 0.06,
            backgroundColor: '#247B4D',
            paddingTop: dimensions.height * 0.02,
            paddingBottom: dimensions.height * 0.01,
            paddingHorizontal: dimensions.width * 0.05,
            marginTop: dimensions.height * 0.05,
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
                Linking.openURL('https://www.worldwaterfalldatabase.com/');
              }}
              style={{
                width: dimensions.width * 0.85,
                alignSelf: 'center',
                borderRadius: dimensions.width * 0.7,
                height: dimensions.height * 0.06,
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
                Link
              </Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const createStyles = (dimensions) => StyleSheet.create({
  mainTextBlack: {
    textAlign: 'center',
    fontFamily: fontTTTravelsBlack,
    fontSize: dimensions.width * 0.06,
    alignItems: 'center',
    alignSelf: 'center',
    color: '#000000',
    maxWidth: dimensions.width * 0.7,
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

export default WaterfallQuizScreenScreen;

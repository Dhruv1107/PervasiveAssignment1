import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Text,
  ScrollView,
} from 'react-native';

import colors from '../constants/colors';
import {ConversionInput} from '../components/ConversionInput';
import {Button} from '../components/Button';
import {KeyboardSpacer} from '../components/KeyboardSpacer';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  content: {
    paddingTop: screen.height * 0.1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoBackground: {
    width: screen.width / 0.45,
    height: screen.width * 0.45,
  },
  logo: {
    position: 'absolute',
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  textHeader: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
  },
  header: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
  },
  sideHeading: {
    textAlign: 'center',
    width: screen.width / 5,
    marginTop: 20,
  },
  textBox: {
    textAlign: 'center',
    width: screen.width / 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: colors.red,
    width: screen.width / 2,
    marginLeft: screen.width / 3.2,
  },
  buttonText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: colors.white,
  },
  sideBox: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: screen.width / 5,
    height: screen.height / 15,
    marginTop: 20,
    backgroundColor: colors.black,
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 10,
    marginLeft: 20,
    marginBottom: 20,
    paddingBottom: 20,
  },
  hidden: {
    width: 0,
    height: 0,
  },
});

export default ({route = {}}) => {
  const params = route.params || {};
  const {
    title,
    baseDefaultFirst,
    baseDefaultSecond,
    quoteDefaultFirst,
    quoteDefaultSecond,
  } = params;

  const [baseValueOne, setBaseValueOne] = useState(baseDefaultFirst);
  const [baseValueTwo, setBaseValueTwo] = useState(baseDefaultSecond);
  const [quoteValueOne, setQuoteValueOne] = useState(quoteDefaultFirst);
  const [quoteValueTwo, setQuoteValueTwo] = useState(quoteDefaultSecond);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [thirdValue, setThirdValue] = useState('');
  const [fourthValue, setFourthValue] = useState('');

  const [scrollEnabled, setScrollEnabled] = useState(false);

  const swapCurrencies = () => {
    setBaseValueOne(quoteValueOne);
    setBaseValueTwo(quoteValueTwo);
    setQuoteValueOne(baseValueOne);
    setQuoteValueTwo(baseValueTwo);
    setFirstValue('');
    setSecondValue('');
    setThirdValue('');
    setFourthValue('');
  };

  useEffect(() => {
    if (firstValue === '' && secondValue === '') {
      setThirdValue('');
      setFourthValue('');
    } else if (baseValueOne === 'KG') {
      if (secondValue === '') {
        const answerKg = parseFloat(parseFloat(firstValue) * 2.204622621848776);
        const answerGm = 0;
        const finalAnsInCm = parseFloat(answerKg + answerGm).toFixed(2);
        setThirdValue(finalAnsInCm);
      } else if (firstValue === '') {
        const answerKg = 0;
        const answerGm = parseFloat(
          parseFloat(secondValue) * 0.0022046226218488,
        );
        const finalAnsInCm = parseFloat(answerKg + answerGm).toFixed(2);
        setThirdValue(finalAnsInCm);
      } else {
        const answerKg = parseFloat(parseFloat(firstValue) * 2.204622621848776);
        const answerGm = parseFloat(
          parseFloat(secondValue) * 0.0022046226218488,
        );
        const finalAnsInCm = parseFloat(answerKg + answerGm).toFixed(2);
        setThirdValue(finalAnsInCm);
      }
    } else {
      let totalKgs = parseFloat(parseFloat(firstValue) * 0.45359237);
      totalKgs = parseFloat(totalKgs).toFixed(3);
      // eslint-disable-next-line prefer-template
      totalKgs = (totalKgs + '').split('.');
      console.log(totalKgs);
      setThirdValue(totalKgs[0]);
      totalKgs[1] = parseFloat(totalKgs[1]).toFixed(3);
      setFourthValue(totalKgs[1]);
    }
  }, [baseValueOne, firstValue, secondValue]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/background.png')}
              style={styles.logoBackground}
              resizeMode="contain"
            />
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.textHeader}>
            {title}
            {' '}
            Converter
          </Text>

          {/* Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.sideHeading}>{baseValueOne}</Text>
            <ConversionInput
              style={styles.textBox}
              value={firstValue}
              keyboardType="numeric"
              onChangeText={text => setFirstValue(text)}
            />
            <Text
              style={[
                baseValueOne === 'LBS' ? styles.hidden : styles.sideHeading,
              ]}
            >
              {baseValueTwo}
            </Text>
            <ConversionInput
              editable={baseValueTwo !== 'NA'}
              style={[baseValueOne === 'LBS' ? styles.hidden : styles.textBox]}
              value={secondValue}
              keyboardType="numeric"
              onChangeText={text => setSecondValue(text)}
            />
          </View>

          {/* Output */}
          <View style={styles.inputContainer}>
            <Text style={styles.sideHeading}>{quoteValueOne}</Text>
            <Text style={styles.sideBox}>{thirdValue}</Text>
            <Text
              style={[
                baseValueOne === 'KG' ? styles.hidden : styles.sideHeading,
              ]}
            >
              {quoteValueTwo}
            </Text>
            <Text
              style={[baseValueOne === 'KG' ? styles.hidden : styles.sideBox]}
            >
              {fourthValue}
            </Text>
          </View>

          <Button text={`Reverse ${title}`} onPress={() => swapCurrencies()} />
          <KeyboardSpacer onToggle={visible => setScrollEnabled(visible)} />
        </View>
      </ScrollView>
    </View>
  );
};

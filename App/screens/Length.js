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

  const swapLengths = () => {
    setBaseValueOne(quoteValueOne);
    setBaseValueTwo(quoteValueTwo);
    setQuoteValueOne(baseValueOne);
    setQuoteValueTwo(baseValueTwo);
    setFirstValue('');
    setSecondValue('');
    setThirdValue('');
    setFourthValue('');
  };

  //   const calculateValue = () => {
  //     if (baseValueOne === 'FT') {
  //       const f = parseFloat(firstValue);
  //       const i = parseFloat(secondValue);
  //       let finalAnsInCm = parseFloat((12 * f + i) * 2.54);
  //       const meters = parseInt(finalAnsInCm / 100, 10);
  //       finalAnsInCm = parseFloat(finalAnsInCm % 100).toFixed(2);
  //       //   console.log(meters);
  //       //   console.log(finalAnsInCm);
  //       setTVal(meters);
  //       setFourthValue(finalAnsInCm);
  //       console.log(tVal);
  //       console.log(fourthValue);
  //     } else {
  //       const m = parseFloat(firstValue);
  //       const c = parseFloat(secondValue);
  //       const dTotal = c / 2.54;
  //       const dfeet = Math.floor(dTotal / 12);
  //       const dinch = parseFloat(dTotal - 12 * dfeet);
  //       console.log('dfeet', dfeet);
  //       console.log('dinch', dinch);
  //       setTVal(dfeet);
  //       setFourthValue(dinch);
  //     }
  //   };

  useEffect(() => {
    if (firstValue === '' && secondValue === '') {
      setThirdValue('');
      setFourthValue('');
    } else if (baseValueOne === 'FT') {
      if (firstValue === '' && secondValue === '') {
        setThirdValue('');
        setFourthValue('');
      } else if (secondValue === '') {
        const f = parseFloat(firstValue);
        let finalAnsInCm = parseFloat(12 * f * 2.54);
        const meters = parseInt(finalAnsInCm / 100, 10);
        finalAnsInCm = parseFloat(finalAnsInCm % 100).toFixed(2);
        setThirdValue(meters);
        setFourthValue(finalAnsInCm);
      } else if (firstValue === '') {
        const i = parseFloat(secondValue);
        let finalAnsInCm = parseFloat(i * 2.54);
        const meters = parseInt(finalAnsInCm / 100, 10);
        finalAnsInCm = parseFloat(finalAnsInCm % 100).toFixed(2);
        setThirdValue(meters);
        setFourthValue(finalAnsInCm);
      } else {
        const f = parseFloat(firstValue);
        const i = parseFloat(secondValue);
        let finalAnsInCm = parseFloat((12 * f + i) * 2.54);
        const meters = parseInt(finalAnsInCm / 100, 10);
        finalAnsInCm = parseFloat(finalAnsInCm % 100).toFixed(2);
        setThirdValue(meters);
        setFourthValue(finalAnsInCm);
      }
    } else if (firstValue === '' && secondValue === '') {
      setThirdValue('');
      setFourthValue('');
    } else if (secondValue === '') {
      const m = parseFloat(firstValue);
      const totalCms = m * 100;
      const totalInches = totalCms / 2.54;
      const feet = Math.floor(totalInches / 12);
      let inches = totalInches % 12;
      inches = parseFloat(inches).toFixed(2);
      setThirdValue(feet);
      setFourthValue(inches);
    } else if (firstValue === '') {
      const c = parseFloat(secondValue);
      const totalCms = c;
      const totalInches = totalCms / 2.54;
      const feet = Math.floor(totalInches / 12);
      let inches = totalInches % 12;
      inches = parseFloat(inches).toFixed(2);
      setThirdValue(feet);
      setFourthValue(inches);
    } else {
      const m = parseFloat(firstValue);
      const c = parseFloat(secondValue);
      const totalCms = m * 100 + c;
      const totalInches = totalCms / 2.54;
      const feet = Math.floor(totalInches / 12);
      let inches = totalInches % 12;
      inches = parseFloat(inches).toFixed(2);
      setThirdValue(feet);
      setFourthValue(inches);
      console.log(feet);
      console.log(inches);
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
            <Text style={styles.sideHeading}>{baseValueTwo}</Text>
            <ConversionInput
              style={styles.textBox}
              value={secondValue}
              keyboardType="numeric"
              onChangeText={text => setSecondValue(text)}
            />
          </View>

          {/* <KeyboardSpacer onToggle={visible => setScrollEnabled(visible)} /> */}
          {/* <TouchableOpacity style={styles.button} onPress={calculateValue}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity> */}

          {/* Output */}
          <View style={styles.inputContainer}>
            <Text style={styles.sideHeading}>{quoteValueOne}</Text>
            <Text style={styles.sideBox}>{thirdValue}</Text>
            <Text style={styles.sideHeading}>{quoteValueTwo}</Text>
            <Text style={styles.sideBox}>{fourthValue}</Text>
          </View>

          <Button text={`Reverse ${title}`} onPress={() => swapLengths()} />
          <KeyboardSpacer onToggle={visible => setScrollEnabled(visible)} />
        </View>
      </ScrollView>
    </View>
  );
};

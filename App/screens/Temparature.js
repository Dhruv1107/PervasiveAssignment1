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
});

export default ({route = {}}) => {
  const params = route.params || {};
  const {title, baseDefaultFirst, quoteDefaultFirst} = params;

  const [baseValueOne, setBaseValueOne] = useState(baseDefaultFirst);
  const [quoteValueOne, setQuoteValueOne] = useState(quoteDefaultFirst);

  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');

  const [scrollEnabled, setScrollEnabled] = useState(false);

  const swapCurrencies = () => {
    setBaseValueOne(quoteValueOne);
    setQuoteValueOne(baseValueOne);
    setFirstValue('');
    setSecondValue('');
  };

  useEffect(() => {
    if (baseValueOne === 'C') {
      const c = parseFloat(firstValue);
      const f = parseFloat(parseFloat((9 / 5) * c) + 32).toFixed(2);
      if (firstValue === '') setSecondValue('');
      else setSecondValue(f);
    } else {
      const f = parseFloat(firstValue);
      const c = parseFloat(parseFloat(f - 32) * (5 / 9)).toFixed(2);
      if (firstValue === '') setSecondValue('');
      else setSecondValue(c);
    }
  }, [firstValue, baseValueOne]);

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
          </View>

          {/* Output */}
          <View style={styles.inputContainer}>
            <Text style={styles.sideHeading}>{quoteValueOne}</Text>
            <ConversionInput
              editable={false}
              style={styles.textBox}
              value={secondValue}
              keyboardType="numeric"
            />
          </View>

          <Button text={`Reverse ${title}`} onPress={() => swapCurrencies()} />
          <KeyboardSpacer onToggle={visible => setScrollEnabled(visible)} />
        </View>
      </ScrollView>
    </View>
  );
};

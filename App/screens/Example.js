import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: colors.blue,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  },
});

const Example = ({navigation}) => {
  const [checked, setChecked] = React.useState('length');
  const onPress = () => {
    console.log(checked);
    if (checked === 'length') {
      navigation.push('Length', {
        title: 'Length',
        baseDefaultFirst: 'FT',
        baseDefaultSecond: 'IN',
        quoteDefaultFirst: 'MT',
        quoteDefaultSecond: 'CM',
      });
    } else if (checked === 'weight') {
      navigation.push('Weight', {
        title: 'Weight',
        baseDefaultFirst: 'KG',
        baseDefaultSecond: 'GM',
        quoteDefaultFirst: 'LBS',
        quoteDefaultSecond: 'NA',
      });
    } else {
      navigation.push('Temparature', {
        title: 'Temperature',
        baseDefaultFirst: 'C',
        quoteDefaultFirst: 'F',
      });
    }
  };
  return (
    <SafeAreaView style={styles.topContainer}>
      <View style={styles.container}>
        <RadioButton
          value="length"
          status={checked === 'length' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('length')}
        />
        <Text style={styles.textHeader}>Length Converter</Text>
      </View>
      <View style={styles.container}>
        <RadioButton
          value="weight"
          status={checked === 'weight' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('weight')}
        />
        <Text style={styles.textHeader}>Weight Converter</Text>
      </View>
      <View style={styles.container}>
        <RadioButton
          value="temp"
          status={checked === 'temp' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('temp')}
        />
        <Text style={styles.textHeader}>Temperature Converter</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Example;

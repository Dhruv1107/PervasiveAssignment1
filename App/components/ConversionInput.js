import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    borderRadius: 5,
  },
  containerDisabled: {
    backgroundColor: colors.offWhite,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: colors.textLight,
  },
});

export const ConversionInput = ({text, onButtonPress, ...props}) => {
  const containerStyles = [styles.container];

  if (props.editable === false) {
    containerStyles.push(styles.containerDisabled);
  }
  return (
    <View style={containerStyles}>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

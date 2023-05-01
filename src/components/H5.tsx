import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

interface MyProps {
  style?: StyleProp<TextStyle>;
  children?: any;
}

const H5: React.FC<MyProps> = props => {
  const {style, children} = props;

  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'NotoSansSC-Medium',
    fontWeight: '500',
  },
});

export default H5;

import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import Centered from './Centered';
import RadioButton from './RadioButton';

interface MyProps {
  label: string | number;
  labels: string[] | number[];
  onRadioButtonPress: (label: string | number) => void;
  color?: string;
  labelStyle?: StyleProp<TextStyle>;
}

const RadioButtons: React.FC<MyProps> = props => {
  const {
    label,
    labels,
    onRadioButtonPress,
    color = '#987123',
    labelStyle,
  } = props;

  return (
    <Centered direction={'row'}>
      {labels.map((it, i) => (
        <Centered
          key={i}
          onPress={() => {
            onRadioButtonPress(it);
          }}
          style={{marginRight: i == labels.length - 1 ? 0 : 12}}
          direction={'row'}>
          <RadioButton status={it == label} color={color} size={16} />
          <View style={{width: 5}} />
          <Text style={[{color: '#333'}, labelStyle]}>{it}</Text>
        </Centered>
      ))}
    </Centered>
  );
};

const styles = StyleSheet.create({});

export default RadioButtons;

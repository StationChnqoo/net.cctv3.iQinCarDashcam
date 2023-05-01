import React from 'react';
import {StyleSheet, Switch} from 'react-native';

var tinycolor = require('tinycolor2');

interface MyProps {
  status: boolean;
  onStatusChange: (value: boolean) => void;
  color: string;
}

const Switcher: React.FC<MyProps> = props => {
  const {status = false, onStatusChange, color = '#987123'} = props;

  return (
    <Switch
      trackColor={{
        true: tinycolor(color).setAlpha(0.618).toRgbString(),
        false: '#ccc',
      }}
      thumbColor={status ? color : '#ccc'}
      value={status}
      onValueChange={onStatusChange}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
});

export default Switcher;

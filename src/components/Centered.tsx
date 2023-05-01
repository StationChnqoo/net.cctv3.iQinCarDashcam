import {useStore} from '@root/useStore';
import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

interface MyProps {
  direction: 'row' | 'column';
  children: any;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Centered: React.FC<MyProps> = props => {
  const {direction = 'column', children, onPress, style} = props;
  const [bears, increasePopulation, setting] = useStore(state => [
    state.bears,
    state.increasePopulation,
    state.setting,
  ]);

  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[{flexDirection: direction, alignItems: 'center'}, style]}
      activeOpacity={0.88}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Centered;

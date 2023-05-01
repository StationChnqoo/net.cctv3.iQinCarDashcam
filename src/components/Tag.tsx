import {useStore} from '@root/useStore';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface MyProps {
  status: boolean;
  color: string;
  style?: StyleProp<ViewStyle>;
  children: any;
  textStyle?: StyleProp<TextStyle>;
}

const Tag: React.FC<MyProps> = props => {
  const {status = false, color = '#987123', style, children, textStyle} = props;
  const [bears, increasePopulation, setting] = useStore(state => [
    state.bears,
    state.increasePopulation,
    state.setting,
  ]);

  return (
    <View style={[styles.view, {borderColor: status ? color : '#ccc'}, style]}>
      <Text style={[{color: status ? color : '#ccc', fontSize: 14}, textStyle]}>
        {children}
      </Text>
    </View>
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

export default Tag;

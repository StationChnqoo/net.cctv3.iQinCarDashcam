import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
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

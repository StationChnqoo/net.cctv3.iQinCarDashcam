import React from 'react';
import {StyleSheet, View} from 'react-native';

interface MyProps {
  status: boolean;
  color: string;
  size: number;
}

const LineItem: React.FC<MyProps> = props => {
  const {status = false, color = '#987123', size = 16} = props;

  return (
    <View
      style={[
        styles.view,
        {
          height: size,
          width: size,
          borderRadius: size / 2,
          borderColor: status ? color : '#ccc',
        },
      ]}>
      {status ? (
        <View
          style={{
            height: size - 4,
            width: size - 4,
            borderRadius: size / 2 - 2,
            backgroundColor: color,
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

export default LineItem;

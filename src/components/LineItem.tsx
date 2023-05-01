import {useStore} from '@root/useStore';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface MyProps {
  status: boolean;
  color: string;
  size: number;
}

const LineItem: React.FC<MyProps> = props => {
  const {status = false, color = '#987123', size = 16} = props;
  const [bears, increasePopulation, setting] = useStore(state => [
    state.bears,
    state.increasePopulation,
    state.setting,
  ]);

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
  viewChild: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 16,
  },
});

export default LineItem;

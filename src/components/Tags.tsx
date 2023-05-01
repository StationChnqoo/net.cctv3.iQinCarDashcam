import {useStore} from '@root/useStore';
import {useDip} from '@src/utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Centered from './Centered';
import Tag from './Tag';

interface MyProps {
  label: string;
  labels: string[];
  color: string;
  onTagPress: (s: string) => void;
}

const Tags: React.FC<MyProps> = props => {
  const {label, labels, color = '#987123', onTagPress} = props;
  const [bears, increasePopulation, setting] = useStore(state => [
    state.bears,
    state.increasePopulation,
    state.setting,
  ]);

  return (
    <Centered direction={'row'}>
      {labels.map((it, i) => (
        <Centered
          key={i}
          onPress={() => {
            onTagPress(it);
          }}
          style={{marginRight: i == labels.length - 1 ? 0 : 12}}
          direction={'row'}>
          <Tag color={color} status={label == it}>
            {`${it}`}
          </Tag>
        </Centered>
      ))}
    </Centered>
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
    height: useDip(40),
    paddingHorizontal: 16,
  },
});

export default Tags;

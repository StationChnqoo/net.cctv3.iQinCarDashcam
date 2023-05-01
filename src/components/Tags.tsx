import React from 'react';
import {StyleSheet} from 'react-native';
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
});

export default Tags;

import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import {BottomTabItem} from '@src/types';
import React, {useEffect, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

interface BottomTabProps {
  item: BottomTabItem;
  activeColor: string;
  index: number;
}

const BottomTab: React.FC<BottomTabProps & BottomTabBarButtonProps> = props => {
  const {item, accessibilityState, onPress, index, activeColor} = props;
  const selected = accessibilityState.selected;
  const tabRef = useRef<Animatable.View & View>(null);
  const textRef = useRef<Animatable.View & View>(null);

  useEffect(() => {
    if (selected) {
      // @ts-ignore
      tabRef.current.animate({
        0: {scale: 1},
        0.1: {scale: 0.9},
        1: {scale: 1},
      });
      // @ts-ignore
      textRef.current.animate({
        0: {scale: 1},
        0.618: {scale: 0.8},
        1: {scale: 1},
      });
    } else {
      // @ts-ignore
      // tabRef.current.animate({
      //   0: {scale: 0.618},
      //   1: {scale: 1},
      // });
    }
    return () => {};
  }, [selected]);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.viewTab, {flex: 1}]}>
      <Animatable.View
        ref={tabRef}
        style={[{alignItems: 'center'}]}
        useNativeDriver={true}>
        <Image
          source={item.icon}
          style={{
            height: 24,
            width: 24,
            tintColor: selected ? activeColor : '#666',
          }}
        />
        <View style={{height: 4}} />
        <Animatable.View ref={textRef} useNativeDriver={true}>
          <Text
            style={{
              fontSize: 12,
              color: selected ? activeColor : '#999',
            }}>
            {item.name}
          </Text>
        </Animatable.View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewTab: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
});

export default BottomTab;

import {RouteProp} from '@react-navigation/native';
import {RootStacksParams, RootStacksProp} from '@root/Stacks';
import {useStore} from '@root/useStore';
import ToolBar from '@src/components/ToolBar';
import {useDip} from '@src/utils';
import React, {cloneElement, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'Files'>;
}

const Files: React.FC<MyProps> = props => {
  const {route, navigation} = props;
  const [logs, bears, increasePopulation, mergeLogs] = useStore(state => [
    state.logs,
    state.bears,
    state.increasePopulation,
    state.mergeLogs,
  ]);

  const [index, setIndex] = useState(0);

  return (
    <View style={{flex: 1}}>
      <View style={{paddingVertical: 6, backgroundColor: 'white'}}>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {['视频', '图片', '收藏'].map((it, i) => (
            <TouchableOpacity
              activeOpacity={0.88}
              key={i}
              style={{alignItems: 'center', marginHorizontal: 12}}
              onPress={() => {
                setIndex(i);
              }}>
              <Text
                style={{
                  fontSize: useDip(18),
                  color: index == i ? '#333' : '#666',
                }}>
                {it}
              </Text>
              <View style={{height: 4}} />
              <View
                style={{
                  height: 2,
                  width: 32,
                  borderRadius: 1,
                  backgroundColor: index == i ? '#333' : 'white',
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Files;

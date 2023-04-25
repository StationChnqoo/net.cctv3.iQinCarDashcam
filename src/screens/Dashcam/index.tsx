import {RouteProp} from '@react-navigation/native';
import {RootStacksParams, RootStacksProp} from '@root/Stacks';
import {useStore} from '@root/useStore';
import React, {useState} from 'react';
import {View} from 'react-native';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'Debug'>;
}

const Dashcam: React.FC<MyProps> = props => {
  const {route, navigation} = props;
  const [logs, bears, increasePopulation, mergeLogs] = useStore(state => [
    state.logs,
    state.bears,
    state.increasePopulation,
    state.mergeLogs,
  ]);

  const [r, setR] = useState(0);

  return <View style={{flex: 1}} />;
};

export default Dashcam;
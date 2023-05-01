import {RouteProp} from '@react-navigation/native';
import {RootStacksParams, RootStacksProp} from '@root/Stacks';
import {useStore} from '@root/useStore';
import React, {useState} from 'react';
import {View} from 'react-native';

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
      <View style={{paddingVertical: 6, backgroundColor: 'white'}}></View>
    </View>
  );
};

export default Files;

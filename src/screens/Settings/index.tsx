import {RouteProp} from '@react-navigation/native';
import {RootStacksParams, RootStacksProp} from '@root/Stacks';
import {useStore} from '@root/useStore';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Grouper from './components/Grouper';

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'Debug'>;
}

/** https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=19238 */
const Settings: React.FC<MyProps> = props => {
  const {route, navigation} = props;
  const [logs, bears, increasePopulation, mergeLogs] = useStore(state => [
    state.logs,
    state.bears,
    state.increasePopulation,
    state.mergeLogs,
  ]);

  const [statuses, setStatuses] = useState({
    CAMERA: 0,
    STORAGE: 0,
    UI: 0,
    OTHER: 0,
    MASK: 0,
  });

  const onStatusUpdate = (key: string) => {
    // console.log('onStatusUpdate: ', key);
    let _status = {...statuses};
    _status[key] = -1 * _status[key] + 1;
    setStatuses(_status);
  };

  useEffect(() => {
    // console.log('Statuses: ', statuses);
    return function () {};
  }, [statuses]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <Grouper
            title="视频设置"
            src={require('@src/images/settings_camera.png')}
            status={statuses.CAMERA}
            onStatusPress={() => {
              onStatusUpdate('CAMERA');
            }}></Grouper>
          <Grouper
            title="储存设置"
            src={require('@src/images/settings_storage.png')}
            status={statuses.STORAGE}
            onStatusPress={() => {
              onStatusUpdate('STORAGE');
            }}></Grouper>
          <Grouper
            title="界面设置"
            src={require('@src/images/settings_ui.png')}
            status={statuses.UI}
            onStatusPress={() => {
              onStatusUpdate('UI');
            }}></Grouper>
          <Grouper
            title="水印设置"
            src={require('@src/images/settings_mask.png')}
            status={statuses.MASK}
            onStatusPress={() => {
              onStatusUpdate('MASK');
            }}></Grouper>
          <Grouper
            title="其他设置"
            src={require('@src/images/settings_other.png')}
            status={statuses.OTHER}
            onStatusPress={() => {
              onStatusUpdate('OTHER');
            }}></Grouper>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

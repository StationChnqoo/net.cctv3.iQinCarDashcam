import {useStore} from '@root/useStore';
import moment from 'moment';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

interface MyProps {
  statuses: boolean[];
}

/** https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=19238 */
const MaskPreviewer: React.FC<MyProps> = props => {
  const {statuses} = props;
  const [logs, bears, increasePopulation, mergeLogs] = useStore(state => [
    state.logs,
    state.bears,
    state.increasePopulation,
    state.mergeLogs,
  ]);
  
  useEffect(() => {
    // console.log('New status from props: ', props.status);
    return function () {};
  }, [props]);

  const WIDTH = Dimensions.get('screen').width * 0.72 - 24;
  const HEIGHT = (WIDTH * 9) / 16;

  return (
    <View style={{position: 'relative', width: WIDTH, height: HEIGHT}}>
      <FastImage
        source={{
          uri: 'https://net-cctv3.oss-cn-qingdao.aliyuncs.com/net.cctv3.iQinCarDashcam/MaskPreviewBackground.jpg',
        }}
        style={{width: '100%', height: '100%', borderRadius: 8}}
      />
      <View style={styles.viewMask} />
      <View style={styles.viewMoreInformations}>
        {[
          '12KM/h',
          moment().format('YYYY-HH-DD HH:mm:ss'),
          '山东省聊城市东昌府区湖南路1号',
        ]
          .filter((it, i) => statuses[i])
          .map(it => (
            <View key={it} style={{marginVertical: 1}}>
              <Text style={{color: 'white', fontSize: 10}}>{it}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  views: {
    flexDirection: 'column',
    marginVertical: 6,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewMoreInformations: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  viewMask: {
    backgroundColor: 'rgba(0, 0, 0, 0.618)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 8,
  },
});

export default MaskPreviewer;

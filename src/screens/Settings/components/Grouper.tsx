import {useStore} from '@root/useStore';
import {useDip} from '@src/utils';
import React, {useEffect} from 'react';
import {
  Image,
  ImageRequireSource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface MyProps {
  title: string;
  src: ImageRequireSource;
  status: number;
  onStatusPress: () => void;
  children?: any;
}

/** https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=19238 */
const Grouper: React.FC<MyProps> = props => {
  const {title, src, status, onStatusPress, children} = props;
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
  return (
    <View style={styles.views}>
      <TouchableOpacity
        style={styles.view}
        activeOpacity={0.88}
        onPress={() => {
          onStatusPress();
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={src}
            style={{
              height: useDip(24),
              width: useDip(24),
              tintColor: 'rgba(0, 0, 0, 0.618)',
            }}
          />
          <View style={{width: 12}} />
          <Text style={{fontSize: useDip(16), color: '#333'}}>{title}</Text>
        </View>
        <Image
          source={
            [
              require('@src/images/common_row_up.png'),
              require('@src/images/common_row_down.png'),
            ][status]
          }
          style={{height: useDip(20), width: useDip(20), tintColor: '#666'}}
        />
      </TouchableOpacity>
      {children}
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
});

export default Grouper;

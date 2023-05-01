import {H5} from '@src/components';
import React, {useEffect} from 'react';
import {Image, ImageRequireSource, StyleSheet, View} from 'react-native';

interface MyProps {
  title: string;
  src: ImageRequireSource;
  status: number;
}

/** https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=19238 */
const Grouper: React.FC<MyProps> = props => {
  const {title, src, status} = props;

  useEffect(() => {
    // console.log('New status from props: ', props.status);
    return function () {};
  }, [props]);

  return (
    <View style={styles.views}>
      <View style={styles.view}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={src}
            style={{
              height: 24,
              width: 24,
              tintColor: 'rgba(0, 0, 0, 0.618)',
            }}
          />
          <View style={{width: 6}} />
          <H5>{title}</H5>
        </View>
        <Image
          source={
            [
              require('@src/images/common_row_up.png'),
              require('@src/images/common_row_down.png'),
            ][status]
          }
          style={{height: 20, width: 20, tintColor: '#666'}}
        />
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
});

export default Grouper;

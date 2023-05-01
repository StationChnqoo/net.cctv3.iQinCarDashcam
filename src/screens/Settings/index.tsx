import {RouteProp} from '@react-navigation/native';
import {RootStacksParams, RootStacksProp} from '@root/Stacks';
import {useStore} from '@root/useStore';
import {Centered, RadioButtons, Switcher, Tag, Tags} from '@src/components';
import {DEFAULT_SETTING} from '@src/types';
import {useDip, useGoogleColors} from '@src/utils';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import RNFS from 'react-native-fs';
import * as Progress from 'react-native-progress';
import {Grouper, MaskPreviewer} from './components';
var tinycolor = require('tinycolor2');

interface MyProps {
  navigation?: RootStacksProp;
  route?: RouteProp<RootStacksParams, 'Debug'>;
}

/** https://www.iconfont.cn/collections/detail?spm=a313x.7781069.0.da5a778a4&cid=19238 */
const Settings: React.FC<MyProps> = props => {
  const {route, navigation} = props;
  const [logs, bears, setting, mergeSetting] = useStore(state => [
    state.logs,
    state.bears,
    state.setting,
    state.mergeSetting,
  ]);

  const [statuses, setStatuses] = useState([]);

  const settingUpdater = (parent: string, child: string, value: any) => {
    let s = {...setting};
    if (s.hasOwnProperty(parent) && s[parent].hasOwnProperty(child)) {
      s[parent][child] = value;
    } else {
      s = {...DEFAULT_SETTING, ...setting};
    }
    console.log('Setting updater: ', s);
    mergeSetting(s);
  };

  const [freeSpace, setFreeSpace] = useState(0);
  const [totalSpace, setTotalSpace] = useState(1);

  const b2GB = (n: number) => `${(n / 1024 / 1024 / 1024).toFixed(2)}GB`;

  const ITEMS = [
    {
      title: '视频设置',
      message: '',
      src: require('@src/images/settings_camera.png'),
      children: (
        <View>
          <View style={styles.viewItemLine}>
            <Text style={{fontSize: useDip(14), color: '#333'}}>
              是否开启录音
            </Text>
            <Switcher
              color={setting.ui.theme}
              status={setting.camera.audio}
              onStatusChange={v => {
                settingUpdater('camera', 'audio', v);
              }}
            />
          </View>
          <View style={styles.viewItemLine}>
            <Text style={{fontSize: useDip(14), color: '#333'}}>
              视频分辨率
            </Text>
            <RadioButtons
              color={setting.ui.theme}
              labels={[720, 1080]}
              label={setting.camera.resolution}
              onRadioButtonPress={value => {
                settingUpdater('camera', 'resolution', value);
              }}
            />
          </View>
          <View style={styles.viewItemLine}>
            <Text style={{fontSize: useDip(14), color: '#333'}}>视频质量</Text>
            <RadioButtons
              color={setting.ui.theme}
              labels={['低', '中', '高']}
              label={setting.camera.quality}
              onRadioButtonPress={value => {
                settingUpdater('camera', 'quality', value);
              }}
            />
          </View>
          <View style={{}}>
            <Text style={{fontSize: useDip(14), color: '#333'}}>
              单个文件录制时长
            </Text>
            <Tags
              color={setting.ui.theme}
              labels={[1, 2, 5, 10].map(it => `${it}分钟`)}
              label={setting.camera.minutes}
              onTagPress={value => {
                settingUpdater('camera', 'minutes', value);
              }}
            />
          </View>
        </View>
      ),
    },
    {
      title: '存储设置',
      message: '',
      src: require('@src/images/settings_storage.png'),
      children: (
        <View>
          <View>
            <Text style={{fontSize: useDip(14), color: '#333'}}>
              手机储存空间
            </Text>
            <Centered direction={'row'}>
              <Text style={{fontSize: useDip(14), color: '#333', flex: 1}}>
                {`${b2GB(freeSpace)}/${b2GB(totalSpace)}`}
              </Text>
              <Progress.Bar
                progress={freeSpace / totalSpace}
                width={158}
                color={setting.ui.theme}
              />
            </Centered>
          </View>
          <View style={{}}>
            <Text style={{fontSize: useDip(14), color: '#333'}}>
              最大循环录制储存空间
            </Text>
            <Tags
              labels={[1, 2, 5, 10].map(it => `${it}GB`)}
              label={setting.storage.reuse}
              onTagPress={value => {
                settingUpdater('storage', 'reuse', value);
              }}
              color={setting.ui.theme}
            />
          </View>
        </View>
      ),
    },
    {
      title: '界面设置',
      message: '',
      src: require('@src/images/settings_ui.png'),
      children: (
        <View>
          <Text style={{fontSize: useDip(14), color: '#333'}}>主题颜色</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            {Object.keys(useGoogleColors).map(it => (
              <TouchableOpacity
                key={it}
                style={{marginHorizontal: 4, marginVertical: 4}}
                activeOpacity={0.88}
                onPress={() => {
                  settingUpdater('ui', 'theme', useGoogleColors[it].dark);
                }}>
                <Tag
                  textStyle={{color: useGoogleColors[it].dark}}
                  style={{borderColor: useGoogleColors[it].light}}
                  status={setting.ui.theme == useGoogleColors[it].dark}
                  color={useGoogleColors[it].dark}>
                  {useGoogleColors[it].name}
                </Tag>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ),
    },
    {
      title: '水印设置',
      message: '',
      src: require('@src/images/settings_mask.png'),
      children: (
        <View>
          <View style={styles.viewItemLine}>
            <Text style={{fontSize: useDip(14), color: '#333'}}>速度信息</Text>
            <Switcher
              color={setting.ui.theme}
              status={setting.mask.speed}
              onStatusChange={v => {
                settingUpdater('mask', 'speed', v);
              }}
            />
          </View>
          <View style={styles.viewItemLine}>
            <Text style={{fontSize: useDip(14), color: '#333'}}>时间信息</Text>
            <Switcher
              color={setting.ui.theme}
              status={setting.mask.time}
              onStatusChange={v => {
                settingUpdater('mask', 'time', v);
              }}
            />
          </View>
          <View style={styles.viewItemLine}>
            <Text style={{fontSize: useDip(14), color: '#333'}}>GPS信息</Text>
            <Switcher
              color={setting.ui.theme}
              status={setting.mask.gps}
              onStatusChange={v => {
                settingUpdater('mask', 'gps', v);
              }}
            />
          </View>
          <View style={styles.viewItemLine}>
            <Text style={{fontSize: useDip(14), color: '#333'}}>位置信息</Text>
            <Switcher
              color={setting.ui.theme}
              status={setting.mask.address}
              onStatusChange={v => {
                settingUpdater('mask', 'address', v);
              }}
            />
          </View>
          <Text style={{fontSize: useDip(14), color: '#333'}}>预览</Text>
          <MaskPreviewer
            statuses={[
              setting.mask.speed,
              setting.mask.time,
              setting.mask.gps,
              setting.mask.address,
            ]}
          />
        </View>
      ),
    },
    {
      title: '其他设置',
      message: '',
      src: require('@src/images/settings_other.png'),
      children: (
        <View>
          <Text style={{fontSize: useDip(14), color: '#333'}}>
            更新速度和位置信息频率
          </Text>
          <Tags
            color={setting.ui.theme}
            labels={[1, 2, 5, 10].map(it => `${it}秒`)}
            label={setting.other.interval}
            onTagPress={value => {
              settingUpdater('other', 'interval', value);
            }}
          />
        </View>
      ),
    },
  ].map((it, i) => ({...it, index: i}));

  useEffect(() => {
    RNFS.getFSInfo().then(result => {
      setFreeSpace(result.freeSpace);
      setTotalSpace(result.totalSpace);
    });
    return function () {};
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <Accordion
          expandMultiple={true}
          sections={ITEMS}
          activeSections={statuses}
          renderSectionTitle={item => <View />}
          touchableComponent={TouchableOpacity}
          duration={618}
          renderHeader={item => (
            <Grouper
              title={item.title}
              src={item.src}
              status={statuses.includes(item.index) ? 1 : 0}
            />
          )}
          renderContent={item => item.children}
          onChange={setStatuses}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewItemLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
});

export default Settings;

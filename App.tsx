import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTab from '@src/components/BottomTab';
import Debug from '@src/screens/Debug';
import {useDip} from '@src/utils';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {RootStacksProp} from './Stacks';
import Files from '@src/screens/Files';
import Settings from '@src/screens/Settings';
import {useStore} from './useStore';
import {DEFAULT_SETTING} from '@src/types';

const Tab = createBottomTabNavigator();
interface AppProps {
  navigation: RootStacksProp;
}

const tabs = [
  {
    name: '首页',
    screen: Debug,
    icon: require('@src/images/menu_tv.png'),
  },
  {
    name: '社区',
    screen: Debug,
    icon: require('@src/images/menu_fire.png'),
  },
  {
    name: '文件',
    screen: Files,
    icon: require('@src/images/menu_folder.png'),
  },
  {
    name: '行程',
    screen: Debug,
    icon: require('@src/images/menu_bike.png'),
  },
  {
    name: '设置',
    screen: Settings,
    icon: require('@src/images/menu_finger.png'),
  },
];

const App: React.FC<AppProps> = props => {
  const [logs, bears, setting, mergeSetting] = useStore(state => [
    state.logs,
    state.bears,
    state.setting,
    state.mergeSetting,
  ]);
  useEffect(() => {
    mergeSetting({...DEFAULT_SETTING, ...setting});
    return function () {};
  }, [props]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {Array.from(tabs, (_, i) => (
          <Tab.Screen
            key={i}
            name={tabs[i].name}
            component={tabs[i].screen}
            options={{
              tabBarLabel: tabs[i].name,
              tabBarBadge: Math.ceil(100 * Math.random()),
              tabBarButton: bottomTabBarButtonProps => (
                <BottomTab
                  {...bottomTabBarButtonProps}
                  item={_}
                  activeColor={'#987123'}
                  index={i}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTabBarStyle: {
    height: useDip(56),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});

export default App;

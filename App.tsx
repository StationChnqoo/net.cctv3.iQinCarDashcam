import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTab} from '@src/components';
import Debug from '@src/screens/Debug';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import Files from '@src/screens/Files';
import HelloWorld from '@src/screens/HelloWorld';
import {DEFAULT_SETTING} from '@src/types';
import {RootStacksProp} from './Stacks';
import {useStore} from './useStore';

const Tab = createBottomTabNavigator();
interface AppProps {
  navigation: RootStacksProp;
}

const tabs = [
  {
    name: '首页',
    screen: HelloWorld,
    icon: require('@src/images/menu_tv.png'),
  },
  {
    name: '社区',
    screen: Debug,
    icon: require('@src/images/menu_fire.png'),
  },
  {
    name: '行程',
    screen: Debug,
    icon: require('@src/images/menu_bike.png'),
  },
  {
    name: '文件',
    screen: Files,
    icon: require('@src/images/menu_folder.png'),
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
              // tabBarBadge: Math.ceil(100 * Math.random()),
              tabBarButton: bottomTabBarButtonProps => (
                <BottomTab
                  {...bottomTabBarButtonProps}
                  item={_}
                  activeColor={setting.ui.theme}
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
    height: 56,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});

export default App;

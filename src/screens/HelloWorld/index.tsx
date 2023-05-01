import React, {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Drawer from 'react-native-drawer';
import Settings from '../Settings';

interface HelloWorldProps {}

const HelloWorld: React.FC<HelloWorldProps> = props => {
  let drawer = useRef<Drawer>(null);

  return (
    <View style={{flex: 1}}>
      <Drawer
        ref={drawer}
        content={<Settings />}
        openDrawerOffset={0.28}
        type={'overlay'}
        tapToClose={true}>
        <TouchableOpacity
          onPress={() => {
            drawer.current.open();
          }}>
          <Text>设置</Text>
        </TouchableOpacity>
      </Drawer>
    </View>
  );
};

export default HelloWorld;

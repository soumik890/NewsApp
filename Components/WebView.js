import {WebView} from 'react-native-webview';
import React from 'react';
import {View} from 'react-native';

const WebViewComp = ({route}) => {
  return <WebView source={{uri: `${route.params.url}`}} />;
};

export default WebViewComp;

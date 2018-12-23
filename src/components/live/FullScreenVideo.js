import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View, ListView, Image, Dimensions} from 'react-native';
import {RTCView} from 'react-native-webrtc';

export default class FullScreenVideo extends Component{
  render() {
    return (
        <View style={styles.container}>
            <RTCView streamURL={this.props.streamURL} style={styles.video} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
} from 'react-native';
import FullScreenVideo from 'src/components/live/FullScreenVideo';
import LiveStreamClient from 'src/services/LiveStreamClient';
import { Theme } from 'src/styles';

let Live = null;

export default class LiveScreen extends Component {
    static navigatorStyle = {
        ...Theme.Nav.Primary,
        tabBarHidden: true,
        drawUnderNavBar: true,
        hideBackButton: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            videoURL: null,
        }
    }

    componentDidMount() {
        Live = new LiveStreamClient();
        Live.connectToStream(this.props.id)
            .then((stream) => {
                console.log('stream', stream);
                this.setState({
                    videoURL: stream.toURL(),
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <FullScreenVideo streamURL={this.state.videoURL} />
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
});

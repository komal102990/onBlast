import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { Content, Text, View } from 'native-base';
import SearchPlaceResult from 'src/components/search/SearchPlaceResult';
import UserListPlaceholder from 'src/components/placeholder/UserListPlaceholder';
import { Theme } from 'src/styles';
import firebase from 'react-native-firebase';


class Timeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checking: false,
        };
    }

    render() {
        return (
            <Content
                keyboardShouldPersistTaps="handled"
                style={{
                    backgroundColor: '#fff',
                }}
            >
                {
                    (this.state.checking && (
                        <View
                            style={{
                                padding: 5,
                                paddingTop: 50,
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: Theme.Fonts.HelveticaNeueLight,
                                }}
                            >
                                Please wait ...
                            </Text>
                        </View>
                    ))
                }
                {
                    (!this.state.checking && this.props.loading && (
                        <View
                            style={{
                                padding: 10,
                            }}
                        >
                            <UserListPlaceholder />
                        </View>
                    ))
                }

                {
                    (!this.state.checking && !this.props.loading && this.props.places.length === 0 && (
                        <View
                            style={{
                                padding: 5,
                                paddingTop: 50,
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: Theme.Fonts.HelveticaNeueLight,
                                }}
                            >
                                Timeline
                            </Text>
                        </View>
                    ))
                }
            </Content>
        );
    }
}

export default connect(null, null)(Timeline);

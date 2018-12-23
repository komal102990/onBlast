import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import {
    Content,
    Text,
    View,
} from 'native-base';
import SearchUserResult from 'src/components/search/SearchUserResult';
import UserListPlaceholder from 'src/components/placeholder/UserListPlaceholder';
import { Theme } from 'src/styles';

class Followers extends Component {
    constructor(props) {
        super(props);
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
                    (this.props.loading && (
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
                    (!this.props.loading && this.props.reviewers.length === 0 && (
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
                                Followers
                            </Text>
                        </View>
                    ))
                }
            </Content>
        );
    }
}

export default connect(null, null)(Followers);

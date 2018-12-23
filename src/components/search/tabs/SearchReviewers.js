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

class SearchReviewers extends Component {
    constructor(props) {
        super(props);

        this.onResultKeyExtractor = this.onResultKeyExtractor.bind(this);
        this.onRowRenderer = this.onRowRenderer.bind(this);
    }

    onResultKeyExtractor(item) {
        return item.email;
    }

    onResultClicked(data) {
        this.props.nav.push({
            screen: 'ReviewerScreen',
            backButtonTitle: '',
            animationType: 'slide-horizontal',
            passProps: {
                reviewerId: data.item.id,
                name: `${data.item.name} ${data.item.surname}`,
            },
        });
    }

    onRowRenderer(data) {
        return (
            <SearchUserResult
                id={data.item.id}
                name={`${data.item.name} ${data.item.surname}`}
                place={(data.item.place) ? data.item.place.label : ''}
                description={data.item.description}
                onResultClicked={this.onResultClicked.bind(this, data)}
            />
        );
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
                                No reviewers found for your criteria!
                            </Text>
                        </View>
                    ))
                }

                {
                    (!this.props.loading && this.props.reviewers.length > 0 && (
                        <FlatList
                            keyExtractor={this.onResultKeyExtractor}
                            data={this.props.reviewers}
                            renderItem={this.onRowRenderer}
                            renderAheadOffset={2000}
                        />
                    ))
                }
            </Content>
        );
    }
}

export default connect(null, null)(SearchReviewers);

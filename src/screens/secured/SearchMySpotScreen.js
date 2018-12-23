import React, { Component } from 'react';
import {
    Container,
    View,
} from 'native-base';
import { connect } from 'react-redux';
import { Theme } from 'src/styles';

class SearchMySpotScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingPlaces: false,
            loadingReviewers: false,
            places: [],
            reviewers: [],
        };
    }

    componentDidMount() {
        this.props.navigator.setStyle({
            navBarBackgroundColor: Theme.Colors.Primary,
            topBarElevationShadowEnabled: false,
            navBarComponentAlignment: 'fill',
            navBarHidden: false,
            navBarTextColor: '#fff',
            navBarButtonColor: '#fff',
            tabBarHidden: true,
            navBarCustomView: 'SearchBar',
            navBarNoBorder: true,
            navBarCustomViewInitialProps: {
                onBack: () => {
                    this.props.navigator.pop();
                },
                onSearch: (keyword) => {
                },
            },
        });
    }

    render() {
        return (
            <Container
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                </View>
            </Container>
        );
    }
}

export default connect(null, null)(SearchMySpotScreen);

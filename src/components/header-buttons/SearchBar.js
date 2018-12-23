import React, { PureComponent } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { View, Icon } from 'native-base';
import { AnInput, AnTouchable } from 'src/components/common';
import { Theme } from 'src/styles';
import { Navigation } from 'react-native-navigation';

const styles = StyleSheet.create({
    aa: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 0 : 0,
    },
    ab: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    ac: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ad: {
        fontSize: 30,
        color: '#fff',
        width: 40,
    },
    ae: {
        flex: 1,
    },
    af: {
        fontFamily: Theme.Fonts.HelveticaNeueLight,
        height: 30,
        fontSize: 17,
        color: '#fff',
        textAlign: 'left',
        borderBottomWidth: 0,
        padding: 0,
    },
});

class SearchBar extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
        };

        this.irefs = {};

        this.onBack = this.props.onBack.bind(this);
        this.onRefInput = this.onRefInput.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.irefs.search.focus();
        }, 600);
    }

    onRefInput(ref) {
        this.irefs.search = ref;
    }

    onChangeText(keyword) {
        this.setState({
            keyword,
        }, () => {
            this.props.onSearch(keyword);
        });
    }

    render() {
        return (
            <View
                style={styles.aa}
            >
                <View
                    style={styles.ab}
                >
                    <View
                        style={styles.ac}
                    >
                        <AnTouchable
                            onPress={this.onBack}
                        >
                            <Icon
                                type="EvilIcons"
                                name="close"
                                style={styles.ad}
                            />
                        </AnTouchable>

                        <Icon
                            type="EvilIcons"
                            name="search"
                            style={styles.ad}
                        />

                        <View
                            style={styles.ae}
                        >
                            <AnInput
                                refcb={this.onRefInput}
                                placeholder="Search..."
                                placeholderTextColor="#fff"
                                customStyles={{
                                    fontFamily: Theme.Fonts.HelveticaNeueLight,
                                    height: 30,
                                    fontSize: 17,
                                    color: '#fff',
                                    textAlign: 'left',
                                    borderBottomWidth: 0,
                                    padding: 0,
                                }}

                                value={this.state.keyword}

                                onChangeText={this.onChangeText}

                                autoCorrect={false}

                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

Navigation.registerComponent('SearchBar', () => SearchBar);

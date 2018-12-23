import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text, Icon } from 'native-base';
import { Theme } from 'src/styles';

const styles = StyleSheet.create({
    aa: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 5,
        marginBottom: 5,
    },
    ab: {
        fontSize: 15,
        fontFamily: Theme.Fonts.RobotoBold,
        flex: 1,
    },
    ac: {
        color: Theme.Colors.Primary,
        alignSelf: 'flex-end',
        fontSize: 21,
    },
});

class ReviewCommentUser extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userId && nextProps.userId !== this.props.userId) {
            firebase.database().ref(`users/${nextProps.userId}`)
                .once('value', (snapshot) => {
                    if (snapshot && snapshot.val() !== null) {
                        const user = snapshot.val();

                        this.setState({
                            user: `${user.name} ${user.surname}`,
                        });
                    }
                });
        }
    }

    render() {
        return (
            <View
                style={styles.aa}
            >
                <Text
                    style={styles.ab}
                >
                    {this.state.user}
                </Text>

                <Icon
                    type="FontAwesome"
                    name="comment"
                    style={styles.ac}
                />
            </View>
        );
    }
}

export default ReviewCommentUser;

import React, { Component } from 'react';
import { Container, View } from 'native-base';
import { Theme } from 'src/styles';

const NonSecuredScreenHOC = (WrappedComponent) => {
    class Wrapper extends Component {
        static navigatorStyle = {
            navBarHidden: true,
            screenBackgroundColor: Theme.Colors.Primary,
        }

        render() {
            return (
                <Container
                    style={{
                        ...Theme.Scaffolding.Container,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <WrappedComponent
                            {...this.props}
                        />
                    </View>
                </Container>
            );
        }
    }

    return Wrapper;
};

export default NonSecuredScreenHOC;

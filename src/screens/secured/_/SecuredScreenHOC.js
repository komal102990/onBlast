import React, { Component } from 'react';
import { Container, View } from 'native-base';
import { Theme } from 'src/styles';

const SecuredScreenHOC = (WrappedComponent) => {
    class Wrapper extends Component {
        static navigatorStyle = {
            ...Theme.Nav.Primary,
            tabBarHidden: true,
            tabBarTranslucent: true,
            drawUnderTabBar: true,
        }

        render() {
            return (
                <Container
                    style={{
                        ...Theme.Scaffolding.Container,
                        backgroundColor: '#fff',
                        paddingTop: 0,
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

export default SecuredScreenHOC;

import React, { PureComponent } from 'react';
import { Dimensions, Animated } from 'react-native';
import { View } from 'native-base';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const { width } = Dimensions.get('window');


class UserListPlaceholder extends PureComponent {
    constructor(props) {
        super(props);

        this.irefs = [];
    }

    componentDidMount() {
        this.runBigAvatarAndSomeRowsAnimated();
    }

    runBigAvatarAndSomeRowsAnimated() {
        if (Array.isArray(this.irefs) && this.irefs.length > 0) {
            Animated.parallel(
                [
                    this.irefs[0].getAnimated(),
                    ...this.irefs.slice(1).map((animate) => {
                        if (animate && animate.getAnimated) {
                            return animate.getAnimated();
                        }
                        return null;
                    }),
                ],
                {
                    stopTogether: false,
                },
            ).start(() => {
                this.runBigAvatarAndSomeRowsAnimated();
            });
        }
    }

    render() {
        return (
            <View
                style={{
                    padding: 0,
                    paddingTop: 10,
                }}
            >
                <View
                    style={{
                        marginBottom: 10,
                        height: 50,
                        padding: 5,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderRadius: 4,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ShimmerPlaceHolder
                        ref={(ref) => {
                            this.irefs.push(ref);
                        }}
                        visible={false}
                        colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                        width={40}
                        height={40}
                        style={{ borderRadius: 20, marginRight: 10 }}
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 20}
                            height={15}
                            style={{ marginBottom: 10 }}
                        />

                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 50 - 120}
                            height={10}
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginBottom: 10,
                        height: 50,
                        padding: 5,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderRadius: 4,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ShimmerPlaceHolder
                        ref={(ref) => {
                            this.irefs.push(ref);
                        }}
                        visible={false}
                        colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                        width={40}
                        height={40}
                        style={{ borderRadius: 20, marginRight: 10 }}
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 20}
                            height={15}
                            style={{ marginBottom: 10 }}
                        />

                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 50 - 120}
                            height={10}
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginBottom: 10,
                        height: 50,
                        padding: 5,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderRadius: 4,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ShimmerPlaceHolder
                        ref={(ref) => {
                            this.irefs.push(ref);
                        }}
                        visible={false}
                        colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                        width={40}
                        height={40}
                        style={{ borderRadius: 20, marginRight: 10 }}
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 20}
                            height={15}
                            style={{ marginBottom: 10 }}
                        />

                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 50 - 120}
                            height={10}
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginBottom: 10,
                        height: 50,
                        padding: 5,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderRadius: 4,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ShimmerPlaceHolder
                        ref={(ref) => {
                            this.irefs.push(ref);
                        }}
                        visible={false}
                        colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                        width={40}
                        height={40}
                        style={{ borderRadius: 20, marginRight: 10 }}
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 20}
                            height={15}
                            style={{ marginBottom: 10 }}
                        />

                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 50 - 120}
                            height={10}
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginBottom: 10,
                        height: 50,
                        padding: 5,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderRadius: 4,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ShimmerPlaceHolder
                        ref={(ref) => {
                            this.irefs.push(ref);
                        }}
                        visible={false}
                        colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                        width={40}
                        height={40}
                        style={{ borderRadius: 20, marginRight: 10 }}
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 20}
                            height={15}
                            style={{ marginBottom: 10 }}
                        />

                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 50 - 120}
                            height={10}
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginBottom: 10,
                        height: 50,
                        padding: 5,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderRadius: 4,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ShimmerPlaceHolder
                        ref={(ref) => {
                            this.irefs.push(ref);
                        }}
                        visible={false}
                        colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                        width={40}
                        height={40}
                        style={{ borderRadius: 20, marginRight: 10 }}
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 20}
                            height={15}
                            style={{ marginBottom: 10 }}
                        />

                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 50 - 120}
                            height={10}
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginBottom: 10,
                        height: 50,
                        padding: 5,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderRadius: 4,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ShimmerPlaceHolder
                        ref={(ref) => {
                            this.irefs.push(ref);
                        }}
                        visible={false}
                        colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                        width={40}
                        height={40}
                        style={{ borderRadius: 20, marginRight: 10 }}
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 20}
                            height={15}
                            style={{ marginBottom: 10 }}
                        />

                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 50 - 120}
                            height={10}
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginBottom: 10,
                        height: 50,
                        padding: 5,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderRadius: 4,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <ShimmerPlaceHolder
                        ref={(ref) => {
                            this.irefs.push(ref);
                        }}
                        visible={false}
                        colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                        width={40}
                        height={40}
                        style={{ borderRadius: 20, marginRight: 10 }}
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 20}
                            height={15}
                            style={{ marginBottom: 10 }}
                        />

                        <ShimmerPlaceHolder
                            ref={(ref) => {
                                this.irefs.push(ref);
                            }}
                            visible={false}
                            colorShimmer={['#eaeaea', '#e6e6e6', '#d9d9d9']}
                            width={width - 70 - 50 - 120}
                            height={10}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default UserListPlaceholder;

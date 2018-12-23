import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import { View } from 'native-base';
import Images from '@assets';
import { AnTouchable } from 'src/components/common';

class ReviewLiveListItem extends PureComponent {
    render() {
        return (
            <View>
                <AnTouchable
                    activeOpacity={0.6}
                    style={{
                    }}
                    onPress={() => {
                        // this.props.goToLive();
                    }}
                >
                    <Image
                        style={{
                            width: 70,
                            height: 70,
                        }}
                        source={Images.review}
                    />
                </AnTouchable>
            </View>
        );
    }
}

export default ReviewLiveListItem;

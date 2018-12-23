import { Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const Brand = {
    Primary: '#FF4D43',
    Secondary: '#e6e7de',
    Default: 'transparent',
};

const Fonts = {
    RobotoRegular: 'Roboto-Regular',
    RobotoBold: 'Roboto-Bold',
    MyriadProRegular: 'MyriadPro-Regular',
    HelveticaNeueRegular: 'HelveticaNeue-Regular',
    HelveticaNeueMedium: 'HelveticaNeue-Medium',
    HelveticaNeueLight: 'HelveticaNeue-Light',
    HelveticaNeueThin: 'HelveticaNeue-Thin',
};

export const Theme = {
    Scaffolding: {
        Container: {
            flex: 1,
            backgroundColor: '#FF4D43',
            // backgroundColor: Brand.Primary,
            paddingTop: (Platform.OS === 'android') ? 0 : (isIphoneX()) ? 40 : 23,
        },
    },

    Nav: {
        Primary: {
            navBarBackgroundColor: Brand.Primary,
            navBarTextColor: '#fff',
            navBarButtonColor: '#fff',
            navBarSubtitleColor: '#fff',
            navBarSubtitleFontSize: 10,
            navBarTextFontSize: 20,
            navBarTextFontFamily: Fonts.HelveticaNeueLight,
        },
    },

    Colors: {
        Primary: Brand.Primary,
        Secondary: Brand.Secondary,
    },

    Fonts: {
        RobotoRegular: Fonts.RobotoRegular,
        RobotoBold: Fonts.RobotoBold,
        HelveticaNeueRegular: Fonts.HelveticaNeueRegular,
        HelveticaNeueMedium: Fonts.HelveticaNeueMedium,
        HelveticaNeueLight: Fonts.HelveticaNeueLight,
        HelveticaNeueThin: Fonts.HelveticaNeueThin,
        MyriadProRegular: Fonts.MyriadProRegular,
    },

    Buttons: {
        Primary: {
            backgroundColor: Brand.Primary,
            minHeight: 40,
        },

        Secondary: {
            backgroundColor: 'transparent',
            minHeight: 60,
            borderColor: Brand.Primary,
            borderWidth: 1,
        },

        Default: {
            backgroundColor: '#ddd',
            minHeight: 60,
        },

        Text: {
            Primary: {
                fontFamily: Fonts.HelveticaNeueThin,
                color: '#fff',
                fontSize: 14,
                lineHeight: 14,
            },

            Secondary: {
                color: Brand.Primary,
                fontSize: 14,
            },

            Default: {
                color: Brand.Primary,
                fontSize: 14,
            },
        },
    },

    Forms: {
        FormControl: {
            marginTop: 10,
            marginBottom: 10,
        },

        Label: {
            textAlign: 'center',
            fontSize: 16,
            color: '#999999',
        },

        Input: {
            borderColor: 'transparent',
            borderBottomWidth: 1,
            borderBottomColor: '#ddd',
            height: 45,
            padding: 0,
            borderRadius: 0,
            fontSize: 16,
            color: '#606060',
            textAlign: 'center',
        },
    },

    EmptyList: {
        Outter: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },

        Inner: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
};

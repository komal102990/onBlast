import React, { Component } from 'react';
import {
    Modal,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    TextInput,
    StatusBar,
    Platform,
    FlatList,
} from 'react-native';
import {
    Icon,
} from 'native-base';
import { Theme } from 'src/styles';

/**
 *  Set modal visible.
 *
 *  @param {boolean} visible - Boolean.
 */
function open(visible) {
    if (Platform.OS === 'ios' && this.props.search) {
        StatusBar.setHidden(true, true);
    }

    this.setState({
        modalVisible: visible,
    });
}

/**
 *  Set current selected key on change
 *  selection.
 *
 *  @param {any} key - The item key.
 */
function onChange(key) {
    this.setState({
        selectedKey: key,
    });

    this.props.onChange(key);
}

/**
 *  Set modal closed.
 */
function close() {
    if (Platform.OS === 'ios' && this.props.search) {
        StatusBar.setHidden(false, true);
    }

    this.setState({
        criteria: '',
        options: this.state.optionsMaster,
        modalVisible: false,
    });
}

export default class AnPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            criteria: '',
            modalVisible: false,
            selectedKey: props.selectedKey,
            options: props.models,
            optionsMaster: props.models,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            selectedKey: props.selectedKey,
            options: props.models,
            optionsMaster: props.models,
        });
    }

    renderControl() {
        return (
            <View>
                <View>
                    {
                        (this.props.label) ?
                            (
                                <Text
                                    style={{
                                        ...Theme.Forms.Label,
                                        ...this.props.labelStyles,
                                    }}
                                >
                                    { this.props.label }
                                </Text>
                            ) : null
                    }

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            open.call(this, !this.props.disabled);
                        }}
                    >
                        <TextInput
                            pointerEvents="box-none"
                            editable={false}
                            underlineColorAndroid="transparent"
                            style={{
                                ...Theme.Forms.Input,
                                ...this.props.customStyles,
                            }}
                            value={
                                this.state.selectedKey ?
                                    _.find(this.state.optionsMaster, {
                                        id: this.state.selectedKey }) ?
                                        _.find(this.state.optionsMaster, {
                                            id: this.state.selectedKey }).name :
                                        this.props.placeholder :
                                    this.props.placeholder
                            }
                        />

                        <View
                            style={{
                                position: 'absolute',
                                bottom: ((Theme.Forms.Input.height) / 2) - 5,
                                right: 5,
                                width: 0,
                                height: 0,
                                backgroundColor: 'transparent',
                                borderStyle: 'solid',
                                borderLeftWidth: 5,
                                borderRightWidth: 5,
                                borderTopWidth: 8,
                                borderLeftColor: 'transparent',
                                borderRightColor: 'transparent',
                                borderTopColor: '#757475',
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderSimplePicker() {
        return (
            <Modal
                style={{
                    backgroundColor: 'blue',
                    position: 'absolute',
                    width: 10,
                }}
                transparent
                animationType="fade"
                onRequestClose={() => {
                    close.call(this);
                }}
                enabled={this.props.enabled}
                visible={this.state.modalVisible}
            >
                <TouchableWithoutFeedback
                    style={{
                        backgroundColor: 'red',
                        padding: 10,
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor: '#00000080',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#00000090',
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: '#ffffff',
                                    maxWidth: 280,
                                    width: '100%',
                                    alignSelf: 'center',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 1,
                                    shadowRadius: 2,
                                    elevation: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Theme.Colors.Primary.Alpha,
                                        padding: 8,
                                        alignItems: 'flex-end',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                        }}
                                        onPress={() => {
                                            close.call(this);
                                        }}
                                    >
                                        <Icon
                                            name="md-close"
                                            style={{
                                                color: Theme.Colors.Primary.Alpha,
                                                fontSize: 25,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <FlatList
                                    style={{
                                        maxHeight: 300,
                                    }}
                                    keyExtractor={item => item.id.toString()}
                                    data={this.state.options}
                                    ListEmptyComponent={() => (
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                marginTop: 30,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: Theme.Fonts.Regular,
                                                    fontSize: 18,
                                                }}
                                            >
                                                No se encontro ningún resultado
                                            </Text>
                                        </View>
                                    )}
                                    renderItem={({ item, separators }) => (
                                        <TouchableOpacity
                                            style={{
                                                width: '100%',
                                                padding: 15,
                                                backgroundColor: (this.state.selectedKey === item.id) ? '#ddd' : '#ffffff',
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#ccc',
                                            }}
                                            onShowUnderlay={separators.highlight}
                                            onHideUnderlay={separators.unhighlight}
                                            onPress={() => {
                                                onChange.call(this, item.id);
                                                close.call(this);
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#000',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    renderSearchPicker() {
        return (
            <Modal
                animationType="slide"
                transparent
                onRequestClose={() => {
                    close.call(this);
                }}
                enabled={this.props.enabled}
                visible={this.state.modalVisible}
            >
                <TouchableWithoutFeedback
                    style={{
                        flex: 1,
                        padding: 10,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#ffffff',
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: '#ffffff',
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: Theme.Colors.Primary.Alpha,
                                    padding: 8,
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: 18,
                                        color: Theme.Colors.Primary.Alpha,
                                        textAlign: 'center',
                                    }}
                                >
                                    {this.props.label}
                                </Text>

                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                    }}
                                    onPress={() => {
                                        close.call(this);
                                    }}
                                >
                                    <Icon
                                        name="md-close"
                                        style={{
                                            color: Theme.Colors.Primary.Alpha,
                                            fontSize: 25,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 2,
                                    borderBottomColor: '#ccc',
                                    padding: 4,
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 8,
                                    }}
                                >
                                    <Icon
                                        name="md-search"
                                        style={{
                                            fontSize: 25,
                                        }}
                                    />
                                </View>

                                <TextInput
                                    placeholder="Buscar ..."
                                    underlineColorAndroid="transparent"
                                    style={{
                                        flex: 1,
                                        padding: 10,
                                        textAlign: 'left',
                                        fontSize: 18,
                                    }}
                                    value={this.state.criteria}
                                    onChangeText={(text) => {
                                        this.setState({
                                            criteria: text,
                                            options: this.state.optionsMaster
                                                .filter(item => (
                                                    item.name.toUpperCase()
                                                        .includes(
                                                            text.toUpperCase(),
                                                        )
                                                )),
                                        });
                                    }}
                                />
                            </View>

                            <FlatList
                                keyExtractor={item => item.id}
                                data={this.state.options}
                                ListEmptyComponent={() => (
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            marginTop: 30,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: Theme.Fonts.Regular,
                                                fontSize: 18,
                                            }}
                                        >
                                            No se encontro ningún resultado
                                        </Text>
                                    </View>
                                )}
                                renderItem={({ item, separators }) => (
                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            padding: 15,
                                            backgroundColor: (this.state.selectedKey === item.id) ? '#ddd' : '#ffffff',
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#ccc',
                                        }}
                                        onShowUnderlay={separators.highlight}
                                        onHideUnderlay={separators.unhighlight}
                                        onPress={() => {
                                            onChange.call(this, item.id);
                                            close.call(this);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#000',
                                                textAlign: 'left',
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    render() {
        return (
            <View
                style={{
                    ...Theme.Forms.FormControl,
                }}
            >
                {this.renderControl()}

                {
                    (this.props.search) ?
                        this.renderSearchPicker() :
                        this.renderSimplePicker()
                }
            </View>
        );
    }
}

AnPicker.defaultProps = {
    placeholder: '',
};

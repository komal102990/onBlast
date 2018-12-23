import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Theme } from 'src/styles';

const styles = StyleSheet.create({
    error: {
        textAlign: 'center',
        color: 'red',
        fontSize: 12,
        marginTop: 10,
        fontWeight: 'bold',
    },
});


export default class AnInput extends Component {
    error() {
        if (this.props.error) {
            return <Text style={styles.error}>{this.props.error[0]}</Text>;
        }

        return null;
    }

    render() {
        return (
            <View
                style={{
                    ...Theme.Forms.FormControl,
                    ...this.props.formControlStyles,
                }}
            >
                <View>
                    {
                        (this.props.label) ?
                            (
                                <Text
                                    style={[Theme.Forms.Label, this.props.labelStyles]}
                                >
                                    { this.props.label }
                                </Text>
                            ) : null
                    }

                    <TextInput
                        style={[Theme.Forms.Input, { ...this.props.customStyles }]}

                        {...this.props}

                        ref={this.props.refcb}

                        underlineColorAndroid="transparent"

                        onChangeText={this.props.onChangeText}
                    />

                    {this.error()}
                </View>
            </View>
        );
    }
}

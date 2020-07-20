import { Input, Item, Label, Text, View } from 'native-base';
import React, { Component } from 'react';
import { Colors } from '../../Utility/Constants';
import { StyleSheet } from 'react-native';

export default class FormInput extends Component {
  UNSAFE_componentWillReceiveProps() {
    this.forceUpdate()
  }

  render() {
    const { hasError, input, error, placeholder, secureTextEntry, margin, maxLength, isMandatory, isActive, icon } = this.props;

    return (
      <View style={styles.formInputContainer} >
        <View style={styles.leftIconContainer} >
          {icon}
        </View>
        <Item floatingLabel
          error={hasError}
          style={[
            {
              margin: margin ? margin : 10
            }, styles.labelContainer]} >
          <Label style={styles.label} >
            <Text style={[
              {
                fontWeight: (isActive || input.value.length > 0) ? '500' : null
              }, styles.placeholder]} >
              {
                (placeholder ? placeholder : '')
              }
            </Text>
            {
              isMandatory ? <Text style={styles.mandatory}>*</Text> : <Text />
            }
          </Label>
          <Input {...input}
            value={input.value}
            style={styles.input}
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
            maxLength={maxLength} />
        </Item>
        {
          (hasError) ? <Text style={[{ bottom: (input.value.length > 0 || isActive) ? 45 : 15}, styles.error]}>
            {error}
          </Text> : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formInputContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  leftIconContainer: {
    width: 25,
  },
  labelContainer: {
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  placeholder: {
    flex: 1,
    fontSize: 20,
    color: 'grey',
  },
  mandatory: {
    color: 'red',
  },
  input: {
    color: Colors.app_color_blue,
    fontSize: 20,
    paddingLeft: 1,
  },
  error: {
    position: 'absolute',
    right: 25,
    color: 'red',
  },

})

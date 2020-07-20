import { Button, Icon, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Colors, Strings } from '../../Utility/Constants';
import AppValidations from './../../Utility/AppValidations';
import FormInput from './../custom/FormInput';


const validate = values => {
  const error = {};
  error.email = '';
  error.password = '';
  var email = values.email;
  var password = values.password;

  if (values.email === undefined) {
    email = '';
  }

  if (values.password === undefined) {
    password = '';
  }

  var validationObj = new AppValidations();
  error.email = validationObj.validateEmail(email)

  if (password.length < 10) {
    error.password = Strings.login_form_error_min_characters;
  }

  return error;
};


class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  renderInput({ input, meta: { touched, error, active } }) {
    var hasError = false;
    if (touched && error !== undefined) {
      hasError = true;
    }
    let icon = <Icon
      name="email"
      type="Fontisto"
      style={{
        fontSize: (active || input.value.length > 0) ? 25 : 22,
        color: (active || input.value.length > 0) ? Colors.app_color_blue : "grey",
        marginTop: (active || input.value.length > 0) ? 8 : 17
      }}
    />
    return (
      <FormInput
        hasError={hasError}
        error={error}
        input={input}
        placeholder={Strings.login_form_place_holder_email}
        isActive={active} icon={icon}
      />
    )
  }

  renderPWInput({ input, meta: { touched, error, active } }) {
    var hasError = false;
    if (touched && error !== undefined) {
      hasError = true;
    }
    let icon = <Icon
      name="lock"
      type="SimpleLineIcons"
      style={{
        fontSize: (active || input.value.length > 0) ? 25 : 22,
        color: (active || input.value.length > 0) ? Colors.app_color_blue : "grey",
        marginTop: (active || input.value.length > 0) ? 8 : 17
      }}
    />
    return (
      <FormInput
        hasError={hasError}
        error={error}
        input={input}
        placeholder={Strings.login_form_place_holder_password}
        secureTextEntry
        isActive={active}
        icon={icon}
        maxLength={15} />
    )
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
        <View style={styles.formContainer}>
          <Field style={styles.inputField} name="email" component={this.renderInput} />
          <Field name="password" component={this.renderPWInput} />
          <Text style={styles.forgotPasswordText}>
            {Strings.login_form_forgot_password}
          </Text>
          <Button rounded
            onPress={handleSubmit}
            disabled={submitting}
            style={[
              {
                backgroundColor: (submitting) ? 'grey' : Colors.app_color_blue
              },
              styles.loginButton
            ]}>
            <Text style={styles.loginButtonText}>{Strings.login_form_login_button}</Text>
          </Button>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  inputField: {
    marginBottom: 30,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    marginTop: 15,
    marginBottom: 25,
    marginHorizontal: 25,
    color: 'grey',
  },
  loginButton: {
    marginTop: 16,
    height: 60,
    marginHorizontal: 30,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontWeight: '800',
    letterSpacing: 1.1,
  },
})

export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm)

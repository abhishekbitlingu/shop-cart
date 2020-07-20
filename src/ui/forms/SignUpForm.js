import { Button, Icon, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Colors, Strings } from '../../Utility/Constants';
import AppValidations from './../../Utility/AppValidations';
import FormInput from './../custom/FormInput';


const validate = values => {
  const error = {};
  error.username = '';
  error.email = '';
  error.contact = '';
  error.password = '';
  var username = values.username;
  var email = values.email;
  var contact = values.contact;
  var password = values.password;
  if (values.username === undefined) {
    username = '';
  }
  if (values.email === undefined) {
    email = '';
  }
  if (values.password === undefined) {
    password = '';
  }
  if (values.contact === undefined) {
    contact = '';
  }

  var validationObj = new AppValidations();
  if (username.length < 10) {
    error.username = Strings.signup_form_error_min_characters;
  }
  error.email = validationObj.validateEmail(email)

  if (!validationObj.isValidPhone(contact)) {
    error.contact = Strings.signup_form_error_invalid_phone;
  }

  if (password.length < 10) {
    error.password = Strings.signup_form_error_min_characters;
  }
  return error;
};


class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }

  renderUserNameInput({ input, meta: { touched, error, active } }) {
    var hasError = false;
    if (touched && error !== undefined) {
      hasError = true;
    }
    let icon = <Icon
      name="user"
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
        placeholder={Strings.signup_form_place_holder_username}
        isActive={active}
        icon={icon} />
    )
  }

  renderEmailInput({ input, meta: { touched, error, active } }) {
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
        placeholder={Strings.signup_form_place_holder_email}
        isActive={active} icon={icon} />
    )
  }

  renderContactInput({ input, meta: { touched, error, active } }) {
    var hasError = false;
    if (touched && error !== undefined) {
      hasError = true;
    }
    let icon = <Icon
      name="mobile"
      type="Entypo"
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
        placeholder={Strings.signup_form_place_holder_phone_number}
        isActive={active}
        icon={icon} />
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
        placeholder={Strings.signup_form_place_holder_password}
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
        <Field style={styles.formField} name="username" component={this.renderUserNameInput} />
        <Field style={styles.formField} name="email" component={this.renderEmailInput} />
        <Field style={styles.formField} name="contact" component={this.renderContactInput} />
        <Field name="password" component={this.renderPWInput} />
        <Button rounded
          onPress={handleSubmit}
          disabled={submitting}
          style={[
            {
              backgroundColor: (submitting) ? 'grey' : Colors.app_color_blue
            },
            styles.registerButton
          ]}>
          <Text style={styles.registerButtonText}>{Strings.signup_form_register_button}</Text>
        </Button>
        <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
          <Text style={styles.orSignUp}>{Strings.signup_form_or_signup}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
            <Thumbnail source={{ uri: 'facebook_logo' }} />
            <Thumbnail source={{ uri: 'twitter_logo' }} />
            <Thumbnail source={{ uri: 'google_plus' }} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',    
  },
  formField: {
    marginBottom: 30,
  },
  registerButton: {
    marginTop: 16,
    height: 60,
    marginHorizontal: 30,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  registerButtonText: {
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  orSignUp: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20,
    color: "grey",
    textAlign: 'center',
  }
})

export default reduxForm({
  form: 'SignUpForm',
  validate
})(SignUpForm)

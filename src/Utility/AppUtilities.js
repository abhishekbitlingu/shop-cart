import { Alert } from "react-native"

export default class AppUtilities {
    static showAlert(message, positiveButtonText, onPositiveButtonPress, negativeButtonText, onNegativeButtonPress) {
        let buttonArray = []
        buttonArray.push({text: (positiveButtonText) ? positiveButtonText : 'Ok', onPress: () => {(onPositiveButtonPress) ? onPositiveButtonPress() : console.log('On Ok pressed function not available')}})
        if (negativeButtonText) {
          buttonArray.push({text: (negativeButtonText) ? negativeButtonText : 'Cancel', onPress: () => {(onNegativeButtonPress) ? onNegativeButtonPress() : console.log('On Cancel pressed function not available')}})
        }
        Alert.alert(
          'Alert',
          (message) ? message : "",
          buttonArray
        )
    }

    static createAuthToken() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 24; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
}




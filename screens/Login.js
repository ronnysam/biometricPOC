import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics'

export default LoginScreen = () => {
    useEffect(() => {
        ReactNativeBiometrics.isSensorAvailable()
            .then((resultObject) => {
                const { available, biometryType } = resultObject
                if (available && biometryType === ReactNativeBiometrics.TouchID) {
                    console.log('TouchID is supported')
                } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
                    console.log('FaceID is supported')
                } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
                    console.log('Biometrics is supported')
                } else {
                    console.log('Biometrics not supported')
                }
            })
    })
    handleKeyPair = () => {
        ReactNativeBiometrics.createKeys('Confirm fingerprint')
            .then((resultObject) => {
                const { publicKey } = resultObject
                console.log(publicKey)
            })
    }
    getKeyPair = () => {
        ReactNativeBiometrics.biometricKeysExist()
            .then((resultObject) => {
                const { keysExist } = resultObject

                if (keysExist) {
                    console.log('Keys exist')
                } else {
                    console.log('Keys do not exist or were deleted')
                }
            })
    }
    handleBiometric = () => {
        ReactNativeBiometrics.simplePrompt({ promptMessage: 'Confirm fingerprint' })
            .then((resultObject) => {
                const { success } = resultObject

                if (success) {
                    console.log('successful biometrics provided');
                    getKeyPair();
                } else {
                    console.log('user cancelled biometric prompt')
                }
            })
            .catch(() => {
                console.log('biometrics failed')
            })
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login Screen</Text>
            <TouchableOpacity onPress={handleKeyPair}>
                <Text>Click me to Store Credentials</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBiometric}>
                <Text>Click me to do biometric login</Text>
            </TouchableOpacity>
        </View>
    );
}
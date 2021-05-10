import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Keychain from 'react-native-keychain';

const BiometricTypes = {
    TouchID: 'TouchID',
    FaceID: 'FaceID',
    Fingerprint: 'FINGERPRINT'
}

export default LoginScreen = () => {
    useEffect(() => {
        Keychain.getSupportedBiometryType()
            .then((biometryType) => {
                if (biometryType === BiometricTypes.TouchID) {
                    console.log('TouchID is supported')
                } else if (biometryType === BiometricTypes.FaceID) {
                    console.log('FaceID is supported')
                } else if (biometryType === BiometricTypes.Fingerprint) {
                    console.log('Biometrics is supported')
                } else {
                    console.log('Biometrics not supported')
                }
            })
    })
    handleKeyPair = () => {
        Keychain.setGenericPassword('ron', 'password', {
            service: 'biometric',
            authenticationPrompt: {title: "Enter Biometric"},
            accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
            accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
            authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS
        })
    }
    getKeyPair = () => {
        Keychain.getGenericPassword({
            service: 'biometric'
        })
        .then((result) => {
            if(!result){
                console.log('Biometric Failed');
            }
            if(typeof result !== 'boolean'){
                console.log(result);
            }
        }) 
    }
    handleBiometric = () => {
        getKeyPair();
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
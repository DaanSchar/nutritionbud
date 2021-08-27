import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView, ActivityIndicator
} from "react-native";
import React, {useState} from 'react';
import {color} from "../../../assets/color/color";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as storage from "../../services/storage";
import * as userApiService from "../../services/api/userApiService";

const Login = ({ navigation }) => {

    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState({ message : ''});

    const onLogin = () => {
        setLoading(true)

        userApiService.login(email, password)
            .then(response => {
                handleResponse(response)
                setLoading(false)
            })
    }

    const handleResponse = (response) => {
        if (response.token)
            storage.storeUserToken(response.token.toString())
                .then(navigation.navigate('App'))
        else
            setError(response)
    }

    return (
        <ScrollView contentContainerStyle={{flex: 1,}}>
            <KeyboardAvoidingView behavior={'height'} style={{flex: 1,}}>
                <LinearGradient colors={[color.four,color.primary]} style={styles.container}>
                    <StatusBar translucent={true} backgroundColor={'transparent'} />

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Login</Text>
                    </View>

                    <View style={styles.contentContainer} behavior={'height'}>

                        <View style={styles.section}>
                            <Text style={styles.inputText}>User</Text>
                            <View style={styles.inputContainer}>
                                <FontAwesome5 name={'user-tag'} size={17} color={'black'}/>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'username / email'}
                                    fontSize={16}
                                    onChangeText={text => setEmail(text)}
                                />
                                <Feather
                                    name={'check-circle'}
                                    size={20}
                                    color={email.length > 5 && email.includes('@') ? 'green' : 'grey'}/>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.inputText}>Password</Text>
                            <View style={styles.inputContainer}>
                                <FontAwesome5 name={'lock'} size={17} color={'black'}/>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'password'}
                                    fontSize={16}
                                    secureTextEntry={!visible}
                                    onChangeText={text => setPassword(text)}
                                />
                                <TouchableOpacity onPress={() => setVisible(!visible)}>
                                    <Feather
                                        name={visible ? 'eye' : 'eye-off'}
                                        size={20}
                                        color={'grey'}/>
                                </TouchableOpacity>
                            </View>

                            <View style={{ height: 30 }}>
                                {
                                    isLoading ?
                                        <ActivityIndicator color={color.primary} size={25} style={{marginTop: 5,}}/>
                                        :
                                        <Text style={styles.errorMessage}>{error.message}</Text>
                                }
                            </View>
                        </View>


                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.loginButton} onPress={() => {setError({message: ''}); onLogin()}}>
                                <Text style={styles.loginButtonText}>Sign in</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
                                <Text style={[styles.loginButtonText, { color: color.primary,}]}>Sign up</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </LinearGradient>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },


    contentContainer: {
        marginHorizontal: 20,
        backgroundColor: color.white,
        borderRadius: 20,
    },
    section: {
        marginHorizontal: 20,
        paddingBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        borderColor: color.offWhite,
        borderBottomWidth: 1.5,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginHorizontal: 10,
    },

    buttonContainer: {
        marginHorizontal: 20,
        alignItems: 'center',
        marginTop: 10,
        paddingBottom: 20,
    },
    loginButton: {
        backgroundColor: color.primary,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingVertical: 5,
    },
    registerButton: {
        marginTop: 10,
        backgroundColor: color.white,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingVertical: 5,
        borderWidth: 1.5,
        borderColor: color.primary,
    },


    // text
    title: {
        fontFamily: 'Roboto-Black',
        fontSize: 40,
        color: color.white,
    },
    inputText: {
        marginTop: 10,
        fontFamily: 'Roboto-SemiBold',
        fontSize: 16,
        color: 'black',
    },
    loginButtonText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        color: color.white,
    },
    errorMessage: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: color.primary,
        alignSelf: 'center',
        marginTop: 5,
    }
})

import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ScrollView, ActivityIndicator
} from "react-native";
import React, {useState} from 'react';
import LinearGradient from "react-native-linear-gradient";
import {color} from "../../../assets/color/color";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import * as mealApiService from "../../services/mealApiService";
import * as storage from "../../services/storage";

const Register = ({ navigation }) => {

    const [visible, setVisible] = useState(false);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePass, setRePass] = useState('');

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({message: ''})

    const onRegister = () => {
        if (password === rePass) {
            setLoading(true)
            registerRequest()
        } else {
            setError({message: 'Passwords are not the same'})
        }
    }

    const registerRequest = () => {
        mealApiService.register(email, password, firstName, lastName)
            .then(async response => {
                if (response.ok)
                    await mealApiService.login(email, password)
                        .then(async response => storeUserToken(await response.json()))
                else
                    setError(await response.json())
                setLoading(false)
            })
    }

    const storeUserToken = (body) => {
        storage.storeUserToken(body.token.toString())
            .then(navigation.navigate('Home'))
    }


    return (
        <ScrollView contentContainerStyle={{flex: 1,}}>
            <KeyboardAvoidingView behavior={'height'} style={{flex: 1,}}>
                <LinearGradient colors={[color.four,color.primary]} style={styles.container}>
                    <StatusBar translucent={true} backgroundColor={'transparent'} />

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Create Account</Text>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={styles.section}>
                            <Text style={styles.inputText}>First Name</Text>
                            <View style={styles.inputContainer}>
                                <FontAwesome5
                                    name={'user-tag'}
                                    size={17}
                                    color={'black'}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder={'name'}
                                    fontSize={16}
                                    onChangeText={text => setFirstName((text))}
                                />
                                <Feather
                                    name={'check-circle'}
                                    size={20}
                                    color={firstName.length > 3 ? 'green' : 'black'}
                                />
                            </View>
                        </View>


                        <View style={styles.section}>
                            <Text style={styles.inputText}>Last Name</Text>
                            <View style={styles.inputContainer}>
                                <FontAwesome5
                                    name={'user-tag'}
                                    size={17}
                                    color={'black'}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder={'name'}
                                    fontSize={16}
                                    onChangeText={text => setLastName(text)}
                                />
                                <Feather
                                    name={'check-circle'}
                                    size={20}
                                    color={lastName.length > 3 ? 'green' : 'black'}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.inputText}>Email</Text>
                            <View style={styles.inputContainer}>
                                <FontAwesome5
                                    name={'user-tag'}
                                    size={17}
                                    color={'black'}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder={'nutrion@bud.com'}
                                    fontSize={16}
                                    onChangeText={text => setEmail(text)}
                                />
                                <Feather
                                    name={'check-circle'}
                                    size={20}
                                    color={email.length > 5 && email.includes('@') ? 'green' : 'black'}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.inputText}>Password</Text>
                            <View style={styles.inputContainer}>
                                <FontAwesome5
                                    name={'lock'}
                                    size={17}
                                    color={'black'}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder={'password'}
                                    fontSize={16}
                                    secureTextEntry={!visible}
                                    onChangeText={text => setPassword(text)}
                                />
                                <TouchableOpacity onPress={() => setVisible(!visible)}>
                                    <Feather name={visible ? 'eye' : 'eye-off'} size={20} color={'black'}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.inputText}>Re-enter Password</Text>
                            <View style={styles.inputContainer}>
                                <FontAwesome5
                                    name={'lock'}
                                    size={17}
                                    color={'black'}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder={'password'}
                                    fontSize={16}
                                    secureTextEntry={!visible}
                                    onChangeText={text => setRePass(text)}
                                />
                            </View>
                        </View>


                        <View style={{height: 30,}}>
                            {
                                isLoading ?
                                    <ActivityIndicator color={color.primary} size={25} style={{marginTop: 5,}}/>
                                    :
                                    <Text style={styles.errorMessage}>{error.message}</Text>
                            }
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.loginButton} onPress={() => onRegister()}>
                                <Text style={styles.loginButtonText}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </LinearGradient>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default Register;

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


    // text
    title: {
        fontFamily: 'Roboto-Black',
        fontSize: 35,
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

import React, { useState, useEffect } from 'react'
import { Pressable, Text, Keyboard } from 'react-native'
import { Box, Heading, NativeBaseProvider, Input, Button, FormControl, useToast } from 'native-base'
import { Formik } from 'formik'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth from '@react-native-firebase/auth'
import { loginValidationsSchema, registerValidationsSchema } from '../../validations'
import { authErrors } from '../../authErrorMessages'

export default ({ navigation }) => {

    const toast = useToast()

    const [authType, setAuthType] = useState("login")
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            if (user) navigation.replace('Home')
        })
        return unsubscribe()
    }, [])

    const login = (value) => {
        Keyboard.dismiss()
        const { email, password } = value
        auth().signInWithEmailAndPassword(email, password)
            .then(() => navigation.replace('Home'))
            .catch(errors => toast.show({
                description: authErrors(errors.code),
                placement: 'bottom'
            }))
    }
    const register = (value) => {
        Keyboard.dismiss()
        const { email, password } = value
        auth().createUserWithEmailAndPassword(email, password)
            .then(() => navigation.replace('Home'))
            .catch(errors => toast.show({
                description: authErrors(errors.code),
                placement: 'bottom'
            }))
    }

    return (
        <NativeBaseProvider>
            <Box p={4} bg={'bisque'} flex={1} >
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        passwordConfirm: ''
                    }}
                    onSubmit={(value) => authType === 'login' ? login(value) : register(value)}
                    validationSchema={authType === 'login' ?
                        loginValidationsSchema : registerValidationsSchema
                    }
                >
                    {({ values, errors, handleChange, handleSubmit }) => (
                        <>
                            <Heading mb={1}>E-mail</Heading>
                            <FormControl isInvalid={errors.email} >
                                <Input
                                    fontSize={20}
                                    borderColor={'blueGray.900'}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    keyboardType='email-address'
                                    autoCapitalize={false}
                                />
                                <FormControl.ErrorMessage fontSize={18} leftIcon={<Icon name='alert-circle-outline' color={'red'} />} >
                                    {errors.email}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <Heading my={1} >Şifre</Heading>
                            <FormControl isInvalid={errors.password}>
                                <Input
                                    fontSize={20}
                                    borderColor={'blueGray.900'}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    autoCapitalize={false}
                                    InputRightElement={
                                        <Pressable onPress={() => setShowPassword(!showPassword)} >
                                            <Icon
                                                name={showPassword ? 'eye' : 'eye-off'}
                                                size={32}
                                                style={{ marginHorizontal: 8 }}
                                                color={'grey'}
                                            />
                                        </Pressable>
                                    }
                                />
                                <FormControl.ErrorMessage fontSize={18} leftIcon={<Icon name='alert-circle-outline' color={'red'} />} >
                                    {errors.password}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            {authType === 'register' && <>
                                <Heading my={1} >Şifre Tekrarı</Heading>
                                <FormControl isInvalid={errors.passwordConfirm} >
                                    <Input
                                        fontSize={20}
                                        borderColor={'blueGray.900'}
                                        value={values.passwordConfirm}
                                        onChangeText={handleChange('passwordConfirm')}
                                        type={showPasswordConfirm ? 'text' : 'password'}
                                        autoCapitalize={false}
                                        InputRightElement={
                                            <Pressable onPress={() => setShowPasswordConfirm(!showPasswordConfirm)} >
                                                <Icon
                                                    name={showPasswordConfirm ? 'eye' : 'eye-off'}
                                                    size={32}
                                                    style={{ marginHorizontal: 8 }}
                                                    color={'grey'}
                                                />
                                            </Pressable>
                                        }
                                    />
                                    <FormControl.ErrorMessage fontSize={18} leftIcon={<Icon name='alert-circle-outline' color={'red'} />} >
                                        {errors.passwordConfirm}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            </>}
                            <Button
                                mt={8}
                                size={'lg'}
                                fontSize={36}
                                fontWeight={'bold'}
                                onPress={handleSubmit}
                            >{authType === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}</Button>
                        </>
                    )}

                </Formik>
                <Text style={{
                    color: '#1866d7',
                    textAlign: 'center',
                    marginTop: 4,
                    textDecorationLine: 'underline'
                }}
                    onPress={() => authType === 'login' ? setAuthType('register') : setAuthType('login')}
                >{authType === 'login' ? 'Hesabım yok, hesap oluştur.' : 'Hesabım var, giriş yap.'}</Text>
            </Box>
        </NativeBaseProvider>
    )
}
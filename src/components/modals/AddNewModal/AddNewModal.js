import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import { Box, Button, Heading, Input, useToast } from 'native-base'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ADD_NEW_QUESTION_MUTATION } from '../../../queries'
import { useMutation } from '@apollo/client'
import auth from '@react-native-firebase/auth'
import styles from './AddNewModal.style'

export default ({ isVisible, closeModal }) => {

    const [addNewQuestion, { loading, error }] = useMutation(ADD_NEW_QUESTION_MUTATION)

    const [title, setTitle] = useState('')
    const [options, setOptions] = useState([{ text: '' }, { text: '' }])

    const toast = useToast()

    useEffect(() => {
        setTitle('')
        setOptions([{ text: '' }, { text: '' }])
    }, [isVisible])

    const handleOptionChange = (value, index) => {
        const data = [...options]
        data[index].text = value
        setOptions(data)
    }

    const handleNewOption = () => setOptions(prev => [...prev, { text: '' }])

    const handleDeletedOption = (selectedIndex) => setOptions(prev => prev.filter((item, index) => index !== selectedIndex))

    const handleSubmit = async () => {

        closeModal()
        const optionsData = options.filter(item => item.text !== '')
        if (title === '' || optionsData.length < 2) {
            toast.show({
                description: 'Başlık ve en az iki cevap gereklidir.',
                placement: 'bottom'
            })
            return
        }

        const result = await addNewQuestion({
            variables: {
                title: title,
                options: options,
                user_id: auth().currentUser?.uid
            }
        }).then(() => toast.show({
            description: 'Yeni soru eklendi.',
            placement: 'bottom'
        })).catch(() => toast.show({
            description: 'Bir hata oluştu.',
            placement: 'bottom'
        }))
    }

    return (
        <Modal
            isVisible={isVisible}
            animationInTiming={800}
            animationOutTiming={800}
            onSwipeComplete={closeModal}
            onBackButtonPress={closeModal}
            onBackdropPress={closeModal}
            style={styles.modal}
        >
            <Box p={8} style={styles.modalView}>
                <ScrollView>
                    <Box flex={1} >
                        <Heading mb={2} >Soru</Heading>
                        <Input
                            placeholder='Soru giriniz...'
                            fontSize={20}
                            borderColor={'blueGray.900'}
                            value={title}
                            onChangeText={setTitle}
                        />
                        <Heading mt={6} mb={2} >Seçenekler</Heading>
                        {
                            options.map((item, index) => (
                                <Input
                                    placeholder='Seçenek giriniz...'
                                    fontSize={20}
                                    borderColor={'blueGray.900'}
                                    mb={1}
                                    key={index}
                                    value={item.text}
                                    onChangeText={(value) => handleOptionChange(value, index)}
                                    InputRightElement={
                                        options.length > 2 &&
                                        <Icon
                                            name='close-box'
                                            size={36}
                                            color={'red'}
                                            onPress={() => handleDeletedOption(index)}
                                        />
                                    }
                                />
                            ))
                        }
                        <Box mt={3} flexDirection={'row'} justifyContent={'flex-end'} >
                            <Button
                                colorScheme={'blueGray'}
                                leftIcon={<Icon name='plus-box' size={24} />}
                                onPress={options.length <= 5 && handleNewOption}
                                disabled={options.length >= 5}
                            />
                        </Box>
                    </Box>
                </ScrollView>
                <Box>
                    <Button onPress={handleSubmit} >Kaydet</Button>
                </Box>
            </Box>
        </Modal>
    )
}
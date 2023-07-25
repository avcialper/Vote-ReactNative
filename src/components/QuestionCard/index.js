import React from 'react'
import { Pressable, Text } from 'react-native'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DELETE_QUESTION_MUTATION } from '../../queries'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@apollo/client'

export default ({ item }) => {

    const navigation = useNavigation()

    const [deleteQuestions, { loading }] = useMutation(DELETE_QUESTION_MUTATION, {
        variables: {
            id: item.id
        }
    })

    const handleDelete = async () => {
        await deleteQuestions()
    }

    return (
        <Pressable style={{
            padding: 8,
            margin: 8,
            borderWidth: 2,
            borderTopWidth: 0,
            borderRadius: 8,
            borderColor: 'grey',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center'
        }} onPress={() => navigation.navigate('Detail', { id: item.id })} >
            <Text style={{
                color: 'black',
                fontSize: 24,
                fontWeight: '700'
            }} >{item.text}</Text>
            {auth().currentUser?.uid === item.user_id &&
                <Icon
                    name='close-box'
                    size={36}
                    color={'red'}
                    onPress={handleDelete}
                />
            }
        </Pressable>
    )
}
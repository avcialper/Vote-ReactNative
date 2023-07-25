import React from 'react'
import { Pressable, Text, View } from 'react-native'
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

    const isOwner = auth().currentUser?.uid === item.user_id

    const handleDelete = async () => {
        await deleteQuestions()
    }

    return (
        <Pressable style={{
            width: '95%',
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
            <View style={[isOwner ? { width: '90%' } : { width: '100%' }]} >
                <Text style={{
                    color: 'black',
                    fontSize: 24,
                    fontWeight: '700'
                }} >{item.text}</Text>
            </View>
            {isOwner &&
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
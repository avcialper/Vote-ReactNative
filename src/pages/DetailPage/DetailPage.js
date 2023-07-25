import React, { useState } from 'react'
import AnimationRenderer from '../../components/AnimationRenderer'
import { useQuery } from '@apollo/client'
import { GET_QUESTIONS_DETAIL } from '../../queries'
import { Box, Heading, NativeBaseProvider } from 'native-base'
import auth from '@react-native-firebase/auth'
import Form from '../../components/Form'
import Result from '../../components/Result'

export default ({ route }) => {

    const { id } = route.params

    const [isVoted, setIsVoted] = useState(false)

    const { data, loading, error } = useQuery(GET_QUESTIONS_DETAIL, {
        variables: {
            id,
            user_id: auth().currentUser?.uid
        },
        fetchPolicy: 'cache-and-network'
    })


    if (loading) return <AnimationRenderer path={require('../../assets/loading.json')} />

    if (error) return <AnimationRenderer path={require('../../assets/error.json')} />

    const { text, questions_options, questions_answers } = data.questions_by_pk

    return (
        <NativeBaseProvider>
            <Box flex={1} backgroundColor={'bisque'} p={6} >
                <Heading color={'black'} fontSize={24} >{text}</Heading>
                {
                    (!isVoted && questions_answers.length < 1) ?
                        <Form options={questions_options} setIsVoted={() => setIsVoted(true)} id={id} /> :
                        <Result id={id} />
                }
            </Box>
        </NativeBaseProvider>
    )
}
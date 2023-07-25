import React, { useState } from 'react'
import { Box, Radio, Button } from 'native-base'
import auth from '@react-native-firebase/auth'
import { useMutation } from '@apollo/client'
import { NEW_ANSWER_MUTATION } from '../../queries'

export default ({ options, setIsVoted, id }) => {

    const [selected, setSelected] = useState('')

    const [newAnswer, { data, loading }] = useMutation(NEW_ANSWER_MUTATION)

    const handleSubmit = async () => {
        if (!selected) {
            return
        }
        await newAnswer({
            variables: {
                option_id: selected,
                user_id: auth().currentUser?.uid,
                question_id: id
            }
        })
        setIsVoted()
    }

    return (
        <Box py={6} >
            <Radio.Group value={selected} onChange={setSelected} >
                {
                    options.map(option => (
                        <Radio
                            key={option.id}
                            value={option.id}
                            my={1}
                            size={'lg'}
                        >
                            {option.text}
                        </Radio>
                    ))
                }
            </Radio.Group>
            <Button mt={6} onPress={handleSubmit} >Gönder</Button>
        </Box>
    )
}
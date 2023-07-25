import { useSubscription } from '@apollo/client'
import React from 'react'
import { Box } from 'native-base'
import { RESULT_SUBSCRIPTION } from '../../queries'
import AnimationRenderer from '../AnimationRenderer'
import ResultsItem from '../ResultsItem'

export default ({ id }) => {

    const { data, loading, error } = useSubscription(RESULT_SUBSCRIPTION, {
        variables: {
            id
        }
    })

    if (loading) return <AnimationRenderer path={require('../../assets/loading.json')} />

    if (error) return <AnimationRenderer path={require('../../assets/error.json')} />

    const { questions_options: options } = data.questions_by_pk

    const total = options.reduce((total, item) => total + item.answer_aggregate.aggregate.count, 0)

    console.log(total)

    return (
        <Box>
            {
                options.map(item => (
                    <ResultsItem key={item.id} item={item} total={total} />
                ))
            }
        </Box>
    )
}
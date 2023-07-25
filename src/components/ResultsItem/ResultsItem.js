import React from 'react'
import { Heading, Box, Progress } from 'native-base'

export default ({ item, total }) => {

    const count = item.answer_aggregate.aggregate.count

    return (
        <Box my={3}>
            <Heading size={'sm'} mb={3} >
                {item.text} (% {((count * 100) / total).toFixed(1)}) - {count} total
            </Heading>
            <Progress value={count} max={total} bg={'blueGray.400'} size={'md'} />
        </Box>
    )
}
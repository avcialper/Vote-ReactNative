import React from 'react'
import { Image, Text, FlatList, View } from 'react-native'
import { useSubscription } from '@apollo/client'
import { GET_QUERY_SUBSCRIPTION } from '../../queries'
import AnimationRenderer from '../AnimationRenderer'
import QuestionCard from '../QuestionCard'
import styles from './Questions.style'

export default () => {

    const { data, loading, error } = useSubscription(GET_QUERY_SUBSCRIPTION)

    if (loading)
        return <AnimationRenderer path={require('../../assets/loading.json')} />

    if (error)
        return <AnimationRenderer path={require('../../assets/error.json')} />

    const renderQuestions = ({ item }) => <QuestionCard item={item} />
    return (
        <FlatList
            ListEmptyComponent={(
                <View style={styles.emptyContainer} >
                    <Image source={require('../../assets/noSurveys.png')} style={styles.image} />
                    <Text style={styles.emptyTitle} >No surveys yet.</Text>
                </View>
            )}
            data={data.questions}
            renderItem={renderQuestions}
        />
    )
}
import React from 'react'
import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default ({ onPress, iconName }) => {

    return (
        <Pressable onPress={onPress} >
            <Icon name={iconName} size={36} color={'black'} />
        </Pressable>
    )
}
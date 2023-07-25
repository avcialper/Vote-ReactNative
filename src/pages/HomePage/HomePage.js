import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Questions from '../../components/Questions'
import HeaderButton from '../../components/HeaderButton'
import AddNewModal from '../../components/modals/AddNewModal'
import { NativeBaseProvider } from 'native-base'
import styles from './HomePage.style'

export default ({ navigation }) => {

    const [addModalVisible, setAddModalVisible] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <HeaderButton onPress={() => setAddModalVisible(() => !addModalVisible)} iconName={'plus-box'} />
                    <HeaderButton onPress={() => navigation.navigate('Profile')} iconName={'account-box'} />
                </>
            )
        })
    }, [navigation])

    return (
        <NativeBaseProvider>
            <View style={styles.container} >
                <Questions />
                <AddNewModal isVisible={addModalVisible} closeModal={() => setAddModalVisible(false)} />
            </View>
        </NativeBaseProvider>
    )
}
import Lottie from 'lottie-react-native'

export default ({ path }) => {
    return (
        <Lottie
            source={path}
            autoPlay={true}
            style={{ backgroundColor: 'bisque' }}
        />
    )
}
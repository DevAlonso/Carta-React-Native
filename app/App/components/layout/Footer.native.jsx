import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps'

function Footer() {
    const handlePress = () => {
        Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.link}>Visit our website</Text>
            </TouchableOpacity>
            <Text style={styles.address}>123 Free Code Camp</Text>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 27.97037,
                    longitude: -15.61269,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                <Marker
                    coordinate={{ latitude: 27.97037, longitude: -15.61269 }}
                />
            </MapView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
    },
    link: {
        color: 'black',
        marginBottom: 10,
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    address: {
        marginBottom: 10,
        textAlign: 'center'
    },
    map: {
        width: '100%',
        height: 200
    }
});

export default Footer;
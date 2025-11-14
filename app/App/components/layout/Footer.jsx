import { View, Text, StyleSheet, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native';

function Footer() {
    const handlePress = () => {
        Linking.openURL('https://www.example.com');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <Text style={styles.link}>Visit our website</Text>
            </TouchableOpacity>
            <Text style={styles.address}>123 Free Code Camp</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    link: {
        color: 'black',
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
    address: {
        marginBottom: 10,
    },
});

export default Footer;
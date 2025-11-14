import { View, Text, StyleSheet } from 'react-native';

function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>CAMPER CAFE</Text>
            <Text style={styles.established}>Est. 2020</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    established: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 5,
    },
});

export default Header;
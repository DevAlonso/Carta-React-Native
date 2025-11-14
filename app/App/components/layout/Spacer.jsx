import { View, StyleSheet } from 'react-native';

function Spacer() {
    return (
        <View style={styles.divider} />
    );
}

const styles = StyleSheet.create({
    divider: {
        height: 3,
        backgroundColor: 'brown',
        marginVertical: 20,
        width: '100%',
    },
});

export default Spacer;
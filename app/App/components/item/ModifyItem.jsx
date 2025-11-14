import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ModifyItem({ modifyItem, setModifyItem, saveNewItemValue }) {
    const handleOnClick = () => {
        if (modifyItem) {
            setModifyItem(false);
        } else {
            saveNewItemValue();
            setModifyItem(true);
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleOnClick}>
            <Text style={styles.buttonText}>✏️</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5ebe0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(94, 82, 64, 0.3)',
        marginLeft: 5,
    },
    buttonText: {
        fontSize: 18,
    },
});
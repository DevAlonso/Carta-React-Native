import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { deleteProducto } from "../../services/api";

export default function RemoveItem({ itemId, loadData }) {
    const handleDelete = () => {
        deleteProducto(itemId)
            .then(() => {
                loadData();
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                alert('Error al eliminar el producto');
            });
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>🗑️</Text>
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
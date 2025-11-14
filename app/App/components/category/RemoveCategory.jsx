import { TouchableOpacity, Alert, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { deleteCategoria, getProductos, deleteProducto } from "../../services/api";

export default function RemoveCategory({ categoryId, itemsCount, loadData }) {
    const deleteCategoryHandler = () => {
        if (itemsCount > 0) {
            Alert.alert(
                "Confirm Delete",
                "This category has items. Delete anyway?",
                [
                    { text: "Cancel", style: "cancel" },
                    { 
                        text: "OK", 
                        onPress: () => proceedWithDeletion()
                    }
                ]
            );
        } else {
            proceedWithDeletion();
        }
    };

    const proceedWithDeletion = () => {
        if (itemsCount > 0) {
            getProductos(categoryId)
                .then(productosResponse => {
                    if (productosResponse.status === 'success' && productosResponse.data.length > 0) {
                        const deletePromises = productosResponse.data.map(producto => 
                            deleteProducto(producto.id)
                        );
                        return Promise.all(deletePromises);
                    }
                })
                .then(() => {
                    return deleteCategoria(categoryId);
                })
                .then(() => {
                    loadData();
                })
                .catch(error => {
                    console.error('Error deleting category:', error);
                    alert('Error al eliminar la categoría');
                });
        } else {
            deleteCategoria(categoryId)
                .then(() => {
                    loadData();
                })
                .catch(error => {
                    console.error('Error deleting category:', error);
                    alert('Error al eliminar la categoría');
                });
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={deleteCategoryHandler}>
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
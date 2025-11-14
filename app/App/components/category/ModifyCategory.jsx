import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { updateCategoria } from "../../services/api";

export default function ModifyCategory({
    categoryChange,
    setCategoryChange,
    inputValue,
    setInputValue,
    categoryId,
    currentCategory,
    loadData
}) {
    const renameCategory = () => {
        setInputValue(currentCategory);
        setCategoryChange(!categoryChange);
    };

    const saveCategory = () => {
        if (inputValue.length === 0 || inputValue.trim() === '') {
            alert('The input is empty');
            return;
        }
        updateCategoria(categoryId, inputValue)
            .then(() => {
                setInputValue('');
                setCategoryChange(!categoryChange);
                loadData();
            })
            .catch(error => {
                console.error('Error updating category:', error);
                alert('Error al actualizar la categoría');
            });
    };

    const applyState = () => {
        if (categoryChange) {
            renameCategory();
        } else {
            saveCategory();
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={applyState}>
            <Text style={styles.buttonText}>{categoryChange ? 'Modify' : 'Save'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5ebe0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(94, 82, 64, 0.3)',
        marginLeft: 5,
    },
    buttonText: {
        fontSize: 16,
    },
});
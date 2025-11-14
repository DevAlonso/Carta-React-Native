import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { addProducto } from "../../services/api";

export default function AddItem({ addItemState, setAddItemState, categoriaId, loadData }) {
    const [inputName, setInputName] = useState("");
    const [inputPrice, setInputPrice] = useState("");

    const handleOnClick = () => {
        if (addItemState) {
            setAddItemState(false);
        } else {
            addItem();
            setAddItemState(true);
        }
    };

    const addItem = () => {
        if (inputName.trim() === "" || inputPrice.trim() === "") {
            alert("Fields cannot be empty");
            return;
        }
        addProducto(categoriaId, inputName, inputPrice)
            .then(() => {
                setInputName("");
                setInputPrice("");
                loadData();
            })
            .catch(error => {
                console.error('Error adding product:', error);
                alert('Error al añadir el producto');
            });
    };

    if (addItemState) {
        return (
            <TouchableOpacity style={styles.addButton} onPress={handleOnClick}>
                <Text style={styles.addButtonText}>+ Add Item</Text>
            </TouchableOpacity>
        );
    } else {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Product Name"
                    value={inputName}
                    onChangeText={setInputName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Product Price"
                    value={inputPrice}
                    onChangeText={setInputPrice}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.addButtonSmall} onPress={handleOnClick}>
                    <Text style={styles.addButtonTextSmall}>✅</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    input: {
        flex: 1,
        height: 35,
        borderColor: 'rgba(94, 82, 64, 0.3)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#f5ebe0',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'rgba(94, 82, 64, 0.3)',
        marginTop: 10,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addButtonSmall: {
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5ebe0',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'rgba(94, 82, 64, 0.3)',
    },
    addButtonTextSmall: {
        fontSize: 16,
    },
});
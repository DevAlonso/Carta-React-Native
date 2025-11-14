import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { addCategoria } from "../../services/api";

export default function AddCategory({ loadData }) {
    const [inputText, setInputText] = useState("");

    const addNewCategory = () => {
        if (inputText.trim() === "") return;
        addCategoria(inputText)
            .then(() => {
                setInputText("");
                loadData();
            })
            .catch(error => {
                console.error('Error adding category:', error);
                alert('Error al añadir la categoría');
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="New Category"
                value={inputText}
                onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.button} onPress={addNewCategory}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'rgba(94, 82, 64, 0.3)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    button: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5ebe0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(94, 82, 64, 0.3)',
        paddingHorizontal: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
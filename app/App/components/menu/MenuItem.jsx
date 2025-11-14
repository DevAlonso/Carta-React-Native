import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ModifyItem from "../item/ModifyItem";
import RemoveItem from "../item/RemoveItem";
import { updateProducto } from "../../services/api";

function MenuItem({ itemId, name, price, loadData }) {
    const [modifyItem, setModifyItem] = useState(true);
    const [inputNameValue, setInputNameValue] = useState(name);
    const [inputPriceValue, setInputPriceValue] = useState(price);

    const saveNewItemValue = () => {
        updateProducto(itemId, inputNameValue, inputPriceValue)
            .then(() => {
                loadData();
            })
            .catch(error => {
                console.error('Error updating product:', error);
                alert('Error al actualizar el producto');
            });
    };

    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
                {modifyItem ? (
                    <>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text style={styles.itemPrice}>${price}</Text>
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            value={inputNameValue}
                            onChangeText={setInputNameValue}
                            placeholder="Enter new name"
                        />
                        <TextInput
                            style={styles.input}
                            value={inputPriceValue}
                            onChangeText={setInputPriceValue}
                            placeholder="Enter new price"
                            keyboardType="numeric"
                        />
                    </>
                )}
            </View>
            <View style={styles.actionButtons}>
                <RemoveItem
                    itemId={itemId}
                    loadData={loadData}
                />
                <ModifyItem
                    modifyItem={modifyItem}
                    setModifyItem={setModifyItem}
                    saveNewItemValue={saveNewItemValue}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingVertical: 5,
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        flex: 1,
        fontSize: 16,
    },
    itemPrice: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
    input: {
        height: 35,
        borderColor: 'rgba(94, 82, 64, 0.3)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        width: '45%',
        backgroundColor: '#fff',
    },
    actionButtons: {
        flexDirection: 'row',
    },
});

export default MenuItem;
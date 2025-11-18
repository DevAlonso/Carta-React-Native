import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MenuItem from './MenuItem';
import AddItem from '../item/AddItem';
import ModifyCategory from '../category/ModifyCategory';
import RemoveCategory from '../category/RemoveCategory';

function MenuSection({ menu, loadData }) {
    const [categoryChange, setCategoryChange] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [addItemState, setAddItemState] = useState(true);
    const [categoryImage, setCategoryImage] = useState('https://img.icons8.com/?size=100&id=G736SmolvT3J&format=png&color=000000');

    const pickImageAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permiso denegado", "Necesitas permitir acceso a la galería");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            setCategoryImage(result.assets[0].uri);
        }
    };

    const takePictureAsync = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permiso denegado", "Necesitas permitir acceso a la cámara");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            setCategoryImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>

                {/* Botones para cambiar imagen */}
                <View style={styles.imageButtons}>
                    <TouchableOpacity style={styles.imageButton} onPress={pickImageAsync}>
                        <Text style={styles.imageButtonText}>📁</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageButton} onPress={takePictureAsync}>
                        <Text style={styles.imageButtonText}>📷</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={{ uri: categoryImage }}
                    style={styles.categoryImage}
                />

                {/* Título de categoría */}
                {categoryChange ? (
                    <Text style={styles.sectionTitle}>{menu.category}</Text>
                ) : (
                    <TextInput
                        style={styles.input}
                        value={inputValue}
                        onChangeText={setInputValue}
                        placeholder="Enter new category name"
                    />
                )}

                {/* Botones de modificar/eliminar */}
                <View style={styles.headerButtons}>
                    <ModifyCategory
                        categoryChange={categoryChange}
                        setCategoryChange={setCategoryChange}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        categoryId={menu.id}
                        currentCategory={menu.category}
                        loadData={loadData}
                    />
                    <RemoveCategory
                        categoryId={menu.id}
                        itemsCount={menu.items.length}
                        loadData={loadData}
                    />
                </View>
            </View>

            {/* Lista de productos */}
            {menu.items.map((item) => (
                <MenuItem
                    key={item.id}
                    itemId={item.id}
                    name={item.name}
                    price={item.price}
                    loadData={loadData}
                />
            ))}

            {/* Añadir item */}
            <View style={styles.categoryActions}>
                <AddItem
                    addItemState={addItemState}
                    setAddItemState={setAddItemState}
                    categoriaId={menu.id}
                    loadData={loadData}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        width: '100%',
        marginBottom: 30,
        backgroundColor: 'burlywood',
        borderRadius: 10,
        padding: 20,
    },
    sectionHeader: {
        alignItems: 'center',
        marginBottom: 15,
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'rgba(94, 82, 64, 0.5)',
    },
    imageButtons: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    imageButton: {
        backgroundColor: '#f5ebe0',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(94, 82, 64, 0.3)',
    },
    imageButtonText: {
        fontSize: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    headerButtons: {
        flexDirection: 'row',
    },
    input: {
        height: 40,
        borderColor: 'rgba(94, 82, 64, 0.3)',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        width: '100%',
    },
    categoryActions: {
        marginTop: 10,
        alignItems: 'center',
    },
});

export default MenuSection;

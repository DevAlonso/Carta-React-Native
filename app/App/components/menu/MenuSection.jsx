import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import MenuItem from './MenuItem';
import AddItem from '../item/AddItem';
import ModifyCategory from '../category/ModifyCategory';
import RemoveCategory from '../category/RemoveCategory';

function MenuSection({ menu, loadData }) {
    const [categoryChange, setCategoryChange] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [addItemState, setAddItemState] = useState(true);

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                {categoryChange ? (
                    <Text style={styles.sectionTitle}>{menu.category}</Text>
                ) : (
                    <TextInput
                        style={styles.input}
                        value={inputValue}
                        onChangeText={setInputValue}
                        placeholder='Enter new category name'
                    />
                )}
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
            
            {menu.items.map((item) => (
                <MenuItem
                    key={item.id}
                    itemId={item.id}
                    name={item.name}
                    price={item.price}
                    loadData={loadData}
                />
            ))}
            
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    headerButtons: {
        flexDirection: 'row',
        marginLeft: 10,
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
    categoryActions: {
        marginTop: 10,
        alignItems: 'center',
    },
});

export default MenuSection;
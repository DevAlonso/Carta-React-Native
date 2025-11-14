import { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Header from './components/layout/Header';
import MenuSection from './components/menu/MenuSection';
import Footer from './components/layout/Footer';
import Spacer from './components/layout/Spacer';
import AddCategory from './components/category/AddCategory';
import { getCategorias, getProductos } from './services/api';

Dimensions.get('window');

export default function App() {
  const [stateCategory, setStateCategory] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getCategorias()
      .then(response => {
        if (response.status === 'success') {
          const categorias = response.data;
          Promise.all(
            categorias.map(cat => {
              return getProductos(cat.id)
                .then(productosResponse => {
                  const productos = productosResponse.status === 'success' ? productosResponse.data : [];
                  return {
                    id: cat.id,
                    category: cat.nombre,
                    items: productos.map(prod => ({
                      id: prod.id,
                      name: prod.nombre,
                      price: prod.precio.toString(),
                      categoria_id: cat.id
                    }))
                  };
                })
                .catch(error => {
                  console.error('Error loading products:', error);
                  return {
                    id: cat.id,
                    category: cat.nombre,
                    items: []
                  };
                });
            })
          ).then(categoriasConProductos => {
            setStateCategory(categoriasConProductos);
          });
        }
      })
      .catch(error => {
        console.error('Error loading data:', error);
        alert('Error al cargar los datos');
      });
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg',
      }}
      resizeMode="cover"
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <AddCategory loadData={loadData} />
          <Header />
          <Spacer />
          {stateCategory.map((menu) => (
            <MenuSection
              key={menu.id}
              menu={menu}
              loadData={loadData}
            />
          ))}
          <Spacer />
          <Footer />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    backgroundColor: 'burlywood',
    alignItems: 'center',
    padding:8,
    margin:10,
    width: '80%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  scrollContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
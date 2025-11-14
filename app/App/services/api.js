const API_BASE_URL = 'https://jlorenzo.ddns.net/carta_restaurante';
const USER_ID = 5273;

function getCategorias() {
    return fetch(`${API_BASE_URL}/categorias/?usuario_id=${USER_ID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        });
}

function addCategoria(nombre) {
    return fetch(`${API_BASE_URL}/categorias/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID,
            nombre: nombre
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    });
}

function updateCategoria(id, nombre) {
    return fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID,
            nombre: nombre
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    });
}

function deleteCategoria(id) {
    return fetch(`${API_BASE_URL}/categorias/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    });
}

function getProductos(categoriaId) {
    return fetch(`${API_BASE_URL}/productos/${categoriaId}?usuario_id=${USER_ID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        });
}

function addProducto(categoriaId, nombre, precio) {
    return fetch(`${API_BASE_URL}/productos/${categoriaId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID,
            nombre: nombre,
            precio: parseFloat(precio)
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    });
}

function updateProducto(productoId, nombre, precio) {
    return fetch(`${API_BASE_URL}/productos/${productoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID,
            nombre: nombre,
            precio: parseFloat(precio)
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    });
}

function deleteProducto(productoId) {
    return fetch(`${API_BASE_URL}/productos/${productoId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id: USER_ID
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    });
}

export {
    getCategorias,
    addCategoria,
    updateCategoria,
    deleteCategoria,
    getProductos,
    addProducto,
    updateProducto,
    deleteProducto
};

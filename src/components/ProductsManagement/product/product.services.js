import { errorToast } from "../../notifications/Notifications"
import { TOKEN_KEY, BASE_URL } from "../../services/config"

export const getProducts = (onSuccess, onError) => {
    fetch(`${BASE_URL}/products` , {
        headers: {
        },
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json()
            throw new Error(errData.message || 'No se pudo cargar los productos')
        }
        return res.json()
    })
    .then(onSuccess)
    .catch(onError)
}

export const addProduct = (newProduct, onSuccess, onError) => {
    fetch(`${BASE_URL}/products`, {
        headers: {
            'Content-type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        },
        method: "POST",
        body: JSON.stringify(newProduct)
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json()
            throw new Error(errData.message || 'No se pudo agregar el Producto')
        }
        return res.json()
    })
    .then(onSuccess)
    .catch(onError)
}

export const deleteProduct = (productId, onSuccess, onError) => {
    fetch(`${BASE_URL}/products/${productId}`, {
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        },
        method: 'DELETE',
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json()
            throw new Error(errData.message || 'No se pudo eliminar el Producto')
        }
        return res.json()
    })
    .then(onSuccess)
    .catch(onError)
}

export const updateProduct = (changedProduct, onSuccess, onError) => {
    fetch(`${BASE_URL}/products/${changedProduct.id}`, {
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            'Content-type' : 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(changedProduct)
    })
    .then(async res => {
        if(!res.ok) {
            const errData = await res.json()
            throw new Error(errData.message || 'No se pudo editar el Producto')
        }
        return res.json()
    })
    .then(onSuccess)
    .catch(onError)
}


// Validate 
export const validateString = (str, minLength, maxLength) => {
    if (typeof str !== 'string')
        return false
    else if (minLength && str.length < minLength)
        return false
    else if (maxLength && str.length > maxLength)
        return false

    return true
}

export const validatePrice = (price) => {
    const number = Number(price)
    if (price === '' || !Number.isFinite(number))
        return false
    else if (number <= 0)
        return false
    return true
}

export const validateStock = (stock) => {
    const number = Number(stock)
    if (stock === '' || !Number.isInteger(number)) 
        return false
    else if (number < 0)
        return false
    return true
}

export const validateUrl = (url) => {
    try {
        const parsed = new URL(url)
        return parsed.protocol === 'http:' || parsed.protocol === 'https:'
    } catch {
        return false
    }
}

export const validateNewProduct = (newProduct) => {
    if (!validateString(newProduct.name, 1, 50)) {
        errorToast('El nombre no es válido')
        return false
    } 
    else if (!validatePrice(newProduct.price)) {
        errorToast('El precio no es válido')
        return false
    } 
    else if (!validateStock(newProduct.stock)) {
        errorToast('El Stock no es válido')
        return false
    }

    else if (!validateString(newProduct.category, 1)) {
        errorToast('La Categoría no es válida')
        return false
    }
    
    return true
}
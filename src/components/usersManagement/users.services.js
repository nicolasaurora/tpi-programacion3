import { TOKEN_KEY, BASE_URL } from '../services/config'

export const getUsers = (onSuccess, onError) => {
    fetch(`${BASE_URL}/users` , {
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        },
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json()
            throw new Error(errData.message || 'No se pudo cargar los Usuarios')
        }
        return res.json()
    })
    .then(onSuccess)
    .catch(onError)
}

export const updateUser = (changedUser, onSuccess, onError) => {
    fetch(`${BASE_URL}/users/${changedUser.id}`, {
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            'Content-type' : 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(changedUser)
    })
    .then(async res => {
        if(!res.ok) {
            const errData = await res.json()
            throw new Error(errData.message || 'No se pudo editar el Usuario')
        }
        return res.json()
    })
    .then(onSuccess)
    .catch(onError)
}

export const deleteUser = (userId, onSuccess, onError) => {
    fetch(`${BASE_URL}/users/${userId}`, {
        headers: {
            'Authorization' : `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        },
        method: 'DELETE',
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json()
            throw new Error(errData.message || 'No se pudo eliminar el Usuario')
        }
        return res.json()
    })
    .then(onSuccess)
    .catch(onError)
}
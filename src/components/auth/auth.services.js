const baseUrl = 'http://localhost:3000' // Hay que pasarla al .env

export const validateString = (str, minLength, maxLength) => {
    if (typeof str !== 'string')
        return false
    else if (minLength && str.length < minLength)
        return false
    else if (maxLength && str.length > maxLength)
        return false

    return true
}

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailRegex.test(email)
}

export const validatePassword = (password, minLength, maxLength, needsUpperCase, needsNumber) => {
    if (typeof password !== 'string')
        return false
    else if (minLength && password.length < minLength)
        return false
    else if (maxLength && password.length > maxLength)
        return false
    else if (needsUpperCase && !/[A-Z]/.test(password))
        return false
    else if (needsNumber && !/\d/.test(password))
        return false

    return true
}

// Fetchs

export const registerUser = (newUser, onSuccess, onError) => {
    fetch(`${baseUrl}/usuarios`, {
        headers: {
            'Content-type' : 'application/json',
        },
        method: "POST",
        body: JSON.stringify(newUser)
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json()
            throw new Error(errData.message || 'No se pudo registrar el Usuario')
        }
        return res.json()
    })
    .then(onSuccess)
    .catch(onError)
}

export const loginUser = (email, password, onSuccess, onError) => {
    fetch(`${baseUrl}/login`, {
        headers: {
            'Content-type' : 'application/json',
        },
        method: "POST",
        body: JSON.stringify( {email, password})
    })
    .then(async res => {
        if (!res.ok) {
            const errData = await res.json()
            throw new Error(errData.message || 'Error al iniciar Sesion')
        }
        return res.json()
    })
    
    .then(onSuccess)
    .catch(onError)
}
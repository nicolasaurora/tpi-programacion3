import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useState } from 'react'
import { useRef } from 'react'
import { useNavigate } from "react-router";
import { errorToast, successToast } from "../../notifications/Notifications";
import { validateEmail, validatePassword, registerUser, validateString } from "../auth.services";

const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    const emailRef = useRef(null)
    const checkPasswordRef = useRef(null)
    const passwordRef = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)

    const [errors, setErrors] = useState({email: false, password: false, checkPassword, firstName: false, lastName: false})

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setErrors({...errors, email: false})
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
        setErrors({...errors, password: false})
    }
        const handleCheckPassword = (e) => {
        setCheckPassword(e.target.value)
        setErrors({...errors, checkPassword: false})
    }
    const handleFirstName = (e) => {
        setFirstName(e.target.value)
        setErrors({...errors, name: false})
    }
    const handleLastName = (e) => {
        setLastName(e.target.value)
        setErrors({...errors, lastName: false})
    }

    // Navigate Login

    const handleNavLogin = () => {
        navigate('/login')
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email.length || !validateEmail(email)) {
            errorToast('email invalido')
            setErrors({...errors, email: true})
            emailRef.current.focus()
            return
        }

        else if (!password.length || !validatePassword(password, 7, null, true, true)) {
            errorToast('Contraseña Invalida')
            setErrors({...errors, password: true})
            passwordRef.current.focus()
            return
        }

        else if (password !== checkPassword) {
            errorToast('Las contraseñas no coinciden')
            setErrors({...errors, checkPassword:true})
            checkPassword.current.focus()
            return
        }

        else if (!firstName.length || !validateString(firstName, 1, 50)) {
            errorToast('Nombre inválido')
            setErrors({...errors, name: true})
            firstNameRef.current.focus()
            return
        }

        else if (!lastName.length || !validateString(lastName, 1, 50)) {
            errorToast('Apellido inválido')
            setErrors({...errors, lastName: true})
            lastNameRef.current.focus()
            return
        }

        setErrors({email: false, checkPassword, password: false, firstName: false, lastName: false})


        // Envio a Backend
        const newUser = {
            email,
            password,
            firstName,
            lastName
        }

        registerUser(newUser, 
            () => {
                successToast(`¡Bienvenido, ${newUser.firstName}`)
                handleNavLogin()
            },
            err => errorToast(err.message)
        )

        

        }


    return (
        <main className="login-page">
        <Card className="login-card p-3 px-5 shadow border-0">
            <Card.Body>
                <Row className="mb-2">
                    <h5 className="login-title">¡Bienvenido a Point Hardware!</h5>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-4">
                        <Form.Control
                            type="email"
                            placeholder="Ingresar email"
                            value={email}
                            className={errors.email && 'border border-danger'} 
                            onChange={handleEmail}
                            ref={emailRef}
                        />
                        {!errors.email
                        ?''
                        :<div>Por favor, completa el campo 'email'</div>}
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Form.Control
                            type="password"
                            placeholder="Ingresar contraseña"
                            value={password}
                            onChange={handlePassword}
                            ref={passwordRef}
                            className={errors.password && 'border border-danger'} 
                        />
                        {!errors.password
                        ?''
                        :<div>Por favor, completa el campo 'contraseña'</div>}
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Form.Control
                            type="password"
                            placeholder="Repetir Contraseña"
                            value={checkPassword}
                            className={errors.email && 'border border-danger'} 
                            onChange={handleCheckPassword}
                            ref={checkPasswordRef}
                        />
                        {!errors.checkPassword
                        ?''
                        :<div>Por favor, vuelve a escribir la contraseña</div>}
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Ingresar nombre"
                            value={firstName}
                            className={errors.name && 'border border-danger'} 
                            onChange={handleFirstName}
                            ref={firstNameRef}
                        />
                        {!errors.name
                        ?''
                        :<div>Por favor, completa el campo 'Nombre'</div>}
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Ingresar Apellido"
                            value={lastName}
                            className={errors.lastName && 'border border-danger'} 
                            onChange={handleLastName}
                            ref={lastNameRef}
                        />
                        {!errors.lastName
                        ?''
                        :<div>Por favor, completa el campo 'Apellido'</div>}
                    </FormGroup>
                    <Row>
                        <Col />
                        <Col md={6} className="d-flex justify-content-end">
                            <Button variant="secondary" type="submit">
                                Registrarse
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <hr className="my-4" />
                <p className="text-center mb-0">
                    ¿Ya tenés cuenta?{' '}
                    <Button variant="link" className="p-0 align-baseline" onClick={handleNavLogin}>
                        Inicia Sesion
                    </Button>
                </p>
            </Card.Body>
        </Card>
        </main>
    );
}



export default Register

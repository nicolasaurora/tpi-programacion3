import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useState } from 'react'
import { useRef } from 'react'
import { useNavigate } from "react-router";

const Login = ( { onLogin } ) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [errors, setErrors] = useState({email: false, password: false})

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setErrors({...errors, email: false})
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        setErrors({...errors, password: false})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email.length) {
            alert('Email Vacio')
            setErrors({...errors, email: true})
            return
        }

        else if (!password.length || password.length < 7) {
            alert('Contraseña inválida')
            setErrors({...errors, password: true})
            return
        }

        setErrors({email: false, password: false})
        alert(`El email es ${email} y la contraseña es ${password}`)
        onLogin()
        navigate('/home')
    }


    return (
        <Card className="mt-5 mx-3 p-3 px-5 shadow">
            <Card.Body>
                <Row className="mb-2">
                    <h5>¡Bienvenido/a a Point Hardware!</h5>
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
                    <Row>
                        <Col />
                        <Col md={6} className="d-flex justify-content-end">
                            <Button variant="secondary" type="submit">
                                Iniciar sesión
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}



export default Login
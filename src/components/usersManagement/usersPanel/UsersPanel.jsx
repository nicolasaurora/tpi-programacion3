    import Container from 'react-bootstrap/Container';
    import {Table, Button, Form} from 'react-bootstrap';
    import { useEffect, useState } from 'react';
    import { useLocation, useNavigate } from 'react-router';
    import { errorToast, successToast } from '../../notifications/Notifications.jsx';
    import DeleteUserModal from '../deleteUserModal/DeleteUserModal.jsx'
    import { getUsers, updateUserRole, deleteUser } from '../users.services.js';
    import { useContext } from 'react';
    import { AuthenticationContext } from '../../services/auth.context.jsx'

    const Users = () => {
        const location = useLocation()
        const navigate = useNavigate()



        // Usuarios desde la DB
        const [usersList, setUsersList] = useState([])

        const { userId } = useContext(AuthenticationContext) 



        useEffect(() => {
            if (location.pathname === '/superadmin/users') {
            getUsers(
                data => setUsersList([...data]),
                err => errorToast(err.message)
            )
            }
        }, [location])

        // Editar Usuario
        const handleChangeRole = (user, role) => {
            const changedUser = {
                id: user.id,
                role: role,
                name: user.firstName
            }

            updateUserRole(
                changedUser,
                () => {
                    successToast(`El Usuario '${changedUser.name}' ahora es ${role}`),
                    setUsersList(prevUsersList => 
                        prevUsersList.map(oldUser => oldUser.id === user.id ? {...oldUser, role: role} : oldUser))
                },
                err => {
                    errorToast(err.message)
                }
            )
        }

        // Eliminar Usuario
        const [toDeleteUser, setToDeleteUser] = useState(null)

        const handleDeleteUser = (value) => {
            setToDeleteUser(value)
        }

        const handleConfirmDelete = () => {

            deleteUser(
                toDeleteUser.id,
                () => {
                    successToast(`El usuario '${toDeleteUser.firstName} ${toDeleteUser.lastName}' ha sido borrado con éxito`)
                    setToDeleteUser(null)
                    navigate('/superadmin/users')
                },
                err => errorToast(err.message)
            )
        }



        //
        return (
            <>
            <Container className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Administrar usuarios</h2>
            </div>

            {usersList.length > 0
            ?
            <Table striped hover responsive className="align-middle">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th className="text-end">Apellido</th>
                        <th className="text-center">email</th>
                        <th className="text-center">Rol</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                            <Form.Select
                                size="sm"
                                value={user.role}
                                onChange={(e) => {handleChangeRole(user, e.target.value)}}
                                disabled={user.id === userId}
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                                <option value="superadmin">Superadministrador</option>
                            </Form.Select>
                        </td>
                            <td className="text-end">
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteUser(user)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            : <p className="text-center text-muted my-5">No se encontraron Usuarios</p>
            }

            <DeleteUserModal
                show={toDeleteUser !== null}
                username={toDeleteUser?.firstName}
                onConfirm={handleConfirmDelete}
                onCancel={() => setToDeleteUser(null)}
            />
        </Container>
        </>
        )
    }

    export default Users
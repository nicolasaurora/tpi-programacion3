import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const DeleteProductModal = ({ show, productName, onConfirm, onCancel }) => {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-2">
                    ¿Seguro que querés eliminar <strong>{productName}</strong>?
                </p>
                <p className="text-muted small mb-0">
                    Esta acción no se puede deshacer.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteProductModal
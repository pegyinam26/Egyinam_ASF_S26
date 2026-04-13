import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "reactstrap";



export default function ConfirmModal({
                                         isOpen,
                                         toggle,
                                         confirm,
                                         title,
                                         message,
                                         showActions = true
                                     }) {
    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>

            <ModalHeader toggle={toggle}>
                {title}
            </ModalHeader>

            <ModalBody>
                {message}
            </ModalBody>


            {showActions !== false && (
                <ModalFooter className="justify-content-center">
                    <Button color="secondary" onClick={toggle}>
                        No
                    </Button>
                    <Button color="warning" onClick={confirm}>
                        Yes
                    </Button>
                </ModalFooter>
            )}

        </Modal>
    );
}
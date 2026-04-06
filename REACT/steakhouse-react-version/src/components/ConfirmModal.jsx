import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "reactstrap";

// export default function ConfirmModal({
//                                          isOpen,
//                                          toggle,
//                                          confirm,
//                                          title = "Confirm Action",
//                                          message = "Are you sure?"
//                                      }) {
//     return (
//         <Modal isOpen={isOpen} toggle={toggle}>
//             <ModalHeader toggle={toggle}>{title}</ModalHeader>
//
//             <ModalBody>
//                 {message}
//             </ModalBody>
//
//             <ModalFooter>
//                 <Button color="secondary" onClick={toggle}>
//                     Cancel
//                 </Button>
//
//                 <Button color="danger" onClick={confirm}>
//                     Yes
//                 </Button>
//             </ModalFooter>
//         </Modal>
//     );
// }

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

            {showActions && (
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>

                    <Button color="danger" onClick={confirm}>
                        Yes
                    </Button>
                </ModalFooter>
            )}

        </Modal>
    );
}
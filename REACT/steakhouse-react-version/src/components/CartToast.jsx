import { Toast, ToastBody } from "reactstrap";

export default function CartToast({ show, message }) {
    return (
        <div className={`toast-container ${show ? "show" : ""}`}>
            <Toast>
                <ToastBody>
                    {message}
                </ToastBody>
            </Toast>
        </div>
    );
}
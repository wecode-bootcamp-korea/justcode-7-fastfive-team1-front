import { createPortal } from 'react-dom';

function ModalPortal({ children }) {
  return createPortal({ children }, document.getElementById('modal'));
}

export default ModalPortal;

import { createToastInterface, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import '../../style.css'

const toast = createToastInterface({
  position: POSITION.BOTTOM_RIGHT, 
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  maxToasts: 3,
  filterBeforeCreate: (toast, toasts) => {
    const toastContent = typeof toast === 'string' ? toast : toast.content;
    if (toasts.filter(t => t.content === toastContent).length) {
      return false;
    }
    return toast;
  }
});

export default toast;

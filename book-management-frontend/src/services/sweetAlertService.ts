import Swal from "sweetalert2";

export interface AlertOptions {
  title?: string;
  text?: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  timer?: number;
  showConfirmButton?: boolean;
}

// SweetAlert reusable service for components
export const SweetAlertService = {
  success(options: AlertOptions = {}) {
    const {
      title = "Success!",
      text = "",
      timer = 2000,
      showConfirmButton = false,
    } = options;

    return Swal.fire({
      title,
      text,
      icon: "success",
      timer,
      timerProgressBar: true,
      showConfirmButton,
      willClose: () => {
        Swal.stopTimer();
      },
    });
  },

  error(options: AlertOptions = {}) {
    const {
      title = "Error!",
      text = "",
      timer = 3000,
      showConfirmButton = true,
    } = options;

    return Swal.fire({
      title,
      text,
      icon: "error",
      timer,
      timerProgressBar: true,
      showConfirmButton,
    });
  },

  warning(options: AlertOptions = {}) {
    const {
      title = "Warning!",
      text = "",
      timer = 3000,
      showConfirmButton = true,
    } = options;

    return Swal.fire({
      title,
      text,
      icon: "warning",
      timer,
      timerProgressBar: true,
      showConfirmButton,
    });
  },

  info(options: AlertOptions = {}) {
    const {
      title = "Info",
      text = "",
      timer = 2000,
      showConfirmButton = false,
    } = options;

    return Swal.fire({
      title,
      text,
      icon: "info",
      timer,
      timerProgressBar: true,
      showConfirmButton,
    });
  },

  confirm(
    options: {
      title?: string;
      text?: string;
      confirmButtonText?: string;
      cancelButtonText?: string;
    } = {},
  ) {
    const {
      title = "Are you sure?",
      text = "",
      confirmButtonText = "Yes",
      cancelButtonText = "No",
    } = options;

    return Swal.fire({
      title,
      text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
      cancelButtonText,
    });
  },
};

export default SweetAlertService;

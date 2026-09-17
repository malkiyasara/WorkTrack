import Swal from "sweetalert2";

const Alert = {
  success: (title, text = "") =>
    Swal.fire({
      icon: "success",
      title,
      text,
      confirmButtonColor: "#7c3aed",
    }),

  error: (title, text = "") =>
    Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonColor: "#dc2626",
    }),

  warning: (title, text = "") =>
    Swal.fire({
      icon: "warning",
      title,
      text,
      confirmButtonColor: "#f59e0b",
    }),

  confirm: (title, text = "") =>
    Swal.fire({
      icon: "question",
      title,
      text,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#64748b",
      reverseButtons: true,
    }),

  toastSuccess: (message) =>
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    }),
};

export default Alert;
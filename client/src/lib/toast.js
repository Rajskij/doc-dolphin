import { toast } from "sonner";

const customToast = {
  success: (message) => toast.success(message, { position: "top-center" }),
  error: (message) => toast.error(message, { position: "top-center" }),
  loading: (message) => toast.loading(message, { position: "top-center" }),
  dismiss: () => toast.dismiss()
};

export default customToast;

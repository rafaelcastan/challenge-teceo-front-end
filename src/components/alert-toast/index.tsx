import { Alert, Snackbar } from "@mui/material";
import { UseToast } from "../../context/toast";

const AlertToast = () => {
  const { onClose, toast } = UseToast();
  return (
    <Snackbar
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={toast.show}
      onClose={onClose}
      key={toast.severity + Date.now()}
    >
      <Alert onClose={onClose} severity={toast.severity} sx={{ width: "100%" }}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertToast;

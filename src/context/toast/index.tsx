import { createContext, ReactNode, useContext, useState } from "react";
import AlertToast from "../../components/alert-toast";

interface ToastContextProviderProps {
  children: ReactNode;
}

interface IToast {
  message: string;
  severity: "error" | "success" | "info" | "warning";
  show: boolean;
}

interface showMessageProps extends Omit<IToast, "show"> {}

interface ToastContextData {
  toast: IToast;
  showMessage: (toastConfig: showMessageProps) => void;
  onClose: () => void;
}

const ToastContext = createContext({} as ToastContextData);

export function ToastContextProvider({ children }: ToastContextProviderProps) {
  const [toast, setToast] = useState<IToast>({} as IToast);

  function showMessage(toastConfig: showMessageProps) {
    setToast({ ...toastConfig, show: true });
  }

  function onClose() {
    setToast({} as IToast);
  }

  return (
    <ToastContext.Provider value={{ toast, showMessage, onClose }}>
      <AlertToast />
      {children}
    </ToastContext.Provider>
  );
}

export const UseToast = () => useContext(ToastContext);

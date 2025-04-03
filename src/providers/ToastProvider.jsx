import { ToastContainer } from "react-toastify";


export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '8px',
        },
        success: {
          iconTheme: {
            primary: '#22C55E',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
}
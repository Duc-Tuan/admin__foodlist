import { toast, ToastOptions, TypeOptions } from 'react-toastify';

export const useToast = () => {
  return (content: string, type: TypeOptions, configs?: ToastOptions) =>
    content?.length > 0 &&
    toast(content, {
      type: type,
      position: toast.POSITION.TOP_CENTER,
      ...configs,
    });
};

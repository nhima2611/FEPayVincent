import { toast, TypeOptions } from 'react-toastify';

const showToast = (type?: TypeOptions, msg?: string) => {
    toast(msg, {
        type
    });
};

export default { showToast };

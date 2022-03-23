import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertPosition, SweetAlertResult } from 'sweetalert2';

interface SweetAlertConfirm {
    onConfirm: () => Promise<void>;
    onDenied?: () => Promise<void>;
}

const toast = (icon: SweetAlertIcon, title: string, position?: SweetAlertPosition): Promise<any> => {
    let background = '#ffffff';
    switch (icon) {
        case 'success':
            background = '#5cb85c';
            break;

        case 'error':
            background = '#d9534f';
            break;
        default:
            break;
    }
    return Swal.fire({
        icon,
        title,
        toast: true,
        position: position || 'bottom-end',
        background,
        color: 'white',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toastr: HTMLElement) => {
            toastr.addEventListener('mouseenter', Swal.stopTimer);
            toastr.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
};

const showSuccess = (args: SweetAlertOptions): Promise<any> => {
    return Swal.fire({
        ...args,
        icon: 'success'
    });
};

const showError = (args: SweetAlertOptions): Promise<any> => {
    return Swal.fire({
        ...args,
        icon: 'error'
    });
};

const showInfo = (args: SweetAlertOptions): Promise<any> => {
    return Swal.fire({
        ...args,
        icon: 'info'
    });
};

const showWarning = (args: SweetAlertOptions): Promise<any> => {
    return Swal.fire({
        ...args,
        icon: 'warning'
    });
};

const showConfirm = async (args: SweetAlertOptions & SweetAlertConfirm): Promise<any> => {
    return Swal.fire({
        backdrop: true,
        title: args.title || 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: args.confirmButtonText ?? 'Ok',
        denyButtonText: args.denyButtonText ?? 'Cancel'
    }).then((result: SweetAlertResult<any>) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            return args.onConfirm?.();
        }
        if (result.isDenied) {
            return args.onDenied?.();
        }
        return args.onDenied?.();
    });
};

const showDeleteConfirm = (args: SweetAlertOptions & SweetAlertConfirm): Promise<any> => {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            return args.onConfirm?.();
        }
        if (result.isDenied) {
            return args.onDenied?.();
        }
        return args.onDenied?.();
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    toast,
    showConfirm,
    showDeleteConfirm,
    showError,
    showSuccess,
    showInfo,
    showWarning
};

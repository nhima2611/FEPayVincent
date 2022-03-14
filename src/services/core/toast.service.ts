import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

interface SweetAlertConfirm {
    onConfirm: () => Promise<void>;
    onDenied?: () => Promise<void>;
}

const toast = (icon: SweetAlertIcon, title: string): Promise<any> => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (t) => {
            t.addEventListener('mouseenter', Swal.stopTimer);
            t.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    return Toast.fire({
        icon,
        title
    });
};

const showConfirm = async (args: SweetAlertOptions & SweetAlertConfirm) => {
    return Swal.fire({
        title: args.title,
        showCancelButton: true,
        confirmButtonText: args.confirmButtonText ?? 'Ok',
        denyButtonText: args.denyButtonText ?? 'Cancel'
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            return args.onConfirm?.();
        }
        if (result.isDenied) {
            return args.onDenied?.();
        }
        return null;
    });
};

const showDeleteConfirm = (args: SweetAlertOptions & SweetAlertConfirm) => {
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
        return null;
    });
};

export default {
    toast,
    showConfirm,
    showDeleteConfirm
};

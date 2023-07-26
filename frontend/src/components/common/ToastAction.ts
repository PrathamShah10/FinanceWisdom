import { toast } from 'react-toastify';

export const toastAction = {
  success: (data: string) => {
    if (data) {
      toast.success(data, { autoClose: 2000 });
    }
  },
  error: (error: any) => {
    if (error?.networkError?.result?.errors[0]?.message) {
      toast.error(error.networkError.result.errors[0].message);
    } else if (error) {
      toast.error(error);
    } else {
      toast.error('server error', { autoClose: 2000 });
    }
  },
};
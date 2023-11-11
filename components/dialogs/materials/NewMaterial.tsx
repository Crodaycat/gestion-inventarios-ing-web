import axios from 'axios';
import { Dialog, Button, DialogTitle, DialogContent } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { mutate } from 'swr';
import { API_ROUTES } from '@/service/apiConfig';
import { useSession } from 'next-auth/react';

interface NewMaterialProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewMaterial = ({ open, setOpen }: NewMaterialProps) => {
  const currentDate = new Date().toISOString();
  const { data } = useSession();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    quantity: 0,
    userId: data?.user?.name || '',
    createdAt: currentDate,
    updatedAt: currentDate,
  });

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.request({
        method: 'POST',
        url: API_ROUTES.materials,
        data: {
          ...formData,
        },
      });
      //actualizar la tabla de materiales
      await mutate(API_ROUTES.materials);
      //TOAST
      setOpen(false);
    } catch (error) {
      //const errorResponse = error as AxiosError;
      //const errorData = errorResponse.response?.data as { message: string };
      //if
    }
  };
  
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle textAlign={'center'}>Agregar nuevo material</DialogTitle>
      <DialogContent>
        <form onSubmit={submitForm} className='flex flex-col gap-2'>
          <label className='flex justify-between gap-2'>
            <span>ID</span>
            <input
              className='border border-black rounded-md'
              type='text'
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
          </label>
          <label className='flex justify-between gap-2'>
            <span>Nombre</span>
            <input
              className='border border-black rounded-md'
              type='text'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
          <label className='flex justify-between gap-2'>
            <span>Cantidad</span>
            <input
              className='border border-black rounded-md'
              type='number'
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: parseInt(e.target.value),
                })
              }
            />
          </label>

          <Button type='submit' variant='contained'>
            Agregar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { NewMaterial };

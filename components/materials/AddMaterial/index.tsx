import { Dialog } from '@/components/Dialog';
import { API_ROUTES } from '@/service/apiConfig';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { mutate } from 'swr';
import { toast } from 'react-toastify';
import { Loading } from '@/components/Loading';

interface AddMaterialProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddMaterial = ({ open, setOpen }: AddMaterialProps) => {
  const currentDate = new Date().toISOString();
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    userId: data?.user.id,
    createdAt: currentDate,
    updatedAt: currentDate,
  });

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.request({
        method: 'POST',
        url: API_ROUTES.materials,
        data: {
          ...formData,
        },
      });
      await mutate(API_ROUTES.materials);
      toast.success('Material agregado correctamente');
      setOpen(false);
    } catch (error) {
      const errorResponse = error as AxiosError;

      const errorData = errorResponse?.response?.data as { message: string };

      if (
        errorData?.message?.includes(
          'Unique constraint failed on the fields: (`name`)'
        )
      ) {
        toast.error('Error: ya existe un material con ese nombre');
      } else {
        toast.error('Error al agregar el material');
      }
    }
    setLoading(false);
  };

  return (
    <Dialog
      title={'Agregar nuevo material'}
      open={open}
      onClose={() => setOpen(false)}
    >
      <form onSubmit={submitForm} className='flex flex-col gap-2'>
        <label className='flex flex-col justify-between gap-2'>
          <span className='font-semibold'>Nombre</span>
          <input
            className='border border-black rounded-md pl-2 py-1'
            type='text'
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label className='flex flex-col justify-between gap-2'>
          <span className='font-semibold'>Cantidad</span>
          <input
            className='border border-black rounded-md pl-2 py-1'
            type='number'
            min={0}
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: +e.target.value })
            }
          />
        </label>
        <div className='flex gap-4 justify-center mt-4'>
          <button
            className='bg-green-400 rounded-md p-2 hover:scale-105 hover:bg-green-500 transition-all duration-200 ease-in'
            type='submit'
          >
            {loading ? <Loading size={2} /> : <span>Agregar</span>}
          </button>
          <button
            className='bg-red-400 rounded-md p-2 hover:scale-105 hover:bg-red-500 transition-all duration-200 ease-in'
            type='button'
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export { AddMaterial };

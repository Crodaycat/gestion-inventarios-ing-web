import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { Loading } from '@/components/Loading';
import { API_ROUTES } from '@/service/apiConfig';
import { Material } from '@/types';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface AddMovementProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  material: Material | undefined;
}

const AddMovement = ({ open, setOpen, material }: AddMovementProps) => {
  const currentDate = new Date().toISOString();
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    movementType: '',
    quantity: 0,
    createdAt: currentDate,
    updatedAt: currentDate,
  });

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.request({
        method: 'POST',
        url: API_ROUTES.movements,
        data: {
          ...formData,
          userId: data?.user.id,
          materialId: material?.id,
        },
      });
      await mutate(API_ROUTES.movements);
      await mutate(`${API_ROUTES.movements}/${material?.id}`);
      toast.success('Movimiento agregado correctamente');
      setOpen(false);
    } catch (error) {
      const errorResponse = error as AxiosError;
      const errorData = errorResponse?.response?.data as { message: string };

      if (
        errorData?.message?.includes(
          'La cantidad solicitada excede el inventario actual'
        )
      ) {
        toast.error(
          'Error: la cantidad solicitada excede el inventario actual'
        );
      } else {
        toast.error('Error al agregar el movimiento');
      }
    }
    setLoading(false);
  };

  return (
    <Dialog
      title={`Agregar movimiento a ${material?.name}`}
      open={open}
      onClose={() => setOpen(false)}
    >
      <form onSubmit={submitForm} className='flex flex-col gap-2'>
        <div className='flex flex-col justify-between gap-2'>
          <span className='font-semibold'>Tipo de movimiento</span>
          <div className='flex flex-row gap-2'>
            <label htmlFor='check-entrada' className='flex items-center gap-1'>
              <input
                id='check-entrada'
                type='checkbox'
                checked={formData.movementType === 'ENTRADA'}
                onChange={() =>
                  setFormData({ ...formData, movementType: 'ENTRADA' })
                }
              />
              Entrada
            </label>
            <label htmlFor='check-salida' className='flex items-center gap-1'>
              <input
                id='check-salida'
                type='checkbox'
                checked={formData.movementType === 'SALIDA'}
                onChange={() =>
                  setFormData({ ...formData, movementType: 'SALIDA' })
                }
              />
              Salida
            </label>
          </div>
        </div>
        <label className='flex flex-col justify-between gap-2'>
          <span className='font-semibold'>Cantidad</span>
          <input
            className='border border-black rounded-md pl-2 py-1'
            type='number'
            min={1}
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: +e.target.value })
            }
          />
        </label>

        <div className='flex gap-4 justify-center mt-4'>
          <Button color='primary' type='submit' disabled={loading}>
            {loading ? <Loading size={2} /> : <span>Agregar</span>}
          </Button>

          <Button color='danger' onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export { AddMovement };

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { Loading } from '@/components/Loading';
import { ApplicationContext } from '@/context/ApplicationContext';
import { API_ROUTES } from '@/service/apiConfig';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { User } from '@prisma/client';
import axios from 'axios';
import { FC, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface EditUserProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => Promise<void>;
}

export const EditUser: FC<EditUserProps> = ({
  user,
  isOpen,
  onClose,
  onUpdated,
}) => {
  const { roles } = useContext(ApplicationContext);
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const onDialogClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const onSubmit = async () => {
    setLoading(true);

    try {
      await axios.request({
        method: 'PUT',
        url: API_ROUTES.users + '/' + user?.id,
        data: {
          role: role,
        },
      });

      await onUpdated();
      toast.success('Usuario actualizado correctamente.');
      onClose();
    } catch (error) {
      toast.error('Error al actualizar el usuario.');
    }

    setLoading(false);
  };

  useEffect(() => {
    setRole(user?.roleId || '');
  }, [user]);

  return (
    <Dialog title='Editar usuario' open={isOpen} onClose={onDialogClose}>
      <span>{user?.email}</span>

      <form className='flex flex-col mt-2'>
        <FormControl fullWidth>
          <InputLabel id='role'>Rol</InputLabel>

          <Select
            id='role'
            label='Rol'
            placeholder='SIN ROL'
            value={role}
            onChange={handleChange}
          >
            <MenuItem value={''}>SIN ROL</MenuItem>

            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>

      <div className='flex gap-4 justify-center mt-4'>
        <Button color='primary' disabled={loading} onClick={onSubmit}>
          {loading ? <Loading size={2} /> : <span>Actualizar</span>}
        </Button>

        <Button color='danger' onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
      </div>
    </Dialog>
  );
};

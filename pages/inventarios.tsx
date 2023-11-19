import { withPrivateRoute } from '@/HOC/PrivateRoute';
import { Loading } from '@/components/Loading';
import { useGetMaterials } from '@/hooks/useGetMaterials';
import { useGetMovements } from '@/hooks/useGetMovements';
import { useGetUsers } from '@/hooks/useGetUsers';
import { BaseLayout } from '@/layout/BaseLayout';
import { Paginator } from '@/components/Pagination';
import { Material } from '@prisma/client';
import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { AddMovement } from '@/components/inventory/AddMovement';

const Home = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>();
  const { movements, totalCount, movementsLoading } = useGetMovements(selectedMaterial?.id || '');
  const { users } = useGetUsers();

  const userNameMap = users?.reduce<Record<string, string>>(
    (map, user) => ({ ...map, [user.id]: user.name || '' }),
    {}
  );
  const [page, setPage] = useState<number>(1);
  const { materials } = useGetMaterials();
  const [openNewMovement, setOpenNewMovement] = useState(false);
  const handleMaterialChange = (e) => {
    const selectedMaterialId = e.target.value;
    // Find the corresponding material object
    const material = materials?.find((m) => m.id === selectedMaterialId);
    // Update the selectedMaterial state
    setSelectedMaterial(material);

    // Perform any other actions with the selected material, such as changing effect values
    if (material) {
      // Update the effect value or perform any other action with the selected material
      // For example: setSelectedMaterial({ ...material, effect: newValue });
    }
  };
  return (
    <BaseLayout>
      <section className='w-full flex flex-col items-center p-4 gap-5'>
        <h1 className='text-4xl'>Gestión de Inventarios</h1>
        <div className='flex flex-row justify-between w-full'>
        <form className='flex flex-col mt-2 w-48'>
        <FormControl fullWidth>
        <InputLabel id='role'>Material seleccionado</InputLabel>
        <Select
            id='materials'
            label='Seleccionar material...'
            placeholder='Seleccionar material...'
            value={selectedMaterial}
            onChange={handleMaterialChange}
          > 
            <MenuItem value={''}>Seleccionar material...</MenuItem>
            {materials?.map((material) => (
              <MenuItem key={material.id} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </form>
          <button
            className='bg-green-500 hover:bg-green-600 hover:scale-105 transition-all duration-200 ease-in rounded-md font-medium p-3 self-end'
            onClick={() => setOpenNewMovement(true)}
          >
            Agregar movimiento
          </button>
        </div>
        <table cellSpacing='0'>
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Fecha</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            {movementsLoading && (
              <tr>
                <td colSpan={5}>
                  <div className='flex justify-center items-center'>
                    <Loading /> <span>Cargando...</span>
                  </div>
                </td>
              </tr>
            )}
            {movements?.map((material) => {
              return (
                <tr key={material.id}>
                  <td>{material.id}</td>
                  <td>{new Date(material.createdAt).toLocaleDateString()}</td>
                  <td>{material.name}</td>
                  <td>{material.quantity}</td>
                  <td>{userNameMap?.[material.userId]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paginator
          currentPage={page}
          itemsPerPage={20}
          totalCount={totalCount}
          updatePage={setPage}
        />
        <AddMovement open={openNewMovement} setOpen={setOpenNewMovement} materialName={selectedMaterial?.name || ''} />
      </section>
    </BaseLayout>
  );
};
export default withPrivateRoute(Home);

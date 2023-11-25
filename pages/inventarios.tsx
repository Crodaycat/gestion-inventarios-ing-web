import { withPrivateRoute } from '@/HOC/PrivateRoute';
import { Loading } from '@/components/Loading';
import { Indicadores } from '@/components/Indicadores/index';
import { Paginator } from '@/components/Pagination';
import { useGetMaterials } from '@/hooks/useGetMaterials';
import { useGetMovements } from '@/hooks/useGetMovements';
import { BaseLayout } from '@/layout/BaseLayout';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { AddMovement } from '@/components/inventory/AddMovement';
import { Material } from '@/types';

const Home = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>();
  const { movements, totalCount, movementsLoading } = useGetMovements(
    selectedMaterial?.id || ''
  );

  const [page, setPage] = useState<number>(1);
  const { materials } = useGetMaterials();
  const [openNewMovement, setOpenNewMovement] = useState(false);
  const handleMaterialChange = (e: SelectChangeEvent) => {
    const selectedMaterialId = e.target.value;
    // Find the corresponding material object
    const material = materials?.find((m) => m.id === selectedMaterialId);
    // Update the selectedMaterial state
    setSelectedMaterial(material);

    // Perform any other actions with the selected material, such as changing effect values
    if (material) {
      setSelectedMaterial(material);
      // Update the effect value or perform any other action with the selected material
      // For example: setSelectedMaterial({ ...material, effect: newValue });
    }
  };
  return (
    <BaseLayout>
      <section className='w-full flex flex-col items-center p-4 gap-5'>
        <h1 className='text-4xl'>Gestión de Inventarios</h1>
        <div className='flex flex-row justify-between items-center w-full'>
          <form className='flex flex-col mt-2 w-52'>
            <FormControl fullWidth>
              <InputLabel id='role'>Material seleccionado</InputLabel>
              <Select
                id='materials'
                label='Seleccionar material...'
                placeholder='Seleccionar material...'
                value={selectedMaterial?.id || ''}
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

          <div>
            <Button
              color='primary'
              size='extraLarge'
              onClick={() => {
                setOpenNewMovement(true);
              }}
              disabled={!selectedMaterial?.id}
            >
              Agregar movimiento
            </Button>
          </div>
        </div>
        {selectedMaterial?.id && (
          <>
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
                {movements?.map((movement) => {
                  return (
                    <tr key={movement.id}>
                      <td>{movement.id}</td>
                      <td>
                        {new Date(movement.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        {movement.movementType === 'ENTRADA'
                          ? movement.quantity
                          : ''}
                      </td>
                      <td>
                        {movement.movementType === 'SALIDA'
                          ? movement.quantity
                          : ''}
                      </td>
                      <td>{movement.createdBy?.name}</td>
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
            <Indicadores movements={movements || []} />
          </>
        )}

        <AddMovement
          open={openNewMovement}
          setOpen={setOpenNewMovement}
          material={selectedMaterial}
        />
      </section>
    </BaseLayout>
  );
};
export default withPrivateRoute(Home);

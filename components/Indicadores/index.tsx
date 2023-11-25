import React from 'react';
import {
  Chart,
  CommonSeriesSettings,
  Series,
  Point,
  Legend,
  Tooltip,
} from 'devextreme-react/chart';
import { Movement } from '@/types';

interface IndicadoresProps {
  movements: Movement[];
}

const Indicadores = ({ movements }: IndicadoresProps) => {
  const grossProductData: { fecha: string; saldo: number }[] = [];
  let saldoAcumulado = 0;
  let secondDate = new Date().toLocaleDateString();

  if (Array.isArray(movements)) {
    movements.reverse().forEach((movement, index, array) => {
      {
        movement.movementType === 'ENTRADA'
          ? (saldoAcumulado += movement.quantity)
          : (saldoAcumulado -= movement.quantity);
      }
      const firstDate = new Date(movement.createdAt).toLocaleDateString();

      if (secondDate === null) {
        secondDate = firstDate;
      }

      if (secondDate !== firstDate) {
        grossProductData.push({
          fecha: secondDate,
          saldo: saldoAcumulado,
        });
        secondDate = new Date().toLocaleDateString();
      }

      if (index === array.length - 1 && array.length > 1) {
        if (grossProductData.length === 0) {
          grossProductData.push({
            fecha: new Date(movement.createdAt).toLocaleDateString(),
            saldo: saldoAcumulado,
          });
        } else {
          grossProductData.push({
            fecha: new Date(movement.createdAt).toLocaleDateString(),
            saldo: saldoAcumulado - movement.quantity,
          });
        }
      }

      if (array.length === 1) {
        grossProductData.push({
          fecha: new Date(movement.createdAt).toLocaleDateString(),
          saldo: saldoAcumulado,
        });
      }
    });
  }
  const title = `Saldo: ${saldoAcumulado}`;

  return (
    <div className='flex flex-col w-3/4'>
      <div className='font-semibold text-2xl p-2 text-slate-500'>{title}</div>
      <section>
        <Chart
          id='chart'
          dataSource={grossProductData.reverse()}
          stickyHovering={false}
        >
          <CommonSeriesSettings
            argumentField='fecha'
            type='line'
            hoverMode='includePoints'
            line={{ width: 2, color: 'blue' }}
          >
            <Point hoverMode='allArgumentPoints' />
          </CommonSeriesSettings>
          <Series name='Saldo' valueField='saldo' />
          <Legend
            verticalAlignment='bottom'
            horizontalAlignment='center'
            hoverMode='excludePoints'
          />
          <Tooltip enabled={true} />
        </Chart>
      </section>
    </div>
  );
};

export { Indicadores };

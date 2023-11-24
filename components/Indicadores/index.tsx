import React from 'react';
import {
  Chart,
  CommonSeriesSettings,
  Series,
  Point,
  Legend,
} from 'devextreme-react/chart';

const Indicadores = (movements) => {
  let grossProductData = [];
  let saldoAcumulado = 0;
  let secondDate = null;
  let cont = 0;

  if (Array.isArray(movements.movements)) {
    movements.movements.reverse().forEach((movement, index, array) => {
      {
        movement.movementType === 'ENTRADA'
          ? (saldoAcumulado += movement.quantity)
          : (saldoAcumulado -= movement.quantity);
      }

      cont += 1;
      console.log(saldoAcumulado);

      let firstdate = new Date(movement.createdAt).toLocaleDateString();

      if (secondDate === null) {
        secondDate = firstdate;
      }

      if (secondDate !== firstdate) {
        cont += 1;
        console.log('contador 1');
        console.log(cont);
        console.log(secondDate);
        console.log('saldo guardado');
        console.log(saldoAcumulado);
        grossProductData.push({
          fecha: secondDate,
          saldo: saldoAcumulado,
        });
        secondDate = null;
      }

      if (index === array.length - 1 && array.length > 1) {
        cont += 1;
        console.log('contador 2');
        console.log(cont);
        console.log(new Date(movement.createdAt).toLocaleDateString());
        console.log('saldo guardado');
        console.log(grossProductData.length);
        console.log(saldoAcumulado - movement.quantity);
        // Estás en el último elemento
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
        cont += 1;
        console.log('contador 3');
        console.log(cont);
        console.log(new Date(movement.createdAt).toLocaleDateString());
        console.log('saldo guardado');
        console.log(saldoAcumulado - movement.quantity);
        // Estás en el último elemento
        grossProductData.push({
          fecha: new Date(movement.createdAt).toLocaleDateString(),
          saldo: saldoAcumulado,
        });
      }
    });
  }

  console.log(grossProductData);
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
            type='line' // Cambiado el tipo de serie a 'spline'
            hoverMode='includePoints'
            line={{ width: 2, color: 'blue' }} // Configuración de la línea
          >
            <Point hoverMode='allArgumentPoints' />
          </CommonSeriesSettings>
          <Series name='Saldo' valueField='saldo' />
          <Legend
            verticalAlignment='bottom'
            horizontalAlignment='center'
            hoverMode='excludePoints'
          />
        </Chart>
      </section>
    </div>
  );
};

export { Indicadores };

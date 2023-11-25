import { Movement } from '@/types';
import Chart, {
  Series,
  Legend,
  CommonSeriesSettings,
  Margin,
  ArgumentAxis,
  Export,
  Tooltip,
  Title,
  Subtitle,
  Grid,
} from 'devextreme-react/chart';

interface IndicadoresProps {
  movements: Movement[];
}

const Indicadores = ({ movements }: IndicadoresProps) => {
  const formattedMovements = movements.map(movement => ({
    ...movement,
    createdAt: new Date(movement.createdAt).toLocaleDateString(),
  }));

  const groupedMovements = formattedMovements.reduce((acc, { createdAt, movementType, quantity }) => {
    acc[createdAt] ||= { date: createdAt, quantity: 0 };
    acc[createdAt].quantity += (movementType === 'ENTRADA' ? 1 : -1) * quantity;
    return acc;
  }, {} as Record<string, { date: string; quantity: number }>);

  const chartData = Object.values(groupedMovements);

  const totalBalance = chartData.reduce((sum, { quantity }) => sum + quantity, 0);

  const title = `Saldo total: ${totalBalance}`;

  return (
    <div className='flex flex-col w-3/4'>
      <div className='font-semibold text-2xl p-2 text-slate-500'>{title}</div>
      <Chart
        id='chart'
        dataSource={chartData.reverse()}
        title='Evolución de los saldos diarios totales'
      >
        <CommonSeriesSettings argumentField='date' type='line' />
        <Series valueField='quantity' name='Saldo' />
        <Margin bottom={20} />
        <ArgumentAxis
          argumentType='string'
          grid={{ visible: true }}
        />
        <Legend
          verticalAlignment='bottom'
          horizontalAlignment='center'
          itemTextPosition='bottom'
        />
        <Export enabled={true} />
        <Tooltip enabled={true} />
        <Title text='Evolución de los saldos diarios totales' />
        <Subtitle text='Material seleccionado' />
        <Grid visible={true} />
      </Chart>
    </div>
  );
};

export { Indicadores };

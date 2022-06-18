import React, { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  Label,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  StyledUL,
  StyledLI,
  BlueSpan,
  GreySpan,
  StyledListContainer,
} from './styles';
import { IGraphItem } from '../../../utils/prepareGraphData';
import uniqueColors from '../../../utils/uniqueColors';

interface DoughnutProps {
  mainData: IGraphItem[];
  others: IGraphItem[];
  total: number;
  concatenated: IGraphItem[];
}

const renderLegend = (...args: any) => {
  const { payload } = args[0];
  return (
    <StyledUL>
      {payload.map((entry: any) => {
        return (
          <StyledLI color={entry.color} key={entry.value}>
            <StyledListContainer>
              <BlueSpan className='font-mulish'>{entry.value}</BlueSpan>
              <GreySpan className='font-mulish'>
                {entry.payload.amount}%
              </GreySpan>
            </StyledListContainer>
          </StyledLI>
        );
      })}
    </StyledUL>
  );
};

const DoughnutGraph = ({ total, concatenated }: DoughnutProps) => {
  const doughnutColors = useMemo(() => uniqueColors(total), [total]);

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <Pie
          data={concatenated}
          outerRadius={'75%'}
          innerRadius={'65%'}
          paddingAngle={0}
          dataKey='amount'
        >
          <Label position='center' value={total} />
          {concatenated.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={doughnutColors[index % doughnutColors.length]}
            />
          ))}
        </Pie>
        <Legend verticalAlign='bottom' content={renderLegend} />
        <Tooltip
          formatter={(...props: any) => (props.value = `${props[2].value}%`)}
          isAnimationActive={false}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutGraph;

import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import {
  prepareDoughnutData,
  prepareAreaChartData,
  partition,
} from '../../../utils/prepareGraphData';
import AreaChartGraph from '../areaChart/AreaChartGraph';
import DoughnutGraph from '../doughnut/DoughnutGraph';

export interface GraphProps {
  type: string;
}

const Graph = ({ type }: GraphProps) => {
  const articles = useAppSelector((state) => state.graphs.articles);
  const { mainData, others, total, concatenated } = partition(
    prepareDoughnutData(articles)
  );
  return (
    <>
      {type === 'area' ? (
        <AreaChartGraph data={prepareAreaChartData(articles)} />
      ) : (
        <DoughnutGraph
          mainData={mainData}
          others={others}
          total={total}
          concatenated={concatenated}
        />
      )}
    </>
  );
};

export default Graph;

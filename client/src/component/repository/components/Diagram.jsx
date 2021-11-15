import React from 'react';
import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';

export const ChartLanguage = () => {
  const { currentRepository } = useSelector((state) => state.repositories);

  const mapData = [
    ['Language', 'size'],
    ...(currentRepository?.repository?.languages.edges.map((item) => [item.node.name, item.size]) || []),
  ];

  return (
    <Chart
      width="500px"
      height="300px"
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={mapData}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

import React from 'react';
import { Chart } from 'react-google-charts';
import PropTypes from 'prop-types';

export const ChartLanguage = ({ edges }) => {
  const mapData = [['Language', 'size'], ...edges.map((item) => [item.node.name, item.size])];

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

ChartLanguage.propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      size: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

import React, { useCallback, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
    {value === index && (
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

export const SimpleTab = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        {tabs.map(({ tabName }) => (
          <Tab key={tabName} label={tabName} />
        ))}
      </Tabs>
      {tabs.map(({ content, tabName }, index) => (
        <TabPanel key={tabName} value={value} index={index}>
          {content()}
        </TabPanel>
      ))}
    </>
  );
};

SimpleTab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.func.isRequired,
      tabName: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

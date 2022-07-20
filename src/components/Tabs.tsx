import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import AnaliseForm from './Forms/AnaliseForm';
import ManifestacaoForm from './Forms/ManifestacaoForm';
import ProcessoForm from './Forms/ProcessoForm';
import ProjetoForm from './Forms/ProjetoForm';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Processo" {...a11yProps(0)} />
          <Tab label="Projeto" {...a11yProps(1)} />
          <Tab label="Análise" {...a11yProps(2)} />
          <Tab label="Manifestação" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ProcessoForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProjetoForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AnaliseForm />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ManifestacaoForm />
      </TabPanel>
    </Box>
  );
}

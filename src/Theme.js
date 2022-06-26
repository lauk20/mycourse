import { createMuiTheme } from '@mui/material/styles';

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: 'rgb(10, 25, 41)',
      dark: '#768de6',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      secondary: 'rgba(255,255,255,0.7)',
    },
    background: {
      default: 'rgb(20, 30, 41)',
    },
  },
});

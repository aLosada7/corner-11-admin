import { createMuiTheme } from '@material-ui/core/styles';

const arcPrimary = '#290001';
const arcSecondary = '#87431d';
const arcGold = "#c87941";
const arcWarm = "#dbcbbd"

const theme = createMuiTheme({
  palette: {
    common:  {
        brown: `${arcPrimary}`,
        orange: `${arcSecondary}`,
        gold: arcGold,
        warm: arcWarm
    },
    primary: {
        main: `${arcPrimary}`,
    },
    secondary: {
        main: `${arcWarm}`,
    }
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: '700',
      fontSize: '1rem',
    },
    h2: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: `${arcPrimary}`,
      lineHeight: '1.5'
    },
    h3: {
      fontFamily: 'Raleway',
      fontSize: '2.5rem',
      color: `${arcPrimary}`,
      fontWeight: 700
    },
    h4: {
      fontFamily: 'Raleway',
      fontSize: '1.75rem',
      color: `${arcPrimary}`,
      fontWeight: 700
    },
    h6: {
      fontFamily: 'Raleway',
      fontSize: '1rem',
      fontWeight: 700,
      textTransform: 'uppercase'
    },
    subtitle1: {
      fontSize: '1.05rem',
      fontWeight: 300,
      color: '#fff'
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 300
    },
    button1: {
      borderColor: `${arcPrimary}`,
      color: `${arcPrimary}`,
      borderWidth: 2,
      textTransform: 'none',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    drawer: {
      width: '18.5em'
    },
    formItem: {
      marginBottom: '1rem'
    }
  },
  overrides: {
    MuiCardContent: {
      root: {
        padding: '0',
        "&:last-child": {
          paddingBottom: 0
        }
      }
    },
    MuiFormControl: {
      root: {
        color: '#dde6e9',
        fontWeight: 300,
        marginBottom: '1rem',
        width: '100%'
      }
    }
  }
});

export default theme;
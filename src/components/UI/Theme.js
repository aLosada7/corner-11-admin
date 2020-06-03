import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#3a3f51';
const arcOrange = '#FFBA60';
const arcGrey = "#656565";
const arcLightGrey = "#DCDCDC"

const theme = createMuiTheme({
  palette: {
    common:  {
        blue: `${arcBlue}`,
        orange: `${arcOrange}`,
        grey: arcGrey,
        lightGrey: arcLightGrey
    },
    primary: {
        main: `${arcBlue}`,
    },
    secondary: {
        main: `${arcOrange}`,
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
      color: `${arcBlue}`,
      lineHeight: '1.5'
    },
    h3: {
      fontFamily: 'Raleway',
      fontSize: '2.5rem',
      color: `${arcBlue}`,
      fontWeight: 700
    },
    h4: {
      fontFamily: 'Raleway',
      fontSize: '1.75rem',
      color: `${arcBlue}`,
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
      fontWeight: 300,
      color: `${arcGrey}`
    },
    button1: {
      borderColor: `${arcBlue}`,
      color: `${arcBlue}`,
      borderWidth: 2,
      textTransform: 'none',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
    },
    drawer: {
      width: '15em'
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
import { makeStyles } from '@material-ui/core/styles';

const formStyles = makeStyles((theme) => ({
    paper: {
      width: "400px",
      marginTop: theme.spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `0 ${theme.spacing.unit * 5}px ${theme
        .spacing.unit * 3}px`
    },
    container: {
      display: "flex",
      justifyContent: "center",
    },
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    field: {
      width: "100%",
      marginBottom: theme.spacing.unit * 2,
    }
}));

export default formStyles;
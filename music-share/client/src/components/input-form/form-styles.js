import { makeStyles } from '@material-ui/core/styles';

const formStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 5}px ${theme
        .spacing.unit * 5}px`
    },
    container: {
      maxWidth: "200px"
    }
}));

export default formStyles;
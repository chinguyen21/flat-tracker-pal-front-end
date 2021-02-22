
import { fade, makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';

const Styling = () => {
  const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
  authForm: {
    '& > *': {
      margin: theme.spacing(2),
      width: '25ch',
      background: 'linear-gradient(45deg, #686868 50%, #81d4d4 90%)',
      boxShadow: '0 3px 5px 2px rgba(180, 180, 180, .3)',
    }
  },
  authBox: {
    '& > *': {
      margin: theme.spacing(1),
      width: '13ch',
      background: 'linear-gradient(45deg, #686868 50%, #81d4d4 90%)',
      boxShadow: '0 2px 5px 2px rgba(180, 180, 180, .3)',
    }
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '200px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
    subRoot: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
})); 
  return useStyles();
}

export default Styling;
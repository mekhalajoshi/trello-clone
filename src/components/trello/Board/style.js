import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 8,
    overflow: 'auto',
    padding: 10,
  },
  title: {
    fontSize: 14,
  },
});

export default useStyles;

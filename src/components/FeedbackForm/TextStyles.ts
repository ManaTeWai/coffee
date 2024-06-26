import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	root: {
		marginBottom: '10px',
		'& .MuiFilledInput-root': {
			'&:before': {
				borderBottomColor: 'rgba(0, 0, 0, 0.42)',
			},
			'&:after': {
				borderBottomColor: '#754B1E',
			},
		},
		'& .MuiInputLabel-root': {
			'&.Mui-focused': {
				color: '#754B1E',
			},
		},
	},
});

export default useStyles;

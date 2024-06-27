import { styled } from '@mui/system';

const useStyles = () => ({
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
	slider: {
		color: '#754B1E',
		'& .MuiSlider-thumb': {
			backgroundColor: '#754B1E',
			'&:hover, &.Mui-focusVisible, &.Mui-active': {
				boxShadow: '0 0 0 4px rgba(117, 75, 30, 0.42)',
			},
		},
		'& .MuiSlider-track': {
			backgroundColor: '#754B1E',
		},
		'& .MuiSlider-rail': {
			backgroundColor: '#D3D3D3',
		},
	},
});

const StyledComponent = styled('div')(useStyles);

export default StyledComponent;

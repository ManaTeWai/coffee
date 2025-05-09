'use client'

import styles from './Calculator.module.css';
import { styled } from '@mui/system';
import { Htag, P, Button } from '..';
import { useState, useEffect, type JSX } from 'react';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const StyledSlider = styled(Slider)(({ theme }) => ({
	color: '#6F4E37',
	'& .MuiSlider-thumb': {
		backgroundColor: '#6F4E37',
		'&:hover, &.Mui-focusVisible, &.Mui-active': {
			boxShadow: '0 0 0 4px rgba(117, 75, 30, 0.42)',
		},
	},
	'& .MuiSlider-track': {
		backgroundColor: '#6F4E37',
	},
	'& .MuiSlider-rail': {
		backgroundColor: '#A67C52',
	},
}));

const CustomRadio = styled(Radio)(({ theme }) => ({
	color: '#6F4E37',
	'&.Mui-checked': {
		color: '#6F4E37',
	},
}));

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	'& .MuiFormControlLabel - label': {
		color: '#6F4E37',
		fontSize: '40px',
	},
}));

const CustomFormLabel = styled(FormLabel)(({ theme }) => ({
	color: '#6F4E37',
	'&.Mui-focused': {
		color: '#6F4E37',
	},
}));

export const Calculator = (): JSX.Element => {

	const full = 18000000;
	const notfull = 14000000;

	const [income, setIncome] = useState<number>(585180);
	const [value, setValue] = useState<number>(3600000);
	const [value2, setValue2] = useState<number>(400000);
	const [rent, setRent] = useState<number>(15);
	const [payback, setPayback] = useState<number>(32);
	const [investment, setInvestment] = useState<number>(full);

	const calculateIncome = (value: number, value2: number) => {
		return 0.2125 * value - 0.4494 * value2 - 60;
	};

	useEffect(() => {
		const initialIncome = calculateIncome(value, value2);
		setIncome(initialIncome);
	}, [value, value2]);

	const handleSliderChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number);
		setIncome(calculateIncome(newValue as number, value2));
	};

	const handleSliderChange2 = (event: Event, newValue: number | number[]) => {
		setValue2(newValue as number);
		setIncome(calculateIncome(newValue as number, value2));
	};

	const handleInvestmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInvestment(Number(event.target.value));
	};



	return (
		<div className={styles.calculator}>
			<Htag tag='h1' className={styles.big_header}>
				От {income.toLocaleString('ru-RU')} руб.
			</Htag>

			<div className={styles.ml}>
				<P size='large'>Товарооборот в месяц, руб.</P>
				<Htag tag="h1">{value.toLocaleString('ru-RU')}</Htag>
			</div>
			<StyledSlider
				value={value}
				onChange={handleSliderChange}
				aria-labelledby="number-slider"
				size='medium'
				step={100000}
				min={3600000}
				max={10000000}
			/>
			<div className={styles.slider_interval}>
				<P size='small'>3 600 000</P>
				<P size='small'>10 000 000</P>
			</div>

			<div className={styles.ml}>
				<P size='large'>Аренда в месяц, руб.</P>
				<Htag tag="h1">{value2.toLocaleString('ru-RU')}</Htag>
			</div>
			<StyledSlider
				value={value2}
				onChange={handleSliderChange2}
				aria-labelledby="number-slider"
				size='medium'
				step={50000}
				min={100000}
				max={1000000}
			/>
			<div className={styles.slider_interval}>
				<P size='small'>100 000</P>
				<P size='small'>1 000 000</P>
			</div>

			<FormControl className={styles.form}>
				<P size='large' className={styles.ml}>Инвестиции</P>
				<RadioGroup
					aria-labelledby="investment_label"
					defaultValue="full"
					name="radio-buttons-group"
					className={styles.radiogroup}
					value={investment}
					onChange={handleInvestmentChange}
				>
					<div className={styles.radioflex}>
						<CustomFormControlLabel value={full} control={<CustomRadio />}
							label={
								<>
									<P className={`${styles.mb_0} ${styles.b}`} size='medium'>{full.toLocaleString('ru-RU')}</P>
									<P className={styles.mb_0} size='small'>Полный цикл</P>
								</>
							}
						/>
						<CustomFormControlLabel value={notfull} control={<CustomRadio />}
							label={
								<>
									<P className={`${styles.mb_0} ${styles.b}`} size='medium'>{notfull.toLocaleString('ru-RU')}</P>
									<P className={styles.mb_0} size='small'>Доготовка</P>
								</>
							}
						/>
					</div>
				</RadioGroup>

				<P size='large' className={styles.ml}>Рентабельность</P>
				<RadioGroup
					aria-labelledby="investment_label"
					defaultValue="full"
					name="radio-buttons-group"
				>
					<div className={styles.radioflex}>
						<CustomFormControlLabel value="full" control={<CustomRadio />}
							label={
								<P size='medium' className={`${styles.mb_0} ${styles.b}`}>{rent.toLocaleString('ru-RU')}% в месяц</P>
							}
						/>
					</div>
				</RadioGroup>

				<P size='large' className={styles.ml}>Срок окупаемости</P>
				<RadioGroup
					aria-labelledby="investment_label"
					defaultValue="full"
					name="radio-buttons-group"
				>
					<div className={styles.radioflex}>
						<CustomFormControlLabel value="full" control={<CustomRadio />}
							label={
								<P size='medium' className={`${styles.mb_0} ${styles.b}`}>От {payback.toLocaleString('ru-RU')} месяцев</P>
							}
						/>
					</div>
				</RadioGroup>
				<Button appearance='primary' type="submit" className={styles.center} value="Отправить">Отправить</Button>
			</FormControl>
		</div>
	);
}
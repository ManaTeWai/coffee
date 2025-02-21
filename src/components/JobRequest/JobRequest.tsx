"use client"

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material"
import { styled } from "@mui/system"
import { useState } from "react"
import styles from "./JobRequest.module.css"

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: "10px",
    "& .MuiFilledInput-root": {
        "&:before": {
            borderBottomColor: "rgba(0, 0, 0, 0.42)",
        },
        "&:after": {
            borderBottomColor: "#754B1E",
        },
    },
    "& .MuiInputLabel-root": {
        "&.Mui-focused": {
            color: "#754B1E",
        },
    },
}))

export const JobRequest = () => {
    const [job, setJob] = useState("")
    const handleChange = (event: SelectChangeEvent) => {
        setJob(event.target.value)
    }

    return (
        <div className={styles.jobcontainer}>
            <StyledFormControl required sx={{ minWidth: 520 }}>
                <InputLabel id='demo-simple-select-label'>Выберите должность</InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    defaultValue='Бариста'
                    id='demo-simple-select'
                    value={job}
                    variant="filled"
                    label='Выберите должность'
                    onChange={handleChange}
                >
                    <MenuItem value={"Бариста"}>Бариста</MenuItem>
                    <MenuItem value={"Уборщик"}>Уборщик</MenuItem>
                    <MenuItem value={"Менеджер"}>Менеджер</MenuItem>
                </Select>
            </StyledFormControl>
        </div>
    )
}

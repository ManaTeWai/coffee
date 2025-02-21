"use client"

import styles from "./ReviewForm.module.css"
import { Htag, P, Button } from "@/components"
import TextField from "@mui/material/TextField"
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material"
import { styled } from "@mui/system"
import { useState } from "react"
import { supabase } from "@/utils/supabase"

const StyledTextField = styled(TextField)(({ theme }) => ({
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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: "10px",
}))

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
    "&.Mui-focused": {
        color: "#754B1E",
    },
}))

const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({}))

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({}))

const StyledRadio = styled(Radio)(({ theme }) => ({
    color: "rgba(0, 0, 0, 0.6)",
    "&.Mui-checked": {
        color: "#754B1E",
    },
}))

export const ReviewForm = () => {
    const [ImageType, setImageType] = useState("woman");
    const [author, setAuthor] = useState("")
    const [text, setText] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const { data, error } = await supabase
            .from('Reviews')
            .insert([
                {
                    ImageType,
                    author,
                    text,
                },
            ]);

        if (error) {
            setError("Ошибка при отправке отзыва");
            setSuccess("");
        } else {
            setSuccess("Отзыв успешно отправлен!");
            setError("");
            setImageType("");
            setAuthor("");
            setText("");
        }
    } catch (error) {
        setError("Ошибка при отправке отзыва");
        setSuccess("");
    }
    }

    const handleReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <StyledFormControl>
                    <StyledFormLabel id='Review'>Ваш пол</StyledFormLabel>
                    <StyledRadioGroup
                        aria-labelledby='Review'
                        defaultValue='woman'
                        name='radio-buttons-group'
                        className={styles.radio}
                        onChange={(e) => setImageType(e.target.value)}
                    >
                        <StyledFormControlLabel
                            value='woman'
                            control={<StyledRadio />}
                            label='Женский'
                        />
                        <StyledFormControlLabel
                            value='man'
                            control={<StyledRadio />}
                            label='Мужской'
                        />
                    </StyledRadioGroup>
                </StyledFormControl>
                <StyledTextField
                    id='2'
                    fullWidth
                    label='Имя'
                    variant='filled'
                    type='text'
                    name='name'
                    autoComplete='name'
                    value={author}
                    placeholder='Максим'
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <StyledTextField
                    id='3'
                    fullWidth
                    multiline
                    label='Отзыв'
                    variant='filled'
                    type='text'
                    name='text'
                    autoComplete='off'
                    placeholder='Отзыв'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button appearance='primary' type='submit' value='Отправить' onClick={handleReload}>
                    Отправить
                </Button>
            </form>
            {error && (
                <P size='medium' className={styles.error}>
                    {error}
                </P>
            )}
            {success && (
                <P size='medium' className={styles.success}>
                    {success}
                </P>
            )}
        </div>
    )
}

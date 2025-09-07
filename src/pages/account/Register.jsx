import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { colors } from '../../components/Navbar'
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import requests from '../../api/apiClient';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {register as registerUser} from "../account/accountSlice"
function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.account)
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordAgain: ""
    }
  })
  function formSubmit(data) {
    dispatch(registerUser(data))
  }

  const password = watch("password")
  return (
    <>
      <Container maxWidth="xs">
        <Paper sx={{ p: 2, background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(5px)" }} elevation={3}>
          <Avatar sx={{
            mx: "auto", mb: 2, bgcolor: "#ff6363ff"
          }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant='h5' sx={{ textAlign: "center", mb: 8 }}>Kayıt Ol</Typography>
          <Box component="form" sx={{ mb: 2 }} onSubmit={handleSubmit(formSubmit)} noValidate>
            <TextField
              {...register("username", {
                required: "Kullanıcı adı alanı boş bırakılamaz.",
                minLength: {
                  value: 4,
                  message: "Kullanıcı adı en az 4 karakterden oluşmalıdır."
                }
              }
              )}
              label="Kullanıcı Adı"
              size='small'
              fullWidth
              autoFocus
              sx={{ mb: 4 }}
              color='warning'
              error={errors?.username}
              helperText={errors?.username?.message}
            >
            </TextField>
            <TextField
              {...register("email", {
                required: "E-posta alanı boş bırakılamaz.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Geçerli bir e-posta adresi giriniz.",
                },
              })}
              label="E-posta"
              size='small'
              fullWidth
              sx={{ mb: 4 }}
              color='warning'
              error={errors?.email}
              helperText={errors?.email?.message}
            >
            </TextField>
            <TextField
              {...register("password", {
                required: "Parola alanı boş bırakılamaz.",
                minLength: {
                  value: 8,
                  message: "Parola en az 8 karakterden oluşmalıdır.",
                }
              })}
              label="Parola"
              size='small'
              type='password'
              fullWidth
              sx={{ mb: 4 }}
              color='warning'
              error={errors?.password}
              helperText={errors?.password?.message}
            >
            </TextField>
            <TextField
              {...register("passwordAgain", {
                required: "Parola alanı boş bırakılamaz.",
                validate: (value) =>
                  value === password || "Parolalar uyuşmuyor.",
                minLength: {
                  value: 8,
                  message: "Parola en az 8 karakterden oluşmalıdır.",
                }
              })}
              label="Parola Tekrar"
              size='small'
              type='password'
              fullWidth
              sx={{ mb: 4 }}
              color='warning'
              error={errors?.passwordAgain}
              helperText={errors?.passwordAgain?.message}
            >
            </TextField>
            <Button disabled={!isValid} loading={loading} type='submit' variant='contained' fullWidth
              sx={{ mt: 2, bgcolor: colors.button, "& .MuiCircularProgress-root": { color: "#fff" } }}>Kayıt Ol</Button>
          </Box>
        </Paper>
      </Container>

    </>
  )
}

export default RegisterPage
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { colors } from '../../components/Navbar'
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import requests from '../../api/apiClient';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './accountSlice';
function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.account)
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      username: "",
      password: ""
    }
  })
  function formSubmit(data) {
    dispatch(login(data))
  }

  return (
    <>
      <Container maxWidth="xs">
        <Paper sx={{ p: 2, background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(5px)" }} elevation={3}>
          <Avatar sx={{
            mx: "auto", mb: 2, bgcolor: "#ff6363ff"
          }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant='h5' sx={{ textAlign: "center", mb: 8 }}>Giriş Yap</Typography>
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
              color="warning"
              error={errors.username}
              helperText={errors?.username?.message}
            >
            </TextField>
            <TextField
              {...register("password", {
                required: "Parola alanı boş bırakılamaz.",
                minLength: {
                  value: 8,
                  message: "Parola en az 8 karakterden oluşmalıdır."
                }
              })}
              label="Parola"
              size='small'
              type='password'
              fullWidth
              sx={{ mb: 4 }}
              color="warning"
              error={errors.password}
              helperText={errors?.password?.message}
            >
            </TextField>
            <Button type='submit'
              variant='contained'
              fullWidth
              loading={loading}
              disabled={!isValid}
              sx={{ mt: 2, bgcolor: colors.button, "& .MuiCircularProgress-root": { color: "#fff" } }}
            >Giriş Yap</Button>
          </Box>
        </Paper>
      </Container>

    </>
  )
}

export default LoginPage
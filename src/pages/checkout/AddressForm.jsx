import {Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

function addressForm() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("firstname", {
            required: "Bu alan boş bırakılamaz.",
          })}
          label="İsim"
          size='small'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          color="warning"
          error={errors.firstname}
          helperText={errors?.firstname?.message}
        >
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("lastname", {
            required: "Bu alan boş bırakılamaz.",
          })}
          label="Soyisim"
          size='small'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          color="warning"
          error={errors.lastname}
          helperText={errors?.lastname?.message}
        >
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("phone", {
            required: "Bu alan boş bırakılamaz.",
          })}
          label="Telefon Numarası"
          size='small'
          type='phone'
          fullWidth
          sx={{ mb: 2 }}
          color="warning"
          error={errors.phone}
          helperText={errors?.phone?.message}
        >
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("city", {
            required: "Bu alan boş bırakılamaz.",
          })}
          label="Şehir"
          size='small'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          color="warning"
          error={errors.city}
          helperText={errors?.city?.message}
        >
        </TextField>
      </Grid>
      <Grid size={{ xs: 12}}>
        <TextField
          {...register("address", {
            required: "Bu alan boş bırakılamaz.",
          })}
          label="Adres"
          size='small'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          color="warning"
          multiline
          rows={3}
          error={errors.address}
          helperText={errors?.address?.message}
        >
        </TextField>
      </Grid>
    </Grid>
  )
}

export default addressForm
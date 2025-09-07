import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

function PaymentForm() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardInfo.cardHolderName", {
            required: "Bu alan boş bırakılamaz.",
          })}
          label="Kart Üzerindeki İsim"
          size='small'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          color="warning"
          error={!!errors.cardInfo?.cardHolderName}
          helperText={errors?.cardInfo?.cardHolderName?.message}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardInfo.cardNumber", {
            required: "Bu alan boş bırakılamaz.",
            pattern: {
              value: /^\d{16}$/,
              message: "Kart numarası 16 haneli olmalıdır"
            }
          })}
          label="Kart Numarası"
          placeholder="1234567890123456"
          size='small'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          color="warning"
          error={!!errors.cardInfo?.cardNumber}
          helperText={errors?.cardInfo?.cardNumber?.message}
        />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <TextField
          {...register("cardInfo.expireMonth", {
            required: "Ay boş bırakılamaz.",
          })}
          label="Ay (MM)"
          size='small'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          color="warning"
          error={!!errors.cardInfo?.expireMonth}
          helperText={errors?.cardInfo?.expireMonth?.message}
        />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <TextField
          {...register("cardInfo.expireYear", {
            required: "Yıl boş bırakılamaz.",
          })}
          label="Yıl (YY)"
          size='small'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          color="warning"
          error={!!errors.cardInfo?.expireYear}
          helperText={errors?.cardInfo?.expireYear?.message}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          {...register("cardInfo.cvc", {
            required: "Bu alan boş bırakılamaz.",
          })}
          label="CVV"
          size='small'
          type='text'
          fullWidth
          sx={{ mb: 2 }}
          color="warning"
          error={!!errors.cardInfo?.cvc}
          helperText={errors?.cardInfo?.cvc?.message}
        />
      </Grid>
    </Grid>
  )
}

export default PaymentForm
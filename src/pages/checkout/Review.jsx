import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { get, useFormContext } from 'react-hook-form'

function Review() {
  const { getValues } = useFormContext()
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant='subtitle2' gutterBottom>Teslimat Bilgileri</Typography>
        <Typography gutterBottom>{getValues("firstname")} {getValues("lastname")}</Typography>
        <Typography gutterBottom>{getValues("phone")}</Typography>
        <Typography gutterBottom>{getValues("address")}, {getValues("city")}</Typography>
      </Box>
      <Divider/>
      <Box>
        <Typography variant='subtitle2' gutterBottom mt={2}>Kart Bilgileri</Typography>
        <Typography gutterBottom>{getValues("cardInfo.cardHolderName")}</Typography>
        <Typography gutterBottom>{getValues("cardInfo.cardNumber")}</Typography>
        <Typography gutterBottom>{getValues("cardInfo.expireMonth")}/{getValues("cardInfo.expireYear")}</Typography>
        <Typography gutterBottom>{getValues("cardInfo.cvc")}</Typography>
      </Box>
    </Stack>
  )
}

export default Review
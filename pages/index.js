import React, { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import NumberFormat from 'react-number-format'
import NativeSelect from '@mui/material/NativeSelect'
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Input from '@mui/material/Input'
import InputAdornment from "@mui/material/InputAdornment"
import FormHelperText from '@mui/material/FormHelperText'

export default function Home() {
  const [values, setValues] = useState({
    amount: "80000",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ 
      ...values, 
      [prop]: event.target.value 
    })
  }

  const calculateTax = (val = 0) => {
    const pay = Number(val)
    let tax
    if (val > 120000) {
      tax = ((val - 29467) / 100) * 37
    }
    return tax
  }

  const calculatePay = (val = 0) => {
    const pay = Number(val)
    let tax
    if (val > 120000) {
      tax = (val - calculateSuper(val)) - calculateTax(val)
    }
    return tax
  }

  const calculateSuper = (val = 0) => {
    const pay = Number(val)
    let tax
    if (val > 120000) {
      tax = (val / 100) * 10;
    }
    return tax
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SalaryCalculator
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <div className={styles.container}>
        <main className={styles.main}>  
          <h1 className={styles.title}>
            Wage<a href="https://nextjs.org">Calculator</a>
          </h1>

          <section>
            <FormControl fullWidth sx={{ mb: 2 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Annual salary</InputLabel>
              <Input
                id="standard-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                color="secondary"
              />
              <FormHelperText>Enter how much you earn per year</FormHelperText>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Pay cycle
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
              >
                <option value={0}>Annually</option>
                <option value={1}>Monthly</option>
                <option value={2}>Fornightly</option>
                <option value={3}>weekly</option>
                <option value={4}>Daily</option>
                <option value={5}>Hourly</option>
              </NativeSelect>
            </FormControl>
          </section>

          <section>
              <div>
                Your net income ${calculatePay(values.amount)}
              </div>
              <div>
                Your tax ${calculateTax(values.amount)}
              </div>
              <div>
                Your super ${calculateSuper(values.amount)}
              </div>

          </section>

        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </div>
  )
}

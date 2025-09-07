import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { router } from "../../App"
import { toast } from "react-toastify"
import requests from "../../api/apiClient"

const initialState = {
    user: null,
    loading: false
}

export const login = createAsyncThunk("account/login",
    async (data, thunkAPI) => {
        try {
            const user = await requests.account.login(data)
            localStorage.setItem("user", JSON.stringify(user))
            router.navigate("/")
            toast.success("Giriş başarılı! Yönlendiriliyorsunuz...")
            return user
        }
        catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue({ message })
        }
    }
)
export const register = createAsyncThunk("account/register",
    async (data, thunkAPI) => {
        try {
            const user = await requests.account.register({
                username: data.username,
                email: data.email,
                password: data.password
            })
            localStorage.setItem("user", JSON.stringify(user))
            router.navigate("/")
            toast.success("Kayıt başarılı! Yönlendiriliyorsunuz...")
            return user
        }
        catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue({ message })
        }
    }
)
export const getUser = createAsyncThunk("account/getUser",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user"))))
        try {
            const user = await requests.account.getUser()
            localStorage.setItem("user", JSON.stringify(user))
            return user
        }
        catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue({ message })
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem("user")) return false
        }
    }
)
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            localStorage.clear("user")
            toast.success("Başarıyla çıkış yapıldı! Yönlendiriliyorsunuz...")
            router.navigate("/")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
        });
        builder.addCase(login.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(register.pending, (state, action) => {
            state.loading = true
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading = false
        });
        builder.addCase(register.rejected, (state) => {
            state.loading = false
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
        });
        builder.addCase(getUser.rejected, (state) => {
            state.user = null
            localStorage.removeItem("user")
            router.navigate("/login")
        });

    }
})


export const { setUser, logout } = accountSlice.actions
export default accountSlice.reducer
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../store.ts'
import {IUser} from "../../types/types.ts";
// Определение типа состояния для среза
interface UserState {
    user: IUser | null; // Информация о пользователе или null, если пользователь не аутентифицирован
    isAuth: boolean; // Флаг, указывающий на то, аутентифицирован ли пользователь
}

// Инициализация начального состояния
const initialState: UserState = {
    user: null, // Изначально пользователь не аутентифицирован
    isAuth: false // Изначально флаг аутентификации установлен в false
};

// Создание Redux-слайса с использованием createSlice
export const userSlice = createSlice({
    name: 'user', // Имя среза
    initialState, // Начальное состояние
    reducers: {
        login: (state, action: PayloadAction<IUser>) => { // Экшен для аутентификации пользователя
            state.user = action.payload; // Установка информации о пользователе из action.payload
            state.isAuth = true; // Установка флага аутентификации в true
        },
        logout: (state) => { // Экшен для выхода пользователя из системы
            state.isAuth = false; // Сброс флага аутентификации в false
            state.user = null; // Сброс информации о пользователе
        },
    },
});


// Экспорт созданных экшенов (login и logout)
export const { login, logout } = userSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user
// Экспорт редьюсера
export default userSlice.reducer;
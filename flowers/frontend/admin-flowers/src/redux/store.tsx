import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './slice/adminSlice'
import categorySlice from './slice/categorySlice'
import structureSlice from './slice/structureSlice'
import colorSlice from './slice/colorSlice'
import lightSlice from './slice/lightSlice'
import formatSlice from './slice/formatSlice'
import formSlice from './slice/formSlice'
import editSlice from './slice/editProductSlice'
import passwordSlice from './slice/passwordSlice'

export const store = configureStore({
	reducer: {
		admin: adminSlice,
		category: categorySlice,
		structure: structureSlice,
		color: colorSlice,
		light: lightSlice,
		format: formatSlice,
		form: formSlice,
		edit: editSlice,
		password: passwordSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

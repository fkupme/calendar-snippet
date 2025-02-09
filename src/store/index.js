import { createStore } from "vuex"
import renderDataModule from "./renderDataModule"
import calendarModule from './calendarModule'


export default createStore({
	modules: {
    data: renderDataModule,
    calendar: calendarModule
	},
})
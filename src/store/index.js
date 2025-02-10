import { createStore } from "vuex"
import renderDataModule from "./renderDataModule"
import calendarModule from './calendarModule'
import editModule from './editModule'

export default createStore({
	modules: {
    data: renderDataModule,
    calendar: calendarModule,
		edit: editModule
	},

})
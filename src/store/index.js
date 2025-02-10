import { createStore } from "vuex"
import renderDataModule from "./renderDataModule"
import calendarModule from './calendarModule'
import editModule from './editModule'
import formModule from './formModule'
import notificationsModule from './notificationModule'

export default createStore({
	modules: {
    data: renderDataModule,
    calendar: calendarModule,
		edit: editModule,
		form: formModule,
		notifications: notificationsModule
	},



})
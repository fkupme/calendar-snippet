import { createStore } from "vuex"
import renderDataModule from "./renderDataModule"


export default createStore({
	modules: {
    data: renderDataModule,
	},
})
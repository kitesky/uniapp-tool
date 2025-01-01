import App from './App'
import * as Pinia from 'pinia'
import auth from './utils/auth'
import toast from './utils/toast'
import { createSSRApp } from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.auth = auth
	app.config.globalProperties.toast = toast
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia
	}
}
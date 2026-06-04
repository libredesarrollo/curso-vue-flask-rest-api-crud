import { createApp } from 'vue'
import App from './App.vue'

// 💡 Cambiamos VuesticPlugin por createVuestic
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css' 

const app = createApp(App)

// 💡 Inicializamos el plugin de forma moderna
app.use(createVuestic())

app.mount('#app')
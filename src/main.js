import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faTrash, faEdit, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faTrash, faArrowUp, faArrowDown)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')

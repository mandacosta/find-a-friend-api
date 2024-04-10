import {app} from './app'

app.listen({
    port:3000,
    host: '0.0.0.0'
}).then(() => {
    console.log("🔥 Servidor rodando na porta 3000")
})
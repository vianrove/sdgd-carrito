const express = require('express')
const { config } =  require('dotenv');
const rutas = require('./routes/routes');

const app = express()


config()

const PORT = process.env.PORT || 8084;
app.use(express.json())

app.use(rutas);//manejador de rutass

app.use((req,res)=>{
    res.status(404).send({"status":"Error 404"}) 
})

app.listen(PORT, ()=>console.log(`conectado en el puerto ${PORT}`))


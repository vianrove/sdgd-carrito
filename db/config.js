const mysql2 = require('mysql2');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const host = process.env.host || ''
const userdb = process.env.user || 'root'
const password_db = process.env.password || ''
const database = process.env.database || ''
const portdb = process.env.db_port || 3306

const connection = mysql2.createConnection({
    host: host,
    user: userdb,
    password:password_db,
    database: database,
    port: portdb
});

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connect to MySQL")
});

//conexion con mongodb


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Mongo'))
    .catch((error) => console.error(error));

//metodos para mysql    
    function update(data, callback){
        let UpdateQuery = `UPDATE documents SET venta = venta -${data.amount} where ISBN = ${data.ISBN}`;
        connection.query(UpdateQuery, (err, result)=>{
            if(err) throw err;
            callback(result); 
            //connection.end(); 
        })
    }
    
    function correctiondb(arr){
        let UpdateQuery = '';
        if(arr.length>1){
            for(let data in arr){
                UpdateQuery = `UPDATE documents SET venta = venta +${arr[data].amount} where ISBN = ${arr[data].ISBN}`;
                connection.query(UpdateQuery, (err, result)=>{
                    if(err) throw err;
                    callback(result);  
                })
            }
        }else{
            UpdateQuery = `UPDATE documents SET venta = venta +${arr[0].amount} where ISBN = ${arr[0].ISBN}`;
            connection.query(UpdateQuery, (err, result)=>{
                if(err) throw err;
                console.log(result);  
            })
            
        }
        
          
    }

    module.exports = {update, correctiondb}
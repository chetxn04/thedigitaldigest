import mysql from 'mysql' 

export const db = mysql.createConnection({
    host:"localhost" , 
    user:"root" ,
    password:"Vanshu@2009",
    database:"blog"
})
import express from 'express'
//graphql

import graphqlHTTP from 'express-graphql';
import schema from './schema';
import { normalize } from 'path';

const app= express();

app.get('/', (req, resp)=>{
    resp.send('Todo listo');
})

//the resolver
class Cliente{
    constructor(id, {nombre, apellido, empresa, email}){
        this.id= id;
        this.nombre= nombre;
        this.apellido= apellido;
        this. empresa=empresa;
        this.email= email;
    }
}

const clienteDB={};
const root={
    cliente:()=>{
        return{
            "id": 1234123412341242134,
            "nombre": "Joseph",
            "apellido":"Reyes",
            "empresa": "softtek",
            "correo": "correo@correo.com"
        }
    },
        crearCliente:({input})=>{
            const id= require('crypto').randomBytes(10).toString('hex');
clienteDB[id]=input;
return new Cliente(id, input);
        } 
    
}

app.use('/graphql', graphqlHTTP({
    // el schema que va a utilizar dentro de la URL
    schema,
    //El resolver se pasa como root value
    rootValue: root,
    //Utilizar Graphical
    graphiql:true
}))

app.listen(8000, ()=>{ console.log("El servidor esta funcionando")})
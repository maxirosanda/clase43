import React , { useState, useEffect } from 'react'
import Productos from '../renders/productos'
import { Spinner } from 'react-bootstrap'
const axios = require('axios');

const ContainerProductos= () => {

  const [productos, setProductos] = useState({})
  const [idUsuario, setIdUsuario] = useState({})
  const [loading,setLoading] = useState(false)


  useEffect(async () => {

    setLoading(true)

    var config = {
      method: 'get',
      url: `http://localhost:8080/`,
      headers: {
        'Cookie': 'connect.sid=s%3AkJ8y18B1hrC4fkfBdIGOvRoFiv0CWMwe.Ev0l5Jyd0xY%2FuGbgBfAv2Oy%2F6JF5A%2FiXJc2FpoM15fs'
      },
      withCredentials: true
    };

    try{
    const response = await axios(config);
      setProductos(response.data.productos)
      setIdUsuario(response.data.id_usuario)
    }catch(e){
        console.log(e)
    }
      },[productos])

    useEffect(()=>{
        productos.length && setLoading(false)

    },[productos])


    const agregarcarrito = async e => {
      let json = {}
      e.preventDefault()
      for (let i = 0; i < 6; i++) {
       if(e.target[i].name=="nombre") json.nombre = e.target[i].value
       if(e.target[i].name=="descripcion")  json.descripcion = e.target[i].value
       if(e.target[i].name=="precio") json.precio = e.target[i].value
       if(e.target[i].name=="codigo")  json.codigo = e.target[i].value
       if(e.target[i].name=="url")  json.url = e.target[i].value
       if(e.target[i].name=="cantCompra")  json.cantCompra = e.target[i].value
       json.id_comprador = idUsuario
      }
     var config = {
      method: 'post',
      url: 'http://localhost:8080/carrito',
      headers: {
        'Content-Type': 'application/json'
      },
      data : json,
      withCredentials: true

    };

    try{
    const response = await axios(config);


    }catch(e) {
      console.log(e);
    }


    }

  return <React.Fragment>
<div className="container mt-5">
      <h1>Productos</h1>
  <div className="row justify-content-center">


{
        loading ? (
       <Spinner animation="border" role="status"/>

        ):(
          productos.length && productos.map((producto) => {
            return <Productos key ={producto.actualizar}   producto = {producto} agregarcarrito={agregarcarrito}/>
       })

 )}

  </div>
  </div>
  </React.Fragment>
  }

  export default ContainerProductos

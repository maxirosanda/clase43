import React , { useState, useEffect } from 'react'
import Agregar from '../renders/agregar'
import { Spinner } from 'react-bootstrap'
import {useActivoContext} from '../../Context'
const axios = require('axios');

const ContainerAgregar = () => {
  const [productos, setProductos] = useState({})
  const [loading,setLoading] = useState(false)
  const [crearProducto, setCrearProducto] = useState({})
  const [actProducto, setActProducto] = useState({})
  const {activo} = useActivoContext()
  const crearDatos = (e) => {
    setCrearProducto({...crearProducto,[e.target.name]: e.target.value});
  };

  const actDatos = (e) => {
    setActProducto({...actProducto,[e.target.name]: e.target.value});
  };

 

  // ver Productos---------------------------------------------------
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
      
    }catch(e){
      
        console.log(e)
    }

      },[productos])

    useEffect(()=>{
      if(activo === false ) {
        window.location.href = "/login";
      } 
        productos.length && setLoading(false)
    },[productos])

//Crear Producto -----------------------------------------------------------------------
 const  crearproducto = async e => {
      e.preventDefault()
      var config = {
        method: 'post',
        url: 'http://localhost:8080/productos',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : crearProducto,
        withCredentials: true
      };
  
      try{
      const response = await axios(config);

    
      }catch(e) {
        console.log(e);
      }

    }
//borrar producto -----------------------------------
    
    const borrarproducto = async  e => {
      e.preventDefault()
      var config = {
        method: 'delete',
        url: `http://localhost:8080/productos/${e.target.name}`,
        headers: { },
        data : '',
        withCredentials: true
      };
      try{
        const response = await axios(config);
  
      
        }catch(e) {
          console.log(e);
        }
  
    }

//actualizar producto --------------------------------------
    const actproducto = async e => {
      e.preventDefault()
     
      var config = {
        method: 'put',
        url: `http://localhost:8080/productos/${e.target.name}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : actProducto,
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
      <h1>Edicion de Productos</h1>
  <div className="row justify-content-center">
  <form  className="my-5" onSubmit={crearproducto}>

<div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
  <input type="text" className="form-control" name="nombre" onChange={crearDatos} aria-describedby="emailHelp" required/>
</div>
 <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Descripcion</label>
  <input type="text" className="form-control" onChange={crearDatos} name="descripcion" aria-describedby="emailHelp"required/>
</div>
   <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Url</label>
  <input type="text" className="form-control" onChange={crearDatos} name="url" aria-describedby="emailHelp" required/>
</div>
 <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Precio</label>
  <input type="number" className="form-control" onChange={crearDatos} name="precio" aria-describedby="emailHelp" required/>
</div>
 <div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Stock</label>
  <input type="number"className="form-control" onChange={crearDatos} name="stock" aria-describedby="emailHelp" required/>
</div>
 
<button   className="btn btn-primary" >Agregar</button>
</form> 
 
{ 
        loading ? (    
       <Spinner animation="border" role="status"/>
  
        ):(  
          productos.length && productos.map((producto) => {
            return <Agregar key ={producto.actualizar} producto = {producto} borrarproducto={borrarproducto} actproducto ={actproducto} actDatos={actDatos}/>
       })

 )}

  </div>
  </div>
  </React.Fragment>
  }
  
  export default ContainerAgregar
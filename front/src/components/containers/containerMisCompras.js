import React , { useState, useEffect } from 'react'
import MisCompras from '../renders/misCompras'
import { Spinner } from 'react-bootstrap'
const axios = require('axios');

const ContainerMisCompras = () => {

  const [pedidos, setPedidos] = useState({})
  const [loading,setLoading] = useState(false)
  // ver Datos---------------------------------------------------
  useEffect(async () => {
   
    setLoading(true)

  
    var config = {
      method: 'get',
      url: `http://localhost:8080/pedidos`,
      headers: { 
        'Cookie': 'connect.sid=s%3AkJ8y18B1hrC4fkfBdIGOvRoFiv0CWMwe.Ev0l5Jyd0xY%2FuGbgBfAv2Oy%2F6JF5A%2FiXJc2FpoM15fs'
      },
      withCredentials: true
    };
    
    try{
    const response = await axios(config);
    setPedidos(response.data)
    console.log(pedidos)
    }catch(e){
      
        console.log(e)
    }

      },[])

    useEffect(()=>{

        pedidos.length && setLoading(false)
    },[pedidos])
  
  return <React.Fragment> 
       <div className="container mt-5">
  <div className="row justify-content-center">
  { 
        loading ? (    
       <Spinner animation="border" role="status"/>
  
        ):(  
          pedidos.length && pedidos.map((pedido) => {
            
            return <MisCompras key ={pedido._id}   pedido = {pedido}/>
       })

 )}



  </div>
  </div>

  </React.Fragment>
  }
  
  export default ContainerMisCompras
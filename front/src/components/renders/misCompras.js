
import React from 'react'


const MisCompras = ({pedido}) => {

  return <React.Fragment> 
<h2>Identificador de pedido:{pedido._id}</h2>
<h2>{pedido.importe}</h2>
  </React.Fragment>
  }
  
  export default MisCompras





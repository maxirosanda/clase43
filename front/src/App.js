import React from 'react'
import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom"
import ContainerAgregar from './components/containers/containerAgregar';
import ContainerProductos from './components/containers/containerProductos'
import ContainerProducto from './components/containers/containerProducto'
import ContainerCarrito from './components/containers/containerCarrito'
import ContainerLogin from './components/containers/containerLogin'
import ContainerRegister from './components/containers/containerRegister'
import ContainerNavbar from "./components/containers/constainerNavbar"
import ContainerMisDatos from "./components/containers/containerMisDatos"
import ContainerMisCompras from './components/containers/containerMisCompras';
import {Context} from './Context'

const App = () => {

  return (
    <React.Fragment>
    <BrowserRouter>
    <Context>
    <ContainerNavbar />
      <Switch>
        <Route exact path="/miscompras" component={ContainerMisCompras}/>
        <Route exact path="/datos" component={ContainerMisDatos}/>
        <Route exact path="/login" component={ContainerLogin} />
        <Route exact path="/producto/:id" component={ContainerProducto} />
        <Route exact path="/register" component={ContainerRegister} />
        <Route exact path="/carrito" component={ContainerCarrito} />
        <Route exact path="/agregar" component={ContainerAgregar} />
        <Route path="/" component={ContainerProductos} />{" "}
      </Switch>
      </Context>
    </BrowserRouter>
  </React.Fragment>
  );
}

export default App;

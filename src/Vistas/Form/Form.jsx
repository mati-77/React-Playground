import React, { Fragment } from 'react';
import { Formik } from 'formik';

import './form.css'

const Form = () => {
    return(
        <div className="contenedor">
            <Formik>
                {() => (
                    <form action="" className="formulario">
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" id="nombre" name="nombre" placeholder="Ingrese su nombre" />
                        </div>
                        <div>
                            <label htmlFor="correo">Correo</label>
                            <input type="email" id="correo" name="correo" placeholder="formulario@enprogreso.com" />
                        </div>
                        <button type="submit">Enviar</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Form;
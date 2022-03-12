import React, { Fragment, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './form.css'

const Formulario = () => {
    const [formularioEnviado, setFormularioEnviado] = useState(false)
    return(
        <div className="contenedor">
            <Formik
                initialValues={{
                    nombre: '',
                    correo: ''
                }}

                validate={(valores) => {
                    let errores = {};

                    //validacion nombre
                    if(!valores.nombre){
                        errores.nombre = 'Por favor ingresa un nombre'
                    } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
                        errores.nombre = 'El nombre solo puede contener letras y espacios'
                    }

                    //validacion correo
                    if(!valores.correo){
                        errores.correo = 'Por favor ingresa un correo electronico'
                    } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
                        errores.correo = 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo'
                    }

                    return errores;
                }}

                /*con valores, ya puedo acceder a los valores*/
                onSubmit={(valores, {resetForm}) => {
                    resetForm();
                    console.log('Formulario enviado');
                    setFormularioEnviado(true);
                    setTimeout(() => setFormularioEnviado(false),5000);
                }}
            >
                {( {errors} ) => (
                    <Form className="formulario">
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <Field 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                placeholder="Ingrese su nombre" 
                            />
                            <ErrorMessage name="nombre" component={() => (<div className="error">{errors.nombre}</div>)} />
                        </div>
                        <div>
                            <label htmlFor="correo">Correo</label>
                            <Field 
                                type="email" 
                                id="correo" 
                                name="correo" 
                                placeholder="formulario@enprogreso.com" 
                            />
                            <ErrorMessage name="correo" component={() => (<div className="error">{errors.correo}</div>)} />
                        </div>

                        <div>
                            <Field name="pais" as="select">
                                <option value="mexico">Mexico</option>
                                <option value="mexico">España</option>
                                <option value="mexico">Argentina</option>
                            </Field>
                        </div>

                        <div>
                            <label>
                                <Field type="radio" name="sexo" value="hombre" /> Hombre
                            </label>
                            <label>
                                <Field type="radio" name="sexo" value="mujer" /> Mujer
                            </label>
                        </div>

                        <div>
                            <Field name="mensaje" as="textarea" placeholder="mensaje" />
                        </div>



                        <button type="submit">Enviar</button>
                    </Form>
                )}

                {/* {( {values, errors, touched, handleSubmit, handleChange, handleBlur} ) => (
                    <form className="formulario" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                placeholder="Ingrese su nombre" 
                                value={values.nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.nombre && errors.nombre && <div className="error">{errors.nombre}</div>}
                        </div>
                        <div>
                            <label htmlFor="correo">Correo</label>
                            <input 
                                type="email" 
                                id="correo" 
                                name="correo" 
                                placeholder="formulario@enprogreso.com" 
                                value={values.correo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.correo && errors.correo && <div className="error">{errors.correo}</div>}
                        </div>
                        <button type="submit">Enviar</button>
                        {formularioEnviado && <p className="exito">Formulario enviado con éxito</p>}
                    </form>
                )} */}
            </Formik>
        </div>
    )
}

export default Formulario;
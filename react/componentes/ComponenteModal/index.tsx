import React, { Fragment, useMemo, useState, useEffect} from 'react';
import { NoSSR } from 'vtex.render-runtime';
import styles from './styles.css'

interface PropsI {
    isShow: boolean,
    textoPrincipal: string,
    blockMesaje: string,
    botonIzquierdo: string,
    botonDerecho: string,
    mensajeCheck: string
}
const ComponenteModal = (props: PropsI) => {
    const {isShow, textoPrincipal, blockMesaje, botonIzquierdo, botonDerecho, mensajeCheck} = props
    const [validacion, setValidacion] = useState(false)
    const [revision, setRevision] = useState(true)
    const [block, setBlock] = useState(false)
    const [check, setCheck] = useState(false)
    const handleClickCheck = (e:any) => {
        setCheck(e.target.checked)
    }
    const selectBody = () => {
        let body = document.querySelector('body')
        body.style.overflow = 'hidden'
    }
    const handleClickValidacion = (e:any) => {
        sessionStorage.setItem('validacion', JSON.stringify(!validacion))
        setValidacion(!validacion)
        let body = document.querySelector('body')
        body.style.overflow = 'unset'
    }
    const handleClickBlock = (e:any) => {
        setBlock(!block)
    }
    const revisionStorage = () => {
        let storage = JSON.parse(sessionStorage.getItem('validacion'))
        if(storage) {
            setRevision(false)
        } else{
            selectBody()
        }
    }
    useEffect(() => {
        revisionStorage()
    }, [])
    return useMemo(() =>{
        return (
            isShow ?
                revision ? 
                (
                    <NoSSR>
                        <div className={`${styles.ContainerModal} ${validacion ? styles.CloseModal : '' || block ? `${styles.BlockModal}`: ''}`}>
                            <div className={styles.Modal}>
                                <div className={styles.ContenidoModal}>
                                    <img src="https://winesupply.vtexassets.com/assets/vtex/assets-builder/winesupply.winesupply/1.0.64/logo___5dcea8bcdc2ad1369830b27895bcafc8.jpg"/>
                                    <p className={styles.TextoPrincipal}>{textoPrincipal}</p>
                                    <div className={styles.CheckModal}>
                                    {block ? <p className={styles.MensajeValidacion}>{blockMesaje}</p>
                                        :
                                        <>
                                            <div className={styles.CheckBox}>
                                                <input 
                                                    type="checkbox"
                                                    onChange={(e) => handleClickCheck(e)}
                                                />
                                                <p className={styles.TextCheck}>{mensajeCheck}</p>
                                            </div>
                                            <div className={styles.BotonesModal}>
                                                <button 
                                                    disabled={check ? false : true}
                                                    className={check ? `${styles.boton} ${styles.BotonOpen}` : styles.boton}
                                                    onClick={(e) => handleClickValidacion(e)}
                                                >{botonIzquierdo}</button>
                                                <button
                                                    className={`${styles.boton} ${styles.BotonClose}`}
                                                    onClick={(e) => handleClickBlock(e)}
                                                >{botonDerecho}</button>
                                            </div>
                                        </>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NoSSR>
                ) : <Fragment />
            : <Fragment/>
        )
    },[props, check, validacion, block, revision])
}
ComponenteModal.schema = {
    title: 'Componente Modal de validacion',
    type: 'object',
    properties: {
        isShow: {
            title: 'is Show?',
            type: 'boolean',
            default: true
        },
        textoPrincipal: {
            title: 'Texto principal del modal.',
            type: 'stirng',
            default: 'Al ingresar a este sitio usted declara tener la edad legal necesaria para consumir bebidas alcohólicas en su país.'
        },
        blockMesaje:{
            title: 'Texto cuando no se pasa la validacion.',
            type: 'string',
            default: 'Lo sentimos, no puedes acceder a Wine Supply.'
        },
        mensajeCheck:{
            title: 'Texto del checkbox.',
            type: 'string',
            default: 'Acepto que soy mayor de edad.'
        },
        botonIzquierdo:{
            title: 'Texto del boton izquierdo.',
            type: 'string',
            default: 'Soy mayor de +18'
        },
        botonDerecho:{
            title: 'Texto del boton derecho.',
            type: 'string',
            default: 'No, soy menor'
        }
    }
}
ComponenteModal.defaultProps = {
    isShow: true,
    textoPrincipal: 'Al ingresar a este sitio usted declara tener la edad legal necesaria para consumir bebidas alcohólicas en su país.',
    blockMesaje: 'Lo sentimos, no puedes acceder a Wine Supply.',
    mensajeCheck: 'Acepto que soy mayor de edad.',
    botonIzquierdo: 'Soy mayor de +18',
    botonDerecho: 'No, soy menor'
}
export default ComponenteModal
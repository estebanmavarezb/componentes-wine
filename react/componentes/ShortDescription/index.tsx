import React, { Fragment, useMemo} from 'react';
import styles from './styles.css';
import { useProduct } from 'vtex.product-context';
import { pathOr } from 'ramda'
interface PropsI {
    isShow: boolean,
}
const ShortDescription = (props: PropsI) => {
    const {isShow} = props
    const { product } = useProduct();
    const shortName = pathOr('', ['items', 0, 'complementName'], product)
    return useMemo(() =>{
        return (
            isShow ?
                shortName !== '' ? <div className={styles.ContainerDesciption}><h2 className={styles.ShortTitle}>{shortName}</h2></div> : <Fragment/>
            : <Fragment/>
        )
    },[props, shortName])
}
ShortDescription.schema = {
    title: 'Componente Modal de validacion',
    type: 'object',
    properties: {
        isShow: {
            title: 'is Show?',
            type: 'boolean',
            default: true,
        }
    }
}
ShortDescription.defaultProps = {
    isShow: true,
}
export default ShortDescription
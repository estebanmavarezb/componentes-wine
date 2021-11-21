import React, { Fragment, useMemo, useCallback} from 'react';
import styles from './styles.css';
import { useProduct } from 'vtex.product-context';

interface PropsI {
    isShow: boolean,
}

interface SpecificationsI {
    name: string,
    values: any[]
}
const SpecificationGroup = (props: PropsI) => {
    const {isShow} = props
    const { product } = useProduct();
    const propName = "allSpecifications"
    const specificationsAll = product?.specificationGroups
    const getPropertyToShow = useCallback((prop:string, propertiesArray: any[]) => {
        const property = propertiesArray?.find((p:any) => p?.name?.toLowerCase() === prop?.toLowerCase().trim());
        return property;
    },[]);
    const prop = useMemo(() =>  propName?.trim()  !== '' && specificationsAll?.length ? getPropertyToShow(propName, specificationsAll) : {}, [propName, specificationsAll]);
    return useMemo(() =>{
        return (
            isShow ?
               <div className={styles.ContainerSpecifications}>
                   {prop && prop.specifications?.length ?
                        prop?.specifications?.map((atr: SpecificationsI) => (
                            <div className={`${styles.Specifications} ${styles.Specifications}--${atr.values[0]}`}>
                                <span className={styles.NameAtributo}>{atr.name}:</span> <span className={styles.ValuesAtributo}>{atr.values[0]}</span>
                            </div>
                        ))
                    : <Fragment/>
                   }
               </div>
            : <Fragment/>
        )
    },[props, prop])
}
SpecificationGroup.schema = {
    title: 'Componente Specification Group',
    type: 'object',
    properties: {
        isShow: {
            title: 'is Show?',
            type: 'boolean',
            default: true,
        }
    }
}
SpecificationGroup.defaultProps = {
    isShow: true,
}
export default SpecificationGroup
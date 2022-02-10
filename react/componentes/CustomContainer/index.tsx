import React, { Fragment, useMemo, ReactElement, cloneElement} from 'react';
import styles from './style.css';

interface PropsI {
    isShow: boolean,
    children: ReactElement[]
}
const CustomContainer = (props: PropsI) => {
    const {isShow, children} = props
    return useMemo(() =>{
        return (
            isShow ?
                    <div className={styles.CustomContainer}>
                        {children?.length ? children.map((element:any) => (cloneElement(element))) : <Fragment/>}
                    </div>
            : <Fragment/>
        )
    },[props])
}
CustomContainer.schema = {
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
CustomContainer.defaultProps = {
    isShow: true,
}
export default CustomContainer
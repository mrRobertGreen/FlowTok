import React, {FC} from 'react';
import styles from "./styles.module.scss"

type PropsType = {
   onChangeValue?: (e: React.FormEvent<HTMLInputElement>) => void
   value?: string
   type: string
   placeholder?: string
   readOnly?: boolean
   withMask?: boolean
   id?: string
}

const Input: FC<PropsType> = ({onChangeValue,
                                 value,
                                 type,
                                 placeholder,
                                 readOnly,
                                 withMask,
                                 id}) => {

   return (
      <>
         {!withMask && <input
            id={id}
		      className={styles.input}
		      placeholder={placeholder}
		      onChange={onChangeValue}
		      value={value}
		      type={type}
		      readOnly={readOnly}
	      />}
         {withMask && <input
		      className={styles.input}
		      placeholder={placeholder}
		      type={type}
	      />}
      </>
   )
}

export default Input
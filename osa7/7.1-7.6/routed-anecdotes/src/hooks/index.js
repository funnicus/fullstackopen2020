import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const clearValue = () => {
        setValue('')
    }
  
    return {
      props: {
        type,
        value,
        onChange 
      },
      clearValue
    }
}

export const useAnotherHook = () => {

}
import { useState } from 'react'

export const useFormValues = (initialValue) => {

    const initialState = initialValue ? initialValue : ''

    const [value, setValue] = useState(initialState)

    const onChangeText = (e) => setValue(e)

    return { value, onChangeText }

}

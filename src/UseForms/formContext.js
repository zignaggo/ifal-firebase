import { createContext, useEffect, useState } from "react";

/* 
    Função que cria em si o Hook e nos permite acessar os dados em parte/toda aplicação
*/
export const FormContext = createContext()

/*
    Componente para passar os dados para os filhos
*/
function FormProvider({children}){

    const message = [{
        type: "haveNumber",
        error: "Must have a number",
        success: "Have a number",
    },{
        type: "lessEightNumber",
        error: "Must have minimum 8 caracters",
        success: "Have more than 8 caracters",
    }]

    const [state, setState] = useState({
        message: "",
        state: false
    })

    function isValid(type) {
        switch (type) {
            case "haveNumber": 
            return /[0-9]/.test(value) ? {state: true, message: message[0].success} :  {state: false, message: message[0].error}
            case "lessEightNumber": 
            return value >= 8 ? {state: true, message: message[1].success} :  {state: false, message: message[1].error}
        }
    }

    useEffect( () => {
        setState(isValid(value))
    }, [value])

    return(
        <FormContext.Provider value={state}>
            {children}
        </FormContext.Provider>
    )
}

export default FormProvider
import { useContext } from "react";
import { FormContext } from "./formContext";

export function useForms() {

    return (
        useContext(FormContext)
    )
}
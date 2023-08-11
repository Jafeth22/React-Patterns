import PropTypes from 'prop-types';
import { useState } from 'react';

function callAll(...fns) {
    return function (...args) {
        fns.forEach(fn => fn && fn(...args));
    };
}

export const FinalFormWithRenderProps = ({ initialState, children }) => {
    const [formValues, setFormValues] = useState({ ...initialState });

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = _handleSubmit => event => {
        event.preventDefault();

        _handleSubmit(formValues);
    };

    // Va a retornar todo lo que quiera pasarle a los inputs
    // Va a obtener todos los props/atributos del input
    // Esta función, sería la que lleva el patrón de props-getters
    const getInputProps = (props = {}) => ({
        onChange: callAll(props.onChange, handleChange),
    });

    const getStateAndHelpers = () => ({
        formValues,
        handleSubmit,
        getInputProps,
    });

    return children(getStateAndHelpers());
};

FinalFormWithRenderProps.propTypes = {
    children: PropTypes.func.isRequired,
    initialState: PropTypes.object.isRequired,
};

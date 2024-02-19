import React, { useState } from "react";

function InputValor({ name, value, onChange, placeholder, errors }) {
  const [valor, setValor] = useState(value || "");
  const [erro, setErro] = useState("");

  const handleValorChange = (name, valorDigitado) => {
    if (valorDigitado.includes(",")) {
      setErro("Use pontos em vez de vírgulas para valores decimais.");
    } else {
      setErro("");
    }

    setValor(valorDigitado);

    if (onChange) {
      onChange(name, valorDigitado);
    }
  };

  return (
    <div className="input">
      <label htmlFor={name}>{placeholder}</label>
      <input
        type="text"
        name={name}
        value={valor}
        onChange={(event) => handleValorChange(name, event.target.value)}
        placeholder={placeholder}
        className={errors && "inputError"}
      />
      {erro && <p className="errorMessage">{erro}</p>}
    </div>
  );
}

export default InputValor;

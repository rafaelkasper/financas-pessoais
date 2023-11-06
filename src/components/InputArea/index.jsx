import { useState } from "react";
import { categories } from "../../data/categories";
import "./index.css";

export const InputArea = ({ onAdd }) => {
  const [dateField, setDateField] = useState("");
  const [categoryField, setCategoryField] = useState("");
  const [titleField, setTitleField] = useState("");
  const [valueField, setValueField] = useState(0);

  let categoryKeys = Object.keys(categories);

  const handleAddEvent = () => {
    let errors = [];

    if (isNaN(new Date(dateField).getTime())) {
      errors.push("Data inválida!");
    }
    if (!categoryKeys.includes(categoryField)) {
      errors.push("Categoria inválida!");
    }
    if (titleField === "") {
      errors.push("Título vazio!");
    }
    if (valueField <= 0) {
      errors.push("Valor inválido!");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      onAdd({
        date: new Date(dateField),
        category: categoryField,
        title: titleField,
        value: valueField,
      });
      clearFields();
    }
  };

  const clearFields = () => {
    setDateField("");
    setCategoryField("");
    setTitleField("");
    setValueField(0);
  };

  return (
    <div className="container">
      <label className="inputLabel">
        <div className="inputTitle">Data</div>
        <input
          className="input"
          type="date"
          value={dateField}
          onChange={(e) => setDateField(e.target.value)}
        />
      </label>
      <label className="inputLabel">
        <div className="inputTitle">Categoria</div>
        <select
          className="select"
          value={categoryField}
          onChange={(e) => setCategoryField(e.target.value)}
        >
          <>
            <option></option>
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>
                {categories[key].title}
              </option>
            ))}
          </>
        </select>
      </label>
      <label className="inputLabel">
        <div className="inputTitle">Título</div>
        <input
          className="input"
          type="text"
          value={titleField}
          onChange={(e) => setTitleField(e.target.value)}
        />
      </label>
      <label className="inputLabel">
        <div className="inputTitle">Valor</div>
        <input
          className="input"
          type="number"
          value={valueField}
          onChange={(e) => setValueField(parseFloat(e.target.value))}
        />
      </label>
      <label className="inputLabel">
        <div>&nbsp;</div>
        <button className="button" onClick={handleAddEvent}>
          Adicionar
        </button>
      </label>
    </div>
  );
};

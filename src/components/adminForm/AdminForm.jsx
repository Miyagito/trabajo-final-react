import React, { useState } from "react";

export const AdminForm = ({
  addCategoria,
  addProductoToCategoria,
  categorias,
}) => {
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [categoriaProducto, setCategoriaProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [codigo, setCodigo] = useState("");
  const [imagen, setImagenUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const isAddingProduct = descripcion && precio && stock && codigo && imagen;

    if (isAddingProduct) {
      const failedValidation = validateProduct();

      if (failedValidation) {
        setError(failedValidation);
        return;
      }
      const nuevoProducto = { descripcion, precio, stock, codigo, imagen };
      addProductoToCategoria(categoriaProducto, nuevoProducto);

      setDescripcion("");
      setPrecio("");
      setStock("");
      setCodigo("");
      setImagenUrl("");
    } else {
      const failedValidation = validateCategory();

      if (failedValidation) {
        setError(failedValidation);
        return;
      }
      addCategoria(nombreCategoria);
    }
    setNombreCategoria("");
  };

  const validateCategory = () => {
    if (!nombreCategoria) {
      return "Por favor, ingrese el nombre de la categoría.";
    }
    return null;
  };

  const validateProduct = () => {
    const validations = [
      {
        check: !descripcion,
        message: "Por favor, ingrese una descripción para el producto.",
      },
      {
        check: !precio,
        message: "Por favor, ingrese un precio para el producto.",
      },
      {
        check: isNaN(precio) || precio <= 0,
        message: "El precio debe ser un número mayor a 0.",
      },
      {
        check: !stock,
        message: "Por favor, ingrese el stock del producto.",
      },
      {
        check: isNaN(stock) || stock < 0,
        message: "El stock debe ser un número no negativo.",
      },
      {
        check: !codigo,
        message: "Por favor, ingrese un código para el producto.",
      },
      {
        check: !imagen,
        message: "Por favor, ingrese la URL de la imagen del producto.",
      },
    ];

    const failedValidation = validations.find((v) => v.check);
    return failedValidation ? failedValidation.message : null;
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="mb-3">
        <label className="form-label">Nombre de la categoría</label>
        <input
          type="text"
          className="form-control"
          value={nombreCategoria}
          onChange={(e) => setNombreCategoria(e.target.value)}
          placeholder="Nombre de la categoría"
        />
        <button type="submit" className="btn btn-primary mt-2">
          Añadir Categoría
        </button>
      </div>
      <h3 className="mt-4 mb-4">Añadir Producto</h3>
      <div className="mb-3">
        <label className="form-label">Categoría del producto</label>
        <select
          className="form-select"
          value={categoriaProducto}
          onChange={(e) => setCategoriaProducto(e.target.value)}
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción del producto</label>
        <input
          type="text"
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del producto"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Precio del producto</label>
        <input
          type="number"
          className="form-control"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Precio del producto"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Stock del producto</label>
        <input
          type="number"
          className="form-control"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock del producto"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Código del producto</label>
        <input
          type="text"
          className="form-control"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código del producto"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">URL de la imagen del producto</label>
        <input
          type="text"
          className="form-control"
          value={imagen}
          onChange={(e) => setImagenUrl(e.target.value)}
          placeholder="URL de la imagen del producto"
        />
      </div>
      <button type="submit" className="btn btn-success">
        Añadir Producto
      </button>
    </form>
  );
};

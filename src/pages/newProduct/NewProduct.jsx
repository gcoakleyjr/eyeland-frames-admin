import "./newProduct.css";
import { useState, createRef, useMemo } from "react";
import { useHistory } from 'react-router-dom'
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";


export default function NewProduct() {

  const colors = useMemo(
    () => [
      "black",
      "crystal",
      "red",
      "green",
      "gray",
      "brown",
      "pink",
      "blue",
      "purple",
      "yellow",
      "white",
      "tortoise",
      "champagne"
    ], []
  )
  let history = useHistory();

  const imgRef = createRef()
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState(null);
  const [checkedState, setCheckedState] = useState(
    new Array(colors.length).fill(false)
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCheckBox = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }


  //SUBMIT DATA TO API
  const handleCreate = (e) => {
    e.preventDefault()
    const selectedColors = colors.filter((color, i) => {
      return checkedState[i]
    })
    const product = { ...inputs };
    const formData = new FormData();

    Object.keys(product).forEach(key => formData.append(key, product[key]));

    if (imgRef.current.files[0]) {
      for (let key in imgRef.current.files) {
        formData.append('image', imgRef.current.files[key])
      }
    }

    formData.append('color', selectedColors)

    addProduct(formData, dispatch);

    history.push('/products', { replace: true });
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" >

        <div className="addProductItem">
          <label htmlFor="formFileMultiple" className="form-label">Add images</label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            ref={imgRef}
            id="formFileMultiple"
            multiple name="image"
            onChange={(e) => setFiles(e.target.files)}
          ></input>

        </div>

        <div className="addProductItem">
          <label htmlFor="product-title">Product Name</label>
          <input
            id="product-title"
            name="title"
            type="text"
            placeholder="Product Title"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label htmlFor="product-desc" >Product Description</label>
          <textarea
            id="product-desc"
            name="desc"
            rows="5"
            cols="50"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label htmlFor="product-id" >Zeelol Product Item Number</label>
          <input
            id="product-id"
            name="itemNumber"
            type="text"
            placeholder="ZOX739..."
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label htmlFor="product-price" >Product Price</label>
          <input
            id="product-price"
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label htmlFor="product-shape">Product Shape</label>
          <select id="product-shape"
            name="shape"
            onChange={handleChange}
          >
            <option value="rectangle">rectangle</option>
            <option value="aviator">aviator</option>
            <option value="round">round</option>
            <option value="cateye">cat eye</option>
            <option value="oval">oval</option>
            <option value="browline">browline</option>
            <option value="geometric">geometric</option>
            <option value="butterfly">butterfly</option>
            <option value="square">square</option>
          </select>
        </div>

        <div>
          <fieldset>
            <legend>Product Colors</legend>
            {colors?.map((color, i) => {
              return (
                <div key={i}>
                  <input
                    type="checkbox"
                    id={`product-color${i}`}
                    name="color"
                    value={color}
                    checked={checkedState[i]}
                    onChange={() => handleCheckBox(i)}
                  />
                  <label htmlFor={`product-color${i}`}>{color}</label>
                </div>
              )
            })}

          </fieldset>
        </div>

        <div className="addProductItem">
          <label htmlFor="product-cat" >Product Category</label>
          <select id="product-cat"
            name="categories"
            onChange={handleChange}
          >
            <option value="">-- Select a category...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="addProductItem">
          <label htmlFor="product-size" >Product Size</label>
          <select id="product-size"
            name="size"
            onChange={handleChange}
          >
            <option value="">--Select a frame size--</option>
            <option value="narrow">narrow</option>
            <option value="medium">medium</option>
            <option value="wide">wide</option>
          </select>
        </div>

        <div className="addProductItem">
          <label htmlFor="idStock">In Stock</label>
          <select
            name="inStock"
            id="idStock"
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button onClick={handleCreate} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}

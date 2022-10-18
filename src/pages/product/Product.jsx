import { Link, useLocation } from "react-router-dom";
import "./product.css";

import { useSelector } from "react-redux"
import { useState, createRef } from "react";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";


export default function Product() {
    const location = useLocation()
    const productId = location.pathname.split("/")[2]
    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId)
    );

    const imgRef = createRef()
    const [inputs, setInputs] = useState({});
    const [files, setFiles] = useState(null);
    const [deleteImages, setDeleteImages] = useState(null);
    const [checkedState, setCheckedState] = useState(
        new Array(product.color.length).fill(true)
    );

    const dispatch = useDispatch();

    const handleCheckBox = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault()
        const productUpdate = { ...inputs };
        const formData = new FormData();
        Object.keys(productUpdate).forEach(key => formData.append(key, productUpdate[key]));
        for (let key in imgRef.current.files) {
            formData.append('image', imgRef.current.files[key])
        }
        updateProduct(formData, dispatch);
    }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">{product.title}</h1>

            </div>
            <div className="productTop">

                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img[0]?.url} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">zeelool id:</span>
                            <span className="productInfoValue">{product.itemNumber}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>

                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="productBottom">
                <form className="productForm" encType="multipart/form-data">
                    <div className="productFormLeft">

                        <label htmlFor="product-title">Product Name</label>
                        <input
                            id="product-title"
                            type="text"
                            value={product.title}
                            name="title"
                            onChange={handleChange}
                        />

                        <label htmlFor="product-desc" >Product Description</label>
                        <textarea
                            id="product-desc"
                            rows="5"
                            cols="50"
                            type="text"
                            value={product.desc}
                            name="desc"
                            onChange={handleChange}
                        />

                        <label htmlFor="product-price" >Product Price</label>
                        <input
                            id="product-price"
                            type="number"
                            value={product.price}
                            name="price"
                            onChange={handleChange}
                        />

                        <label htmlFor="product-sale" >Product Sale Price</label>
                        <input
                            id="product-sale"
                            type="number"
                            name="salePrice"
                            placeholder={product.price}
                            onChange={handleChange}
                        />

                        <label htmlFor="product-shape">Product Shape</label>
                        <select id="product-shape"
                            name="shape"
                            onChange={handleChange}
                            value={product.shape}
                        >
                            <option value="rectangle">rectangle</option>
                            <option value="aviator">aviator</option>
                            <option value="cat eye">cat eye</option>
                            <option value="oval">oval</option>
                            <option value="browline">browline</option>
                            <option value="geometric">geometric</option>
                            <option value="butterfly">butterfly</option>
                            <option value="square">square</option>
                        </select>

                        <fieldset>
                            <legend>Product Colors</legend>
                            {product.color?.map((color, i) => {
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

                        <label htmlFor="product-cat" >Product Category</label>
                        <select id="product-cat"
                            name="categories"
                            onChange={handleChange}
                            value={product.categories}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="unisex">Unisex</option>
                        </select>

                        <label htmlFor="product-size" >Product Size</label>
                        <select id="product-size"
                            name="size"
                            onChange={handleChange}
                            value={product.size}
                        >
                            <option value="narrow">narrow</option>
                            <option value="medium">medium</option>
                            <option value="wide">wide</option>
                        </select>

                        <label htmlFor="idStock">In Stock</label>
                        <select
                            name="inStock"
                            id="idStock"
                            value={product.inStock}
                            onChange={handleChange}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>

                        <button className="productButton" style={{ marginTop: '20px' }}>Update</button>

                    </div>

                    <div className="productFormRight">
                        <div>
                            <label htmlFor="formFileMultiple" className="form-label">Add more image(s)...</label>
                            <input
                                className="form-control"
                                type="file"
                                id="formFileMultiple"
                                multiple
                                name="image"
                                ref={imgRef}
                                onChange={(e) => setFiles(e.target.files)}
                                accept="image/*"
                            ></input>
                        </div>
                        <div>
                            <label>Delete Images</label>
                            {product.img?.map((img, i) => {
                                return (
                                    <div className="img-container" key={i}>
                                        <img src={img.url ? img.url : ""} alt="img to be deleted" className="img-thumbnail" />

                                        <div className="img-checkbox">
                                            <input
                                                type="checkbox"
                                                id={`img-${i}`}
                                                name='deleteImages[]'
                                                value={img.filename}
                                                onChange={(e) => setDeleteImages(e.target.files)}
                                            />
                                        </div>
                                        <label htmlFor={`img-${i}`}>Delete?</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

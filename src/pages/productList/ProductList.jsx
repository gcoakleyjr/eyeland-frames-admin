import React from 'react';
import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getProducts, deleteProduct } from "../../redux/apiCalls";
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function ProductList() {

  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.products)


  useEffect(() => {
    getProducts(dispatch)
  }, [dispatch])

  const handleDelete = (id) => {
    deleteProduct(id, dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img[0]?.url} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <Link to={"/product/" + params.row._id}>
                <Button color="default" variant="contained" className="productListEdit">Edit</Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteOutline />}
                onClick={() => handleDelete(params.row._id)}
              >
                Delete?
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to="/newproduct" >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          style={{ marginBottom: '1rem' }}
        >
          Create New
        </Button>
      </Link>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={products.length}
        checkboxSelection
      />
    </div>
  );
}

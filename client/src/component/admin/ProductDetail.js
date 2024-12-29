import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../server-config";

const ProductDetail = () => {

  const navigate = useNavigate();
  const productId = useParams().productId;
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    _id: '',
    ProductName: '',
    ProductDescription: "",
    ProductPrice: 0,
    Quantity: 0,
    CategoryId: "",
    Picture: []
  });


  useEffect(() => {

    // get product
    if (productId) {
      fetch(`${apiUrl}/api/product?id=${productId}`)
        .then(res => res.json())
        .then(data => {

          if (data) {
            setProduct(data)
            if (data.Picture)
              setPreviewImage(data.Picture[0])
            if (data.DiscountPrice)
              setHasDiscount(true)
          } else navigate('/admin/products')

        })
        .catch(err => alert(err));
    }

    // fetch categories
    fetch(`${apiUrl}/api/categories`)
      .then(res => res.json())
      .then(data => {
        let newCategories = [];
        data.forEach(element => {
          element.categories.forEach((child) => newCategories.push({ CategoryName: child, ParentCategory: element.ParentCategory }))
        });

        setCategories(newCategories);
        setProduct({...product, CategoryId: newCategories[0].CategoryName})
      })
      .catch(err => alert(err));

  }, [productId, navigate])

  // Discounts

  const [hasDiscount, setHasDiscount] = useState(false);
  const toggleHasDiscount = () => {
    setHasDiscount(!hasDiscount);
    if (product.DiscountPrice) {
      delete product.DiscountPrice
    }
  };

  const [discountPercentage, setDiscountPercentage] = useState(0);

  const changeOrgPrice = (e) => {
    setProduct({ ...product, ProductPrice: e.target.value })
    setDiscountPercentage(((product.DiscountPrice / product.ProductPrice) * 100).toFixed(2));
  };

  const changeDiscountNumber = (e) => {
    setProduct({ ...product, DiscountPrice: e.target.value })
    setDiscountPercentage(Math.round((e.target.value / product.ProductPrice) * 100));
  };

  const changeDiscountPercentage = (e) => {
    setDiscountPercentage(e.target.value);
    let discountPrice = (product.ProductPrice * e.target.value / 100).toFixed(2);
    setProduct({ ...product, DiscountPrice: discountPrice });
  };

  // Images
  const [previewImage, setPreviewImage] = useState('');
  const [newImage, setNewImage] = useState("");
  const clickImage = (e) => {
    setPreviewImage(e.target.src);
  };

  const removeImage = (index) => {
    const oldPicture = product.Picture;
    oldPicture.splice(index, 1);

    const newProduct = { ...product, Picture: oldPicture };
    setProduct(newProduct);
  };

  const addImage = () => {

    // get the file extension of the new image
    let splitedArray = newImage.split('.')
    const format = splitedArray[splitedArray.length - 1]
    if (format !== 'jpg' && splitedArray[splitedArray.length - 1] !== 'jpeg' && splitedArray[splitedArray.length - 1] !== 'png') {
      alert('This format is not accpeted')
      return
    }

    let oldPicture = product.Picture;
    if (oldPicture)
      oldPicture.push(newImage);
    else
      oldPicture = [newImage];

    setProduct({ ...product, Picture: oldPicture });
    setNewImage('');
  }

  const saveProduct = () => {
    fetch(`${apiUrl}/api/products`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('token'),
      }
    })
      .then(res => {
        if (res.ok){
          alert('Product saved successfully')
          navigate('/admin/products')
        }
          
        else
          alert('Something went wrong')
      })
      .catch(err => alert(err));
  }

  const deleteProduct = () => {
    fetch(`${apiUrl}/api/product?id=${product._id}`, {
      method: 'DELETE',
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('token'),
      }
    })
      .then(res => {
        if (res.ok) {
          alert('Product deleted successfully');
          navigate('/admin/products');
        }
        else
          alert('Something went wrong')
      })
  }

  const changeProductPicrure = (index, newValue) => {
    let newArr = product.Picture;
    newArr[index] = newValue;
    setProduct({ ...product, Picture: newArr });
  }

  return (
    <div className="container text-start">
      <div className="row justify-content-between">
        <div className="col-auto">
          <Link to="/admin/products">{"<<Back"}</Link>
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-success" onClick={saveProduct}>
            Save
          </button>
        </div>
      </div>
      <hr />
      <div className="row">
        {/* Images */}
        <div className="col-6">
          <div className="row">
            <img src={previewImage} alt="preview" />
          </div>
          <div className="row row-cols-1 row-cols-md-4 justify-content-start gx-5">
            {product.Picture && product.Picture.map((source, index) => (
              <div className="col m-2" key={source}>
                <button
                  type="button"
                  className="btn p-0 m-0 position-relative"
                  onClick={clickImage}
                >
                  <img
                    src={source}
                    className="card-img-top"
                    alt={product.ProductName}
                  />
                </button>
              </div>
            ))}
          </div>
          {/* modify image */}
          <div className="row my-2">
            {product.Picture && product.Picture.map((src, index) =>
              <div className="input-group mb-3" key={src}>
                <span class="input-group-text" id="inputGroup-sizing-default">URL</span>
                <input type="text" className="form-control" placeholder="" value={src} onChange={(e) => changeProductPicrure(index, e.target.value)} />
                <button className="btn btn-outline-danger" type="button" id="button-addon2"
                  onClick={() => removeImage(index)}>Delete</button>
              </div>
            )}

            <div className="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default">URL</span>
              <input type="text" className="form-control" placeholder="JPG, JPEG, PNG supported"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value.toLowerCase())} />
              <button className="btn btn-outline-primary" type="button" id="button-addon2"
                onClick={() => addImage()}>Add</button>
            </div>
          </div>
          {/* Delete Button */}
          {product._id && <div className="row">
            <button type="button" className="btn btn-outline-danger"
              onClick={deleteProduct}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash mx-2"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
              Delete this product
            </button>
          </div>}
        </div>
        {/* Edit product form */}
        <div className="col-6">
          <form>
            <div className="row mb-3 gx-0">
              <label htmlFor="product-name">Product Name</label>
              <input
                id="product-name"
                type="text"
                className="form-control"
                value={product.ProductName}
                onChange={(e) => setProduct({ ...product, ProductName: e.target.value })}
              />
            </div>
            <div className="row mb-3 gx-0">
              <label htmlFor="product-category">Category</label>
              <select className="form-select" id="product-category" value={product.CategoryId}
                onChange={(e) => setProduct({ ...product, CategoryId: e.target.value })}>
                {categories.map(category =>
                  <option key={category.CategoryName}>{category.CategoryName}</option>
                )}
              </select>
            </div>
            <div className="row mb-3 gx-0">
              <label htmlFor="product-description">Description</label>
              <textarea
                class="form-control"
                placeholder="Description"
                id="product-description"
                value={product.ProductDescription}
                onChange={(e) => setProduct({ ...product, ProductDescription: e.target.value })}
              ></textarea>
            </div>
            <div className="row mb-3 gx-0">
              <label htmlFor="org-price">Original Price</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  className="form-control"
                  id="org-price"
                  onChange={changeOrgPrice}
                  value={product.ProductPrice}
                />
              </div>
            </div>
            <div className="row mb-3 gx-0">
              <div className="col-auto col-md-4">
                <label htmlFor="product-inventory">Inventory</label>
                <input
                  id="product-inventory"
                  type="number"
                  className="form-control"
                  value={product.Quantity}
                  onChange={(e) => setProduct({ ...product, Quantity: e.target.value })}
                />
              </div>
            </div>
            <div className="row mb-3 gx-0">
              <div className="col-7 form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="discount"
                  onChange={toggleHasDiscount}
                />
                <label className="form-check-label" htmlFor="discount">
                  Has Discount
                </label>
              </div>
            </div>
            <div className={hasDiscount ? "row mb-3 gx-0" : "d-none"}>
              <div className="col-auto col-md-5 me-3">
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    id="discount-number"
                    value={product.DiscountPrice}
                    onChange={changeDiscountNumber}
                  />
                </div>
              </div>
              <div className="col-auto col-md-5">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="discount-precentage"
                    value={discountPercentage}
                    onChange={changeDiscountPercentage}
                  />
                  <span className="input-group-text">%</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

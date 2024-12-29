import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import TwoThumbs from "../Staff/Helpers/RangeSlider/RangeSlider";
import ProductList from "../ProductList";
import { apiUrl } from "../../server-config";

const Products = () => {
  const [categories, setCategories] = useState([]);

  const [searchPrices, setSearchPrices] = useState([0, 30]);
  const [searchInventory, setSearchInventory] = useState([0, 200]);

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 30,
    category: [],
    minInventory: 0,
    maxInventory: 200,
    Name: ''
  })

  const multiselect = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // fetch categories
    fetch(`${apiUrl}/api/categories`)
      .then(res => res.json())
      .then(data => {
        let newCategories = [];
        data.forEach(element => {
          element.categories.forEach((child) => newCategories.push({ CategoryName: child, ParentCategory: element.ParentCategory }))
        });

        setCategories(newCategories);
      })
      .catch(err => alert(err));

  }, [])

  const changeSearchPrice = (newPrices) => {
    setSearchPrices(newPrices);
    setFilter({
      ...filter,
      minPrice: newPrices[0],
      maxPrice: newPrices[1]
    })
  }

  const changeSearchInventory = (newInventory) => {
    setSearchInventory(newInventory);
    setFilter({
      ...filter,
      minInventory: newInventory[0],
      maxInventory: newInventory[1]
    })
  }

  const selectCategory = (arr) => {
    let selectedCategories = arr.map((element) => element.CategoryName);
    setFilter({
      ...filter,
      category: selectedCategories
    })
  
  }

  const search = (F=filter) => {
    console.log(F)
    let search = new URLSearchParams(F)
    navigate(`/admin/products?${search.toString()}`)
  }

  const clearFilter = () => {
    setFilter({
      minPrice: 0,
      maxPrice: 30,
      category: [],
      Name: '',
      minInventory: 0,
      maxInventory: 200
    });
    setSearchPrices([0, 30]);
    multiselect.current.resetSelectedValues();
    search({
      minPrice: 0,
      maxPrice: 30,
      category: [],
      Name: '',
      minInventory: 0,
      maxInventory: 200
    })
  }

  const redirect = (productId) => {
    navigate(`/admin/products/${encodeURIComponent(productId)}`)
  }

  return (
    <div>
      {/* Search */}
      <div className="container mb-2">
        <div className="card border-0">
          <div className="row card-header text-start">
            <h5 class="col-10 ">Search</h5>
            <div className="col-2">
              <Link to="/admin/products/0">
                <button type="button" className="btn btn-success" onClick={()=> navigate('/admin/products/0')}>
                  Add Product
                </button>
              </Link>
            </div>
          </div>
          <div claclassNames="card-body">
            <div className="card-text py-3">
              <form className="container text-start">
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="product-name">Product Name</label>
                    <input
                      id="product-name"
                      type="text"
                      className="form-control"
                      value={filter.Name}
                      onChange={(e) => setFilter({...filter, Name: e.target.value})}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="order-status">Category</label>
                    <Multiselect
                      displayValue="CategoryName"
                      groupBy="ParentCategory"
                      onKeyPressFn={function noRefCheck() { }}
                      onRemove={selectCategory}
                      onSearch={function noRefCheck() { }}
                      onSelect={selectCategory}
                      options={categories}
                      showCheckbox
                      ref={multiselect}
                      style={{
                        chips: {
                          background: 'rgb(25,135,84)'
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label htmlFor="price-range">Price Range</label>
                    <TwoThumbs
                      STEP={0.01}
                      MIN={0}
                      MAX={30}
                      values={searchPrices}
                      setValues={changeSearchPrice}
                      dp={2}
                      color="var(--bs-green)"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="inventory-level">Inventory Level</label>
                    <TwoThumbs
                      STEP={1}
                      MIN={0}
                      MAX={200}
                      values={searchInventory}
                      setValues={changeSearchInventory}
                      dp={0}
                      color="var(--bs-green)"
                    />
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-3">
                    <button type="button" className="btn btn-success me-3" onClick={() => search()}>
                      Search
                    </button>
                    <button type="button" className="btn btn-light" onClick={clearFilter}>
                      Clear
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Table */}
      <div>
        <ProductList handleClickProduct={redirect} />
      </div>
    </div>
  );
};

export default Products;

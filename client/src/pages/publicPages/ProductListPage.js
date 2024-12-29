import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import TwoThumbs from "../../component/Staff/Helpers/RangeSlider/RangeSlider";
import ProductList from "../../component/ProductList";
import { apiUrl } from "../../server-config";

const ProductListPage = () => {
  const [categories, setCategories] = useState([]);
  const query = useParams();

  const [searchPrices, setSearchPrices] = useState([0, 30]);
  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 30,
    category: []
  })

  const multiselect = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // fetch categories
    fetch(`${apiUrl}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        let newCategories = [];
        data.forEach((element) => {
          element.categories.forEach((child) =>
            newCategories.push({
              CategoryName: child,
              ParentCategory: element.ParentCategory,
            })
          );
        });

        setCategories(newCategories);
      })
      .catch((err) => alert(err));

    if (window.location.search) {
      let newFilter = {}
      let urlSearch = window.location.search;
      urlSearch = urlSearch.slice(1, urlSearch.length).split('&');
      let params = urlSearch.reduce((acc, element) => {
        let key = element.split('=')[0]
        let value = element.split('=')[1]
        acc[key] = value;
        return acc;
      }, {})
      if (params.minPrice)
        newFilter.minPrice = params.minPrice;
      if (params.maxPrice)
        newFilter.maxPrice = params.maxPrice;
      if (params.category)
        newFilter.category = params.category;
    }
  }, [query]);

  const changeSearchPrice = (newPrices) => {
    setSearchPrices(newPrices);
    setFilter({
      ...filter,
      minPrice: newPrices[0],
      maxPrice: newPrices[1]
    })
  }

  const selectCategory = (arr) => {
    let selectedCategories = arr.map((element) => element.CategoryName);
    setFilter({
      ...filter,
      category: selectedCategories
    })

  }

  const clearFilter = () => {
    setFilter({
      minPrice: 0,
      maxPrice: 30,
      category: []
    });
    setSearchPrices([0, 30]);
    multiselect.current.resetSelectedValues();
    search({
      minPrice: 0,
      maxPrice: 30,
      category: []
    })
  }

  const redirect = (productId) => {
    navigate(`/productlist/${encodeURIComponent(productId)}`);
  };

  const search = (F = filter) => {
    let search = new URLSearchParams(F)

    navigate(`/productlist?${search.toString()}`)
  }

  return (
    <div className="row public">
      {/* Search */}
      <div className="col-12 col-md-3 border-end">
        <div className="card m-3 border-0">
          <div className="card-body">
            <div className="card-header">Filters</div>
            <form className="container text-start p-2">
              <div className="row mb-3">
                <div className="col-12">
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
                        background: '#59b828'
                      }
                    }}
                  />
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col-12">
                  <label htmlFor="price-range">Price</label>
                  <TwoThumbs
                    STEP={0.01}
                    MIN={0}
                    MAX={30}
                    values={searchPrices}
                    setValues={changeSearchPrice}
                    dp={2}
                  />
                </div>
                <div className="col-12 d-grid gap-2">
                  <button type="button" className="btn btn-custom-primary" onClick={() => search()}>
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
      {/* Table */}
      <div className="col-12 col-md-9">
        <ProductList
          handleClickProduct={redirect}
        />
      </div>
    </div>
  );
};

export default ProductListPage;

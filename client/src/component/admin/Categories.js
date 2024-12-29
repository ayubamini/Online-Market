import React, { useEffect, useState } from "react";
import SortableTree from "../Staff/Helpers/SortableTree/SortableTree";
import { apiUrl } from '../../server-config'

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState("");
  const [showList, setShowList] = useState(true);
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    fetch(`${apiUrl}/api/categories`)
      .then((res) => res.json())
      .then(data => {
        let localCategories = []
        data.forEach(element => {
          let item = { id: element.ParentCategory, children: [] };

          element.categories.forEach(children => {
            item.children.push({
              id: children,
              children: []
            })
          })

          localCategories.push(item);
        })
        setCategories(localCategories);
      })
      .catch(err => alert(err));
  }, [refresh])


  const onItemChange = (newItems) => {

    fetch(`${apiUrl}/api/categories/`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('token'),
      },
      body: JSON.stringify({categories: newItems})
    })
    setCategories(newItems);
  };

  const addCat = () => {

    const newCategory = {
      categoryName: newCat
    }

    fetch(`${apiUrl}/api/categories`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem('token'),
      },
      body: JSON.stringify(newCategory)
    })
      .then(res => {
        setNewCat("");
        setShowList(false);
        setShowList(true);
        if (!res.ok)
          alert('Something went wrong');
      })

      setRefresh(!refresh);
  };

  return (
    <div classNames="container">
      {/* Add Category button */}
      <div className="row justify-content-end">
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#AddCategoryModal"
          >
            Add Category
          </button>
        </div>
      </div>
      {/* Category List */}
      {showList &&
        <div className="row my-3">
          <ul className="list-group text-start">
            <SortableTree
              removable
              indicator
              defaultItems={categories}
              Dragged={onItemChange}
            />
          </ul>
        </div>}
      {/* Add Category Popup */}
      <div
        className="modal fade"
        id="AddCategoryModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Category
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="container">
                <div className="row mb-3 gx-0 text-start">
                  <label htmlFor="cat-name">Category Name</label>
                  <input
                    id="cat-name"
                    type="text"
                    className="form-control"
                    onChange={(e) => setNewCat(e.target.value)}
                    value={newCat}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-custom-secondary"
                data-bs-dismiss="modal"
                onClick={addCat}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;

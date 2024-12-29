import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import Pagination from "../shared/pagination";
import { paginate } from "../../utils/paginate";
import SearchBox from "../shared/searchBox";
import axios from "axios";
import { apiUrl } from "../../server-config";
import FormatDate from "../../utils/formatDate";
import DropDowns from "../shared/dropDowns";

class Users extends Component {
  state = {
    users: [],
    pageSizes: [],
    userTypes: [],
    selectedUserType: "",
    searchQuery: "",
    currentPage: 1,
    pageSize: "",
    selectedPageSize: null,
  };

  async componentDidMount() {
    const pageSizes = [
      { _id: 0, name: "All Rows" },
      { _id: 1, name: "5" },
      { _id: 2, name: "10" },
      { _id: 3, name: "50" },
    ];
    const userTypes = [
      { name: "All Users" },
      { _id: 0, name: "Staff" },
      { _id: 1, name: "Customer" },
    ];

    await axios
      .get(`${apiUrl}/api/users`)
      .then((res) => {
        this.setState({
          users: res.data.filter((d) => !(d.isAdmin === true)),
          pageSizes,
          userTypes,
          pageSize: "5",
          selectedPageSize: "5",
        });
      })
      .catch((err) => console.log(err));
  }

  handleDelete = async (user) => {
    await axios
      .delete(`${apiUrl}/api/users/${user._id}`)
      .then((res) => {
        alert(res.data.message);
        this.setState({
          users: this.state.users.filter((u) => u._id !== user._id),
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  handleEdit = async (user) => {
    Navigate(`/edit/${user._id}`);
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (value) => {
    this.setState({ searchQuery: value });
  };

  handleUserTypeSelect = (selectedItem) => {
    this.setState({ selectedUserType: selectedItem, currentPage: 1 });
  };

  handlePageSizeSelect = (selectedItem) => {
    this.setState({ selectedPageSize: selectedItem });
  };

  render() {
    const { length: count } = this.state.users;
    const {
      pageSize,
      currentPage,
      selectedUserType,
      searchQuery,
      users: allUsers,
      selectedPageSize,
    } = this.state;

    if (count === 0) return <p>There are no users in the database.</p>;

    let filtered = allUsers;
    if (selectedUserType.name === "Staff") {
      filtered = allUsers.filter((u) => u.isStaff === true);
    } else if (selectedUserType.name === "Customer") {
      filtered = allUsers.filter(
        (u) => u.isStaff === false || u.isStaff === undefined
      );
    } else {
      filtered = allUsers;
    }

    if (searchQuery) {
      filtered = this.state.users.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    
    //this.state.pageSize = selectedPageSize.name;

    const users = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <hr />
        <div className="row">
          <div className="col-md-2 col-sm-12">
            <DropDowns
              items={this.state.userTypes}
              selectedItem={this.state.selectedUserType}
              onItemSelect={this.handleUserTypeSelect}
              value="User Types"
            />
          </div>
          <div className="col-md-10 col-sm-12 mb-3">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
          {/* <div className="col-md-2 col-sm-12 mb-3">
            <DropDowns
              items={this.state.pageSizes}
              selectedItem={this.state.pageSize}
              onItemSelect={this.handlePageSizeSelect}
              value="Pages Size"
            />
          </div> */}
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Birth of Date</th>
                <th>Contact Number</th>
                <th>User Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <Link to={`/admin/edit/${user._id}`} className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                      <p>{user.email}</p>
                    </Link>
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.birthDate ? FormatDate(user.birthDate) : ""}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    {user.isStaff ? (
                      <span className="badge text-bg-secondary">Staff</span>
                    ) : (
                      <span className="badge text-bg-warning">Customer</span>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => this.handleDelete(user)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center">
            Showing {filtered.length} users in the database.
          </p>
        </div>
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Users;

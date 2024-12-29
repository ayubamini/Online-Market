import _ from "lodash";

const users = [
  {
    _id:"65d6129033192b070a1a18cd",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    contactNumber: "998-555-1234",
    secret: "*****",
    customer: {
      address: [
        {
          address1: "100 Main St",
          city: "Metropolis",
          state: "NY",
          zip: "10001",
        },
      ],
    },
  },
  {
    _id:"65d6139c33192b070a1a18ce",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    contactNumber: "333-333-3333",
    secret: "*****",
    staff: {
      position: "Inventory Manager",
      hireDate: {
        $date: "2023-01-01T00:00:00.000Z",
      },
    },
  },
  {
    _id:"65d6bde5c837e9f2b8765161",
    firstName: "David",
    lastName: "Johnson",
    email: "david.johnson@example.com",
    contactNumber: "+1 (555) 987-6543",
    secret: "customer_secret_2",
    customer: {
      address: [
        {
          address1: "456 Elm St",
          city: "Smallville",
          state: "USA",
          zip: "10001",
        },
      ],
    },
  },
  {
    _id:"65d6bde5c837e9f2b8765162",
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria.r@example.com",
    contactNumber: "+1 (555) 789-0123",
    secret: "customer_secret_3",
    customer: {
      address: [],
    },
  },
  {
    _id:"65d6bde5c837e9f2b8765160",
    firstName: "Emily",
    lastName: "Chen",
    email: "emilychen@example.com",
    contactNumber: "+1 (555) 123-4567",
    secret: "customer_secret_1",
    customer: {
      address: [
        {
          address1: "123 Main St",
          city: "Anytown",
          state: "USA",
          zip: "10001",
        },
        {
          address1: "202 Maple St",
          city: "Countryside",
          state: "USA",
          zip: "10001",
        },
      ],
    },
  },
  {
    _id:"65d6bde5c837e9f2b8765163",
    firstName: "James",
    lastName: "Smith",
    email: "james.smith@example.com",
    contactNumber: "+1 (555) 234-5678",
    secret: "customer_secret_4",
    customer: {
      address: [
        {
          address1: "101 Pine St",
          city: "Villagetown",
          state: "USA",
          zip: "10001",
        },
        {
          address1: "303 Cedar St",
          city: "Hillside",
          state: "USA",
          zip: "10001",
        },
        {
          address1: "404 Birch St",
          city: "Suburbia",
          state: "USA",
          zip: "10001",
        },
      ],
    },
  },
  {
    _id:"65d6bde5c837e9f2b8765164",
    firstName: "Sarah",
    lastName: "Lee",
    email: "sarahlee@example.com",
    contactNumber: "+1 (555) 345-6789",
    secret: "customer_secret_5",
    customer: {
      address: [
        {
          address1: "202 Maple St",
          city: "Countryside",
          state: "USA",
          zip: "10001",
        },
        {
          address1: "505 Walnut St",
          city: "Metropolis",
          state: "USA",
          zip: "10001",
        },
        {
          address1: "606 Spruce St",
          city: "Riverside",
          state: "USA",
          zip: "10001",
        },
        {
          address1: "707 Sycamore St",
          city: "Lakeside",
          state: "USA",
          zip: "10001",
        },
      ],
    },
  },
  {
    _id:"660ac9d0207dbcd219d923b0",
    firstName: "Becky",
    lastName: "Lam",
    email: "becky.lam@example.com",
    contactNumber: "444-444-4444",
    secret: "*****",
    staff: {
      position: "staff",
      hireDate: "2022-11-15T00:00:00.000Z",
    },
  },
  {
    _id: "65d6be55c837e9f2b8765166",
    firstName: "Anna",
    lastName: "Johnson",
    email: "anna.johnson@example.com",
    contactNumber: "555-555-5555",
    secret: "*****",
    staff: {
      position: "Delivery Driver",
      hireDate: "2023-05-20T00:00:00.000Z",
    },
  },
];

// getUsers function to return all users
export function getUsers() {
  return users;
}

// getUser function to get a user by id
export function getUser(id) {
  return users.find(user => user._id === id);
}

// updateUser function to update an existing user
export function updateUser(user) {
  const index = users.findIndex((u) => u._id === user._id);

  if (index !== -1) {
    for (let key in user) {
      if (user.hasOwnProperty(key)) {
        users[index][key] = user[key];
      }
    }
    console.log("User updated successfully:", users[index]);
    return users[index];
  } else {
    console.log("User not found");
    return null; // Return null if user is not found
  }
}

// addUser function to add a new user
export function addUser(newUser) {
  newUser._id = _.uniqueId();
  users.push(newUser);
  return newUser;
}

// deleteUser function to delete a user by id
export function deleteUser(id) {
  const index = users.findIndex(user => user._id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    return deletedUser;
  } else {
    return null;
  }
}
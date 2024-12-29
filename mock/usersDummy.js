const dummyData = [
    {
      firstName: "John",
      lastName: "Doe",
      contactNumber: "1234567890",
      email: "john@example.com",
      secret: "mySecret123",
      customer: {
        address: {
          address1: "123 Main St",
          city: "New York",
          state: "NY",
          zip: "10001"
        }
      }
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      secret: "anotherSecret456",
      staff: {
        position: "Manager",
        hireDate: "2022-01-01"
      }
    },
  ];
  
  module.exports = dummyData;
  
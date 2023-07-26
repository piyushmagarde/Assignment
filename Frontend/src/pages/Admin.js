import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [status, setStatus] = useState('active');
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sortColumn, setSortColumn] = useState('customer_id'); // Default sorting by customer_id column
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchCustomerData = () => {
    fetch('http://localhost:5000/api/getAllCustomers')
      .then((res) => res.json())
      .then((data) => {
        setCustomerData(data.data); // Update customerData state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching customers:', error.message);
      });
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const handleCreateCustomer = () => {
    setSelectedCustomer(null); // Reset selectedCustomer when creating a new customer
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCustomer) {
      // If selectedCustomer exists, it means we're editing an existing customer
      updateCustomer(selectedCustomer.customer_id);
    } else {
      // Otherwise, we're creating a new customer
      createCustomer();
    }
  };

  const createCustomer = () => {
    const newCustomer = {
      name,
      email,
      contact_details: contactDetails,
      status,
    };
    fetch('http://localhost:5000/api/createCustomer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomerData([...customerData, data]);
        fetchCustomerData();
        setShowPopup(false);
      })
      .catch((error) => {
        console.error('Error creating customer:', error.message);
      });
  };

  const updateCustomer = (customerId) => {
    const updatedCustomer = {
      customer_id: customerId,
      name,
      email,
      contact_details: contactDetails,
      status,
    };
    fetch(`http://localhost:5000/api/editCustomer/${customerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then((res) => res.json())
      .then((data) => {
        // Find the index of the updated customer in the customerData array
        const index = customerData.findIndex((customer) => customer.customer_id === customerId);
        if (index !== -1) {
          // Update the customerData state with the updated customer
          const updatedData = [...customerData];
          updatedData[index] = data;
          setCustomerData(updatedData);
          fetchCustomerData();
        }
        setShowPopup(false);
      })
      .catch((error) => {
        console.error('Error updating customer:', error.message);
      });
  };

  const deleteCustomer = (customerId) => {
    fetch(`http://localhost:5000/api/deleteCustomer/${customerId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 200) {
          setCustomerData(customerData.filter((customer) => customer.customer_id !== customerId));
        }
      })
      .catch((error) => {
        console.error('Error deleting customer:', error.message);
      });
  };

  const handleEditCustomer = (customerId) => {
    // Find the customer being edited based on the customer_id
    const customer = customerData.find((customer) => customer.customer_id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
      setName(customer.name);
      setEmail(customer.email);
      setContactDetails(customer.contact_details);
      setStatus(customer.status);
      setShowPopup(true);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const compareDates = (date1, date2) => {
    return new Date(date1) - new Date(date2);
  };

  const sortedCustomerData = customerData.sort((a, b) => {
    if (sortColumn === 'created_date') {
      return sortOrder === 'asc' ? compareDates(a.created_date, b.created_date) : compareDates(b.created_date, a.created_date);
    } else if (sortColumn === 'updated_date') {
      return sortOrder === 'asc' ? compareDates(a.updated_date, b.updated_date) : compareDates(b.updated_date, a.updated_date);
    } else {
      return sortOrder === 'asc' ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn];
    }
  });

  return (
    <div className='admin'>
      <h1>Customer Dashboard</h1>
      <div className="customer-count">
        <p>Total Customer Count: {customerData.length}</p>
        <button onClick={handleCreateCustomer} className='create-customer'>Create Customer</button>
      </div>
      <div className='table-container'>
      <table className="customer-table">
        {customerData.length > 0 && (
          <>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Details</th>
                <th>Status</th>
                <th onClick={() => handleSort('created_date')}>
                  Created Date  {sortColumn === 'created_date' && sortOrder === 'asc' && <span>&uarr;</span>}
                  {sortColumn === 'created_date' && sortOrder === 'desc' && <span>&darr;</span>}
                </th>
                <th onClick={() => handleSort('updated_date')}>
                  Updated Date {sortColumn === 'updated_date' && sortOrder === 'asc' && <span>&uarr;</span>}
                  {sortColumn === 'updated_date' && sortOrder === 'desc' && <span>&darr;</span>}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCustomerData.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{customer.customer_id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.contact_details}</td>
                  <td>{customer.status}</td>
                  <td>{customer.created_date}</td>
                  <td>{customer.updated_date}</td>
                  <td>
                    <button className="edit" onClick={() => handleEditCustomer(customer.customer_id)}>
                      Edit
                    </button>
                    <button className='delete' onClick={() => deleteCustomer(customer.customer_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedCustomer ? 'Edit Customer' : 'Create Customer'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Contact Details"
                value={contactDetails}
                onChange={(e) => setContactDetails(e.target.value)}
              />
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button type="submit">{selectedCustomer ? 'Update' : 'Submit'}</button>
              <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

import React, { useState, useEffect } from 'react';

const BillingDetailsForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        address: '',
        city: '',
        state: '',
        country: 'India',
        zip: '',
        type: '',
        first_name: '',
        last_name: '',
        phone: '',
    });

    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const addressResponse = await fetch(`/api/user/address`);
                if (addressResponse.ok) {
                    const addressData = await addressResponse.json();
                    if (addressData) {
                        setFormData({
                            id: addressData.id,
                            address: addressData.address || '',
                            city: addressData.city || '',
                            state: addressData.state || '',
                            country: addressData.country || 'India',
                            zip: addressData.zip || '',
                            type: addressData.type || '',
                            first_name: addressData.first_name || '',
                            last_name: addressData.last_name || '',
                            phone: addressData.phone || '',
                        });
                        setIsEditing(true); // Set to editing mode if data exists
                    }
                } else {
                    throw new Error('Failed to fetch address data');
                }
            } catch (error) {
                console.error(error);
                setMessage('An error occurred while fetching address data');
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isEditing ? `/api/user/address/${formData.id}` : '/api/user/address';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create or update address');
            }

            const result = await response.json();
            setMessage(result.message || 'Address and billing details saved successfully');
            setIsEditing(true); // Set to editing mode after successful submission
        } catch (error) {
            setMessage(error.message || 'An error occurred');
        }
    };

    return (
        <div className="col-lg-6 mt-4 col-md-12">
            <div className="checkbox-form">
                <h3>Billing Details</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="checkout-form-list">
                                <label>First Name <span className="required">*</span></label>
                                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="checkout-form-list">
                                <label>Last Name <span className="required">*</span></label>
                                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="checkout-form-list">
                                <label>Address <span className="required">*</span></label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street address" required />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="checkout-form-list">
                                <label>Town / City <span className="required">*</span></label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Town / City" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="checkout-form-list">
                                <label>State / County <span className="required">*</span></label>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="checkout-form-list">
                                <label>Postcode / Zip <span className="required">*</span></label>
                                <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Postcode / Zip" required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="checkout-form-list">
                                <label>Phone <span className="required">*</span></label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} minLength={10} maxLength={10} placeholder="Phone Number" required />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="country-select">
                                <label>Address Type <span className="required">*</span></label>
                                <select name="type" value={formData.type} onChange={handleChange} required >
                                    <option value=""></option>
                                    <option value="HOME">HOME</option>
                                    <option value="OFFICE">OFFICE</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4">
                            <button type="submit" className="btn btn-primary">
                                {isEditing ? 'Update Details' : 'Submit Details'}
                            </button>
                        </div>
                    </div>
                </form>
                {message && <p className='success_msg'>{message}</p>}
            </div>
        </div>
    );
};

export default BillingDetailsForm;
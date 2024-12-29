import React, { useState } from 'react';

const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Password successfully updated");

    };

    return (
            <div className="public container p-4 text-center">
                <div className='row justify-content-center'>
                    <div className='col-12 col-md-3'>
                        <h2>Reset Your Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="new-password">New Password</label>
                                <input
                                className='form-control'
                                    type="password"
                                    id="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirm-password">Confirm New Password</label>
                                <input
                                className='form-control'
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-custom-primary w-100 p-2">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default PasswordReset;
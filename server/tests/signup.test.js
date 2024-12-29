import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginModal from './LoginModal'; 

describe('LoginModal Component', () => {
    beforeEach(() => {
        render(<LoginModal onClose={() => {}} />);
        fireEvent.click(screen.getByText('Sign Up')); // Switch to 'Sign Up' tab
    });

    test('validates all fields when submitting an empty form', () => {
        expect(screen.getByText('*First Name is required')).toBeInTheDocument();
        expect(screen.getByText('*Last Name is required')).toBeInTheDocument();
        expect(screen.getByText('*Email is required')).toBeInTheDocument();
        expect(screen.getByText('*Phone number is required')).toBeInTheDocument();
        expect(screen.getByText('*Password is required')).toBeInTheDocument();
        expect(screen.getByText('*Confirm Password is required')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    });

    test('validates when only first name is left empty', () => {
        userEvent.type(screen.getByPlaceholderText('Last Name'), 'Doe');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
        userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password123');
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
        expect(screen.getByText('*First Name is required')).toBeInTheDocument();
    });

    test('validates when only last name is left empty', () => {
        userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
        userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password123');
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
        expect(screen.getByText('*Last Name is required')).toBeInTheDocument();
    });

    test('validates when only email is left empty', () => {
        userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Last Name'), 'Doe');
        userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password123');
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
        expect(screen.getByText('*Email is required')).toBeInTheDocument();
    });

    test('validates when email is not in valid format', () => {
        userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Last Name'), 'Doe');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.doe@example');
        userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password123');
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
        expect(screen.getByText('*Invalid email format')).toBeInTheDocument();
    });

    test('validates when only password is left empty', () => {
        userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Last Name'), 'Doe');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
        userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
        userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password123');
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
        expect(screen.getByText('*Password is required')).toBeInTheDocument();
        expect(screen.getByText('*Passwords do not match')).toBeInTheDocument();
    });

    test('validates when only confirm password is left empty', () => {
        userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Last Name'), 'Doe');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
        userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
        expect(screen.getByText('*Confirm Password is required')).toBeInTheDocument();
    });

    test('validates when the passwords do not match ', () => {
        userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Last Name'), 'Doe');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.doe@example');
        userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password321');
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
        expect(screen.getByText('*Passwords do not match')).toBeInTheDocument();
    });

    test('allows the user to fill in the form correctly', () => {
        userEvent.type(screen.getByPlaceholderText('First Name'), 'John');
        userEvent.type(screen.getByPlaceholderText('Last Name'), 'Doe');
        userEvent.type(screen.getByPlaceholderText('Email'), 'john.doe@example.com');
        userEvent.type(screen.getByPlaceholderText('Phone Number'), '1234567890');
        userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'password123');
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    });

});
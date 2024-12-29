import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header'; 

describe('Header Component', () => {
    const mockSearchHandler = jest.fn();

    beforeEach(() => {
        render(<Header onSearchSubmit={mockSearchHandler} />);
    });

    test('renders search input and allows typing', () => {
        const searchInput = screen.getByPlaceholderText('Search for Products');
        expect(searchInput).toBeInTheDocument();

        userEvent.type(searchInput, 'Test');
        expect(searchInput.value).toBe('Test');
    });

    test('handles no matching item scenario', () => {
        const searchInput = screen.getByPlaceholderText('Search for Products');
        userEvent.type(searchInput, 'OMG');
        fireEvent.submit(searchInput);

        expect(mockSearchHandler).toHaveBeenCalledWith('Nonexistent Item');
    });

    test('handles matched item scenario', () => {
        const searchInput = screen.getByPlaceholderText('Search for Products');
        userEvent.type(searchInput, 'Chocolate');
        fireEvent.submit(searchInput);

        expect(mockSearchHandler).toHaveBeenCalledWith('Chocolate');
    });

    test('handles empty input scenario', () => {
        const searchInput = screen.getByPlaceholderText('Search for Products');
        fireEvent.submit(searchInput);

        expect(mockSearchHandler).not.toHaveBeenCalled();
    });

});
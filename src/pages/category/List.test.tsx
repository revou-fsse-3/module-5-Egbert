import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import List from './List';

jest.mock('axios');

describe('List Component', () => {
    const mockRows = [
        { id: '1', name: 'Category 1', is_active: true },
        { id: '2', name: 'Category 2', is_active: false },
    ];

    beforeEach(() => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: { data: mockRows } });
    });

    test('renders List Component', async () => {
        render(
        <Router>
            <List />
        </Router>
        );

        await waitFor(() => {
        expect(screen.getByText('List Of Category')).toBeDefined();
        expect(screen.getByText('Category 1')).toBeDefined();
        expect(screen.getByText('Category 2')).toBeDefined();
        });
    });

    test('handles category deletion', async () => {
        (axios.delete as jest.Mock).mockResolvedValueOnce({});

        render(
        <Router>
            <List />
        </Router>
        );

        await waitFor(() => {
        expect(screen.getByText('List Of Category')).toBeDefined();
        expect(screen.getByText('Category 1')).toBeDefined();
        expect(screen.getByText('Category 2')).toBeDefined();
        });

        fireEvent.click(screen.getByText('Hapus'));

        await waitFor(() => {
        expect(axios.delete).toHaveBeenCalledWith(
            'https://mock-api.arikmpt.com/api/category/1',
            {
            headers: {
                Authorization: 'Bearer null',
            },
            }
        );
        });

        await waitFor(() => {
        expect(screen.queryByText('Category 1')).not.toBeDefined();
        });
    });
});

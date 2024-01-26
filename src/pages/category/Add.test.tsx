import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Add from './Add';

jest.mock('axios');

describe('Add Component', () => {
    test('renders Add Component', () => {
        render(
        <Router>
            <Add />
        </Router>
    );

    expect(screen.getByText('Add New Category')).toBeDefined();
    expect(screen.getByText('Kembali')).toBeDefined();
    expect(screen.getByLabelText('Name')).toBeDefined();
    expect(screen.getByLabelText('Status')).toBeDefined();
    expect(screen.getByText('Submit')).toBeDefined();
    });
});

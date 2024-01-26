import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Register from "./Register";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('Unit test Login component' , () => {
    test("Register should be render correctly", () => {
        render(
            <Router>
                <Register />
            </Router>
        );
        
        expect(screen.getByText('Please Register To Our Platform')).toBeDefined();
        expect(screen.getByPlaceholderText('name')).toBeDefined();
        expect(screen.getByPlaceholderText('email')).toBeDefined();
        expect(screen.getByPlaceholderText('password')).toBeDefined();
        expect(screen.getByText('Register')).toBeDefined();
        expect(screen.getByText('Or')).toBeDefined();
        expect(screen.getByText('Login Here')).toBeDefined();
        });
        
    
    test('handles successful registration', async () => {
        (axios.post as jest.Mock).mockResolvedValueOnce({});
        render(
                <Router>
                    <Register />
                </Router>
            );
        
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByText('Register'));
        
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'https://mock-api.arikmpt.com/api/user/register',
                    {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                    }
                );
            });
        
            jest.clearAllMocks();
    });
        
    test('handles error during registration', async () => {
        const errorMessage = 'Error message';
        (axios.post as jest.Mock).mockRejectedValueOnce({
            response: {
            data: {
                errors: errorMessage,
                },
            },
        });
        
        render(
            <Router>
                <Register />
            </Router>
        );
        
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByText('Register'));
        
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
        });
        
        expect(screen.getByText(errorMessage)).toBeDefined();
        
        jest.clearAllMocks();
    });
});

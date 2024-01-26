import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe('Unit test Login component' , () => {
    test("Login should be render correctly", () => {
        render(
            <Router>
                <Login />
            </Router>
        );
        
        expect(screen.getByText('Please Login To Continue')).toBeDefined();
        expect(screen.getByPlaceholderText('email')).toBeDefined();
        expect(screen.getByPlaceholderText('password')).toBeDefined();
        expect(screen.getByText('Login')).toBeDefined();
        expect(screen.getByText('Or')).toBeDefined();
        expect(screen.getByText('Register')).toBeDefined();
        });
        
    
    test("Login should validates email and password fields", async () => {
        render(
            <Router>
                <Login />
            </Router>
            );
        
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: "test@example.com" },
            });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: "password" },
        });
        fireEvent.click(screen.getByText('Login'));
        
        await waitFor(() => {
            expect(screen.queryByText('email is a required field')).toBeNull();
            expect(screen.queryByText('password is a required field')).toBeNull();
        });
        
        expect(axios.post).toHaveBeenCalledWith(
            "https://mock-api.arikmpt.com/api/user/login",
                {
                    email: "test@example.com",
                    password: "password",
                }
            );
        });
        
        test('navigates to register page on Register button click', () => {
            render(<Login />);
                const mockNavigate = jest.fn();
                jest.mock('react-router-dom', () => ({
                    ...jest.requireActual('react-router-dom'),
                    useNavigate: () => mockNavigate,
                }));
            
            fireEvent.click(screen.getByText('Register'));
            
            expect(mockNavigate).toHaveBeenCalledWith('/register');
        });
})

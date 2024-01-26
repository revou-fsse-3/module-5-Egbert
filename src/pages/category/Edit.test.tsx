import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Edit from "./Edit";

describe('Unit test Register Component', () => {
    test('Add should be render correctly', () => {
        render(
            <Router>
                <Edit />
            </Router>
        );
        
        expect(screen.getByText('Edit Category')).toBeDefined();
        expect(screen.getByText('Kembali')).toBeDefined();
        expect(screen.getByLabelText('Name')).toBeDefined();
        expect(screen.getByLabelText('Status')).toBeDefined();
        expect(screen.getByText('Submit')).toBeDefined();
    });
})
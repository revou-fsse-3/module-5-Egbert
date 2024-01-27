import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from './Provider';

describe('Provider', () => {
    it('should render children', () => {
        const { getByTestId } = render(
        <Provider>
            <div data-testid="children">Children</div>
        </Provider>
        );

        expect(getByTestId('children')).toBeDefined();
    });

    it('should initialize open to false', () => {
        const { queryByTestId } = render(<Provider />);

        expect(queryByTestId('open')).toBeNull();
    });

    it('should initialize message to empty string', () => {
        const { queryByTestId } = render(<Provider />);

        expect(queryByTestId('message')).toHaveTextContent('');
    });

    it('should update open state when setOpen is called', () => {
        const { getByTestId } = render(<Provider />);

        const button = getByTestId('toggle-open-button');
        fireEvent.click(button);

        const openElement = getByTestId('open');
        expect(openElement).toBeDefined();
        expect(openElement).toHaveTextContent('true');
    });

    it('should update message state when setMessage is called', () => {
        const { getByTestId } = render(<Provider />);

        const button = getByTestId('set-message-button');
        fireEvent.click(button);

        const messageElement = getByTestId('message');
        expect(messageElement).toBeDefined();
        expect(messageElement).toHaveTextContent('Hello World');
    });
});
import { render, screen } from '@testing-library/react';
import Header from './Header'; 



describe('Header Component', () => {
    it('renders without crashing', () => {
        render(<Header />);
        const logoElement = screen.getByRole('img');
        expect(logoElement).toBeInTheDocument();
    });
});

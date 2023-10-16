// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import ItemForm from '../app/components/ItemForm/ItemForm';
// import RootLayout from '../app/layout';

// // Mock useRouter:
// const mockPush = jest.fn();
// jest.mock("next/navigation", () => ({
//   useRouter() {
//     return {
//       prefetch: () => null,
//       push: mockPush
//     };
//   }
// }));

// describe('ItemForm', () => {
//     beforeEach(() => {
//       render(
//         <RootLayout>
//           <ItemForm />
//         </RootLayout>
//       );
//     });

//     it('should render without crashing', () => {
//       // Aquí puedes añadir expectaciones relacionadas con el renderizado
//     });
    
//     it("checa boton", () => {
//       const labelElement = screen.getByText(/Select a Photo/i);
//       expect(labelElement).toBeInTheDocument();
//     });

//     // Puedes añadir más tests aquí si lo necesitas, por ejemplo:
//     // it('should do something else', () => { /* tu código */ });
// });

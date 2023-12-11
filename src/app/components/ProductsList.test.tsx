import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import ProductsList from './ProductsList';
import { setupServer } from 'msw/node'
import { http, HttpResponse, delay } from 'msw';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

const TEST_URL = '/wp-json/wc/v3/products';

const mockStore = configureStore([thunk]);

export const handlers = [
  http.get(TEST_URL, async () => {
    await delay(150)
    return HttpResponse.json({
      products: [
        {
          id: 1,
          name: 'Test1',
          price: '10',
          images: [
            {
              id: 1,
              src: 'Test1'
            }
          ]
        },
        {
          id: 2,
          name: 'Test2',
          price: '20',
          images: [
            {
              id: 2,
              src: 'Test2'
            }
          ]
        }
      ]
    })
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders a list of products', async () => {

  const store = mockStore({
    product: {
      products: [
        {
          id: 1,
          name: 'Test1',
          price: '10',
          images: [
            {
              id: 1,
              src: 'Test1'
            }
          ]
        },
        {
          id: 2,
          name: 'Test2',
          price: '20',
          images: [
            {
              id: 2,
              src: 'Test2'
            }
          ]
        }
      ],
      loading: false,
      error: null,
    }, 
  });

  render(
    <Provider store={store}>
      <ProductsList />
    </Provider>
  );


  // Check the cards are rendered
  await waitFor(() => {
    expect(screen.getByText('Test1')).toBeInTheDocument();
    expect(screen.getByText('Test2')).toBeInTheDocument();
  });
  
});

test('renders a loading indicator', async () => {
  
    const store = mockStore({
      product: {
        products: [],
        loading: true,
        error: null,
      }, 
    });
  
    render(
      <Provider store={store}>
        <ProductsList />
      </Provider>
    );
  
    // Check the loading indicator is rendered
    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
    
  });
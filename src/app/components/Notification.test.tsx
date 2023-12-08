import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Notification from './Notification';
import ProductListBuy from './ProductListBuy';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

test('Renders a notification, after click on the button', async () => {
  const initialState = {
    notification: {
      visible: false,
      type: 'success',
      message: '',
    },
  };

  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <ProductListBuy 
        id={1}
        name="Test1"
        price="10"
        images={[
          {
            id: 1,
            src: "Test1"
          },
        ]}
      />
      <Notification />
    </Provider>
  );

  fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

  const actions = store.getActions();

  expect(actions).toEqual(expect.arrayContaining([
    expect.objectContaining({ type: 'addToCart/addToCart' }),
    expect.objectContaining({ type: 'notification/setNotification' }),
  ]));


  // Then render Notification with the expected state
  const notificationStore = mockStore({
    notification: {
      visible: true,
      type: 'success',
      message: 'Product added to cart',
    },
  });

  render(
    <Provider store={notificationStore}>
      <Notification />
    </Provider>
  );

  // Check if the Notification is visible
  await waitFor(() => {
    expect(screen.getByTestId('alert__popup')).toBeInTheDocument();
  });


  //screen.debug();
});
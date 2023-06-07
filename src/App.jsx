import { Provider } from 'react-redux';
import { store } from './Redux/Store/Store';
import PhoneApp from './pages/PhoneApp';

export const App = () => {
  return (
    <Provider store={store}>
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101',
          }}
        >
          <PhoneApp />
        </div>
    </Provider>
  );
};
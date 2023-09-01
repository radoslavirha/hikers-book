import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import TripList from './components/TripList';
import TripCreate from './components/TripCreate';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql'
  }),
  cache: new InMemoryCache()
});

const router = createBrowserRouter([
  {
    path: '/',
    Component: TripList
  },
  {
    path: '/trips/new',
    Component: TripCreate
  }
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
}

export default App;

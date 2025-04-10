import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './components/Layout';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import UserForm from './pages/UserForm';
import About from './pages/About';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<UserList />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="users/new" element={<UserForm />} />
            <Route path="users/edit/:id" element={<UserForm />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

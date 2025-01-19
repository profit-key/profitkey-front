import { HomePage } from '@/pages/home';
import { BrowserRouter, Route, Routes } from 'react-router';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

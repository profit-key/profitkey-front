import { AuthPage } from '@/pages/auth';
import { HelpPage } from '@/pages/help';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { StockListPage } from '@/pages/stock-list';
import { StockDetailPage } from '@/pages/stock-detail';
import { Layout } from '@/shared/ui';
import { BrowserRouter, Route, Routes } from 'react-router';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/stocks" element={<StockListPage />} />
          <Route path="/stocks/:stockCode" element={<StockDetailPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

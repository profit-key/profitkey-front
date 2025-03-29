import { AuthPage } from '@/pages/auth';
import { HelpPage } from '@/pages/help';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { StockDetailPage } from '@/pages/stock-detail';
import { Layout } from '@/shared/ui';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AnnouncementDetailPage } from '@/pages/announcement-detail';
import { NewsPage } from '@/pages/news';
import { Mypage } from '@/pages/my';
import { FavoriteStocksPage } from '@/pages/favorite-stocks';
import { MyCommentPage } from '@/pages/my-comment';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/stocks/:stockCode" element={<StockDetailPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route
            path="/announcements/:announcementId"
            element={<AnnouncementDetailPage />}
          />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/profile/stocks" element={<FavoriteStocksPage />} />
          <Route path="/profile/comments" element={<MyCommentPage />} />
          <Route path="/profile/my" element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

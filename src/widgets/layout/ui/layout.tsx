import { ScrollToTop } from '@/shared/lib/scroll-to-top';
import { Outlet } from 'react-router';
import { Header } from './header';

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

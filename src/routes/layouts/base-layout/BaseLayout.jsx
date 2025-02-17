import GlobalFooter from 'components/global-footer/GlobalFooter';
import GlobalNavbar from 'components/global-navbar/GlobalNavbar';
import { Outlet } from 'react-router-dom';
import ScrollToTop from 'components/scroll-to-top/ScrollToTop';

const BaseLayout = () => {
  return (
    <>
      <GlobalNavbar />
      <ScrollToTop />
      <Outlet />
      <GlobalFooter />
    </>
  );
};

export default BaseLayout;

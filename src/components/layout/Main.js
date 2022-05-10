import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Drawer, Affix } from 'antd';
import Sidenav from './Sidenav';
import Header from './Header';
import Footer from './Footer';
import { handle } from '../../helpers/handle';
import { authService } from '../../services/auth.service';
import { userService } from '../../services/user.service';
const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const currentUser = authService.getCurrentUser();
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState('right');
  const [sidenavColor, setSidenavColor] = useState('#1890ff');
  const [sidenavType, setSidenavType] = useState('transparent');
  const [fixed, setFixed] = useState(false);
  const [invites, setInvites] = useState([]);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = type => setSidenavType(type);
  const handleSidenavColor = color => setSidenavColor(color);
  const handleFixedNavbar = type => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');
  //chang pathname to match with the pathname of the route
  const listPath = handle.handlePathName(pathname);

  var subPathName = listPath.subPathName;
  pathname = listPath.pathName;


  useEffect(async () => {
    await userService
      .getClassroomInvite(currentUser.email)
      .then((res) => {
        setInvites(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (pathname === 'rtl') {
      setPlacement('left');
    } else {
      setPlacement('right');
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${pathname === 'profile' ? 'layout-profile' : ''} ${pathname === 'rtl' ? 'layout-dashboard-rtl' : ''}`}>
      <Drawer
        title={false}
        placement={placement === 'right' ? 'left' : 'right'}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === 'right' ? 'left' : 'right'}
        width={200}
        className={`drawer-sidebar ${pathname === 'rtl' ? 'drawer-sidebar-rtl' : ''} `}>
        <Layout className={`layout-dashboard ${pathname === 'rtl' ? 'layout-dashboard-rtl' : ''}`}>
          <Sider
            trigger={null}
            width={200}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${sidenavType === '#fff' ? 'active-route' : ''}`}
            style={{ background: sidenavType }}>
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={200}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${sidenavType === '#fff' ? 'active-route' : ''}`}
        style={{ background: sidenavType }}>
        <Sidenav color={sidenavColor} />
      </Sider>
      <Layout style={{ marginLeft: '220px' }}>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={subPathName}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
                currentUser={currentUser}
                breakcrumbUrl={listPath.url}
                invites={invites}
                setInvites={setInvites}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={subPathName}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
              currentUser={currentUser}
              breakcrumbUrl={listPath.url}
              invites={invites}
              setInvites={setInvites}
            />
          </AntHeader>
        )}
        <Content className="content-ant">{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;


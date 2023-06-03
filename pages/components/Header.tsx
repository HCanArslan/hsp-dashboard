import { Layout } from 'antd';

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header className="site-layout-background" style={{ paddingLeft: 10, display: 'flex', alignItems: 'center' }}>
      <img src="https://media.licdn.com/dms/image/C4D0BAQErwlm-HTYegQ/company-logo_200_200/0/1646899695126?e=1694044800&v=beta&t=7E_U_Hio1R6-0HlLaepX65oau5Ku4ScrzQNbfI922_k" alt="logo" style={{ height: '40px', marginRight: '10px' }} /> {/* Logo */}
      <div style={{ color: 'white' }}>HYBRID SALES PLATFORM</div>
    </Header>
  );
};

export default HeaderComponent;

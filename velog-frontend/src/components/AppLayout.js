import { Card, Layout, Row } from 'antd';
import 'antd/dist/antd.css';
import { Global } from '../style';
import AppHeader from './AppHeader';

const { Content } = Layout;
const { Meta } = Card;

const AppLayout = (props) => {
  const { isHome } = props;

  return (
    <Layout>
      <Global />
      <AppHeader isHome={isHome} />

      <Content>
        <Row>{props.children}</Row>
      </Content>
    </Layout>
  );
};

export default AppLayout;

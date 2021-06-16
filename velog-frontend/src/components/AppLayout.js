import { Global } from '../style';
import { Row, Col, Layout, Card } from 'antd';
import 'antd/dist/antd.css';
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
        <Row>
          <Col flex="1 1 20rem">
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col flex="1 1 20rem">
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
          <Col flex="1 1 20rem">
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AppLayout;

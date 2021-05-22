import { Content } from "antd/lib/layout/layout";
import { Global } from "../style";
import { Row, Col, Layout, Card } from "antd";
import "antd/dist/antd.css";
import HomeHeader from "./HomeHeader";

const style = { background: "#0092ff", padding: "8px 0" };

const { Meta } = Card;

const AppLayout = () => {
  return (
    <Layout>
      <Global />
      <HomeHeader />

      <Content>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap={true}>
          <Col className="gutter-row" span={8}>
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
          <Col className="gutter-row" span={8}>
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
          <Col className="gutter-row" span={8}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AppLayout;

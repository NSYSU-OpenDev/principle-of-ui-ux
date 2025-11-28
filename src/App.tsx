import { useState } from 'react';
import { Layout, Menu, Typography, theme, ConfigProvider } from 'antd';
import {
  GroupOutlined,
  AlignLeftOutlined,
  HighlightOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import ProximityPrinciple from './components/principles/ProximityPrinciple';
import AlignmentPrinciple from './components/principles/AlignmentPrinciple';
import ContrastPrinciple from './components/principles/ContrastPrinciple';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    key: 'proximity',
    icon: <GroupOutlined />,
    label: '關聯性原則',
  },
  {
    key: 'alignment',
    icon: <AlignLeftOutlined />,
    label: '對齊原則',
  },
  {
    key: 'contrast',
    icon: <HighlightOutlined />,
    label: '對比原則',
  },
  {
    key: 'coming-soon',
    icon: <ExperimentOutlined />,
    label: '更多原則（即將推出）',
    disabled: true,
  },
];

function App() {
  const [selectedKey, setSelectedKey] = useState('proximity');
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedKey) {
      case 'proximity':
        return <ProximityPrinciple />;
      case 'alignment':
        return <AlignmentPrinciple />;
      case 'contrast':
        return <ContrastPrinciple />;
      default:
        return <ProximityPrinciple />;
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Title
              level={4}
              style={{
                color: 'white',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {collapsed ? 'UI' : 'UI/UX 原則'}
            </Title>
          </div>
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={({ key }) => setSelectedKey(key)}
          />
        </Sider>
        <Layout
          style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}
        >
          <Header
            style={{
              padding: '0 24px',
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <Title level={3} style={{ margin: 0 }}>
              設計原則互動展示
            </Title>
          </Header>
          <Content
            style={{
              margin: '24px',
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'auto',
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;

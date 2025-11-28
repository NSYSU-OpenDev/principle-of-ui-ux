import { useState } from 'react';
import {
  Card,
  Typography,
  Tabs,
  Divider,
  Space,
  Button,
  List,
  Avatar,
  Collapse,
  Modal,
  Drawer,
  Progress,
  Spin,
  ConfigProvider,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlayCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  RightOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// 範例一：列表展開動畫
function ListExpandDemo() {
  const [showTransition, setShowTransition] = useState(true);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const items = [
    {
      key: '1',
      label: '專案設定',
      icon: <SettingOutlined />,
      children: '這裡是專案設定的詳細內容，包含名稱、描述、權限等設定選項。',
    },
    {
      key: '2',
      label: '成員管理',
      icon: <UserOutlined />,
      children: '管理專案成員，可以新增、移除成員，或調整成員權限。',
    },
    {
      key: '3',
      label: '文件管理',
      icon: <FileTextOutlined />,
      children: '管理專案相關文件，支援上傳、下載、預覽等功能。',
    },
  ];

  return (
    <Card title='列表展開動畫' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        展開/收合列表時，過渡動畫能讓使用者清楚看到內容從哪裡出現或消失。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showTransition ? 'primary' : 'default'}
          onClick={() => setShowTransition(true)}
          icon={<CheckCircleOutlined />}
        >
          有過渡動畫（正確）
        </Button>
        <Button
          type={!showTransition ? 'primary' : 'default'}
          onClick={() => setShowTransition(false)}
          icon={<CloseCircleOutlined />}
        >
          無過渡動畫
        </Button>
      </Space>

      <Card
        size='small'
        style={{
          backgroundColor: showTransition ? '#f6ffed' : '#fff2f0',
          borderColor: showTransition ? '#b7eb8f' : '#ffccc7',
        }}
      >
        {showTransition ? (
          <Collapse
            activeKey={expandedKeys}
            onChange={(keys) => setExpandedKeys(keys as string[])}
            items={items.map((item) => ({
              key: item.key,
              label: (
                <Space>
                  {item.icon}
                  {item.label}
                </Space>
              ),
              children: <Text>{item.children}</Text>,
            }))}
          />
        ) : (
          <div>
            {items.map((item) => {
              const isExpanded = expandedKeys.includes(item.key);
              return (
                <div
                  key={item.key}
                  style={{
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <div
                    onClick={() => {
                      setExpandedKeys(
                        isExpanded
                          ? expandedKeys.filter((k) => k !== item.key)
                          : [...expandedKeys, item.key],
                      );
                    }}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Space>
                      {item.icon}
                      {item.label}
                    </Space>
                    <RightOutlined
                      style={{
                        transform: isExpanded ? 'rotate(90deg)' : 'none',
                      }}
                    />
                  </div>
                  {isExpanded && (
                    <div style={{ padding: '0 16px 12px 40px' }}>
                      <Text>{item.children}</Text>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </Card>
  );
}

// 範例二：Modal/Drawer 出現動畫
function ModalTransitionDemo() {
  const [showTransition, setShowTransition] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Card title='彈窗出現動畫' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text> Modal 和 Drawer
        的出現/消失動畫能讓使用者感知到介面層級的變化。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showTransition ? 'primary' : 'default'}
          onClick={() => setShowTransition(true)}
          icon={<CheckCircleOutlined />}
        >
          有過渡動畫（正確）
        </Button>
        <Button
          type={!showTransition ? 'primary' : 'default'}
          onClick={() => setShowTransition(false)}
          icon={<CloseCircleOutlined />}
        >
          無過渡動畫
        </Button>
      </Space>

      <Card
        size='small'
        style={{
          backgroundColor: showTransition ? '#f6ffed' : '#fff2f0',
          borderColor: showTransition ? '#b7eb8f' : '#ffccc7',
        }}
      >
        <Space>
          <Button type='primary' onClick={() => setModalOpen(true)}>
            開啟 Modal
          </Button>
          <Button onClick={() => setDrawerOpen(true)}>開啟 Drawer</Button>
        </Space>

        <ConfigProvider
          theme={!showTransition ? { token: { motion: false } } : undefined}
        >
          <Modal
            title='Modal 標題'
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            onOk={() => setModalOpen(false)}
          >
            <p>這是 Modal 的內容區域。</p>
            <p>觀察開啟和關閉時的動畫效果差異。</p>
          </Modal>

          <Drawer
            title='Drawer 標題'
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <p>這是 Drawer 的內容區域。</p>
            <p>觀察開啟和關閉時的滑入滑出動畫效果差異。</p>
          </Drawer>
        </ConfigProvider>
      </Card>
    </Card>
  );
}

// 範例三：載入狀態動畫
function LoadingTransitionDemo() {
  const [showTransition, setShowTransition] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleLoad = () => {
    setLoading(true);
    setProgress(0);

    if (showTransition) {
      // 有動畫：漸進式載入
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else {
      // 無動畫：直接完成
      setTimeout(() => {
        setProgress(100);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Card title='載入狀態動畫' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        載入過程中的動畫能讓使用者知道系統正在處理，減少等待焦慮。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showTransition ? 'primary' : 'default'}
          onClick={() => setShowTransition(true)}
          icon={<CheckCircleOutlined />}
        >
          有載入動畫（正確）
        </Button>
        <Button
          type={!showTransition ? 'primary' : 'default'}
          onClick={() => setShowTransition(false)}
          icon={<CloseCircleOutlined />}
        >
          無載入動畫
        </Button>
      </Space>

      <Card
        size='small'
        style={{
          backgroundColor: showTransition ? '#f6ffed' : '#fff2f0',
          borderColor: showTransition ? '#b7eb8f' : '#ffccc7',
        }}
      >
        <div style={{ textAlign: 'center', padding: 20 }}>
          <Button
            type='primary'
            onClick={handleLoad}
            disabled={loading}
            style={{ marginBottom: 24 }}
          >
            {loading ? '載入中...' : '開始載入資料'}
          </Button>

          <div style={{ maxWidth: 400, margin: '0 auto' }}>
            {showTransition ? (
              loading ? (
                <div>
                  <Progress percent={progress} status='active' />
                  <div style={{ marginTop: 16 }}>
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      }
                    />
                    <Text style={{ marginLeft: 12 }}>正在載入資料...</Text>
                  </div>
                </div>
              ) : progress === 100 ? (
                <div
                  style={{
                    padding: 20,
                    backgroundColor: '#f6ffed',
                    borderRadius: 8,
                  }}
                >
                  <CheckCircleOutlined
                    style={{ fontSize: 32, color: '#52c41a' }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text strong>載入完成！</Text>
                  </div>
                </div>
              ) : (
                <Text type='secondary'>點擊按鈕開始載入</Text>
              )
            ) : loading ? (
              <Text type='secondary'>處理中，請稍候...</Text>
            ) : progress === 100 ? (
              <Text>完成</Text>
            ) : (
              <Text type='secondary'>點擊按鈕開始載入</Text>
            )}
          </div>
        </div>
      </Card>
    </Card>
  );
}

// 範例四：列表項目動畫
function ListItemTransitionDemo() {
  const [showTransition, setShowTransition] = useState(true);
  const [items, setItems] = useState([
    { id: 1, name: '王小明', email: 'wang@example.com' },
    { id: 2, name: '李小華', email: 'li@example.com' },
    { id: 3, name: '張小美', email: 'zhang@example.com' },
  ]);
  const [nextId, setNextId] = useState(4);

  const addItem = () => {
    const newItem = {
      id: nextId,
      name: `新成員 ${nextId}`,
      email: `member${nextId}@example.com`,
    };
    setItems([newItem, ...items]);
    setNextId(nextId + 1);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Card title='列表項目動畫' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        新增或刪除列表項目時，動畫能讓使用者清楚追蹤變化。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showTransition ? 'primary' : 'default'}
          onClick={() => setShowTransition(true)}
          icon={<CheckCircleOutlined />}
        >
          有過渡動畫（正確）
        </Button>
        <Button
          type={!showTransition ? 'primary' : 'default'}
          onClick={() => setShowTransition(false)}
          icon={<CloseCircleOutlined />}
        >
          無過渡動畫
        </Button>
      </Space>

      <Card
        size='small'
        style={{
          backgroundColor: showTransition ? '#f6ffed' : '#fff2f0',
          borderColor: showTransition ? '#b7eb8f' : '#ffccc7',
        }}
      >
        <Button type='primary' onClick={addItem} style={{ marginBottom: 16 }}>
          新增成員
        </Button>

        <List
          itemLayout='horizontal'
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              style={{
                transition: showTransition ? 'all 0.3s ease' : 'none',
              }}
              actions={[
                <Button type='link' danger onClick={() => removeItem(item.id)}>
                  刪除
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={item.name}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </Card>
    </Card>
  );
}

// 主元件
export default function TransitionPrinciple() {
  const items = [
    {
      key: '1',
      label: '列表展開',
      children: <ListExpandDemo />,
    },
    {
      key: '2',
      label: '彈窗動畫',
      children: <ModalTransitionDemo />,
    },
    {
      key: '3',
      label: '載入狀態',
      children: <LoadingTransitionDemo />,
    },
    {
      key: '4',
      label: '列表項目',
      children: <ListItemTransitionDemo />,
    },
  ];

  return (
    <div>
      <Title level={2}>過渡動畫原則 (Transition)</Title>
      <Divider />

      <Card style={{ marginBottom: 24, backgroundColor: '#fff7e6' }}>
        <Title level={4}>
          <PlayCircleOutlined style={{ marginRight: 8 }} />
          原則說明
        </Title>
        <Paragraph>
          <Text strong>過渡動畫原則</Text>
          強調我們的大腦天生會對動態事物做出反應。過渡效果目的是提供引人入勝介面並加強溝通。
        </Paragraph>
        <Paragraph>
          <Text strong>設計應用：</Text>
        </Paragraph>
        <ul>
          <li>
            <Text>展開/收合內容時使用平滑過渡動畫</Text>
          </li>
          <li>
            <Text>Modal、Drawer 等彈窗使用淡入淡出或滑動動畫</Text>
          </li>
          <li>
            <Text>載入過程使用進度條或載入動畫</Text>
          </li>
          <li>
            <Text>列表項目新增/刪除時使用動畫追蹤變化</Text>
          </li>
        </ul>
      </Card>

      <Tabs items={items} type='card' />
    </div>
  );
}

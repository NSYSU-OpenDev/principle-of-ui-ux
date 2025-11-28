import { useState } from 'react';
import {
  Card,
  Typography,
  Tabs,
  Divider,
  Space,
  Button,
  Slider,
  Row,
  Col,
  Progress,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  AimOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// 範例一：標籤頁對比
function TabContrastDemo() {
  const [hasContrast, setHasContrast] = useState(true);

  const tabs = ['全部', '進行中', '已完成'];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card title='標籤頁對比示範' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        選中的標籤應該與未選中的標籤有明顯的視覺差異，讓使用者清楚知道目前所在位置。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={hasContrast ? 'primary' : 'default'}
          onClick={() => setHasContrast(true)}
          icon={<CheckCircleOutlined />}
        >
          有對比（正確）
        </Button>
        <Button
          type={!hasContrast ? 'primary' : 'default'}
          onClick={() => setHasContrast(false)}
          icon={<CloseCircleOutlined />}
        >
          無對比（錯誤）
        </Button>
      </Space>

      <Row gutter={48}>
        <Col span={12}>
          <Card
            size='small'
            title={hasContrast ? '正確：明顯對比' : '錯誤：缺乏對比'}
            style={{
              backgroundColor: hasContrast ? '#f6ffed' : '#fff2f0',
              borderColor: hasContrast ? '#b7eb8f' : '#ffccc7',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 16,
                borderBottom: '1px solid #e8e8e8',
                paddingBottom: 8,
              }}
            >
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  onClick={() => setActiveTab(index)}
                  style={{
                    padding: '8px 16px',
                    cursor: 'pointer',
                    borderRadius: 4,
                    backgroundColor: hasContrast
                      ? activeTab === index
                        ? '#1677ff'
                        : '#fff'
                      : activeTab === index
                        ? '#e6f4ff'
                        : '#f5f5f5',
                    color: hasContrast
                      ? activeTab === index
                        ? '#fff'
                        : '#666'
                      : activeTab === index
                        ? '#1677ff'
                        : '#888',
                    fontWeight: activeTab === index ? 600 : 400,
                    border: hasContrast
                      ? activeTab === index
                        ? '1px solid #1677ff'
                        : '1px solid #d9d9d9'
                      : '1px solid #e8e8e8',
                    transition: 'all 0.2s',
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>

            <div
              style={{
                padding: 16,
                backgroundColor: '#fafafa',
                borderRadius: 4,
                minHeight: 80,
              }}
            >
              <Text type='secondary'>
                目前顯示：{tabs[activeTab]} 的內容區域
              </Text>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card size='small' title='對比說明'>
            <Paragraph>
              <Text type={hasContrast ? 'success' : 'danger'}>
                {hasContrast
                  ? '選中的標籤使用深色背景和白色文字，與未選中的標籤形成強烈對比，使用者可以立即識別當前位置。'
                  : '所有標籤看起來太相似，使用者需要仔細觀察才能分辨哪個是選中狀態。'}
              </Text>
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

// 範例二：列表項目對比
function ListContrastDemo() {
  const [hasContrast, setHasContrast] = useState(true);

  const listItems = [
    { title: '設計系統建置', progress: 75 },
    { title: '用戶研究報告', progress: 45 },
    { title: '原型設計', progress: 90 },
    { title: '可用性測試', progress: 30 },
  ];

  return (
    <Card title='列表層次對比' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        列表中的主要資訊（標題）和次要資訊（進度）應該有明確的視覺層次，幫助使用者快速找到重點。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={hasContrast ? 'primary' : 'default'}
          onClick={() => setHasContrast(true)}
          icon={<CheckCircleOutlined />}
        >
          有層次對比（正確）
        </Button>
        <Button
          type={!hasContrast ? 'primary' : 'default'}
          onClick={() => setHasContrast(false)}
          icon={<CloseCircleOutlined />}
        >
          無層次對比（錯誤）
        </Button>
      </Space>

      <Row gutter={48}>
        <Col span={12}>
          <Card
            size='small'
            title={hasContrast ? '正確：清晰層次' : '錯誤：層次模糊'}
            style={{
              backgroundColor: hasContrast ? '#f6ffed' : '#fff2f0',
              borderColor: hasContrast ? '#b7eb8f' : '#ffccc7',
            }}
          >
            {listItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom:
                    index < listItems.length - 1 ? '1px solid #f0f0f0' : 'none',
                }}
              >
                <Text
                  style={{
                    fontSize: hasContrast ? 16 : 14,
                    fontWeight: hasContrast ? 600 : 400,
                    color: hasContrast ? '#262626' : '#666',
                  }}
                >
                  {item.title}
                </Text>
                <div style={{ width: 120 }}>
                  <Progress
                    percent={item.progress}
                    size='small'
                    strokeColor={hasContrast ? undefined : '#d9d9d9'}
                    railColor={hasContrast ? undefined : '#f0f0f0'}
                    format={(percent) => (
                      <span
                        style={{
                          fontSize: hasContrast ? 14 : 14,
                          color: hasContrast ? '#1677ff' : '#999',
                        }}
                      >
                        {percent}%
                      </span>
                    )}
                  />
                </div>
              </div>
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Card size='small' title='對比說明'>
            <Paragraph>
              <Text type={hasContrast ? 'success' : 'danger'}>
                {hasContrast
                  ? '標題使用較大字體和深色，進度條使用品牌色，層次分明，資訊一目了然。'
                  : '所有元素使用相近的顏色和大小，缺乏層次感，使用者難以快速抓取重點。'}
              </Text>
            </Paragraph>
            <Paragraph>
              <Text strong>
                對比是能在不同元素之間創造層次結構，幫助使用者快速找到資訊。
              </Text>
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

// 範例三：字體大小對比
function FontSizeContrastDemo() {
  const [contrastLevel, setContrastLevel] = useState(2);

  const fontSizes = [
    { title: 14, subtitle: 13, body: 12 }, // 低對比
    { title: 18, subtitle: 14, body: 12 }, // 中對比
    { title: 24, subtitle: 14, body: 12 }, // 高對比
  ];

  const current = fontSizes[contrastLevel];

  return (
    <Card title='字體大小對比' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        透過字體大小的差異來建立資訊層次。標題、副標題、內文應該有明顯的大小區別。
      </Paragraph>

      <div style={{ marginBottom: 16 }}>
        <Text>對比強度：</Text>
        <Slider
          min={0}
          max={2}
          value={contrastLevel}
          onChange={setContrastLevel}
          marks={{
            0: '低',
            1: '中',
            2: '高',
          }}
          style={{ maxWidth: 300 }}
        />
      </div>

      <Row gutter={48}>
        <Col span={12}>
          <Card
            size='small'
            title={`對比強度：${['低', '中', '高'][contrastLevel]}`}
            style={{
              backgroundColor:
                contrastLevel === 2
                  ? '#f6ffed'
                  : contrastLevel === 1
                    ? '#fffbe6'
                    : '#fff2f0',
              borderColor:
                contrastLevel === 2
                  ? '#b7eb8f'
                  : contrastLevel === 1
                    ? '#ffe58f'
                    : '#ffccc7',
            }}
          >
            <div style={{ padding: 16 }}>
              <div
                style={{
                  fontSize: current.title,
                  fontWeight: 600,
                  marginBottom: 8,
                  color: '#262626',
                }}
              >
                這是標題文字
              </div>
              <div
                style={{
                  fontSize: current.subtitle,
                  color: '#595959',
                  marginBottom: 12,
                }}
              >
                這是副標題或摘要文字
              </div>
              <div
                style={{
                  fontSize: current.body,
                  color: '#8c8c8c',
                  lineHeight: 1.6,
                }}
              >
                這是內文，包含更多詳細的描述內容。良好的字體層次可以幫助使用者快速掃描和理解頁面結構。
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card size='small' title='字體大小參考'>
            <div style={{ fontFamily: 'monospace' }}>
              <div style={{ marginBottom: 8 }}>
                <Text>標題：</Text>
                <Text strong>{current.title}px</Text>
              </div>
              <div style={{ marginBottom: 8 }}>
                <Text>副標題：</Text>
                <Text strong>{current.subtitle}px</Text>
              </div>
              <div style={{ marginBottom: 8 }}>
                <Text>內文：</Text>
                <Text strong>{current.body}px</Text>
              </div>
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <Text type='secondary'>
              建議標題與內文至少相差 1.5 倍以上，才能產生足夠的視覺層次。
            </Text>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

// 範例四：顏色對比
function ColorContrastDemo() {
  const [hasContrast, setHasContrast] = useState(true);

  const items = [
    { label: '待處理', count: 12, color: hasContrast ? '#faad14' : '#d9d9d9' },
    { label: '進行中', count: 8, color: hasContrast ? '#1677ff' : '#bfbfbf' },
    { label: '已完成', count: 24, color: hasContrast ? '#52c41a' : '#a6a6a6' },
    { label: '已取消', count: 3, color: hasContrast ? '#ff4d4f' : '#8c8c8c' },
  ];

  return (
    <Card title='顏色對比示範' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        使用不同顏色來區分不同狀態或類別，讓使用者能快速識別和區分。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={hasContrast ? 'primary' : 'default'}
          onClick={() => setHasContrast(true)}
          icon={<CheckCircleOutlined />}
        >
          彩色區分（正確）
        </Button>
        <Button
          type={!hasContrast ? 'primary' : 'default'}
          onClick={() => setHasContrast(false)}
          icon={<CloseCircleOutlined />}
        >
          灰階顯示（錯誤）
        </Button>
      </Space>

      <Row gutter={48}>
        <Col span={12}>
          <Card
            size='small'
            title={hasContrast ? '正確：顏色區分' : '錯誤：缺乏顏色對比'}
            style={{
              backgroundColor: hasContrast ? '#f6ffed' : '#fff2f0',
              borderColor: hasContrast ? '#b7eb8f' : '#ffccc7',
            }}
          >
            <Row gutter={[16, 16]}>
              {items.map((item, index) => (
                <Col span={12} key={index}>
                  <div
                    style={{
                      padding: 16,
                      borderRadius: 8,
                      backgroundColor: '#fafafa',
                      border: `2px solid ${item.color}`,
                      borderLeft: `4px solid ${item.color}`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: item.color,
                      }}
                    >
                      {item.count}
                    </div>
                    <div style={{ color: '#666', fontSize: 14 }}>
                      {item.label}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card size='small' title='對比說明'>
            <Paragraph>
              <Text type={hasContrast ? 'success' : 'danger'}>
                {hasContrast
                  ? '不同狀態使用不同顏色，使用者可以在一瞬間識別各類項目的數量和狀態。'
                  : '所有項目使用相似的灰色，失去了顏色傳達資訊的功能，使用者必須閱讀文字才能區分。'}
              </Text>
            </Paragraph>
            <Paragraph>
              <Text strong>顏色語意：</Text>
            </Paragraph>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>
                <Text style={{ color: '#faad14' }}>黃色</Text> - 警告/待處理
              </li>
              <li>
                <Text style={{ color: '#1677ff' }}>藍色</Text> - 進行中/資訊
              </li>
              <li>
                <Text style={{ color: '#52c41a' }}>綠色</Text> - 成功/已完成
              </li>
              <li>
                <Text style={{ color: '#ff4d4f' }}>紅色</Text> - 錯誤/已取消
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

// 主元件
export default function ContrastPrinciple() {
  const items = [
    {
      key: '1',
      label: '標籤對比',
      children: <TabContrastDemo />,
    },
    {
      key: '2',
      label: '列表層次',
      children: <ListContrastDemo />,
    },
    {
      key: '3',
      label: '字體大小',
      children: <FontSizeContrastDemo />,
    },
    {
      key: '4',
      label: '顏色對比',
      children: <ColorContrastDemo />,
    },
  ];

  return (
    <div>
      <Title level={2}>對比原則 (Contrast)</Title>
      <Divider />

      <Card style={{ marginBottom: 24, backgroundColor: '#fff7e6' }}>
        <Title level={4}>
          <AimOutlined style={{ marginRight: 8 }} />
          原則說明
        </Title>
        <Paragraph>
          <Text strong>對比原則</Text>
          是指透過視覺元素的差異（大小、顏色、形狀等）來創造層次結構，幫助使用者快速找到資訊。
        </Paragraph>
        <Paragraph>
          <Text strong>設計應用：</Text>
        </Paragraph>
        <ul>
          <li>
            <Text>選中與未選中的狀態應有明顯的視覺差異</Text>
          </li>
          <li>
            <Text>主要資訊與次要資訊應有不同的視覺權重</Text>
          </li>
          <li>
            <Text>使用顏色來區分不同狀態或類別</Text>
          </li>
          <li>
            <Text>
              對比能在不同元素之間創造層次結構，幫助使用者快速找到資訊
            </Text>
          </li>
        </ul>
      </Card>

      <Tabs items={items} type='card' />
    </div>
  );
}

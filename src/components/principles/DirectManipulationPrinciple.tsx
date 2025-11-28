import { useState } from 'react';
import {
  Card,
  Typography,
  Tabs,
  Divider,
  Space,
  Button,
  Input,
  Upload,
  message,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  AimOutlined,
  InboxOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  HolderOutlined,
} from '@ant-design/icons';
import * as React from 'react';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

// 範例一：行內編輯
function InlineEditDemo() {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('點擊此處進行編輯');
  const [tempValue, setTempValue] = useState(value);
  const [showIntuitive, setShowIntuitive] = useState(true);

  const handleSave = () => {
    setValue(tempValue);
    setIsEditing(false);
    void message.success('儲存成功');
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <Card title='行內編輯示範' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        艾倫·庫柏所說：「有輸出的地方，就應該有輸入。」
        使用者看到文字內容時，應該可以直接在該位置進行編輯，而不需要跳轉到其他頁面。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(true)}
          icon={<CheckCircleOutlined />}
        >
          直觀操作（正確）
        </Button>
        <Button
          type={!showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(false)}
          icon={<CloseCircleOutlined />}
        >
          非直觀操作（錯誤）
        </Button>
      </Space>

      <Card
        size='small'
        title={showIntuitive ? '狀態 2：點擊編輯' : '需要額外步驟'}
        style={{
          backgroundColor: showIntuitive ? '#f6ffed' : '#fff2f0',
          borderColor: showIntuitive ? '#b7eb8f' : '#ffccc7',
          marginBottom: 16,
        }}
      >
        {showIntuitive ? (
          <div style={{ padding: 16 }}>
            {!isEditing ? (
              <div
                onClick={() => {
                  setIsEditing(true);
                  setTempValue(value);
                }}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#fafafa',
                  borderRadius: 6,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px dashed #d9d9d9',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1677ff';
                  e.currentTarget.style.backgroundColor = '#e6f4ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d9d9d9';
                  e.currentTarget.style.backgroundColor = '#fafafa';
                }}
              >
                <Text>{value}</Text>
                <Button type='text' size='small' icon={<EditOutlined />}>
                  點擊編輯
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  autoFocus
                  onPressEnter={handleSave}
                />
                <Button
                  type='primary'
                  icon={<SaveOutlined />}
                  onClick={handleSave}
                >
                  儲存
                </Button>
                <Button icon={<CloseOutlined />} onClick={handleCancel}>
                  取消
                </Button>
              </div>
            )}
            <Text
              type='secondary'
              style={{ fontSize: 12, marginTop: 8, display: 'block' }}
            >
              更新時間：2024-01-15 14:30:00 ~ 2024-01-20 18:00:00
            </Text>
          </div>
        ) : (
          <div style={{ padding: 16 }}>
            <div
              style={{
                padding: '8px 12px',
                backgroundColor: '#fafafa',
                borderRadius: 6,
                marginBottom: 16,
              }}
            >
              <Text>{value}</Text>
            </div>
            <Text
              type='secondary'
              style={{ fontSize: 12, display: 'block', marginBottom: 16 }}
            >
              更新時間：2024-01-15 14:30:00 ~ 2024-01-20 18:00:00
            </Text>
            <Text type='danger'>
              若要編輯，請前往「設定」→「內容管理」→「編輯」頁面
            </Text>
          </div>
        )}
      </Card>

      <Card size='small' title='對比說明'>
        <Paragraph>
          <Text type={showIntuitive ? 'success' : 'danger'}>
            {showIntuitive
              ? '直觀操作：使用者可以直接在看到內容的地方點擊編輯，符合「所見即所得」的原則。'
              : '非直觀操作：使用者需要離開當前頁面，經過多個步驟才能編輯，增加認知負擔。'}
          </Text>
        </Paragraph>
      </Card>
    </Card>
  );
}

// 範例二：拖放上傳
function DragUploadDemo() {
  const [showIntuitive, setShowIntuitive] = useState(true);

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: '#',
    beforeUpload: () => {
      void message.success('檔案已準備上傳');
      return false;
    },
  };

  return (
    <Card title='拖放上傳示範' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        檔案上傳應該支援拖放操作，讓使用者可以直接將檔案拖到上傳區域，而不只是點擊按鈕選擇檔案。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(true)}
          icon={<CheckCircleOutlined />}
        >
          拖放上傳（正確）
        </Button>
        <Button
          type={!showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(false)}
          icon={<CloseCircleOutlined />}
        >
          僅按鈕上傳（受限）
        </Button>
      </Space>

      <Card
        size='small'
        title={showIntuitive ? '支援拖放的上傳區域' : '僅支援點擊上傳'}
        style={{
          backgroundColor: showIntuitive ? '#f6ffed' : '#fffbe6',
          borderColor: showIntuitive ? '#b7eb8f' : '#ffe58f',
        }}
      >
        {showIntuitive ? (
          <Dragger {...uploadProps} style={{ backgroundColor: '#fff' }}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined style={{ fontSize: 48, color: '#1677ff' }} />
            </p>
            <p className='ant-upload-text'>點擊或拖曳檔案到此區域上傳</p>
            <p className='ant-upload-hint'>
              支援單個或批量上傳。支援 jpg、png、pdf 等格式
            </p>
          </Dragger>
        ) : (
          <div style={{ padding: 24, textAlign: 'center' }}>
            <Upload {...uploadProps}>
              <Button type='primary'>選擇檔案</Button>
            </Upload>
            <div style={{ marginTop: 12 }}>
              <Text type='secondary' style={{ fontSize: 12 }}>
                僅支援點擊按鈕選擇檔案
              </Text>
            </div>
          </div>
        )}
      </Card>

      <Card size='small' title='對比說明' style={{ marginTop: 16 }}>
        <Paragraph>
          <Text type={showIntuitive ? 'success' : 'warning'}>
            {showIntuitive
              ? '拖放上傳：使用者可以直接將檔案拖到上傳區域，操作更直觀，效率更高。'
              : '僅按鈕上傳：使用者必須點擊按鈕，再從檔案總管中選擇，步驟較多。'}
          </Text>
        </Paragraph>
      </Card>
    </Card>
  );
}

// 範例三：即時預覽
function LivePreviewDemo() {
  const [showIntuitive, setShowIntuitive] = useState(true);
  const [inputValue, setInputValue] = useState('Hello World');
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState('#1677ff');

  // 非直觀模式的預覽狀態
  const [previewValue, setPreviewValue] = useState('');
  const [previewFontSize, setPreviewFontSize] = useState(24);
  const [previewColor, setPreviewColor] = useState('#1677ff');
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewClick = () => {
    setPreviewValue(inputValue);
    setPreviewFontSize(fontSize);
    setPreviewColor(color);
    setShowPreview(true);
    void message.info('預覽已更新');
  };

  return (
    <Card title='即時預覽示範' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        當使用者調整設定時，應該能即時看到變化結果，而不需要點擊「預覽」按鈕。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showIntuitive ? 'primary' : 'default'}
          onClick={() => {
            setShowIntuitive(true);
            setShowPreview(false);
          }}
          icon={<CheckCircleOutlined />}
        >
          即時預覽（正確）
        </Button>
        <Button
          type={!showIntuitive ? 'primary' : 'default'}
          onClick={() => {
            setShowIntuitive(false);
            setShowPreview(false);
          }}
          icon={<CloseCircleOutlined />}
        >
          需點擊預覽（錯誤）
        </Button>
      </Space>

      <div style={{ display: 'flex', gap: 24 }}>
        <Card size='small' title='設定面板' style={{ flex: 1 }}>
          <Space vertical style={{ width: '100%' }}>
            <div>
              <Text>文字內容：</Text>
              <Input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (!showIntuitive) setShowPreview(false);
                }}
                style={{ marginTop: 8 }}
              />
            </div>
            <div>
              <Text>字體大小：</Text>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {[16, 24, 32, 48].map((size) => (
                  <Button
                    key={size}
                    type={fontSize === size ? 'primary' : 'default'}
                    onClick={() => {
                      setFontSize(size);
                      if (!showIntuitive) setShowPreview(false);
                    }}
                    size='small'
                  >
                    {size}px
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Text>顏色：</Text>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1'].map(
                  (c) => (
                    <div
                      key={c}
                      onClick={() => {
                        setColor(c);
                        if (!showIntuitive) setShowPreview(false);
                      }}
                      style={{
                        width: 32,
                        height: 32,
                        backgroundColor: c,
                        borderRadius: 4,
                        cursor: 'pointer',
                        border:
                          color === c ? '3px solid #000' : '1px solid #d9d9d9',
                      }}
                    />
                  ),
                )}
              </div>
            </div>
          </Space>
        </Card>

        <Card
          size='small'
          title={showIntuitive ? '即時預覽' : '預覽區域'}
          style={{
            flex: 1,
            backgroundColor: showIntuitive ? '#f6ffed' : '#fafafa',
            borderColor: showIntuitive ? '#b7eb8f' : '#d9d9d9',
          }}
        >
          <div
            style={{
              minHeight: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            {showIntuitive ? (
              <span
                style={{
                  fontSize: fontSize,
                  color: color,
                  fontWeight: 600,
                  transition: 'all 0.3s',
                }}
              >
                {inputValue}
              </span>
            ) : showPreview ? (
              <span
                style={{
                  fontSize: previewFontSize,
                  color: previewColor,
                  fontWeight: 600,
                }}
              >
                {previewValue}
              </span>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Text
                  type='secondary'
                  style={{ display: 'block', marginBottom: 16 }}
                >
                  調整設定後，請點擊下方按鈕預覽
                </Text>
                <Button type='primary' onClick={handlePreviewClick}>
                  點擊預覽
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card size='small' title='對比說明' style={{ marginTop: 16 }}>
        <Paragraph>
          <Text type={showIntuitive ? 'success' : 'danger'}>
            {showIntuitive
              ? '即時預覽：使用者調整任何設定時，都能立即看到效果，加快決策速度。'
              : '需點擊預覽：使用者每次調整都需要額外點擊才能看到結果，操作繁瑣。'}
          </Text>
        </Paragraph>
      </Card>
    </Card>
  );
}

// 範例四：直接操作
function DirectManipulationDemo() {
  const [showIntuitive, setShowIntuitive] = useState(true);
  const [items, setItems] = useState([
    { id: 1, name: '項目 A', order: 1 },
    { id: 2, name: '項目 B', order: 2 },
    { id: 3, name: '項目 C', order: 3 },
    { id: 4, name: '項目 D', order: 4 },
  ]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      const newItems = [...items];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      setItems(newItems);
      void message.success('排序已更新');
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [
      newItems[index],
      newItems[index - 1],
    ];
    setItems(newItems);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [
      newItems[index + 1],
      newItems[index],
    ];
    setItems(newItems);
  };

  return (
    <Card title='直接操作示範' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        讓使用者可以直接操作介面元素，例如拖曳排序，而不需要輸入數字或使用複雜的表單。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(true)}
          icon={<CheckCircleOutlined />}
        >
          拖曳排序（直觀）
        </Button>
        <Button
          type={!showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(false)}
          icon={<CloseCircleOutlined />}
        >
          按鈕排序（間接）
        </Button>
      </Space>

      <Card
        size='small'
        title={showIntuitive ? '拖曳進行排序' : '使用按鈕排序'}
        style={{
          backgroundColor: showIntuitive ? '#f6ffed' : '#fffbe6',
          borderColor: showIntuitive ? '#b7eb8f' : '#ffe58f',
        }}
      >
        <Space vertical style={{ width: '100%' }}>
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable={showIntuitive}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                backgroundColor:
                  dragOverIndex === index
                    ? '#e6f4ff'
                    : draggedIndex === index
                      ? '#f0f0f0'
                      : '#fff',
                borderRadius: 6,
                border:
                  dragOverIndex === index
                    ? '2px dashed #1677ff'
                    : '1px solid #e8e8e8',
                cursor: showIntuitive ? 'grab' : 'default',
                opacity: draggedIndex === index ? 0.5 : 1,
                transition: 'all 0.2s',
                transform: dragOverIndex === index ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {showIntuitive && (
                <div
                  style={{
                    marginRight: 12,
                    color: '#999',
                    cursor: 'grab',
                    fontSize: 16,
                  }}
                >
                  <HolderOutlined />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <Text strong>{item.name}</Text>
              </div>
              {!showIntuitive && (
                <Space>
                  <Button
                    size='small'
                    disabled={index === 0}
                    onClick={() => moveUp(index)}
                  >
                    上移
                  </Button>
                  <Button
                    size='small'
                    disabled={index === items.length - 1}
                    onClick={() => moveDown(index)}
                  >
                    下移
                  </Button>
                </Space>
              )}
            </div>
          ))}
        </Space>
        {showIntuitive && (
          <Text
            type='secondary'
            style={{ fontSize: 12, marginTop: 12, display: 'block' }}
          >
            提示：拖曳項目可以重新排序（試著拖動項目到其他位置）
          </Text>
        )}
      </Card>

      <Card size='small' title='對比說明' style={{ marginTop: 16 }}>
        <Paragraph>
          <Text type={showIntuitive ? 'success' : 'warning'}>
            {showIntuitive
              ? '拖曳排序：使用者可以直接拖動項目到目標位置，操作直觀且高效。'
              : '按鈕排序：使用者需要多次點擊按鈕才能達到目標順序，操作繁瑣。'}
          </Text>
        </Paragraph>
      </Card>
    </Card>
  );
}

// 主元件
export default function DirectManipulationPrinciple() {
  const items = [
    {
      key: '1',
      label: '行內編輯',
      children: <InlineEditDemo />,
    },
    {
      key: '2',
      label: '拖放上傳',
      children: <DragUploadDemo />,
    },
    {
      key: '3',
      label: '即時預覽',
      children: <LivePreviewDemo />,
    },
    {
      key: '4',
      label: '直接操作',
      children: <DirectManipulationDemo />,
    },
  ];

  return (
    <div>
      <Title level={2}>直觀操作原則 (Direct Manipulation)</Title>
      <Divider />

      <Card style={{ marginBottom: 24, backgroundColor: '#fff7e6' }}>
        <Title level={4}>
          <AimOutlined style={{ marginRight: 8 }} />
          原則說明
        </Title>
        <Paragraph>
          <Text strong>直觀操作原則</Text>
          強調使用者應該能夠直接操作介面上的物件，而不需要透過間接的命令或表單。
        </Paragraph>
        <Paragraph>
          艾倫·庫柏所說：「有輸出的地方，就應該有輸入。」這就是直觀操作的原則。
        </Paragraph>
        <Paragraph>
          <Text strong>設計應用：</Text>
        </Paragraph>
        <ul>
          <li>
            <Text>支援行內編輯，讓使用者在看到內容的地方直接修改</Text>
          </li>
          <li>
            <Text>提供拖放操作，讓使用者可以直接拖曳檔案或元素</Text>
          </li>
          <li>
            <Text>即時預覽變更結果，減少使用者的猜測</Text>
          </li>
          <li>
            <Text>讓操作結果可見且可逆，增加使用者信心</Text>
          </li>
        </ul>
      </Card>

      <Tabs items={items} type='card' />
    </div>
  );
}

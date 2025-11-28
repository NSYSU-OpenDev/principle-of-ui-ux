import { useState } from 'react';
import {
  Card,
  Typography,
  Tabs,
  Divider,
  Space,
  Button,
  Table,
  Modal,
  Popconfirm,
  message,
  Alert,
  Input,
  Form,
  Drawer,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  AimOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UndoOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// 範例一：刪除操作對比
function DeleteOperationDemo() {
  const [showIntuitive, setShowIntuitive] = useState(true);
  const [data, setData] = useState([
    { key: '1', name: '伺服器 A', status: '運行中', ip: '192.168.1.1' },
    { key: '2', name: '伺服器 B', status: '運行中', ip: '192.168.1.2' },
    { key: '3', name: '伺服器 C', status: '已停止', ip: '192.168.1.3' },
    { key: '4', name: '伺服器 D', status: '運行中', ip: '192.168.1.4' },
  ]);
  const [deletedItem, setDeletedItem] = useState<(typeof data)[0] | null>(null);
  const [showDeletedAlert, setShowDeletedAlert] = useState(false);

  // 錯誤方式：跳轉確認頁
  const [showFullPageConfirm, setShowFullPageConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<(typeof data)[0] | null>(
    null,
  );

  const handleDelete = (record: (typeof data)[0]) => {
    setDeletedItem(record);
    setData(data.filter((item) => item.key !== record.key));
    setShowDeletedAlert(true);
    void message.success('該數據已成功刪除');
  };

  const handleUndo = () => {
    if (deletedItem) {
      setData([...data, deletedItem]);
      setDeletedItem(null);
      setShowDeletedAlert(false);
      void message.info('已撤銷刪除');
    }
  };

  const handleFullPageDelete = () => {
    if (itemToDelete) {
      setData(data.filter((item) => item.key !== itemToDelete.key));
      setShowFullPageConfirm(false);
      setItemToDelete(null);
      void message.success('刪除成功');
    }
  };

  const columns = [
    { title: '名稱', dataIndex: 'name', key: 'name' },
    { title: '狀態', dataIndex: 'status', key: 'status' },
    { title: 'IP 位址', dataIndex: 'ip', key: 'ip' },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: (typeof data)[0]) =>
        showIntuitive ? (
          <Popconfirm
            title='確定刪除該伺服器嗎？'
            onConfirm={() => handleDelete(record)}
            okText='確定'
            cancelText='取消'
          >
            <Button type='link' danger icon={<DeleteOutlined />}>
              刪除
            </Button>
          </Popconfirm>
        ) : (
          <Button
            type='link'
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setItemToDelete(record);
              setShowFullPageConfirm(true);
            }}
          >
            刪除
          </Button>
        ),
    },
  ];

  return (
    <Card title='刪除操作對比' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text> 刪除操作應該使用輕量級的確認方式（如
        Popconfirm），而不是跳轉到新頁面。
        刪除後應提供撤銷選項，讓使用者可以快速恢復。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(true)}
          icon={<CheckCircleOutlined />}
        >
          行內確認 + 可撤銷（正確）
        </Button>
        <Button
          type={!showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(false)}
          icon={<CloseCircleOutlined />}
        >
          跳轉確認頁（錯誤）
        </Button>
      </Space>

      {showIntuitive && showDeletedAlert && (
        <Alert
          title={
            <span>
              該數據已成功刪除。
              <Button
                type='link'
                onClick={handleUndo}
                style={{ padding: '0 4px' }}
              >
                <UndoOutlined /> 撤銷
              </Button>
            </span>
          }
          type='success'
          showIcon
          closable
          style={{ marginBottom: 16 }}
        />
      )}

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        size='small'
      />

      {/* 錯誤方式：全頁面確認 Modal */}
      <Modal
        open={showFullPageConfirm}
        title={null}
        footer={null}
        closable={false}
        centered
        width={500}
      >
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#fff2f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <DeleteOutlined style={{ fontSize: 36, color: '#ff4d4f' }} />
          </div>
          <Title level={4}>你確定要刪除嗎？</Title>
          <Paragraph type='secondary'>
            刪除這條數據「{itemToDelete?.name}」後將無法恢復到初始的狀態。
          </Paragraph>
          <Space size='large' style={{ marginTop: 24 }}>
            <Button size='large' onClick={() => setShowFullPageConfirm(false)}>
              取消
            </Button>
            <Button
              type='primary'
              danger
              size='large'
              onClick={handleFullPageDelete}
            >
              確定
            </Button>
          </Space>
        </div>
      </Modal>
    </Card>
  );
}

// 範例二：編輯操作對比
function EditOperationDemo() {
  const [showIntuitive, setShowIntuitive] = useState(true);
  const [data, setData] = useState([
    { key: '1', name: '項目 A', description: '這是項目 A 的描述' },
    { key: '2', name: '項目 B', description: '這是項目 B 的描述' },
    { key: '3', name: '項目 C', description: '這是項目 C 的描述' },
  ]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Drawer 方式
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState<(typeof data)[0] | null>(null);
  const [drawerValue, setDrawerValue] = useState('');

  const handleInlineEdit = (record: (typeof data)[0]) => {
    setEditingKey(record.key);
    setEditValue(record.description);
  };

  const handleInlineSave = (key: string) => {
    setData(
      data.map((item) =>
        item.key === key ? { ...item, description: editValue } : item,
      ),
    );
    setEditingKey(null);
    void message.success('儲存成功');
  };

  const handleDrawerEdit = (record: (typeof data)[0]) => {
    setDrawerItem(record);
    setDrawerValue(record.description);
    setDrawerOpen(true);
  };

  const handleDrawerSave = () => {
    if (drawerItem) {
      setData(
        data.map((item) =>
          item.key === drawerItem.key
            ? { ...item, description: drawerValue }
            : item,
        ),
      );
      setDrawerOpen(false);
      void message.success('儲存成功');
    }
  };

  return (
    <Card title='編輯操作對比' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        編輯操作應優先使用行內編輯或側邊抽屜，讓使用者保持在當前頁面的上下文中。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(true)}
          icon={<CheckCircleOutlined />}
        >
          行內編輯（正確）
        </Button>
        <Button
          type={!showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(false)}
          icon={<CloseCircleOutlined />}
        >
          抽屜編輯（可接受）
        </Button>
      </Space>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.map((item) => (
          <Card key={item.key} size='small'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flex: 1 }}>
                <Text strong>{item.name}</Text>
                <div style={{ marginTop: 8 }}>
                  {showIntuitive && editingKey === item.key ? (
                    <Space.Compact style={{ width: '100%' }}>
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onPressEnter={() => handleInlineSave(item.key)}
                        autoFocus
                      />
                      <Button
                        type='primary'
                        onClick={() => handleInlineSave(item.key)}
                      >
                        儲存
                      </Button>
                      <Button onClick={() => setEditingKey(null)}>取消</Button>
                    </Space.Compact>
                  ) : (
                    <Text type='secondary'>{item.description}</Text>
                  )}
                </div>
              </div>
              {!(showIntuitive && editingKey === item.key) && (
                <Button
                  type='text'
                  icon={<EditOutlined />}
                  onClick={() =>
                    showIntuitive
                      ? handleInlineEdit(item)
                      : handleDrawerEdit(item)
                  }
                >
                  編輯
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* 抽屜編輯 */}
      <Drawer
        title={`編輯 ${drawerItem?.name}`}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size={400}
        extra={
          <Space>
            <Button onClick={() => setDrawerOpen(false)}>取消</Button>
            <Button type='primary' onClick={handleDrawerSave}>
              儲存
            </Button>
          </Space>
        }
      >
        <Form layout='vertical'>
          <Form.Item label='描述'>
            <Input.TextArea
              value={drawerValue}
              onChange={(e) => setDrawerValue(e.target.value)}
              rows={4}
            />
          </Form.Item>
        </Form>
      </Drawer>

      <Card size='small' title='對比說明' style={{ marginTop: 16 }}>
        <Paragraph>
          <Text type={showIntuitive ? 'success' : 'warning'}>
            {showIntuitive
              ? '行內編輯：使用者直接在原位置編輯，完全不離開當前視圖，效率最高。'
              : '抽屜編輯：雖然打開了新面板，但主頁面仍然可見，使用者不會失去上下文。比跳轉新頁面好。'}
          </Text>
        </Paragraph>
      </Card>
    </Card>
  );
}

// 範例三：新增操作對比
function AddOperationDemo() {
  const [showIntuitive, setShowIntuitive] = useState(true);
  const [items, setItems] = useState(['項目 1', '項目 2', '項目 3']);
  const [isAdding, setIsAdding] = useState(false);
  const [newItemValue, setNewItemValue] = useState('');

  // Modal 方式
  const [modalOpen, setModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');

  const handleInlineAdd = () => {
    if (newItemValue.trim()) {
      setItems([...items, newItemValue.trim()]);
      setNewItemValue('');
      setIsAdding(false);
      void message.success('新增成功');
    }
  };

  const handleModalAdd = () => {
    if (modalValue.trim()) {
      setItems([...items, modalValue.trim()]);
      setModalValue('');
      setModalOpen(false);
      void message.success('新增成功');
    }
  };

  return (
    <Card title='新增操作對比' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        簡單的新增操作應該使用行內新增，讓使用者可以快速添加項目而不中斷工作流程。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(true)}
          icon={<CheckCircleOutlined />}
        >
          行內新增（正確）
        </Button>
        <Button
          type={!showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(false)}
          icon={<CloseCircleOutlined />}
        >
          彈窗新增（較打斷）
        </Button>
      </Space>

      <Card size='small' style={{ backgroundColor: '#fafafa' }}>
        <Space vertical style={{ width: '100%' }}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '8px 12px',
                backgroundColor: '#fff',
                borderRadius: 6,
                border: '1px solid #e8e8e8',
              }}
            >
              {item}
            </div>
          ))}

          {showIntuitive ? (
            isAdding ? (
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  placeholder='輸入新項目名稱'
                  value={newItemValue}
                  onChange={(e) => setNewItemValue(e.target.value)}
                  onPressEnter={handleInlineAdd}
                  autoFocus
                />
                <Button type='primary' onClick={handleInlineAdd}>
                  新增
                </Button>
                <Button onClick={() => setIsAdding(false)}>取消</Button>
              </Space.Compact>
            ) : (
              <Button
                type='dashed'
                icon={<PlusOutlined />}
                onClick={() => setIsAdding(true)}
                block
              >
                新增項目
              </Button>
            )
          ) : (
            <Button
              type='dashed'
              icon={<PlusOutlined />}
              onClick={() => setModalOpen(true)}
              block
            >
              新增項目
            </Button>
          )}
        </Space>
      </Card>

      {/* Modal 新增 */}
      <Modal
        title='新增項目'
        open={modalOpen}
        onOk={handleModalAdd}
        onCancel={() => setModalOpen(false)}
        okText='確定'
        cancelText='取消'
      >
        <Form layout='vertical' style={{ marginTop: 16 }}>
          <Form.Item label='項目名稱'>
            <Input
              placeholder='請輸入項目名稱'
              value={modalValue}
              onChange={(e) => setModalValue(e.target.value)}
              onPressEnter={handleModalAdd}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Card size='small' title='對比說明' style={{ marginTop: 16 }}>
        <Paragraph>
          <Text type={showIntuitive ? 'success' : 'warning'}>
            {showIntuitive
              ? '行內新增：輸入框直接出現在列表中，使用者可以快速新增多個項目，工作流程連貫。'
              : '彈窗新增：每次新增都會打開 Modal，打斷使用者的視線和操作流程。'}
          </Text>
        </Paragraph>
      </Card>
    </Card>
  );
}

// 範例四：表單提交對比
function FormSubmitDemo() {
  const [showIntuitive, setShowIntuitive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 跳轉成功頁
  const [showSuccessPage, setShowSuccessPage] = useState(false);

  const handleInlineSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      void message.success('提交成功！');
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const handleRedirectSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccessPage(true);
    }, 1000);
  };

  if (showSuccessPage) {
    return (
      <Card title='表單提交對比' style={{ marginBottom: 24 }}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#f6ffed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <CheckCircleOutlined style={{ fontSize: 40, color: '#52c41a' }} />
          </div>
          <Title level={3}>提交成功！</Title>
          <Paragraph type='secondary'>您的表單已成功提交。</Paragraph>
          <Button type='primary' onClick={() => setShowSuccessPage(false)}>
            返回
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title='表單提交對比' style={{ marginBottom: 24 }}>
      <Paragraph>
        <Text strong>說明：</Text>{' '}
        表單提交成功後應該在當前頁面顯示結果，而不是跳轉到成功頁面。
        盡量在同一頁上解決大部分問題，因為頁面刷新和跳轉會打斷用戶的思維流程。
      </Paragraph>

      <Space style={{ marginBottom: 16 }}>
        <Button
          type={showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(true)}
          icon={<CheckCircleOutlined />}
        >
          原地回饋（正確）
        </Button>
        <Button
          type={!showIntuitive ? 'primary' : 'default'}
          onClick={() => setShowIntuitive(false)}
          icon={<CloseCircleOutlined />}
        >
          跳轉成功頁（錯誤）
        </Button>
      </Space>

      <Card size='small' style={{ maxWidth: 400 }}>
        <Form layout='vertical'>
          <Form.Item label='姓名'>
            <Input placeholder='請輸入姓名' />
          </Form.Item>
          <Form.Item label='電子郵件'>
            <Input placeholder='請輸入電子郵件' />
          </Form.Item>
          <Form.Item>
            {submitted ? (
              <Alert title='提交成功！感謝您的填寫。' type='success' showIcon />
            ) : (
              <Button
                type='primary'
                loading={loading}
                onClick={
                  showIntuitive ? handleInlineSubmit : handleRedirectSubmit
                }
                block
              >
                提交
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>

      <Card size='small' title='對比說明' style={{ marginTop: 16 }}>
        <Paragraph>
          <Text type={showIntuitive ? 'success' : 'danger'}>
            {showIntuitive
              ? '原地回饋：提交後在原位置顯示成功訊息，使用者可以確認結果並繼續其他操作。'
              : '跳轉成功頁：跳轉到新頁面打斷了使用者的思維流程，還需要額外點擊返回。'}
          </Text>
        </Paragraph>
      </Card>
    </Card>
  );
}

// 主元件
export default function StayOnPagePrinciple() {
  const items = [
    {
      key: '1',
      label: '刪除操作',
      children: <DeleteOperationDemo />,
    },
    {
      key: '2',
      label: '編輯操作',
      children: <EditOperationDemo />,
    },
    {
      key: '3',
      label: '新增操作',
      children: <AddOperationDemo />,
    },
    {
      key: '4',
      label: '表單提交',
      children: <FormSubmitDemo />,
    },
  ];

  return (
    <div>
      <Title level={2}>留在相同頁面原則 (Stay on Page)</Title>
      <Divider />

      <Card style={{ marginBottom: 24, backgroundColor: '#fff7e6' }}>
        <Title level={4}>
          <AimOutlined style={{ marginRight: 8 }} />
          原則說明
        </Title>
        <Paragraph>
          <Text strong>留在相同頁面原則</Text>
          強調盡量在同一頁上解決大部分問題，因為頁面刷新和跳轉會打斷用戶的思維流程。
        </Paragraph>
        <Paragraph>
          <Text strong>設計應用：</Text>
        </Paragraph>
        <ul>
          <li>
            <Text>使用行內編輯、Popconfirm、Drawer 等輕量級元件</Text>
          </li>
          <li>
            <Text>刪除操作後提供撤銷選項，而不是彈出確認對話框</Text>
          </li>
          <li>
            <Text>表單提交後在原地顯示結果，而不是跳轉到成功頁</Text>
          </li>
          <li>
            <Text>避免不必要的頁面跳轉，保持使用者的上下文</Text>
          </li>
        </ul>
      </Card>

      <Tabs items={items} type='card' />
    </div>
  );
}

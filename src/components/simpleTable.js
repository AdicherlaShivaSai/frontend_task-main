import React, { useState } from "react";
import { Table, Button, Input, Modal, Form } from "antd";
import "./components.css";

const SimpleTable = ({ dataSource, onDelete, onEdit }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  const [data, setData] = useState(columns);
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(values => {
        onEdit(currentUser.id, values);
        setIsModalVisible(false);
        setCurrentUser(null);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
    form.resetFields();
  };

  const [form] = Form.useForm();

  return (
    <div className="data">
      {dataSource.length ? (
        <>
          <Table dataSource={dataSource} columns={columns} rowKey="id" />
          <Modal
            title="Edit User"
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{ name: currentUser?.name, email: currentUser?.email }}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input the name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input the email!' }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </>
      ) : (
        "No user data"
      )}
    </div>
  );
};

export default SimpleTable;

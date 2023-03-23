import React, { useState, useRef } from 'react';

import { TreeNode } from 'react-organizational-chart';
import { Avatar, Card, Skeleton, Dropdown, Input, Form, Modal, Button } from 'antd';
import { MinusOutlined, PlusOutlined, EllipsisOutlined, UserAddOutlined } from '@ant-design/icons';

const Node = props => {

  const { renderFunc, nodeName, addUserFunc, deleteUserFunc, incrementFunc, parentId, price, total, decrementFunc, renameFunc } = props;
  const { Meta } = Card;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const inputRef = useRef(null);

  const handleNewUser = () => {
    addUserFunc(newUserName);
    setNewUserName("");
    setIsModalOpen(false);
  };

  const handleCancelNewUser = () => {
    setNewUserName("");
    setIsModalOpen(false);
  };

  const changeName = (newName) => {
    renameFunc(newName);
  };

  const items = [
    {
      key: '1',
      label: (
        <div onClick={() => setIsModalOpen(true)}>
          Add a downline
        </div>
      ),
    },
    parentId !== null && {
      key: '2',
      label: (
        <div onClick={deleteUserFunc}>
          Delete
        </div>
      ),
    },
  ];

  const handleBlur = (value,) => {
    if (value.length < 3) {
      inputRef.current.focus();
    };
  };

  return (
    <>
      <TreeNode label={
        <Card
          className='inline-block bg-slate-100 ant-card-body '
          style={{
            width: 160,
            marginTop: 10,
          }}
          actions={[
            <PlusOutlined onClick={incrementFunc} key="plus" />,
            <MinusOutlined onClick={decrementFunc} key="minus" />,
            <Dropdown
              trigger={['click']}
              menu={{
                items,
              }}
              placement="bottomLeft"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <EllipsisOutlined key="ellipsis" />
            </Dropdown>,
          ]}
        >
          <Skeleton avatar loading={false} active>
            <Meta
              className='ant-card-body'
              title={<div className='flex justify-between pt-4 px-3'>
                <Avatar
                  className='w-8 h-8'
                >
                  {nodeName[0]}
                </Avatar>
                <Input ref={inputRef} onBlur={(e) => handleBlur(e.target.value)} className='w-20 text-center'
                  value={nodeName} onChange={(e) => changeName(e.target.value)} />
              </div>
              }
              description={
                <div className='flex flex-col items-center gap-2 pb-4 pt-1'>
                  <div className='flex gap-3 text-black'>
                    <span>Self BV:</span>
                    <span className="flex">{price}</span>
                  </div>
                  <div className='flex gap-3 font-bold text-black '>
                    <span>Total:</span>
                    <span className="flex">{total}</span>
                  </div>
                </div>
              }
            />
          </Skeleton>
        </Card>
      }
      >
        {
          renderFunc
        }
      </TreeNode>
      <Modal
        destroyOnClose={true}
        closable={false}
        okButtonProps={{
          style: {
            display: 'none'
          }
        }}
        cancelButtonProps={{
          style: {
            display: 'none'
          }
        }}
        centered title={
          <div className='flex gap-4 items-center'>
            <UserAddOutlined className='scale-150' />
            <span>Add a downline</span>
          </div>
        } open={isModalOpen}>
        <Form onFinish={handleNewUser} className='pt-4'>
          <Form.Item
            label="Name"
            name="name"
            value={newUserName}
            onChange={(e) => setNewUserName((e.target.value))}
            rules={
              [
                {
                  required: true,
                  min: 3,
                  message: 'Please input at least 3 characters!',
                }
              ]
            }
            className='ant-form-item'>
            <Input />
          </Form.Item>
          <div className='flex items-center justify-end gap-4 pt-3'>
            <Button type="default" onClick={handleCancelNewUser}>
              Cancel
            </Button>
            <Button type="default" htmlType='submit'>
              Add
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export { Node };
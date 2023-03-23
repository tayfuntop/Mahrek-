import React, { useState } from 'react';
import { Table, Button, Modal, Input, Form, message } from 'antd';
import { DeleteOutlined, FolderOpenOutlined, UserAddOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentId } from '../../redux/Action/currentId';
import { Header } from '../../components/';
import { addTree, deleteTree, renameTree } from '../../redux/Action/TreeData';


const Home = () => {


    const [messageApi, contextHolder] = message.useMessage();
    const date = new Date();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRenameModal, setIsRenameModal] = useState(false);
    const [newTreeName, setNewTreeName] = useState("");
    const [focusRenameId, setFocusRenameId] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const treeDatas = useSelector((state) => state.treeDatas.treeDatas)

    const messageFunc = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 3,
        });
    };

    const openRenameTreeModal = (id, name) => {
        setFocusRenameId(id);
        setNewTreeName(name);
        setIsRenameModal(true);
        setIsModalOpen(true);
    };

    const openNewTreeModal = () => {
        setIsRenameModal(false);
        setIsModalOpen(true);
    };

    const handleCancelNewTree = () => {
        setNewTreeName("");
        setIsModalOpen(false);
    };


    const handleNewTree = () => {
        dispatch(addTree({ newTreeName, lastUpdated: `${date.toDateString()} / ${date.toLocaleTimeString()}` }));
        setNewTreeName("");
        setIsModalOpen(false);
        messageFunc("success", "New Tree Added");
    };

    const handleRenameTree = () => {
        dispatch(renameTree({ focusRenameId, newTreeName }));
        setNewTreeName("");
        setIsModalOpen(false);
        setIsRenameModal(false);
        messageFunc("success", "Tree Renamed");
    };

    const handleDeleteTree = (id, name) => {
        dispatch(deleteTree(id));
        messageFunc("success", `${name} Deleted`);
    };

    const columns = [
        {
            title: <div className='text-center font-bold text-[10px] sm:text-[12px] md:text-[16px]'>Open</div>,
            dataIndex: 'open',
            key: 'open',
        },
        {
            title: <div className='text-center font-bold text-[10px] sm:text-[12px] md:text-[16px]'>Edit</div>,
            dataIndex: 'edit',
            key: 'edit',
        },
        {
            title: <div className='text-center font-bold text-[10px] sm:text-[12px] md:text-[16px]'>Name</div>,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: <div className='text-center font-bold text-[10px] sm:text-[12px] md:text-[16px]'>Last Updated</div>,
            dataIndex: 'updated',
            key: 'Last Updated',
        },
        {
            title: <div className='text-center font-bold text-[10px] sm:text-[12px] md:text-[16px]'>Count</div>,
            dataIndex: 'count',
            key: 'User Count',
        },
        {
            title: <div className='text-center font-bold text-[10px] sm:text-[12px] md:text-[16px]'>Delete</div>,
            dataIndex: 'delete',
            key: 'delete',
        },
    ];
    const data = treeDatas.map((item, index) => {
        return {
            key: item.id,
            open: <div onClick={() => { navigate("calculator"); dispatch(setCurrentId(index)) }}
                className='cursor-pointer justify-center flex items-center hover:scale-110 transition-all text-[8px] sm:text-[12px] md:text-[14px]'>
                <FolderOpenOutlined className='scale-150' />
            </div>,
            edit: <div onClick={() => openRenameTreeModal(item.id, item.name)}
                className='cursor-pointer justify-center flex items-center hover:scale-110 transition-all text-[8px] sm:text-[12px] md:text-[14px]'>
                <EditOutlined className='scale-150' />
            </div>,
            name: <div className='text-center text-[8px] sm:text-[12px] md:text-[14px]'>{item.name}</div>,
            updated: <div className='text-center text-[8px] sm:text-[12px] md:text-[14px]'>{item.lastUpdated}</div>,
            count: <div className='text-center text-[8px] sm:text-[12px] md:text-[14px]'>{item.tree.length}</div>,
            delete: <div onClick={() => handleDeleteTree(item.id, item.name)}
                className='cursor-pointer justify-center flex items-center hover:scale-110 transition-all text-[8px] sm:text-[12px] md:text-[14px]'>
                <DeleteOutlined className='scale-150' />
            </div>,
        };
    });

    return (
        <>
            <div>
                <Header />
            </div>
            <div className='px-4 py-4'>
                <Button
                    onClick={() => openNewTreeModal()}
                    className='w-full h-12 font-bold text-lg bg-slate-100'>Add New Tree</Button>
            </div>
            <Table className='px-1 sm:px-4' pagination={{ pageSize: 7 }} columns={columns} dataSource={data} />
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
                        {
                            isRenameModal ? <EditOutlined className='scale-150' /> : <UserAddOutlined className='scale-150' />
                        }
                        <span>
                            {isRenameModal ? "Rename Tree" : "Add New Tree"}
                        </span>
                    </div>
                } open={isModalOpen}>
                <Form onFinish={isRenameModal ? handleRenameTree : handleNewTree} className='pt-4'>
                    <Form.Item
                        label="Name"
                        name="name"
                        onChange={(e) => setNewTreeName((e.target.value))}
                        initialValue={newTreeName}
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
                    <div className='flex items-center justify-end gap-4 pt-6'>
                        <Button type="default" onClick={handleCancelNewTree}>
                            Cancel
                        </Button>
                        <Button type="default" htmlType='submit'>
                            {isRenameModal ? "Rename" : "Add"}
                        </Button>
                    </div>
                </Form>
            </Modal>
            {contextHolder}
        </>
    );
};

export default Home;
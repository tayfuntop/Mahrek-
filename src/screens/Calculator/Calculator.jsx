import React from 'react';
import { message } from 'antd';
import { Tree } from 'react-organizational-chart';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { addUser, deleteUser, increment, decrement, renameUser } from '../../redux/Action/TreeData';
import { Header, Node } from '../../components';

const Calculator = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentId = useSelector((state) => state.currentId.id);
    const treeName = useSelector((state) => state.treeDatas.treeDatas[currentId].name);
    const treeDatas = useSelector((state) => state.treeDatas.treeDatas[currentId].tree);

    const messageFunc = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
            duration: 3,
        });
    };

    const addUserFunc = (userName, id) => {
        dispatch(addUser({ userName, id, currentId }));
        messageFunc('success', 'Added user');
    };

    const deleteUserFunc = (id) => {
        dispatch(deleteUser({ id, currentId }));
        messageFunc('success', 'Deleted user');
    };

    const incrementFunc = (id) => {
        dispatch(increment({ id, currentId }));
    }

    const decrementFunc = (id) => {
        dispatch(decrement({ id, currentId }));
    }

    const renameUserFunc = (text, id) => {
        dispatch(renameUser({ text, id, currentId }));
    };

    const treeRendering = (treeData, parentId) => {
        return (
            treeDatas.filter(item => item.parentId === parentId).map((node, index) => (
                <Node
                    key={index}
                    nodeName={node.text}
                    renderFunc={treeRendering(treeData, node.id)}
                    parentId={node.parentId}
                    addUserFunc={(userName) => addUserFunc(userName, node.id)}
                    deleteUserFunc={() => deleteUserFunc(node.id)}
                    incrementFunc={() => incrementFunc(node.id)}
                    decrementFunc={() => decrementFunc(node.id)}
                    renameFunc={(newUserName) => renameUserFunc(newUserName, node.id)}
                    price={node.price}
                    total={node.total}
                />
            ))
        );
    };

    return (
        <div className='h-full'>
            <Header />
            <div onClick={() => navigate("/")} className='sticky top-20 pl-5 cursor-pointer inline-block z-50'>
                <span className='w-12 h-12 rounded-full bg-slate-200 flex justify-center items-center hover:scale-110 transition-transform'>
                    <ArrowLeftOutlined className='scale-150' />
                </span>
            </div>
            <div className='overflow-x-auto overflow-y-hidden px-4 -mt-6 pb-12'>
                <Tree
                    lineWidth='2px'
                    lineBorderRadius='10px'
                    label={<div className='h-8 bg-slate-200 inline-block px-4 py-1 rounded-lg mb-3'>{treeName}</div>}
                >
                    {
                        treeRendering(treeDatas, null)
                    }
                </Tree>
            </div>
            {contextHolder}
        </div>
    );
};

export default Calculator;
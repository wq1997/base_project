
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSelector, useIntl, history } from "umi";
import { Button, Modal, Form, Space, Table, theme, message } from 'antd';
import { CardModel } from "@/components";
import { getAllUserByAdmin, changePassword,oc372ChangePassword} from '@/services/user'
import { removeLocalStorage } from "@/utils/utils";
import { userTable } from "@/utils/constants";
import ChangPw from '../ChangePassWorld'
function Com(props) {
    const { user } = useSelector(function (state) {
        return state.user
    });
    const intl = useIntl();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState();
    const [dataAll,setDataAll]=useState([]);
    const t = (id) => {
        const msg = intl.formatMessage(
            {
                id,
            },
        );
        return msg
    }
    const { token } = theme.useToken();
    const [form1] = Form.useForm();
    useEffect(()=>{
        getData();
    },[])
    const getData =async()=>{
        let {data}=await getAllUserByAdmin();
        setDataAll(data?.data);
    }
    userTable[7]={
            title: t("操作"),
            key: 'option',
            render: function (record) {
                return (
                    <Space>
                        <Button type="link" style={{ color: token.colorPrimary }} onClick={() => { setIsOpen(!isOpen); setFormData(record)}}>{t('修改密码')}</Button>
                    </Space>
                )
            }
        };
    

    const cancle = () => {
        setIsOpen(!isOpen);
    }
    // const tailFormItemLayout = {
    //     wrapperCol: {
    //         xs: {
    //             span: 24,
    //             offset: 0,
    //         },
    //         sm: {
    //             span: 16,
    //             offset: 8,
    //         },
    //     },
    // };
    // const formItemLayout = {
    //     labelCol: {
    //         xs: { span: 24 },
    //         sm: { span: 8 },
    //     },
    //     wrapperCol: {
    //         xs: { span: 24 },
    //         sm: { span: 16 },
    //     },
    // };


    const formList = [
        {
            label: '用户名',
            key: 'name',
            type: 1,
            required: true
        },
        {
            label: '密码',
            key: 'password',
            type: 3,
            required: true,
            rules: [{
                // validator: validateToNextPassword,
            },]
        },
        {
            label: '确认密码',
            key: 'passwordRe',
            type: 3,
            required: true,
            rules: ({ getFieldValue }) => ({
                validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                    }
                    return Promise.reject(t("两次密码输入不一致"))
                }
            })
        },
        {
            label: '手机',
            key: 'phone',
            type: 1,
            required: false
        },
        {
            label: '邮箱',
            key: 'mail',
            type: 1,
            required: false
        },
        {
            label: '描述',
            key: 'desc',
            type: 1,
            required: false
        },
    ]
    const delUserData = async (value) => {
        try {
            const { data } = await oc372ChangePassword(value);
            if (data?.data=='1') {
                message.success({ content: t('密码修改成功'), duration: 2 });
            }else{
                message.error({ content: data?.msg, duration: 2 });
            }
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }
    const initFormData = () => {
        let formData = {};
        formList.map(it => {
            formData[it.key] = user[it.key];
        });

        return formData
    }
  
    return (
        <div className='content' style={{ backgroundColor: token.titleCardBgc, height: "50%" }}>
            <CardModel
                title={
                    t("个人信息")
                }
                content={
                    <Table
                        columns={userTable}
                        dataSource={[dataAll?.myInfo]}
                    />
                }
            />
            {user.roleId==2&& <CardModel
                title={
                    t("下属用户")
                }
                content={
                    <Table
                        columns={userTable}
                        dataSource={
                           dataAll?.underling
                        }
                    />
                } />}
            <ChangPw isOpen={isOpen} title={t("修改密码")} formData={formData} onRef={cancle} delUserData={(value) => delUserData(value)} />
        </div>
    )
}

export default Com
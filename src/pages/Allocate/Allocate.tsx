import React, { useRef, useState } from 'react';
import AutoHeightProTable from '@/components/AutoHeightProTable';
import Slice from '@/model/Slice';
import { Button, Modal, Space } from 'antd';
import { useModel, useParams } from 'umi';
import ProForm, { ProFormSelect, ProFormSwitch } from '@ant-design/pro-form';
import { FormInstance } from 'antd/lib/form';
import { assignTo } from './service';

export interface AllocateRouteParams {
  type: string;
}

export default () => {
  const columns = Slice.getColumns<Slice>();
  const { type } = useParams<AllocateRouteParams>();
  const [allocateVisible, setAllocateVIsible] = useState(false);
  const allocateFormRef = useRef<FormInstance>();
  function closeModal() {
    setAllocateVIsible(false);
    if (allocateFormRef) allocateFormRef?.current?.resetFields();
  }
  const { users } = useModel('users');
  return (
    <>
      <AutoHeightProTable<Slice>
        id="allocate"
        request={Slice.getList('/api/list')}
        menuOptions={{
          api: '/api/list/count',
          menus: [
            {
              key: 'todo',
              label: '未分配',
            },
            {
              key: 'done',
              label: '已分配',
            },
          ],
          menuKey: 'allocate_status',
          defaultMenu: 'todo',
        }}
        toolbar={{
          actions: [
            <Button key="allocate" onClick={() => setAllocateVIsible(true)}>
              分配
            </Button>,
          ],
        }}
        params={{ type }}
        columns={columns}
        setParamsToRoute
        rowKey="id"
        extraScrollX={200}
      />
      <Modal
        footer={null}
        visible={allocateVisible}
        title="分配"
        onCancel={() => setAllocateVIsible(false)}
        maskClosable={false}
        keyboard={false}
      >
        <ProForm
          layout="horizontal"
          formRef={allocateFormRef}
          onFinish={async (values) => {
            await assignTo({
              pre_generator: values.pre_generator ? 1 : 0,
              assign_to: values.assign_to,
            });
            closeModal();
          }}
          initialValues={{
            pre_generator: false,
          }}
          submitter={{
            // 完全自定义整个区域
            render: (props, doms) => {
              return (
                <Space size={12}>
                  {doms.pop()}
                  <Button key="cancel" onClick={closeModal}>
                    关闭
                  </Button>
                </Space>
              );
            },
          }}
        >
          <ProFormSelect
            name="assign_to"
            label="分配给"
            hasFeedback
            options={users.map((i) => ({
              label: i.name,
              value: i.key,
            }))}
            rules={[{ required: true, message: '请选择人员' }]}
          />
          <ProFormSwitch name="pre_generator" label="是否需要预生成大框" />
        </ProForm>
      </Modal>
    </>
  );
};

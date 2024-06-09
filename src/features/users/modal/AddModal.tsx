import {
  Button,
  Col,
  Form,
  Input, message,
} from "antd";

import ModalHeader from "../../../shared/ModalHeader";
import React, { useEffect } from "react";
import { useAddUser } from "../../../entities/user/hooks/useAddUser";

export default function AddModal({
                                   onClose,
                                 }: any){

  const [form] = Form.useForm<{}>();

  const {
    handleAdd,
    isPending,
    isSuccess
  } = useAddUser()

  const onFinish = (value: any) => {
    handleAdd(value)
  }

  useEffect(() =>{
    if (isSuccess){
      form.resetFields()
      message.success('Вы успешно добавили пользователя')
    }
  },[isSuccess])

  return (
    <div className={"modal-wrapper"} style={{ padding: "30px" }}>
      <ModalHeader title={"Добавление"} onClose={() => {
        form.resetFields()
        onClose()
      }} />
      <Form
        onFinish={(values) => onFinish(values)}
        form={form}
        layout={"vertical"}
      >
        <Form.Item
          rules={[{ required: true, type: 'email'}]}
          name={"email"}
          label={"Email"}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"username"}
          label={"Логин"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"firstname"}
          label={"Имя"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"lastname"}
          label={"Фамилия"}
        >
          <Input />
        </Form.Item>
        <Col style={{ display: "flex", gap: "15px" }}>
          <Button
            type={"primary"}
            className={"button"}
            style={{ fontSize: "12px", width: "50%" }}
            htmlType={"submit"}
            loading={isPending}
          >
            Сохранить
          </Button>
          <Button
            type={"primary"}
            ghost
            className={"button"}
            style={{ fontSize: "12px", width: "50%" }}
            onClick={() => {
              form.resetFields()
              onClose()
            }}
          >
            Отмена
          </Button>
        </Col>
      </Form>
    </div>
  );
}

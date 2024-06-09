import {
  Button,
  Col, DatePicker,
  Form,
  Input, message,
} from "antd";
import ModalHeader from "../../../shared/ModalHeader";
import React, { useEffect } from "react";
import { useRenEnd } from "../../../entities/equipments/hooks/useRenEnd";

export default function ReturnModal({
                                    onClose,
                                    id
                                  }: any){

  const [form] = Form.useForm<{}>();

  const {
    handleAdd,
    isPending,
    isSuccess
  } = useRenEnd()

  const onFinish = (value: any) => {
    const data = {
      id: id,
      data: {
        ...value,
        rental_end_date: value?.rental_end_date?.toISOString()
      }
    }
    console.log(data)
    handleAdd(data)
  }

  useEffect(() => {
    if (isSuccess) {
      form.resetFields()
      message.success('Аренда инвентаря завершена')
    }
  }, [isSuccess])

  return (
    <div className={"modal-wrapper"} style={{ padding: "30px" }}>
      <ModalHeader title={"Завершить аренду"} onClose={() => {
        form.resetFields()
        onClose()
      }} />
      <Form
        onFinish={(values) => onFinish(values)}
        form={form}
        layout={"vertical"}
      >
        <Form.Item
          name={"rental_end_date"}
          label={"Дата окончания аренды"}
        >
          <DatePicker
            showTime
            placeholder={""}
            format={"DD.MM.YYYY HH:mm"}
            style={{width: "100%"}}
          />
        </Form.Item>
        <Form.Item
          name={"return_note"}
          label={"Пометка"}
        >
          <Input/>
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

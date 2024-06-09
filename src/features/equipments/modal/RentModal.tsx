import {
  Button,
  Col, DatePicker,
  Form,
  message,
  Select, Spin,
} from "antd";
import ModalHeader from "../../../shared/ModalHeader";
import React, { useEffect } from "react";
import useUserData from "../../../entities/user/hooks/useUserData";
import { useRentStart } from "../../../entities/equipments/hooks/useRentStart";

export default function RentModal({
                                   onClose,
                                   id
                                 }: any){

  const [form] = Form.useForm<{}>();

  const {
    handleAdd,
    isPending,
    isSuccess
  } = useRentStart()

  const {
    userData,
    setLimit,
    isLoading
  } = useUserData()

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
    setLimit(1000)
  }, [])

  useEffect(() => {
    if (isSuccess) {
      form.resetFields()
      message.success('Аренда инвентаря началась')
    }
  }, [isSuccess])

  return (
    <div className={"modal-wrapper"} style={{ padding: "30px" }}>
      <ModalHeader title={"Начать аренду"} onClose={() => {
        form.resetFields()
        onClose()
      }} />
      <Form
        onFinish={(values) => onFinish(values)}
        form={form}
        layout={"vertical"}
      >
        <Form.Item
          rules={[{ required: true }]}
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
          rules={[{ required: true }]}
          name={"user_id"}
          label={"Арендатель"}
        >
          <Select
            style={{
              width: '100%'
            }}
            filterOption={false}
          >
            {
              isLoading
                ? <Spin />
                :
                userData?.data?.map((option: any) => {
                  return (
                    <Select.Option key={option?.id?.toString()} value={option?.id?.toString()}>
                      {option?.email}
                    </Select.Option>
                  );
                })
            }
          </Select>
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

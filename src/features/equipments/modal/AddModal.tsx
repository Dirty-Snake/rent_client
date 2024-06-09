import {
  Button,
  Col,
  Form,
  Input, message,
  Select, Spin,
  Radio
} from "antd";
import ModalHeader from "../../../shared/ModalHeader";
import React, { useEffect } from "react";
import { useAddEquipments } from "../../../entities/equipments/hooks/useAddEquipments";
import useTagData from "../../../entities/tags/hooks/useTagData";
import useCategoriesData from "../../../entities/categories/hooks/useCategoriesData";

export default function AddModal({
                                   onClose,
                                 }: any){

  const [form] = Form.useForm<{}>();

  const {
    handleAdd,
    isPending,
    isSuccess
  } = useAddEquipments()

  const {
    tagData,
    setLimit,
    isLoading
  } = useTagData()

  const {
    categoryData,
    setLimit: setLimitBrand,
    isLoading: isLoadingBrand,
  } = useCategoriesData()


  const onFinish = (value: any) => {
    console.log(value)
    handleAdd(value)
  }

  useEffect(() =>{
    setLimit(1000)
    setLimitBrand(1000)
  },[])

  useEffect(() =>{
    if (isSuccess){
      form.resetFields()
      message.success('Вы успешно добавили инвентарь')
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
          rules={[{ required: true }]}
          name={"name"}
          label={"Название"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"description"}
          label={"Описание"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"price"}
          label={"Цена"}
        >
          <Input type={'number'}/>
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"condition"}
          label={"Состояние"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"size"}
          label={"Размер"}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"availability"}
          label={"Доступность"}
        >
          <Radio.Group >
            <Radio value={true}>Да</Radio>
            <Radio value={false}>Нет</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          name={"tag_id"}
          label={"Тег"}
        >
          <Select
            style={{
              width: '100%'
            }}
            filterOption={false}
          >
            {
              isLoading
                ?  <Spin />
                :
                tagData?.data?.map((option: any) => {
                  return (
                    <Select.Option key={option?.id?.toString()} value={option?.id?.toString()}>
                      {option?.name}
                    </Select.Option>
                  );
                })
            }
          </Select>
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          name={"category_id"}
          label={"Категория"}
        >
          <Select
            style={{
              width: '100%'
            }}
            filterOption={false}
          >
            {
              isLoadingBrand
                ?  <Spin />
                :
                categoryData?.data?.map((option: any) => {
                  return (
                    <Select.Option key={option?.id?.toString()} value={option?.id?.toString()}>
                      {option?.name}
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

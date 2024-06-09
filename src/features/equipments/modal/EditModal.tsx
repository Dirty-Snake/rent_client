import {
  Button,
  Col, DatePicker,
  Form,
  Input, message,
  Select, Spin,
  Radio
} from "antd";
import ModalHeader from "../../../shared/ModalHeader";
import React, { useEffect } from "react";
import useTagData from "../../../entities/tags/hooks/useTagData";
import useCategoriesData from "../../../entities/categories/hooks/useCategoriesData";
import useUserData from "../../../entities/user/hooks/useUserData";
import useEquipmentsDataByID from "../../../entities/equipments/hooks/useEquipmentsDataByID";
import dayjs from "dayjs";
import useUpdateEquipments from "../../../entities/equipments/hooks/useUpdateEquipments";

export default function EditModal({
                                    onClose,
                                    id,
                                  }: any){

  const [form] = Form.useForm<{}>();

  const {
    equipmentsDataById,
    isLoading: isLoadingDataById,
  } = useEquipmentsDataByID(id)

  const {
    handleUpdate,
    isPending,
    isSuccess
  } = useUpdateEquipments()


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
    handleUpdate(id, { ...value, decommissioned: Boolean(value.decommissioned) })
  }

  useEffect(() => {
    setLimit(1000)
    setLimitBrand(1000)
  }, [])

  useEffect(() => {
    if (isSuccess) {
      message.success('Вы успешно обновили данные')
    }
  }, [isSuccess])

  console.log(equipmentsDataById)
  useEffect(() => {
    form?.setFieldsValue({
      ...equipmentsDataById,
      price: Number(equipmentsDataById?.price),
      category_id: equipmentsDataById?.category?.id,
      tag_id: equipmentsDataById?.tag?.id,
    })
  }, [equipmentsDataById])

  if (isLoadingDataById) {
    return (
      <div style={{
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Spin />
      </div>
    )
  }

  return (
    <div className={"modal-wrapper"} style={{ padding: "30px" }}>
      <ModalHeader title={"Редактирование"} onClose={() => {
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

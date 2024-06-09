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
import useLocationData from "../../../entities/location/hooks/useLocationData";
import useBrandData from "../../../entities/brends/hooks/useBrandData";
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
    locationDataById,
    isLoading: isLoadingDataById,
  } = useEquipmentsDataByID(id)

  const {
    handleUpdate,
    isPending,
    isSuccess
  } = useUpdateEquipments()

  const {
    locationData,
    setLimit,
    isLoading
  } = useLocationData()

  const {
    brandsData,
    setLimit: setLimitBrand,
    isLoading: isLoadingBrand,
  } = useBrandData()

  const {
    userData,
    isLoading: isLoadingUsers,
  } = useUserData()

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

  useEffect(() => {
    form?.setFieldsValue({
      name: locationDataById?.name,
      description: locationDataById?.description,
      sku: locationDataById?.sku,
      model: locationDataById?.info?.model,
      factory_number: locationDataById?.info?.factory_number,
      period_use: locationDataById?.info?.period_use,
      cost: Number(locationDataById?.info?.cost),
      date_commissioning: dayjs(locationDataById?.info?.date_commissioning),
      decommissioned: locationDataById?.decommissioned,
      location_id: locationDataById?.location?.id,
      brand_id: locationDataById?.info?.brand?.id,
      responsible_id: locationDataById?.responsible?.id,
    })
  }, [locationDataById])

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
          rules={[{ required: true, message: 'Пожалуйста, введите артикул (8 символов)', pattern: /^.{8}$/ }]}
          name={"sku"}
          label={"Артикул (8 символов)"}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          name={"model"}
          label={"Модель"}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          name={"factory_number"}
          label={"Заводской номер"}
        >
          <Input type={'number'} />
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          name={"period_use"}
          label={"Срок полезного использования (в месяцах)"}
        >
          <Input type={'number'} />
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          name={"cost"}
          label={"Стоимость"}
        >
          <Input type={'number'} />
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          name={"date_commissioning"}
          label={"Дата списания предмета"}
        >
          <DatePicker
            showTime
            placeholder={""}
            format="YYYY-MM-DD HH:mm"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          name={"decommissioned"}
          label={"Списание предмета"}
        >
          <Radio.Group>
            <Radio value={true}>Да</Radio>
            <Radio value={false}>Нет</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          name={"location_id"}
          label={"Местоположение"}
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
                locationData?.result?.map((option: any) => {
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
          name={"brand_id"}
          label={"Производитель"}
        >
          <Select
            style={{
              width: '100%'
            }}
            filterOption={false}
          >
            {
              isLoadingBrand
                ? <Spin />
                :
                brandsData?.result?.map((option: any) => {
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
          name={"responsible_id"}
          label={"Пользователь"}
        >
          <Select
            style={{
              width: '100%'
            }}
            filterOption={false}
          >
            {
              isLoadingUsers
                ? <Spin />
                :
                userData?.map((option: any) => {
                  return (
                    <Select.Option key={option?.id?.toString()} value={option?.id?.toString()}>
                      {option?.username}
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

import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import {
  Button,
  Table,
  Modal,
  Dropdown,
  MenuProps, Select, Spin
} from "antd";
import MaxWithLayout from "../../../layouts/MaxWithLayout/index";
import EditIcon from "../../../assets/Icons/EditIcon";
import BucketIcon from "../../../assets/Icons/BucketIcon";
import { MoreOutlined } from "@ant-design/icons/lib";
import AddModal from "../modal/AddModal";
import EditModal from "../modal/EditModal";
import useEquipmentsData from "../../../entities/equipments/hooks/useEquipmentsData";
import { useDeleteEquipments } from "../../../entities/equipments/hooks/useDeleteEquipments";
import EyeIcon from "../../../assets/Icons/EyeIcon";
import useLocationData from "../../../entities/location/hooks/useLocationData";
import InfoModal from "../modal/InfoModal";

const EquipmentsContent = () => {

  const {
    inventoryBookData,
    currentPage,
    setCurrentPage,
    isLoading,
    locationId,
    setLocationId
  } = useEquipmentsData()

  const {
    locationData,
    setLimit,
    isLoading: isLoadingLocation
  } = useLocationData()

  const {
    handleDelete,
    isLoading: isLoadingDelete
  } = useDeleteEquipments()

  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false)

  const [isOpenModalInfo, setIsOpenModalInfo] = useState<{ id: string | null, isOpen: boolean }>({
    id: null,
    isOpen: false
  })
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<{ id: string | null, isOpen: boolean }>({
    id: null,
    isOpen: false
  })

  const productsItemsForEdit: MenuProps["items"] = [
    {
      label: (
        <span style={{ display: "flex", gap: "10px" }}>
          <EditIcon />
          Редактировать
        </span>
      ),
      key: "EDIT",
    },
    {
      label: (
        <span
          style={{
            display: "flex",
            gap: "10px",
            // color: isLoadingDelete ? '#e0e0e0' : 'red',
            color: 'red',
            width: 180,
            // pointerEvents: isLoadingDelete ? 'none' : 'auto'
            pointerEvents: 'auto'
          }}>
          <BucketIcon />
          Удалить
        </span>
      ),
      key: "DELETE",
    }
  ];

  const getProductsActions = (record: any) => {
    return {
      items: productsItemsForEdit,
      onClick: ({ key }: any) => {
        switch (key) {
          case "EDIT":
            setIsOpenModalEdit({
              id: record?.id,
              isOpen: true
            })
            break;
          case "DELETE":
            handleDelete(record?.id)
            break;
        }
      },
    };
  };

  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "19%",
      render: (text: any) => (
        <div
          style={{
            cursor: "pointer"
          }}
          onClick={() => setIsOpenModalInfo({
            isOpen: true,
            id: text
          })}
        >
          <EyeIcon />
        </div>
      )
    },
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
      width: "19%",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
      width: "19%",
    },
    {
      title: "Списание предмета",
      dataIndex: "decommissioned",
      key: "decommissioned",
      width: "19%",
      render: (text: any) => (
        <div>
          {text ? 'Да' : 'Нет'}
        </div>
      )
    },
    {
      title: "Местоположение",
      dataIndex: "",
      key: "",
      width: "19%",
      render: (record: any) => (
        <div>
          {record?.location?.name}
        </div>
      )
    },
    {
      title: "Артикул",
      dataIndex: "sku",
      key: "sku",
      width: "19%",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text?: any, record?: any) => (
        <div
          style={{
            cursor: "pointer",
            color: text ? '#000' : '#000'
          }}
        >
          <Dropdown
            trigger={["click"]}
            placement={"bottomRight"}
            menu={getProductsActions(record)}
          >
            <MoreOutlined
              style={{ cursor: "pointer", fontSize: "20px" }} />
          </Dropdown>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLimit(1000)
  }, [])

  return (
    <MaxWithLayout>
      <div className={styles.homeСontent}>
        <div className={styles.top}>
          <Button onClick={() => setIsOpenModalAdd(true)}>
            Добавить
          </Button>

          <Select
            style={{
              width: '100%'
            }}
            value={locationId}
            onChange={(e: any) => setLocationId(e)}
            filterOption={false}
          >
            <Select.Option key={null} value={null}>
              Не выбрано
            </Select.Option>
            {
              isLoadingLocation
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

        </div>

        <div className={styles.table}>

          <Table
            loading={isLoading || isLoadingDelete}
            className={"product-arrival-table"}
            columns={columns}
            dataSource={inventoryBookData?.result || []}
            scroll={{ x: true }}
            pagination={{
              onChange: (page): any => setCurrentPage(page),
              position: ["bottomCenter"],
              pageSize: 10,
              total: Number(inventoryBookData?.total),
              showSizeChanger: false,
              current: currentPage,
            }}
          />
        </div>

      </div>

      <Modal
        open={isOpenModalAdd}
        closable={false}
        footer={null}
        width={600}
      >
        <AddModal
          onClose={() => setIsOpenModalAdd(false)}
        />
      </Modal>

      {isOpenModalEdit?.id &&
      <Modal
          open={isOpenModalEdit.isOpen}
          closable={false}
          footer={null}
          width={600}
      >
          <EditModal
              id={isOpenModalEdit?.id}
              onClose={() => setIsOpenModalEdit({
                isOpen: false,
                id: null
              })}
          />
      </Modal>
      }

      {isOpenModalInfo?.id &&
      <Modal
          open={isOpenModalInfo.isOpen}
          closable={false}
          footer={null}
          width={600}
      >
          <InfoModal
              id={isOpenModalInfo?.id}
              onClose={() => setIsOpenModalInfo({
                isOpen: false,
                id: null
              })}
          />
      </Modal>
      }

    </MaxWithLayout>
  );
};

export default EquipmentsContent;

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
import useTagData from "../../../entities/tags/hooks/useTagData";
import InfoModal from "../modal/InfoModal";
import useCategoriesData from "../../../entities/categories/hooks/useCategoriesData";
import RentModal from "../modal/RentModal";
import ReturnModal from "../modal/ReturnModal";

const EquipmentsContent = () => {

  const {
    inventoryBookData,
    currentPage,
    setCurrentPage,
    isLoading,
    categoryId,
    tegId,
    setCategoryId,
    setTegId,
    availability,
    setAvailability,
  } = useEquipmentsData()

  const {
    tagData,
    setLimit,
    isLoading: isLoadingLocation
  } = useTagData()

  const {
    categoryData,
    setLimit: setLimitBrand,
    isLoading: isLoadingBrand,
  } = useCategoriesData()

  const {
    handleDelete,
    isLoading: isLoadingDelete
  } = useDeleteEquipments()

  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false)
  const [rentModal, setRentModal] = useState<any>({
    isOpen: false,
    id: null
  })
  const [returnModal, setReturnModal] = useState<any>({
    isOpen: false,
    id: null
  })
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
        <span style={{ display: "flex", gap: "10px" }}>
          <EditIcon />
          Начать аренду
        </span>
      ),
      key: "RENT",
    },
    {
      label: (
        <span style={{ display: "flex", gap: "10px" }}>
          <EditIcon />
          Завершить аренду
        </span>
      ),
      key: "RETURN",
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
          case "RENT":
            setRentModal({
              isOpen: true,
              id: record?.id
            })
            break;
          case "RETURN":
            setReturnModal({
              isOpen: true,
              id: record?.id
            })
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
      width: "5%",
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
      width: "10%",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
      width: "10%",
    },
    {
      title: "Размер",
      dataIndex: "size",
      key: "size",
      width: "10%",
    },
    {
      title: "Доступность",
      dataIndex: "availability",
      key: "availability",
      width: "10%",
      render: (text: any) => (
        <div>
          {text
            ? <div style={{ width: 15, height: 15, backgroundColor: 'green', borderRadius: 50 }} />
            : <div style={{ width: 15, height: 15, backgroundColor: 'red', borderRadius: 50 }} />
          }
        </div>
      )
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      width: "10%",
    },
    {
      title: "Состояние",
      dataIndex: "condition",
      key: "condition",
      width: "10%",
    },
    {
      title: "Тег",
      dataIndex: "",
      key: "",
      width: "10%",
      render: (record: any) => (
        <div>
          {record?.tag?.name}
        </div>
      )
    },
    {
      title: "Категория",
      dataIndex: "",
      key: "",
      width: "10%",
      render: (record: any) => (
        <div>
          {record?.category?.name}
        </div>
      )
    },
    {
      title: "Арендатель",
      dataIndex: "",
      key: "",
      width: "10%",
      render: (record: any) => (
        <div>
          {record?.user?.email || '---'}
        </div>
      )
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "5%",
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
    setLimitBrand(1000)
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
            value={tegId}
            onChange={(e: any) => setTegId(e)}
            filterOption={false}
          >
            <Select.Option key={null} value={null}>
              Все теги
            </Select.Option>
            {
              isLoadingLocation
                ? <Spin />
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

          <Select
            style={{
              width: '100%'
            }}
            value={categoryId}
            onChange={(e: any) => setCategoryId(e)}
            filterOption={false}
          >
            <Select.Option key={null} value={null}>
              Все категории
            </Select.Option>
            {
              isLoadingBrand
                ? <Spin />
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

          <Select
            style={{
              width: '100%'
            }}
            value={availability}
            onChange={(e: any) => setAvailability(e)}
            filterOption={false}
          >
            <Select.Option key={null} value={null}>
              Все
            </Select.Option>
            <Select.Option key={'yea'} value={true}>
              Только доступные
            </Select.Option>
            <Select.Option key={'no'} value={false}>
              Только не доступные
            </Select.Option>
          </Select>
        </div>

        <div>
          <Table
            loading={isLoading || isLoadingDelete}
            className={"product-arrival-table"}
            columns={columns}
            dataSource={inventoryBookData?.data || []}
            scroll={{ x: true }}
            pagination={{
              onChange: (page): any => setCurrentPage(page),
              position: ["bottomCenter"],
              pageSize: 10,
              total: Number(inventoryBookData?.totalPages),
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

      <Modal
        open={rentModal?.isOpen}
        closable={false}
        footer={null}
        width={600}
      >
        <RentModal
          id={rentModal?.id}
          onClose={() => setRentModal({
            id: null,
            isOpen: false
          })}
        />
      </Modal>

      <Modal
        open={returnModal.isOpen}
        closable={false}
        footer={null}
        width={600}
      >
        <ReturnModal
          id={returnModal?.id}
          onClose={() => setReturnModal({
            isOpen: false,
            id: null
          })}
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

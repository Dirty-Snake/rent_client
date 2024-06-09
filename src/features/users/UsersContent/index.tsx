import React, { useState } from 'react';
import styles from './style.module.scss';
import {
  Button,
  Table,
  Modal,
  Dropdown,
  MenuProps,
} from "antd";
import MaxWithLayout from "../../../layouts/MaxWithLayout/index";
import EditIcon from "../../../assets/Icons/EditIcon";
import BucketIcon from "../../../assets/Icons/BucketIcon";
import { MoreOutlined } from "@ant-design/icons/lib";
import AddModal from "../modal/AddModal";
import EditModal from "../modal/EditModal";
import useUserData from "../../../entities/user/hooks/useUserData";
import { useDeleteUser } from "../../../entities/user/hooks/useDeleteUser";

const UsersContent = () => {

  const {
    userData,
    currentPage,
    setCurrentPage,
    isLoading
  } = useUserData()

  const {
    handleDelete,
    isLoading: isLoadingDelete
  } = useDeleteUser()

  const [isOpenModalAdd, setIsOpenModalAdd] = useState<boolean>(false)
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<{id: string | null, isOpen: boolean}>({
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "19%",
    },
    {
      title: "Имя",
      dataIndex: "firstname",
      key: "firstname",
      width: "19%",
    },
    {
      title: "Фамилия",
      dataIndex: "lastname",
      key: "lastname",
      width: "19%",
    },
    {
      title: "Логин",
      dataIndex: "username",
      key: "username",
      width: "19%",
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
      width: "19%",
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

  return (
    <MaxWithLayout>
      <div className={styles.homeСontent}>

        <div className={styles.top}>
          <Button onClick={() => setIsOpenModalAdd(true)}>
            Добавить
          </Button>
        </div>

        <div>
          <Table
            loading={isLoading || isLoadingDelete}
            className={"product-arrival-table"}
            columns={columns}
            dataSource={userData?.data || []}
            scroll={{ x: true }}
            pagination={{
              onChange: (page): any => setCurrentPage(page),
              position: ["bottomCenter"],
              pageSize: 10,
              total: Number(userData?.total),
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

    </MaxWithLayout>
  );
};

export default UsersContent;

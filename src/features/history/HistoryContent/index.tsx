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
import useHistoryData from "../../../entities/history/hooks/useHistoryData";
import { MoreOutlined } from "@ant-design/icons/lib";
import dayjs from "dayjs";

const HistoryContent = () => {

  const {
    historyData,
    currentPage,
    setCurrentPage,
    isLoading
  } = useHistoryData()

  console.log(historyData?.data)

  const columns = [
    {
      title: "Арендуемый инвентарь",
      dataIndex: "equipment",
      key: "equipment",
      width: "16%",
      render: (text?: any, record?: any) => (
        <>
          {record?.equipment?.name}
        </>
      ),
    },
    {
      title: "Сумма арендной платы",
      dataIndex: "rental_amount",
      key: "rental_amount",
      width: "16%",
    },
    {
      title: "Начало аренды",
      dataIndex: "rental_start_date",
      key: "rental_start_date",
      width: "16%",
      render: (text?: any) => (
        <>
          {dayjs(text).format('YYYY-MM-DD HH:mm')}
        </>
      ),
    },
    {
      title: "Конец аренды",
      dataIndex: "rental_end_date",
      key: "rental_end_date",
      width: "16%",
      render: (text?: any) => (
        <>
          {dayjs(text).format('YYYY-MM-DD HH:mm')}
        </>
      ),
    },
    {
      title: "Комментарий",
      dataIndex: "return_note",
      key: "return_note",
      width: "17%",
    },
    {
      title: "Арендатель",
      dataIndex: "return_note",
      key: "return_note",
      width: "16%",
      render: (text?: any, record?: any) => (
        <>
          {record?.user?.email}
        </>
      ),
    },
  ];

  return (
    <MaxWithLayout>
      <div className={styles.homeСontent}>
        <div>
          <Table
            loading={isLoading}
            className={"product-arrival-table"}
            columns={columns}
            dataSource={historyData?.data || []}
            scroll={{ x: true }}
            pagination={{
              onChange: (page): any => setCurrentPage(page),
              position: ["bottomCenter"],
              pageSize: 10,
              total: Number(historyData?.totalPages),
              showSizeChanger: false,
              current: currentPage,
            }}
          />
        </div>
      </div>
    </MaxWithLayout>
  );
};

export default HistoryContent;

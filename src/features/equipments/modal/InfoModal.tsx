import {
  Spin,
} from "antd";
import ModalHeader from "../../../shared/ModalHeader";
import React from "react";
import useEquipmentsDataByID from "../../../entities/equipments/hooks/useEquipmentsDataByID";
import dayjs from "dayjs";

export default function InfoModal({
                                    onClose,
                                    id,
                                  }: any){

  const {
    equipmentsDataById,
    isLoading: isLoadingDataById,
  } = useEquipmentsDataByID(id)

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
      <ModalHeader title={"Информация"} onClose={() => {
        onClose()
      }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <p>
          Название: {equipmentsDataById?.name}
        </p>
        <p>
          Описание: {equipmentsDataById?.description}
        </p>
        <p>
          Цена: {equipmentsDataById?.price}
        </p>
        <p>
          Состояние: {equipmentsDataById?.condition}
        </p>
        <p>
          Размер: {equipmentsDataById?.size}
        </p>
        <p>
          Доступность:
          {equipmentsDataById?.availability
            ? <div style={{ display: 'inline-block', marginLeft: 10, width: 15, height: 15, backgroundColor: 'green', borderRadius: 50 }} />
            : <div style={{ display: 'inline-block', marginLeft: 10, width: 15, height: 15, backgroundColor: 'red', borderRadius: 50 }} />
          }
        </p>
        {equipmentsDataById?.user?.email &&
        <>
            <p>
                Время начала аренды: {dayjs(equipmentsDataById?.rental_start_date).format('YYYY-MM-DD HH:mm')}
            </p>
            <p>
                Время окончания аренды: {dayjs(equipmentsDataById?.rental_end_date).format('YYYY-MM-DD HH:mm')}
            </p>
            <p>
                Тег: {equipmentsDataById?.tag?.name}
            </p>
            <p>
                Пользователь: {equipmentsDataById?.user?.firstname + " " + equipmentsDataById?.user?.lastname}
            </p>
            <p>
                Почта пользователя: {equipmentsDataById?.user?.email}
            </p>
        </>
        }

      </div>
    </div>
  );
}

import { Col, Row } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import React from "react";
import CloseIcon from "../assets/Icons/CloseIcon";

export default function ModalHeader({ title, subtitle, onClose, isWithCircle = true }: any) {
    return (
        <div style={{ marginBottom: "21px" }}>
            <Row justify={"space-between"} style={{ marginBottom: "10px" }}>
                <Col span={22}>
                    <UnorderedListOutlined
                        style={{
                            color: "#4b4b4b",
                            marginRight: "10px",
                            fontSize: "20px",
                        }}
                    />
                    <span className="modal-title">{title}</span>
                </Col>
                {isWithCircle &&
                <Col span={2} style={{ textAlign: "right", cursor: 'pointer'}} onClick={onClose}>
                    <CloseIcon/>
                </Col>
                }

            </Row>
            <div className={"modal-subtitle"}>{subtitle}</div>
        </div>
    );
}

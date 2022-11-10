import React from "react";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { handlePrintOrderOfUser } from "../../../../Store/Reducer/orderReducer";
import { numberWithCommas } from "../../../../utils";

function TableOrder({ orders, confirm, handleShowNavigation }) {
  const dispatch = useDispatch();

  const timeCreatedAtOrder = (dataOrder) => {
    const d = new Date(dataOrder.createdAt);
    return d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
  };

  const printOrderOfUser = (order) => {
    if (order) {
      dispatch(
        handlePrintOrderOfUser({
          orderCode: order.orderCode,
          orderId: order._id,
        })
      );
    }
  };
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      render: (_, record) => {
        return timeCreatedAtOrder(record);
      },
    },
    {
      title: "Phí giao hàng",
      dataIndex: "fee",
      key: "fee",
      render: (_, record) => <tr>{numberWithCommas(record.paymentFee)} đ</tr>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { complete }) => {
        const status = {
          pending: "green",
          cancel: "volcano",
          confirm: "geekblue",
        };
        return (
          <Tag color={status[complete]} key={complete}>
            {complete.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{ marginRight: 10 }}
            onClick={() => handleShowNavigation(record)}
          >
            Xem
          </Button>
          {record.isDelivery ? (
            <Button
              type="dashed"
              icon={<EditOutlined />}
              style={{ marginRight: 10 }}
              onClick={() => printOrderOfUser(record)}
            >
              In
            </Button>
          ) : (
            ""
          )}
          <Popconfirm
            title="Bạn có chắc muốn xóa đơn hàng này ?"
            onConfirm={() => confirm(record)}
            onVisibleChange={() => console.log("visible change")}
          >
            <Button type="dashed" danger ghost icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  console.log(orders);
  return <Table columns={columns} dataSource={orders} />;
}

TableOrder.propTypes = {};

export default TableOrder;

import React, { useEffect, useState } from "react";
import { capitalize } from "lodash";
import { Table, Space, Button, Empty, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// includes
import AddressForm from "./AddressForm";

// redux
import actions from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

// utils
import { previousQuery } from "../../../../utils/common";

const AddressDetails = (props) => {
  const dispatch = useDispatch();

  const toggleActiveAddResp = useSelector(
    (state) => state.user.toggleActiveAddResp
  );
  const userProfileLoading = useSelector(
    (state) => state.user.userProfileLoading
  );

  let [show, setShow] = useState("table");
  let [userData, setUserData] = useState({});
  let [allAddress, setAllAddress] = useState([]);
  let [editAddressData, setEditAddressData] = useState([]);
  let [showAddNewForm, setShowAddNewForm] = useState("addTable");

  useEffect(() => {
    if (props.userData) {
      setUserData(props.userData);
    }
  }, [props?.userData]);

  const prevToggleActiveAddResp = previousQuery(toggleActiveAddResp);

  useEffect(() => {
    if (
      toggleActiveAddResp !== prevToggleActiveAddResp &&
      toggleActiveAddResp
    ) {
      if (props?.userData)
        dispatch(actions.getUserProfile(props?.userData._id));
    }
  }, [toggleActiveAddResp, props?.userData]);

  const changeShow = (show, userId) => {
    setShow(show);
    setShowAddNewForm("addTable");
    if (userId) {
      dispatch(actions.getUserProfile(userId));
    }
  };

  const toggleAddress = (label) => {
    dispatch(actions.toggleActiveAddress(`label=${label}`));
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "Ward",
      dataIndex: "ward",
      key: "ward",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Address detail",
      dataIndex: "addressDetail",
      key: "addressDetail",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "GeoLocation",
      dataIndex: "geoLocation",
      key: "geoLocation",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
    },
    {
      title: "Action",
      key: "action",
      // eslint-disable-next-line react/display-name
      render: (record, _, idx) => {
        return (
          <>
            <Space size="middle">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  setEditAddressData({ ...record, ...props?.allAddress[idx] });
                  changeShow("form");
                }}
              />
            </Space>
            <Space size="middle" style={{ marginLeft: "10px" }}>
              <Popconfirm
                title="Are you sure to delete this location?"
                onConfirm={() => {
                  actions.deleteAddress(record.key);
                  changeShow("table", userData._id);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const { allAddress } = props;
    if (allAddress && allAddress.length > 0) {
      console.log(allAddress);
      const dataAddressTable = allAddress.map((address) => {
        return {
          key: address._id,
          fullname: userData.name,
          label: address.label,
          province: address.province?.ProvinceName,
          ward: address.ward?.WardName,
          district: address.district?.DistrictName,
          addressDetail: address.addressDetail,
          phoneNo: address.phoneno ? address.phoneno : "-",
          geoLocation:
            address.geolocation.coordinates[0] +
            " , " +
            address.geolocation.coordinates[1],
          isActive: (
            <div className="yes-no">
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => {
                    !address.isActive && toggleAddress(address.label);
                  }}
                  checked={address.isActive ? true : false}
                />
                <span className="slider round"></span>
              </label>
            </div>
          ),
          // isActive: address.isActive ? "true" : "false",
        };
      });
      setAllAddress(dataAddressTable);
    }
  }, [props?.allAddress, userData]);

  return (
    <div className="address-details">
      <div className="title-add">
        <h4>Address User Details</h4>
        {show === "table" && showAddNewForm === "addTable" && (
          <Button
            className="secondary"
            onClick={() => setShowAddNewForm("addForm")}
          >
            Add new address
          </Button>
        )}
      </div>
      {show === "form" || showAddNewForm === "addForm" ? (
        show === "form" ? (
          <AddressForm
            changeShow={changeShow}
            editAddressData={editAddressData}
            userId={userData._id}
          />
        ) : (
          <AddressForm changeShow={changeShow} editAddressData={{}} userId="" />
        )
      ) : (
        <Table
          className="orders-table table-wrapper"
          columns={columns}
          dataSource={allAddress}
          pagination={false}
          loading={userProfileLoading}
          expandable={{
            // eslint-disable-next-line react/display-name
            expandedRowRender: (record) => (
              <table className="expanded-table">
                <tbody>
                  {Object.entries(record).map(([key, value], i) => {
                    if (
                      key !== "key" &&
                      key !== "fullname" &&
                      key !== "label"
                    ) {
                      return (
                        <tr key={i}>
                          <td>
                            <button
                              type="button"
                              className="ant-table-row-expand-icon"
                              style={{ visibility: "hidden" }}
                            ></button>
                          </td>
                          <td>{capitalize(key)}</td>
                          <td>{value}</td>
                        </tr>
                      );
                    }
                  })}
                  <tr>
                    <td>
                      <button
                        type="button"
                        className="ant-table-row-expand-icon"
                        style={{ visibility: "hidden" }}
                      ></button>
                    </td>
                    <td>Action </td>
                    <td>
                      <Space size="middle">
                        <a
                          onClick={() => {
                            setEditAddressData(record);
                            changeShow("form");
                          }}
                        >
                          Edit
                        </a>
                      </Space>
                      <Space size="middle">
                        <a
                          onClick={() => {
                            setEditAddressData(record);
                            changeShow("form");
                          }}
                        >
                          Delete
                        </a>
                      </Space>
                    </td>
                  </tr>
                </tbody>
              </table>
            ),
          }}
        />
      )}

      {allAddress?.length === 0 && showAddNewForm === "addTable" && (
        <div className="no-data-table">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
};

export default AddressDetails;

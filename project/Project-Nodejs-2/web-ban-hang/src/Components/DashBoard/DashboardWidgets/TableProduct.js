import React, { forwardRef, memo } from 'react';
import Navigation from './Navigation';
import { Empty, Popconfirm, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import Paginations from '../../ProductItem/Comment/Pagination';
import { useDispatch } from 'react-redux';
import { getProductToPagination } from '../../../Store/Reducer/productsDBReducer';
import { numberWithCommas } from '../../../utils';

const TableProduct = forwardRef((props, ref) => {
    const {
        products,
        total,
        handleRemoveProductItem,
        comments_users,
        handleEditProduct,
        setVisible,
        visible,
        product,
        active,
        setActive,
        handleOnNavigation,
        productsSearch,
        totalCmt,
    } = props;
    const dispatch = useDispatch();

    const handleSetVisible = () => {
        setVisible(false);
    };

    const handleSetActiveProductDetail = () => {
        setActive(null);
    };

    const handlePagination = (num) => {
        const search = `?page=${num}`;
        dispatch(getProductToPagination({ search }));
    };
    const handleRenderUITabletItem = (products) => {
        if (products) {
            return products.map((item, index) => (
                <tr
                    key={index}
                    className={
                        active === index
                            ? 'product-item active-row'
                            : 'product-item'
                    }
                >
                    <td style={{ width: 100 }}>
                        <img
                            alt={index}
                            src={item.varation[0].image || ''}
                            style={{ width: '100%' }}
                        />
                    </td>
                    <td className="name td-text">
                        <p>{item.name}</p>
                    </td>
                    <td className="name">{item.description.trademark}</td>
                    <td className="name price">
                        {numberWithCommas(item.price)}
                        <sup> ??</sup>
                    </td>
                    <td className="name">
                        <div className="name-action">
                            <Tooltip
                                title="Xem chi ti???t s???n ph???m"
                                color="yellow"
                            >
                                <i
                                    className="fad fa-info-circle"
                                    onClick={() =>
                                        handleOnNavigation(index, item)
                                    }
                                ></i>
                            </Tooltip>

                            <Tooltip title="S???a s???n ph???m" color="geekblue">
                                <Link to="/dashboard/widgets/update-product">
                                    <i
                                        className="fad fa-edit"
                                        onClick={() => handleEditProduct(item)}
                                    ></i>
                                </Link>
                            </Tooltip>
                            <Popconfirm
                                title="B???n c?? ch???c ch???n mu???n x??a s???n ph???m n??y ?"
                                onConfirm={() => handleRemoveProductItem(item)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Tooltip title="X??a s???n ph???m" color="red">
                                    <i className="fad fa-trash-alt"></i>
                                </Tooltip>
                            </Popconfirm>
                        </div>
                    </td>
                </tr>
            ));
        } else {
            return (
                <>
                    <tr>
                        <td className="name td-text"></td>
                        <td className="name td-text">
                            <Empty />
                        </td>
                        <td className="name td-text"></td>
                    </tr>
                </>
            );
        }
    };
    return (
        <>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th style={{ width: '45%' }}>Name</th>
                        <th
                            style={{
                                width: '20%',
                            }}
                        >
                            Trademark
                        </th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productsSearch.length
                        ? handleRenderUITabletItem(productsSearch)
                        : handleRenderUITabletItem(products)}
                </tbody>
            </table>
            {visible && (
                <Navigation
                    visible={visible}
                    handleSetVisible={handleSetVisible}
                    product={product}
                    handleSetActiveProductDetail={handleSetActiveProductDetail}
                    comments_users={comments_users}
                    totalCmt={totalCmt}
                />
            )}

            <Paginations total={total} callBack={handlePagination} />
        </>
    );
});

TableProduct.propTypes = {};

export default memo(TableProduct);

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserInfoStatus, selectUserOrders } from "../userSlice";
import { selectLoggedInUser } from "../../Auth/AuthSlice";
import { Navigate } from "react-router-dom";
import { discountPrice } from "../../../app/constant";
import { Grid } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  // const userInfo = useSelector(selectUserInfo);
  console.log("fixxxxxxxxxxxxxxxxxxxxxxrst")
  const orders = useSelector(selectUserOrders);
  console.log(orders)
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);
  // console.log(orders)

  return (
    <div>
      {orders && orders.map((order) => {
        return (
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Order # {order.id}
              </h1>
              <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900">
                Order Status: {order.status}
              </h3>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.id}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">${discountPrice(item.product)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="Inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty: {item.quantity}
                            </label>
                            {/* {product.quantity} */}
                          </div>

                          <div className="flex"></div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Count</p>
                <p>{order.totalItems}</p>
              </div>

              <p className="mt-0.5 text-sm text-gray-500">
                Shipping Address:
              </p>
              <div className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5">
              <div className="flex min-w-0 gap-x-4">
              
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.street}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.city}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.pinCode}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {order.selectedAddress.phone}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {order.selectedAddress.state}
                </p>
              </div>
            </div>
            </div>

            
          </div>
        );
      })}
      {
        status === 'loading' ? (
          <Grid
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
        ): null
      }
    </div>
  );
}

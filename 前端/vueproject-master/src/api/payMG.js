import axios from 'axios';
import { req } from './axiosFun';


/**
 * 订单管理-交易订单 
 **/
// 交易订单-获取交易订单列表
export const OrderList = (params) => { return req("post", "/api/booking-web/booking/BookingList", params) };
// 交易订单-s删除交易订单
export const OrderDelete = (params) => { return axios.delete("/api/booking-web/booking/deleteById?id=" + params).then(res => res.data) };
// 交易订单-交易订单信息提交
export const OrderCommit = (params) => { return req("post", "/api/booking-web/booking/addBooking", params) };
//根据ID获取订单信息
export const GetOrderByUserId=(params) => { return req("post", "/api/booking-web/booking/BookingListByUId", params) };
export const deliverById=(params) => { return axios.post( 
    "/api/booking-web/booking/deliverById?id=" + params).then(res =>
    res.data) };

export const payById=(params) => { return axios.post( 
"/api/booking-web/booking/payById?id=" + params).then(res =>
res.data) };

export const cancelById=(params) => { return axios.post( 
"/api/booking-web/booking/cancelById?id=" + params).then(res =>
res.data) };

export const confirmById=(params) => { return axios.post( 
    "/api/booking-web/booking/confirmById?id=" + params).then(res =>
    res.data) };
import axios from 'axios';
import { req } from './axiosFun';

/**
 * 商品管理
 **/
// 商品管理-获取商品管理列表
export const CakeList = (params) => { return req("post", "/api/cake-web/cake/querycake", params) };
// 商品管理-保存商品管理
export const CakeSave = (params) => { return req("post", "/api/cake-web/cake/addOrUpdateCake", params) };
// 商品管理-删除商品管理
export const CakeDelete = (params) => { return axios.delete("/api/cake-web/cake/deletecake?id=" + params).then(res => res.data) };

// 商品管理-根据主键查询指定的商品信息
export const GetCakeById = (params) => { return axios.post( "/api/cake-web/cake/getcake?id=" + params).then(res => res.data) };
export const getCakeByLike = (params) => { return req("post", "/api/cake-web/cake/querycakeCondition", params) };
/**
 * 商品分类管理
 */
// 商品管理-获取商品管理列表
export const LayerList = (params) => { return req("post", "/api/cake-web/storey/queryStorey", params) };
// 商品管理-保存商品管理
export const LayerSave = (params) => { return req("post", "/api/cake-web/storey/addOrUpdateStorey", params) };
// 商品管理-删除商品管理
export const LayerDelete = (params) => { return axios.delete("/api/cake-web/storey/deleteStorey?id=" + params).then(res => res.data) };

// 商品管理-根据主键查询指定的商品信息
export const GetLayerById = (params) => { return axios.post( "/api/cake-web/storey/getStorey?id=" + params).then(res => res.data) };

/**
 * 商品分类管理
 */
// 商品管理-获取商品管理列表
export const TasteList = (params) => { return req("post", "/api/cake-web/tasty/queryTasty", params) };
// 商品管理-保存商品管理
export const TasteSave = (params) => { return req("post", "/api/cake-web/tasty/addOrUpdateTasty", params) };
// 商品管理-删除商品管理
export const TasteDelete = (params) => { return axios.delete("/api/cake-web/tasty/deleteTasty?id=" + params).then(res => res.data) };

// 商品管理-根据主键查询指定的商品信息
export const GetTasteById = (params) => { return axios.post( "/api/cake-web/tasty/getTasty?id=" + params).then(res => res.data) };

/**
 * 商品分类管理
 */
// 商品管理-获取商品管理列表
export const ShapeList = (params) => { return req("post", "/api/cake-web/shape/queryShape", params) };
// 商品管理-保存商品管理
export const ShapeSave = (params) => { return req("post", "/api/cake-web/shape/addOrUpdateShape", params) };
// 商品管理-删除商品管理
export const ShapeDelete = (params) => { return axios.delete("/api/cake-web/shape/deleteShape?id=" + params).then(res => res.data) };

// 商品管理-根据主键查询指定的商品信息
export const GetShapeById = (params) => { return axios.post( "/api/cake-web/shape/getShape?id=" + params).then(res => res.data) };
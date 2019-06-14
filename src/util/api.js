import axios from 'axios'
import Constant from './Constant'
import config from './config' //获取url信息

axios.defaults.baseURL = `http://localhost:${Constant.port}/`;
/**
 * ref：https://juejin.im/post/5b4049a3f265da0f8524ce12
 */
const qs  = require('qs')

const api = {
   /*  api.http(
    *     name='****',{
    *     data: {},
    *     success: (data) => {
    *       //do Something
    *     },
    *     error: (err) => {
    *       //do Something
    *     },
    *     final: () => {
    *       //do Something
    *     }
    *   }) 
    */
    http(name, obj) {
        if(!name in config) {
            console.log('不存在当前url，请检查是否拼写错误');
            return;
        }
        obj.url = config[name].url;
        if (config[name].method === 'GET') {
            this.get(obj);
        } else {
            this.post(obj);
        }
    },
    async get({url, data, success, error, final}) {
        try {
            let res = await axios.get(url, {params: data})
            res = res.data;
            success && success(res.data);
            // if (res.code && res.code == 0)
            //     success && success(res.data);
            // else {
            //     console.log(res.msg);
            //     error && error(new Error(res.msg));
            // }
        } catch (err) {
            console.log(err);
            error && error(new Error('服务器出错'));
        } finally {
            final && final();
        }
    },
    async post({url, data, success, error, final}) {
        try {
            let res = await axios.post(url, qs.stringify(data));
            res = res.data;
            success && success(res.data);
            // if (res.code && res.code === 0)
            //     success && success(res.data);
            // else {
            //     console.log(res.msg);
            //     error && error(new Error(res.msg));
            // }
        } catch (err) {
            console.log(err);
            error && error(new Error('服务器出错'));
        } finally {
            final && final();
        }
    }
}
export {api}
import FetchMock from 'fetch-mock';
import regionData from './data/region-data.js';

// 配置需要mock的路由
FetchMock.mock('/login', (url, opts) => {
    const params = opts.params;
    if (params.account === '18512345678') {
        if (params.password === '123456') {
            return {code: 200, message: 'success'};
        }
        else {
            return {code: 401, message: '密码错误'};
        }
    }
    else {
        return {code: 400, message: '用户名错误'};
    }
});
// 获取验证token
FetchMock.mock('/getMobileVerifyToken', (url, opts) => {
    return {code: 200, message: 'success', mobileVerifyToken: 'abc123456'};
});
FetchMock.mock('/register/getVerifyCode', (url, opts) => {
    const params = opts.params;
    return {code: 200, message: 'success', mobile: params.mobile };
});
FetchMock.mock('/register/mobile', (url, opts) => {
    const params = opts.params;
    if (params.verifyCode === '123456') {
        return {code: 200, message: 'success'}
    }
    else {
        return {code: 400, message: 'invalid verifyCode'}
    }
});
// 获取省市区数据
FetchMock.mock('/region-data', (url, opts) => {
    return { code: 200, message: 'success', data: regionData }
});
FetchMock.mock('/register/payment', (url, opts) => {
    return { code: 200, message: 'success', data: regionData }
});
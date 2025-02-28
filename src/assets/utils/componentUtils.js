/**
 * 组件工具函数
 * 为应用程序提供通用工具函数
 */

// 类型检查函数
export const isNumber = (value) => typeof value === 'number' && !isNaN(value); // 检查值是否为数字
export const isString = (value) => typeof value === 'string'; // 检查值是否为字符串
export const isFunction = (value) => typeof value === 'function'; // 检查值是否为函数
export const isArray = (value) => Array.isArray(value); // 检查值是否为数组
export const isObject = (value) => value !== null && typeof value === 'object' && !isArray(value); // 检查值是否为对象
export const isEmpty = (value) => {
    if (value === null || value === undefined) return true;
    if (isString(value) || isArray(value)) return value.length === 0;
    if (isObject(value)) return Object.keys(value).length === 0;
    return false;
}; // 检查值是否为空

// 数学工具函数
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max); // 将值限制在指定范围内
export const roundToDecimal = (value, decimals = 2) => {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}; // 将数值四舍五入到指定小数位
export const mapRange = (value, fromMin, fromMax, toMin, toMax) => {
    return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
}; // 将值从一个范围映射到另一个范围

// 数组和对象操作
export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (obj instanceof Object) {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, deepClone(value)])
        );
    }
    return obj;
}; // 深度克隆对象或数组

export const mergeObjects = (target, ...sources) => {
    if (!sources.length) return target;
    const source = sources.shift();
    
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeObjects(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    
    return mergeObjects(target, ...sources);
}; // 深度合并多个对象

// 字符串操作
export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}; // 首字母大写

export const truncateString = (str, maxLength, suffix = '...') => {
    if (!str || str.length <= maxLength) return str;
    return str.substring(0, maxLength) + suffix;
}; // 截断字符串到指定长度，并添加后缀

// 时间和性能函数
export const debounce = (func, wait = 300) => {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}; // 防抖函数，限制函数频繁调用

export const throttle = (func, limit = 300) => {
    let inThrottle;
    return function(...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}; // 节流函数，限制函数执行频率

// 颜色工具函数
export const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}; // 将十六进制颜色转换为RGB对象

export const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}; // 将RGB颜色转换为十六进制字符串

export const randomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}; // 生成随机颜色


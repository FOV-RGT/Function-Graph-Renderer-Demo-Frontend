/**
 * 组件工具函数
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
export const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min; // 生成指定范围内的随机整数
export const randomFloatInRange = (min, max) => Math.random() * (max - min) + min; // 生成指定范围内的随机浮点数
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
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}; // 防抖函数，限制函数频繁调用

export const throttle = (func, limit = 300) => {
    let inThrottle;
    return function (...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}; // 节流函数，限制函数执行频率

// 颜色工具函数(92-362)
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

// 将HSL颜色转换为RGB
export const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
};

// RGB转HSL
export const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

// 生成互补色
export const generateComplementaryColors = (baseColor) => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    // 互补色 (对面的颜色)
    const complementHue = (hsl.h + 180) % 360;
    const complementRgb = hslToRgb(complementHue, hsl.s, hsl.l);
    return [
        baseColor,
        rgbToHex(complementRgb.r, complementRgb.g, complementRgb.b)
    ];
};

// 生成三分色
export const generateTriadicColors = (baseColor) => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors = [];
    colors.push(baseColor);
    // 相隔120度的颜色
    for (let i = 1; i <= 2; i++) {
        const newHue = (hsl.h + 120 * i) % 360;
        const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
        colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    return colors;
};

// 生成类似色
export const generateAnalogousColors = (baseColor, count = 5, angle = 30) => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors = [];
    const halfCount = Math.floor(count / 2);
    for (let i = -halfCount; i <= halfCount; i++) {
        const newHue = (hsl.h + i * angle + 360) % 360;
        const newRgb = hslToRgb(newHue, hsl.s, hsl.l);
        colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    return colors;
};

// 生成单色系列
export const generateMonochromaticColors = (baseColor, count = 5) => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors = [];
    // 保持色相不变，调整饱和度和亮度
    for (let i = 0; i < count; i++) {
        const newLightness = Math.max(Math.min(hsl.l - 30 + i * 15, 95), 5);
        const newSaturation = Math.max(Math.min(hsl.s - 10 + i * 5, 100), 0);
        const newRgb = hslToRgb(hsl.h, newSaturation, newLightness);
        colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    return colors;
};

// 生成基于黄金比例的颜色和谐方案
export const generateGoldenRatioColors = (baseColor, count = 5) => {
    const goldenRatio = 0.618033988749895;
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors = [baseColor];
    let h = hsl.h / 360;
    for (let i = 1; i < count; i++) {
        h += goldenRatio;
        h %= 1;
        const newRgb = hslToRgb(h * 360, hsl.s, hsl.l);
        colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    return colors;
};

/**
 * 生成低饱和度的和谐颜色方案
 * @param {number} count - 需要生成的颜色数量
 * @param {number} saturation - 饱和度, 0-100之间
 * @param {string} schemeType - 配色方案类型: 'analogous', 'complementary', 'triadic', 'tetradic', 'random'
 * @param {number} baseHue - 可选的基础色相 (0-360)，如果不提供则随机生成
 * @param {Object} options - 其他选项
 * @returns {Array} - 颜色数组 (十六进制格式)
 */
export const generateHarmoniousColors = (count = 5, saturation = 30, schemeType = 'analogous', baseHue = null, options = {}) => {
    // 默认选项
    const defaults = {
        minLightness: 40,     // 最小亮度
        maxLightness: 80,     // 最大亮度
        lightnessStep: 8,     // 亮度变化步长
        hueStep: 30           // 色相变化步长
    };
    const settings = { ...defaults, ...options };
    // 如果没有指定基础色相，则随机生成一个
    const startHue = baseHue !== null ? baseHue : Math.floor(Math.random() * 360);
    // 将饱和度限制在合理范围内
    const safeSaturation = clamp(saturation, 10, 80);
    // 根据方案类型生成色相角度
    let hues = [];
    switch (schemeType) {
        case 'complementary':
            // 互补色方案 (相差180度)
            hues = [startHue, (startHue + 180) % 360];
            break;
        case 'triadic':
            // 三角色方案 (相差120度)
            hues = [startHue, (startHue + 120) % 360, (startHue + 240) % 360];
            break;
        case 'tetradic':
            // 四角色方案 (相差90度)
            hues = [startHue, (startHue + 90) % 360, (startHue + 180) % 360, (startHue + 270) % 360];
            break;
        case 'random':
            // 随机色相，但保持一定的视觉和谐度
            hues = [startHue];
            for (let i = 1; i < count; i++) {
                const goldenRatio = 0.618033988749895;
                let newHue = (startHue / 360 + goldenRatio * i) % 1;
                hues.push(Math.floor(newHue * 360));
            }
            break;
        case 'analogous':
        default:
            // 类似色方案 (默认，相邻的色相)
            hues = [];
            const totalSpan = (count - 1) * settings.hueStep;
            const startOffset = -totalSpan / 2;
            for (let i = 0; i < count; i++) {
                hues.push((startHue + startOffset + i * settings.hueStep + 360) % 360);
            }
            break;
    }
    // 确保我们有足够的色相
    while (hues.length < count) {
        const lastHue = hues[hues.length - 1];
        hues.push((lastHue + settings.hueStep) % 360);
    }
    // 如果色相过多，裁剪到所需数量
    hues = hues.slice(0, count);
    // 生成最终的颜色数组
    const colors = [];
    for (let i = 0; i < count; i++) {
        // 为每种颜色计算不同的亮度，创造深浅变化
        const lightness = settings.minLightness +
            (i * settings.lightnessStep) % (settings.maxLightness - settings.minLightness);
        // 从HSL转换到RGB
        const h = hues[i];
        const s = safeSaturation;
        const l = lightness;
        const rgb = hslToRgb(h, s, l);
        // const hexColor = rgbToHex(rgb.r, rgb.g, rgb.b);
        const color = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        colors.push(color);
    }
    return colors;
};

/**
 * 基于颜色数组生成和谐颜色并添加到数组中
 * @param {Array} colorArray - rgba()颜色字符串数组
 * @returns {Array} - 添加了新和谐颜色的数组
 */
export const generateHarmoniousColorFromArray = (colorArray) => {
    // 提取每个rgba字符串中的RGB值
    const rgbValues = colorArray.map(colorStr => {
        const matches = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (matches) {
            return {
                r: parseInt(matches[1], 10),
                g: parseInt(matches[2], 10),
                b: parseInt(matches[3], 10)
            };
        }
        return null;
    }).filter(Boolean);
    // 如果没有有效颜色，随机生成一个作为起点
    if (rgbValues.length === 0) {
        const randomHue = Math.floor(Math.random() * 360);
        const rgb = hslToRgb(randomHue, 50, 60);
        const newColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        colorArray.push(newColor);
        return colorArray;
    }
    // 转换为HSL以便更好地操作
    const hslValues = rgbValues.map(rgb => rgbToHsl(rgb.r, rgb.g, rgb.b));
    // 计算所有现有颜色的色相角度，找到最大间隙
    const sortedHues = hslValues.map(hsl => hsl.h).sort((a, b) => a - b);
    // 找到色环上的最大空隙 
    let maxGap = 0;
    let gapStartHue = 0;
    // 检查相邻色相之间的间隙
    for (let i = 0; i < sortedHues.length; i++) {
        const currentHue = sortedHues[i];
        const nextHue = sortedHues[(i + 1) % sortedHues.length];
        let gap = 0;
        if (i === sortedHues.length - 1) {
            // 处理首尾颜色之间的间隙（环状）
            gap = (360 - currentHue) + nextHue;
        } else {
            gap = nextHue - currentHue;
        }
        if (gap > maxGap) {
            maxGap = gap;
            gapStartHue = currentHue;
        }
    }
    // 在最大间隙中间生成新颜色
    let newHue = 0;
    if (sortedHues.length === 1) {
        // 如果只有一个颜色，取互补色
        newHue = (sortedHues[0] + 180) % 360;
    } else {
        // 在最大间隙的中间位置
        const nextHueIndex = (sortedHues.indexOf(gapStartHue) + 1) % sortedHues.length;
        const nextHue = sortedHues[nextHueIndex];
        if (nextHue > gapStartHue) {
            newHue = gapStartHue + (nextHue - gapStartHue) / 2;
        } else {
            // 处理跨越0度的情况
            newHue = (gapStartHue + ((nextHue + 360) - gapStartHue) / 2) % 360;
        }
    }
    // 计算饱和度和亮度，确保与现有颜色有区别
    const avgSaturation = hslValues.reduce((sum, hsl) => sum + hsl.s, 0) / hslValues.length;
    const avgLightness = hslValues.reduce((sum, hsl) => sum + hsl.l, 0) / hslValues.length;
    // 朝相反方向调整饱和度和亮度以增加辨识度
    const newSaturation = clamp(
        avgSaturation < 50 ? avgSaturation + 20 : avgSaturation - 20, 
        30, 70
    );
    const newLightness = clamp(
        avgLightness < 50 ? avgLightness + 15 : avgLightness - 15, 
        40, 70
    );
    // 转回RGB
    const newRgb = hslToRgb(newHue, newSaturation, newLightness);
    // 添加新颜色到数组
    const newColor = `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`;
    colorArray.push(newColor);
    return colorArray;
};

// 加密哈希函数
export const sha256 = async (input) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}// 生成SHA-256哈希值


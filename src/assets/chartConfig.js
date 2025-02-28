


export const defaultConfig = (target) => ({
    target: target,
    width: target.clientWidth,
    height: target.clientHeight - 4,
    // width: 800,
    // height: 500,
    xAxis: {
        domain: [-10, 10]
    },
    yAxis: {
        domain: [-5, 5]
    },
    grid: true,
    disableZoom: false,
    data: [],
});





export const defaultConfig = (target) => ({
    target: target,
    width: target.clientWidth,
    height: target.clientHeight,
    // width: 800,
    // height: 500,
    xAxis: {
        domain: [-20, 20],
    },
    yAxis: {
        domain: [-10, 10],
    },
    grid: true,
    data: [],
})



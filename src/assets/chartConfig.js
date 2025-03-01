


export const defaultConfig = (target) => ({
    target: target,
    width: target.clientWidth,
    height: target.clientHeight - 4,
    // width: 800,
    // height: 500,
    xAxis: {
        domain: [-10, 10],
        // label: "x",
    },
    yAxis: {
        domain: [-5, 5],
        // label: "y",
    },
    grid: true,
    disableZoom: false,
    data: [],
})



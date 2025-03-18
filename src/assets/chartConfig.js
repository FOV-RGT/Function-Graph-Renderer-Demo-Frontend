


export const defaultConfig = (target) => ({
    target: target,
    width: target.clientWidth,
    height: target.clientHeight,
    // width: 800,
    // height: 500,
    tip: {
        // renderer: (x, y, index) => {
        //     return `(${x.toFixed(2)}, ${y.toFixed(2)})`;
        // }
    },
    xAxis: {
        type: 'linear',
        domain: [-20, 20]
    },
    yAxis: {
        domain: [-10, 10],
    },
    grid: true,
    // data: [{
    //     fn: '1/x * cos(1/x)',
    //     closed: true
    // }],
    data: []
})



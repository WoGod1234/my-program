export const configStatus = {
    title:'图书馆统计状态',
    color: ['#016FFF', '#6BD5FF', '#42CBB8', '#FEB856', '#A572F6', '#E56C7F'],
    data: [
        {
            name: '上架图书',
            value: 12
        },
        {
            name: '正常下架',
            value: 5
        },
        {
            name: '违规违禁',
            value: 7
        },
        {
            name: '盗版图书',
            value: 9
        },
        {
            name: '遗失图书',
            value: 10
        },
        {
            name: '损坏图书',
            value: 1
        }
    ],

}

export const configReturn = {
    animationFrame: 50, // 动画时长
    activeTimeGap: 4000, // 切换间隔(ms)
    radius: '40%',
    activeRadius: '45%',
    color: ['#016FFF', '#6BD5FF', '#42CBB8', '#FEB856', '#A572F6', '#E56C7F'],
    data: [
        {
            name: '正常',
            value: 12
        },
        {
            name: '逾期',
            value: 0
        }
    ],
    digitalFlopStyle: {
        fontSize: 20
    },
    lineWidth: 15,
    digitalFlopStyle: {
        fontSize: 22,
        fill: '#fff'
    }
}

export const configAssets = {
    animationFrame: 50, // 动画时长
    activeTimeGap: 5000, // 切换间隔(ms)
    radius: '40%',
    activeRadius: '45%',
    color: ['#016FFF', '#6BD5FF', '#42CBB8', '#FEB856', '#A572F6', '#E56C7F'],
    data: [
        {
            name: '图书资产',
            value: 12
        },
        {
            name: '其他设施',
            value: 0
        }
    ],
    digitalFlopStyle: {
        fontSize: 20
    },
    lineWidth: 15,
    digitalFlopStyle: {
        fontSize: 22,
        fill: '#fff'
    }
}
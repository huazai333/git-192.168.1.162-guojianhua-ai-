
export function getTaskStatusName(status) {

    switch (status) {

        case 0:
            return '任务不存在'
        case 1:
            return '已接收'
        case 2:
            return '接受失败'
        case 3:
            return '执行中'
        case 4:
            return '任务完成'
        case 5:
            return '任务失败'
        case 6:
            return '已删除'
        case 7:
            return '删除失败'
        case 9:
            return '任务完成'
    }

}



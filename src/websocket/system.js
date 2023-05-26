import {
    MessageBox
} from 'element-ui'
export default {
    data() {
        return {
            systemCount: 0,
            electricData: {},
            electricArr: [], // 电流预警
            thermaArr: [], // 管道预警
            temp: {
                pm: 0,
                temperature: 0,
                humidity: 0,
            }
        }
    },
    created() {
        this.systemCount = 0;
        this.initSystemWebsocket()
    },
    methods: {
        initSystemWebsocket() {
            let _this = this;
            // 尝试建立websocket连接
            try {
                let environment_websockt = new WebSocket(window.GLOBAL_CONFIG['socketURL']);
                // 监听socket连接
                environment_websockt.onopen = () => {

                    console.log("websocket连接成功");
                };
                environment_websockt.onclose = () => {
                    console.log("websocket连接已关闭");
                };
                environment_websockt.onerror = () => {
                    console.log("websocket连接失败");
                };
                environment_websockt.onmessage = res => {
                    let data = JSON.parse(res.data);
                    if (data.type == 1) {

                    }
                };

                // 关闭webscoket连接
                _this.$once("hook:beforeDestroy", () => {
                    environment_websockt.close();
                });
                // 关闭或刷新浏览器 结束websocket连接
                window.addEventListener("beforeunload", () => {
                    environment_websockt.close();
                });
            } catch (error) {
                console.error('链接websocket失败：', error);
                _this.systemCount++;
                // 失败建立连接 五次内失败  尝试重新连接
                if (_this.systemCount < 5) {
                    _this.initSystemWebsocket();
                } else {
                    _this.$confirm('建立websocket连接失败，环境传感器数据无法实时更新！是否重试?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.systemCount = 0;
                        _this.initSystemWebsocket();
                    }).catch(() => {

                    })
                }
            }
        }
    },
}
<template>
   <video style="width: 100%;height: 100%;object-fit: fill"  ref="video"></video>
</template>


<script>
    import qs from "qs";
    export default {
        props: ['msg'],
        data() {
            return {
                rtspUrl:this.msg,
                url:"",
            }
        },
        created() {
            //  this.startVideo();
        },
        methods: {
            startVideo(url) {
                this.url = url
                this.status = false;
                this.pc = new RTCPeerConnection();
                this.pc.ontrack = (e) => {
                    let el = this.$refs.video;
                    if(el){
                        el.srcObject = event.streams[0];
                        el.muted = true;
                        el.autoplay = true;
                        el.controls = true;
                        // el.width = 600;
                    }
                };
                this.pc.oniceconnectionstatechange = (e) => {
                    console.log(
                        new Date() + " ConnectionState:" + this.pc.iceConnectionState
                    );
                };
                this.pc.onnegotiationneeded = this.handleNegotiationNeededEvent;
                this.pc.addTransceiver("video", {
                    direction: "sendrecv",
                });
                // 用于服务器保持连接状态
                let sendChannel = this.pc.createDataChannel("KeepAlive");
                sendChannel.onclose = () => console.log("sendChannel has closed");
                sendChannel.onopen = () => {
                    console.log("sendChannel has opened");
                    sendChannel.send("ping");
                    this.timer = setInterval(() => {
                        sendChannel.send("ping");
                    }, 1000);
                };
            },
            async handleNegotiationNeededEvent() {
                let offer = await this.pc.createOffer();
                await this.pc.setLocalDescription(offer);
                let params = qs.stringify({
                    url: this.url,
                    data: btoa(this.pc.localDescription.sdp),
                });
                this.$http
                    .post(window.GLOBAL_CONFIG['rtspApi_URL']+"/api/v1/play", params, {emulateJSON: true})
                    .then(({ data: res }) => {
                        // console.log(`msg: ${res.msg}; data:${res.data}`);
                        this.pc.setRemoteDescription(
                            new RTCSessionDescription({
                                type: "answer",
                                sdp: atob(res.data),
                            })
                        );
                    })
                    .catch((e) => {
                        console.warn(e); 
                    });
            },
            stopVideo() {
                this.status = true;
                if (this.timer != null) {
                    clearInterval(this.timer);
                }
                if (this.pc != null) {
                    this.pc.close();
                }
                try {
                    let arr=this.$map.getBuilding(this.mapData.mapName).getFloor(this.mapData.floorName).getLayer('videoFence');
                    if(arr&&arr.children){
                        arr.children.forEach(item=>{
                            item.stopFlash();
                        })
                    }
                }catch(err){

                }

            },
        }
    }
</script>

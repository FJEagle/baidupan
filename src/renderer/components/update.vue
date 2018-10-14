<template>
    <transition name="fade">
        <div v-if="show">
            <div class="modal"></div>
            <div class="update">
                <div class="header"><h2>应用更新</h2><i class="close" @click="close"></i></div>
                <div class="body">
                    <p>更新进度</p>
                    <p class="percentage">{{percent}}%</p>
                    <div class="progress">
                        <div class="length" :style="{width:percent+'%'}"></div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "update",
        data() {
            return {
                show: false,
                percent: 0
            }
        },
        methods:{
            close(){
                this.show = false;
            }
        },
        mounted() {
            this.$electron.ipcRenderer.on('appUpdate', (event, data) => {
                this.$electron.ipcRenderer.send('checkForUpdate');
            });

            this.$electron.ipcRenderer.on('checkForUpdate', () => {
                console.log('checkForUpdate')
            });

            this.$electron.ipcRenderer.on('downloadProgress', (event, data) => {
                this.$Message.destroy();
                this.percent = (data.percent).toFixed(2);
                if (data.percent >= 100) {
                  this.$Message.success({content:'下载完毕,三秒钟后应用程序将退出安装更新!',duration:4});
                    this.show = false;
                    setTimeout(()=>{
                        this.$electron.ipcRenderer.on('isUpdateNow');
                    },3000)
                }
            });

            this.$electron.ipcRenderer.on('message', (event, data) => {
                switch (data.status) {
                    case 0:
                        this.$Message.loading(data.msg);
                        break;
                    case 1:
                        this.$Message.destroy();
                        this.$Message.success(data.msg);
                        this.show = true;
                        break;
                    case -1:
                        this.$Message.destroy();
                        this.$Message.error(data.msg);
                        break;
                }
            })
        }
    }
</script>


<style>
    .modal {
        position: absolute;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .4;
        background: #000;
    }

    .update {
        z-index: 10001;
        width: 400px;
        height: 180px;
        background-color: #FFFFFF;
        border-radius: 10px;
        border: 1px solid #CCC;
        position: absolute;
        top: 40%;
        margin-top: -90px;
        left: 50%;
        margin-left: -200px;
        box-shadow: #FFFFFF 0 0 10px;
    }

    .update .header i.close {
        display: inline-block;
        position: absolute;
        top: 11px;
        right: 12px;
        width: 20px;
        height: 20px;
        background-image: url("../assets/img/close.png");
        background-size: 100%;
        cursor: pointer;
    }

    .update .header {
        border-bottom: 1px solid #ccc;
        height: 40px;
        line-height: 40px;
    }

    .update .header h2 {
        text-align: center;
        font-size: 20px;
    }

    .update .body {
        padding-top: 20px;
        text-align: center;
    }

    .update .body .percentage {
        margin-top: 20px;
    }

    .update .body .progress {
        width: 350px;
        height: 30px;
        border: 1px solid #CCCCCC;
        border-radius: 8px;
        margin: 10px auto;
    }

    .update .body .progress .length {
        background-color: #E4393c;
        border-radius: 8px;
        width: 10px;
        height: 30px;
    }
</style>
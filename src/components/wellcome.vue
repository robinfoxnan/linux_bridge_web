<template>
    <div id="wellcome">
        欢迎使用朔雪流量镜像设备。<br/>
        设备支持桥模式以及路由模式实现端口流量镜像。<br/><br/>

        <span class="descript"> 桥接模式：默认桥上所有口能直接共享流量；可以在桥本身过滤掉某些流量，或者在网口上过滤掉某些流量。</span><br/><br/>

        <span class="descript"> 路由模式：从指定的A口按某些规则复制流量到B口，按照规则复制。该模式相对复杂，
            原因在于每个网口都需要设置地址以及网关（互联的设备地址）。类似路由器的端口的配置方式，可以使用30位掩码。
            规则为复制规则。
        </span>
    </div>
</template>
<script>
export default {
    name: 'wellcome',
    //组件创建
    created() {
    },
    mounted(){
    },
    data() {
        return{
        }
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>

.descript {
    font-size: 15px;
    color: #242323;
  }
</style>
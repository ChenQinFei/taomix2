<template>
    <div class="add-menu">
        <a v-if="!isShow" href="javascript:void(0)" class="add-btn" @click="showMenu"><i class="iconfont icon-add">&#xe721;</i></a>
        <div class="wn-menu" :class="{show:isShow}">
            <div class="wn-header" @click="hideMenu"><i class="iconfont icon-back">&#xe716;</i> 所有音乐元素</div>
            <ul class="wn-list">
                <li class="wn-item" v-for="item in wnList" :key="item.id" :style="{backgroundImage: 'url('+require(`../assets/wn/${item.backImg}`)+')'}">
                    <i class="wn-icon" :style="{backgroundImage: 'url('+require(`../assets/wn/${item.iconImg}`)+')'}"></i>
                    <span class="wn-title">{{item.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AddWnMenu',
    props: {
        wnList: Array,
    },
    data(){
        return {
            isShow: false,
        };
    },
    methods: {
        handleAdd(){

        },
        showMenu() {
            this.isShow = true;
        },
        hideMenu() {
            this.isShow = false;
        }
    }

}
</script>
<style lang="scss" scoped>
.add-menu {
    position: absolute;
    bottom: 5%;
    right: 5%;
    .add-btn {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 3px solid #fff;
        border-radius: 30px;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-add {
            font-size: 30px;
            // font-weight: bold;
            color: white;
        }
    }
   
}
.wn-menu {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background-color:  rgba(255, 255, 255, 0.7);
    overflow-y: auto;
    width: 250px;
    transform: translateX(250px);
    transition: transform .5s;
    &.show {
        transform: translateX(0);
    }
    .wn-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 10px;
        background-color: #fff;
        color: #555;
        .icon-back {
            margin-right: 5px;
        }
    }
    .wn-list {
        margin-top: 43px;
        padding: 20px;
        // overflow-y: auto;
        .wn-item {
            background: {
                position: center center;
                size: cover;
                repeat: no-repeat;
            }
            border-radius: 10px;
            list-style-type: none;
            height: 80px;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            .wn-icon {
                display: inline-block;
                width: 50px;
                height: 50px;
                margin-right: 15px;
                background: {
                    repeat: no-repeat;
                    position: center center;
                    size: contain;
                }
            }
            .wn-title {
                color: #fff;
            }
        }
    }
}

</style>

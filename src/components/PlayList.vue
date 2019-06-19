<template>
    <ul class="setList" @click="handleSelect">
        <li v-for="item in wnSettings" :id="item.id" :key="item.id" :class="{active: item.id===selected}">{{item.name}}</li>
    </ul>
</template>
<script>
export default {
    name: "PlayList",
    props: ['wnSettings', 'selected'],
    data() {
        return {};
    },
    methods: {
        handleSelect(e) {
            if (e.target.nodeName.toLowerCase() === 'li') {
                this.$emit('change', e.target.id);
            }
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
$listHeight: 40px;
.setList {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    width: 200px;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 20px;
    li {
        list-style: none;
        height: $listHeight;
        line-height: $listHeight;
        color: #fff;
        border-bottom: 1px solid #fff;
        cursor: pointer;
        &:last-child {
            border-bottom: 0;
        };
        &.active {
            color: pink;
        }

    }

}

</style>

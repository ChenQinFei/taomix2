<template>
    <div ref="playContainer" id="playContainer" class="play-container">
        <ul class="play-circles">
            <li v-for="item in circles" class="play-circle" :key="item.id" :id="item.id"
                :style="[circleStyleObj[item.id], circleShineObj[item.id]]" >
                <img :src="require(`../assets/wn/wnfront${item.id}.png`)" class="circle-icon"/>
            </li>
        </ul>
        <div id="movingCircle" class="moving-circle" :style="{top: `${movingCircle.y}px`, left: `${movingCircle.x}px`}"></div>
    </div>
</template>
<script>
import { debuglog } from 'util';
const DISTANCE_BORDER = 50;
export default {
    name: 'playDiv',
    props: ['circles', "isPlay", "wnList"],
    data(){
        return {
            movingCircle: {
                x: 100, y: 50, speed: {x:1, y:1},
            },
            drawer: null,
            timer: null,
            shine: {},
            w: window.innerHeight,
            h: window.innerWidth,
        }
    },
    computed: {
        circleStyleObj() {
            let res = {};
            this.circles && this.circles.forEach(item => {
                res[item.id] = {
                    left: `${item.x}%`, 
                    top: `${item.y}%`, 
                    backgroundColor: item.color, 
                    width: `${item.r}px`,
                    height: `${item.r}px`, 
                    borderRadius: `${item.r}px`
                }
            });
            return res;
        },
        circleShineObj() {
            let res = {};
            this.circles && this.circles.forEach(item => {
                // debugger;
                res[item.id] = this.shine[item.id]? {
                    boxShadow: `0 0 1em .5em ${item.color}`,
                } : {}
            })
            return res;
        }
        
    },
    methods: {
         handleResize() {
            this.w = window.innerWidth;
            this.h = window.innerHeight;
        },
        move() {
            let top = parseInt(this.movingEle.style.top),
                left = parseInt(this.movingEle.style.left);
            if (top > window.innerHeight - 30 || top < -10)  this.movingCircle.speed.y = -this.movingCircle.speed.y;
            if (left > window.innerWidth - 30 || left < -10) this.movingCircle.speed.x = -this.movingCircle.speed.x;
            this.movingEle.style.top  = `${top + this.movingCircle.speed.y}px`;
            this.movingEle.style.left = `${left + this.movingCircle.speed.x}px`;
            this.circles && this.circles.forEach(item => {
                let distancex = Math.abs(left + 20 - item.x * this.w / 100 - item.r);
                let distancey = Math.abs(top + 20 - item.y * this.h / 100- item.r);
                // debugger;
                if ( Math.pow(distancex,2) + Math.pow(distancey,2) < Math.pow(DISTANCE_BORDER+20+item.r,2)) {
                    // debugger;
                    this.$set(this.shine, item.id, true);
                }
                else this.$set(this.shine, item.id, false);
            });
            this.drawer = requestAnimationFrame(this.move);
        },
        clear() {
            cancelAnimationFrame(this.drawer);
            clearInterval(this.timer);
            this.timer = null;
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.movingEle = document.getElementById('movingCircle');
        requestAnimationFrame(this.move);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
        this.clear();
    },
}
</script>

<style lang="scss" scoped>
$movingRadius: 40px;
$iconSize: 35px;
.play-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    overflow: hidden;
    background: {
        color: #000;
        image: url(../assets/background.png);
        size: cover;
        position: center center;
        repeat: no-repeat;
    }
    .play-circles {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    .play-circle {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: box-shadow 3s;
        .circle-icon {
            width: $iconSize;
            height: $iconSize;
            // position: absolute;
            // top: 50%;
            // left: 50%;
            // margin-left: -$iconSize/2;
            // margin-top: -$iconSize/2;
        }
    }
    .moving-circle {
        position: absolute;
        background-color: transparent;
        width: $movingRadius;
        height: $movingRadius;
        border: 2px solid #fff;
        border-radius: $movingRadius;
    }
}
</style>

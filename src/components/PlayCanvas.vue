<template>
    <canvas id="pc" ref="pc">
        抱歉，你所使用的浏览器不支持canvas属性，请尝试切换浏览器。
    </canvas>
</template>

<script>

export default {
    name: 'PlayCanvas',
    data(){
        return {
            circles: [{
                name: 'bird', r: 10, x: 20, y: 50, color: 'green'
            },{
                name: 'thunder', r: 10, x: 50, y: 50, color: 'blue'
            },],
            movingCircle: {
                r: 20, x: 100, y: 50, color: 'white', stroke: true, lineWidth:5,
                speed: {x:5, y:5},
            },
            drawer: null,
            timer: null,
            w: null,
            h: null,
        }
    },
    methods: {
         handleResize() {
            this.w = this.drawing.width = window.innerWidth;
            this.h = this.drawing.height = window.innerHeight;
            this.paint();
        },
        clearCavans () {
            this.ctx.clearRect(0, 0, this.w, this.h);
        },
        drawCircle(item) {
            this.ctx.beginPath();
           
            this.ctx.arc(item.x, item.y, item.r, 0, Math.PI*2, true)
            if (item.stroke) {
                console.log('i am stroke')
                this.ctx.lineWidth = item.lineWidth || 10;
                this.ctx.strokeStyle = item.color;
                this.ctx.stroke();
            } else {
                this.ctx.fillStyle = item.color;
                this.ctx.fill();
            }
        },
        paint(){
            this.circles.forEach(item => this.drawCircle(item));
            this.drawCircle(this.movingCircle);
        },
        startMove() {
            this.timer = requestAnimationFrame(() => {
                // todo：添加动画
            })
        }
       
    },
    mounted() {
        this.drawing = this.$refs.pc;
        this.ctx = this.drawing.getContext('2d');
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
        this.startMove();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
        cancelAnimationFrame(this.timer);
    }
};
</script>

<style lang="scss" scoped>
canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
</style>

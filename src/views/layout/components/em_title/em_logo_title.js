export function title(){
    var txt = "XXXX园林可视化管理平台";
    var txtH = 19;
    var font = "sans-serif";
    var bg = "#000";
    var rayColor1 = "#e0f7fa";
    var rayColor2 = "#18ffff";
    var fade = 200;

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var cw = canvas.width = 260;
    var ch = canvas.height = 65;
    var w2 = cw / 10;
    var h2 = ch / 10;
    var pi = Math.PI;
    var pi2 = pi * .5;

    var txtCanvas = document.createElement("canvas");
    var txtCtx = txtCanvas.getContext("2d");
    txtCtx.font = txtH + "px " + font;
    txtCtx.textBaseline = "middle";
    var txtW = Math.floor(txtCtx.measureText(txt).width);
    txtCanvas.width = txtW;
    txtCanvas.height = txtH * 1.5;

    var gradient = ctx.createRadialGradient(w2, h2, 0, w2, h2, txtW);
    gradient.addColorStop(0, rayColor2);
    gradient.addColorStop(1, rayColor1);
    ctx.strokeStyle = gradient;

    txtCtx.fillStyle = gradient;
    txtCtx.font = txtH + "px " + font;
    txtCtx.textBaseline = "middle";
    txtCtx.fillText(txt, 0, txtH * .8);

//调整下降
    txtH *= 1.5;

    var bufferCanvas = document.createElement("canvas");
    bufferCanvas.width = txtW;
    bufferCanvas.height = txtH;
    var buffer = bufferCanvas.getContext("2d");


//开始位置
    var sx = (cw - txtW) * 0.5
    var sy = (ch - txtH) * 0.5

//生成数据
    var rays = [];
    var txtData = txtCtx.getImageData(0, 0, txtW, txtH);
    for (var i = 0; i < txtData.data.length; i += 4) {
        var ii = i / 4;
        var row = Math.floor(ii / txtW)
        var col = ii % txtW
        var alpha = txtData.data[i + 3]
        if (alpha !== 0) {
            var c = "rgba("
            c += [txtData.data[i], txtData.data[i + 1], txtData.data[i + 2], alpha / 255]
            c += ")";
            rays.push(new Ray(Math.floor(ii / txtW), ii % txtW, c));
        }
    }
    var current = 1;
//开始动画
    tick();

    function tick() {
        ctx.clearRect(0, 0, cw, ch)
        ctx.drawImage(bufferCanvas, 0, 0, current, txtH, sx, sy, current, txtH)
        ctx.save()
        ctx.globalAlpha = .07;
        ctx.globalCompositeOperation = "lighter";
        if (drawRays(current)) {
            current++;
            current = Math.min(current, txtW)
            window.requestAnimationFrame(tick)
        } else {
            fadeOut()
        }
        ctx.restore()
    }

//淡出
    function fadeOut() {
        ctx.clearRect(0, 0, cw, ch)
        ctx.globalAlpha *= .95;
        ctx.drawImage(bufferCanvas, 0, 0, current, txtH, sx, sy, current, txtH)
        if (ctx.globalAlpha > .01) {
            window.requestAnimationFrame(fadeOut)
        } else {
            window.setTimeout(restart, 5)
        }
    }

//动画重启
    function restart() {
        for (var i = 0; i < rays.length; i++) {
            rays[i].reset()
        }
        ctx.globalAlpha = 1
        buffer.clearRect(0, 0, txtW, txtH)
        current = 1;
        tick();
    }

//画射线
    function drawRays(c) {
        var count = 0;
        ctx.beginPath()
        for (var i = 0; i < rays.length; i++) {
            var ray = rays[i];
            if (ray.col < c) {
                count += ray.draw()
            }
        }
        ctx.stroke()
        return count !== rays.length;
    }

//过滤光线
    function filterRays(r) {
        return Boolean(r);
    }

    function Ray(row, col, f) {
        this.col = col;
        this.row = row;

        var xp = sx + col;
        var yp = sy + row;
        var fill = f;

        var ath = (txtH / 1.5)

        var a = pi2 * (this.row - ath * .5) / ath;
        if (a === 0) {
            a = (Math.random() - .5) * pi2;
        }
        var da = .02 * Math.sign(a);
        da += (Math.random() - .5) * .005;
        var l = 0;
        var dl = Math.random() * 2 + 2;

        var buffered = false;
        this.reset = function () {
            a = pi2 * (this.row - ath * .5) / ath;
            if (a === 0) {
                a = -pi2 * .5;
            }
            l = 0;
            buffered = false
        }
        this.draw = function () {
            if (l < 0) {
                if (!buffered) {
                    buffer.fillStyle = fill;
                    buffer.fillRect(this.col, this.row, 1, 1);
                    buffered = true
                }
                return 1;
            } else {
                ctx.moveTo(xp, yp)
                ctx.lineTo(xp + Math.cos(a) * l, yp + Math.sin(a) * l);
                a += da;
                l += Math.cos(a) * dl;
                return 0;
            }
        }
    }
}

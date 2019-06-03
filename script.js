document.addEventListener("DOMContentLoaded", function()
{
    const canvas = $('#canvas');
    let color = $('#color')[0]['value'];
    let size = $('#size')[0]['value'];

    /* Flag */
    let mouse = null;
    let action = null;
    /* position */
    let startX ;
    let startY ;
    let posX ;
    let posY ;

    /* Button */
    $('#color').on("change", function () {
        color = this.value;
    });
    $('#size').on("change", function () {
        size = this.value;
    });
    $('#pen').click(function (){
        action = 'pen';
    });
    $('#erase').click(function (){
        action = 'erase';
    });
    $('#line').click(function (){
        action = 'line';
    });
    $('#circle').click(function (){
      action = 'circle';
    });
    $('#circleFill').click(function (){
       action = 'circleFull';
    });
    $('#rect').click(function (){
        action = 'rect';
    });
    $('#rectFill').click(function (){
        action = 'rectFull'
    });
    $('#bucket').click(function (){
        action = 'bucket'
    });

    $('#save').click(function (){
        $('#save').attr('href' , canvas[0].toDataURL('image/png'));
    });
    $('#upload').on("change", function (e) {
        let ctx = canvas[0].getContext('2d');
        let upload = window.URL.createObjectURL(e.target.files[0]);
         img = new Image;
         img.src = upload;

         img.onload = function(){
             ctx.drawImage(img, 0, 0);
         }
    });

    canvas.mousedown(function (event) {
        mouse = true;
        posX = event.pageX;
        posY = event.pageY;
        document.onmouseup = mouseUp;
        document.onmousemove = mouseMove;

    });

    function mouseUp (event) {
        mouse = null;
        document.onmousemove = null;
        document.onmouseup = null;
        if (action === 'rect' || action === 'rectFull' || action === 'circle' || action === 'circleFull' || action === 'line'
        || action === 'bucket'){
            coor(event);
            switch (action) {
                case  'rect':
                    rect(canvas, posX, posY, startX, startY);
                    break;
                case 'rectFull':
                    rectFill(canvas, posX, posY, startX, startY);
                    break;
                case 'circle':
                    circle(canvas, posX, posY, startX, startY);
                    break;
                case 'circleFull':
                    fullCircle(canvas, posX, posY, startX, startY);
                    break;
                case 'line':
                    liner(canvas, posX, posY, startX, startY);
                    break;
                case 'bucket':
                    bucketColor(canvas);
                    break;
            }
        }
    }

    function mouseMove (event) {
        if (action === 'pen'|| action === 'erase' ){
            coor(event);
            if (action === 'pen')
                pen(canvas, posX, posY, startX, startY);
            else
                erase(canvas, posX, posY, startX, startY);
        }
    }

    function coor(event) {
        startX = posX;
        startY = posY;
        posX = event.pageX;
        posY = event.pageY;
    }

    function pen(canvas, posx, posy, startx, starty) {
        let ctx = canvas[0].getContext('2d');
        ctx.globalCompositeOperation = 'source-over';
        /* DLC */
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        /* Start drawing*/
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        ctx.lineTo(posx, posy);
        ctx.closePath();
        ctx.stroke();
    }

    function erase(canvas, posx, posy, startx, starty) {
        let ctx = canvas[0].getContext('2d');
        ctx.globalCompositeOperation = 'destination-out';
        /* DLC */
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        /* Start drawing*/
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        ctx.lineTo(posx, posy);
        ctx.closePath();
        ctx.stroke();
    }

    function liner(canvas, posx, posy, startx, starty) {
        let ctx = canvas[0].getContext('2d');
        ctx.globalCompositeOperation = 'source-over';
        /* DLC */
        ctx.strokeStyle = color;
        ctx.lineWidth = size;

        /* Start drawing*/
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        ctx.lineTo(posx, posy);
        ctx.closePath();
        ctx.stroke();
    }

    function circle(canvas, posx, posy, startx, starty) {
        let ctx = canvas[0].getContext('2d');
        let radius = Math.sqrt(Math.pow((posx - startx), 2) + Math.pow((posy - starty), 2));
        ctx.globalCompositeOperation = 'source-over';
        /* DLC */
        ctx.strokeStyle = color;
        ctx.lineWidth = size;

        /* Start drawing */
        ctx.beginPath();
        ctx.arc(startx, starty, radius , 0, 2 * Math.PI, false);
        ctx.stroke();
    }
    function fullCircle(canvas, posx, posy, startx, starty) {
        let ctx = canvas[0].getContext('2d');
        ctx.globalCompositeOperation = 'source-over';
        let radius = Math.sqrt(Math.pow((posx - startx), 2) + Math.pow((posy - starty), 2));
        /* DLC */
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = size;

        /* Start drawing */
        ctx.beginPath();
        ctx.arc(startx, starty, radius , 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.fill();
    }

    function rect(canvas, posx, posy, startx, starty) {
        let ctx = canvas[0].getContext('2d');
        /* DLC */
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        /* Start drawing */
        ctx.strokeRect(startx, starty, posx - startx, posy - starty);
    }

    function rectFill(canvas, posx, posy, startx, starty) {
        let ctx = canvas[0].getContext('2d');
        /* DLC */
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = size;

        /* Start drawing */
        ctx.strokeRect(startx, starty, posx - startx, posy - starty);
        ctx.fillRect(startx, starty, posx - startx, posy - starty);
    }
    function bucketColor(canvas){
        let width = canvas[0].clientWidth;
        let height = canvas[0].clientHeight;

        let ctx = canvas[0].getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
    }

});
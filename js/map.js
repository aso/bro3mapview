var mapSize = 800;
onload = function() {
    _canvas      = document.getElementById("cMap");
    _loc         = document.getElementById("location");
    _mouse       = {"x": 0, "y": 0};
    _timestamp   =  +(new Date().getTime());
    imgFort      = new Image();
    draw();
    _loc.textContent = ["Loc:", "x:", _mouseOffset.left, ",y:", _mouseOffset.top].join('');
    _canvas.onmousemove = evMouseMove;
    _canvas.ondblclick  = evJumpToBigMap;
    _mouseOffset  = _canvas.getBoundingClientRect();
};

var _canvas      = {};
var _loc         = {};
var _mouseOffset = {};
var _mouse       = {};
var _timestamp   = {};
var imgFort      = {};

function evMouseMove(evt) {
    _mouse.x = evt.pageX - _mouseOffset.left;
    _mouse.y = evt.pageY - _mouseOffset.top;
    _loc.textContent = ["Loc:", "x:", parseInt(_mouse.x -mapSize, 10), ",y:", parseInt(mapSize)].join('');
}

function evJumpToBigMap(evt) {
    var target = {};
    target.x = parseInt(_mouse.x -mapSize, 10);
    target.y = parseInt(mapSize - _mouse.y, 10);
    window.open(['http://m1.3gokushi.jp/big_map.php?x=', target.x,'&y=', target.y].join(''), 'bro3mapview');
}

window.onresize = function() {
    console.log('onResize');
    draw();
};

function draw() {
    console.log('Draw!');
    if ( !_canvas || !_canvas.getContext ) { return false; }
    var ctx = _canvas.getContext('2d');
    var img = new Image();
    img.src = "./image/map_all.png?" + _timestamp;
    img.onload = function() {
        ctx.save();
        ctx.clearRect(0,0,_canvas.width,_canvas.height);
        ctx.drawImage(img, 0, 0);
        
        if(document.getElementsByName('viewNpcPower')[0].checked){
            if (!imgFort.src) {
                imgFort.src = "./image/map_fort.png";
                imgFort.onload = function() {
                    ctx.drawImage(imgFort, 0, 0);
                };                    
            } else {
                ctx.drawImage(imgFort, 0, 0);
            }
        }
        ctx.restore();
    };
}

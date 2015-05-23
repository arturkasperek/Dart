
var center_point=[378,378];
var offset_table=[8,25,166,181,275,290];
var root_corner_point=[124,236];
var points_table=[9,12,5,20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14];
//paramtry funkcji ktrora przechoodzi przez środek tarczy i przez powyzszy róg
var a_function_parametr =71/127;
var b_function_parametr=21168/127;
var fake_canvas= document.createElement('canvas');
var fake_canvas2=document.createElement('canvas');
var c_infoCanvas = document.getElementById("infoCanvas");
var ctx_infoCanvas = c_infoCanvas.getContext("2d");
function writeMessage(messangeStr)
{
    ctx_infoCanvas.clearRect(0,0,1000,200);
    ctx_infoCanvas.font = "20px Georgia";
    ctx_infoCanvas.fillText(messangeStr, 25, 25);
}

//ustawiamy canvas do darta na 70% wysokości lub szerokości ekranu w zależności co jest mniejsze, obszar będzie kwadratowy
var newCanvasSize= Math.min(screen.width,screen.height);
newCanvasSize= newCanvasSize* 0.7;
var MainCanvasVar = document.getElementById("mainCanvas");
var MainCanvasVarCtx= MainCanvasVar.getContext("2d");
var actualPlayerScore_canvas=document.getElementById("scoreCanvas");
var actualPlayerScore_canvasCtx=actualPlayerScore_canvas.getContext("2d");
writeMessage('Witaj w symulatorze gry w darta!! Proszę wybrać opcję gry');
//rysujemy plansze darta
var dart_image= new Image();
dart_image.src="images/dart.png";
dart_image.onload = function() {
    dart_image.width=newCanvasSize;
    dart_image.height=newCanvasSize;

    fake_canvas.width=newCanvasSize;
    fake_canvas.height=newCanvasSize;

    fake_canvas2.width=newCanvasSize;
    fake_canvas2.height=newCanvasSize;

    MainCanvasVar.width= newCanvasSize;
    MainCanvasVar.height=newCanvasSize;
    MainCanvasVarCtx.drawImage(dart_image, 0, 0,newCanvasSize,newCanvasSize);
    fake_canvas.getContext("2d").drawImage(dart_image,0,0,newCanvasSize,newCanvasSize);
    fake_canvas2.getContext("2d").drawImage(dart_image,0,0,newCanvasSize,newCanvasSize);
};
//dart_image.width=newCanvasSize;
//dart_image.height=newCanvasSize;
MainCanvasVarCtx.drawImage(dart_image,0,0,100,100);
//Sekcja funkcji
var MainCavas;
var barChart_obj;
var start_system=0;
var current_player;
function start()
{
    start_system=1;
    current_player=1;
    help_var_3=0;
    writeMessage('Witamy w nowej grze! Zaczyna gracz nr1');
    MainCavas=document.getElementById("chartCanvas");
    barChart_obj= newData( document.querySelector('#volume1').value, document.querySelector('#volume2').value,MainCavas);
    updateSelectedBar(barChart_obj);
    stan_przed_kolejka=getValueOfPlayer(1,barChart_obj);
    refreshScoreCanvas(current_player);
}

function outputUpdate1(vol) {
    document.querySelector('#volume1').value = vol;
}
function outputUpdate2(vol) {
    if(vol==1)
    document.querySelector('#volume2').value = 301;
    else if(vol==2) document.querySelector('#volume2').value = 501;
    else document.querySelector('#volume2').value = 801;

}
function outputUpdate3(vol) {
    if(vol==1)
        document.querySelector('#volume3').value = "Amatorski";
    else if(vol==2) document.querySelector('#volume3').value = "Double out";
    else document.querySelector('#volume3').value = "Double in";
}
function lenghtP1P2(point_1,point_2)
{
    return Math.sqrt(Math.pow((point_1[0]-point_2[0]),2)+Math.pow((point_1[1]-point_2[1]),2));
}
function eangle3Points(point1,point2,point3)//zakladam ze 3 parametr to pozycja myszki
{
   var pom= (180/Math.PI)* Math.acos((Math.pow(lenghtP1P2(point1,point2),2)+Math.pow(lenghtP1P2(point1,point3),2)-Math.pow(lenghtP1P2(point2,point3),2))/(2*lenghtP1P2(point1,point2)*lenghtP1P2(point1,point3)));
    if((point3[0]*a_function_parametr+b_function_parametr)-point3[1]<0)
    {
        return 360-pom;
    }
    else
    {
        return pom;
    }
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function getMouseCanvasPixelColor(canvas_ctx,pos_x,pos_y)
{
   var data = canvas_ctx.getImageData(pos_x, pos_y, 1, 1).data;
    return ([data[0], data[1], data[2]]);
}
function getPixelFromData(posX,posY,data,img_width)
{
    return [data[img_width*posY*4+posX*4+0],data[img_width*posY*4+posX*4+1],data[img_width*posY*4+posX*4+2]]
}
function changePixelColor(posX,posY,newColor,data,img_width)
{
    data[img_width*posY*4+posX*4+0]=newColor[0];
    data[img_width*posY*4+posX*4+1]=newColor[1];
    data[img_width*posY*4+posX*4+2]=newColor[2];
}
function isColorsEquel(color1,color2)
{
    if((color1[0]==color2[0]&&color1[1]==color2[1]&&color1[2]==color2[2])) return true;
    else return false;
}
function isColorEquelEx(color1,color2,tolerance)
{
    if(((tolerance-Math.abs(color1[0]-color2[0]))>0)&&((tolerance-Math.abs(color1[1]-color2[1]))>0)&&((tolerance-Math.abs(color1[2]-color2[2]))>0)) return true;
    else return false;
}

function changeColor(point)
{
    var color1ToFill=[217,212,182];var color2ToFill=[0,0,0];var color3ToFill=[255,0,0];var color4ToFill=[0,128,0];
    var tolerancja=65;//tolerancja +- 10 pikseli
    var toChangeColor=[184,3,255];
    var imageData_Obj= fake_canvas.getContext("2d").getImageData(0, 0, newCanvasSize,newCanvasSize);
    var imageData =imageData_Obj.data;
    var mouseColor=getPixelFromData(point[0],point[1],imageData,dart_image.width);
    if(lenghtP1P2(point,center_point)>offset_table[5]){MainCanvasVarCtx.putImageData(imageData_Obj,0,0); return -10;}
    if(isColorsEquel(color1ToFill,mouseColor)||isColorsEquel(color2ToFill,mouseColor)||isColorsEquel(color3ToFill,mouseColor)||isColorsEquel(color4ToFill,mouseColor))
    {
        var list= new Array();list.push(point[0]);list.push(point[1]);
        while(list.length)
        {
            var y_pos_pixel=list.pop();
            var x_pos_pixel=list.pop();
            if(isColorEquelEx(getPixelFromData(x_pos_pixel,y_pos_pixel,imageData,dart_image.width),mouseColor,tolerancja)==false){}
            else
            {
                changePixelColor(x_pos_pixel,y_pos_pixel,toChangeColor,imageData,dart_image.width);
                list.push(x_pos_pixel);list.push(y_pos_pixel-1);
                list.push(x_pos_pixel+1);list.push(y_pos_pixel);
                list.push(x_pos_pixel);list.push(y_pos_pixel+1);
                list.push(x_pos_pixel-1);list.push(y_pos_pixel);

            }
        }
    }
    MainCanvasVarCtx.putImageData(imageData_Obj,0,0);
    fake_canvas.getContext('2d').putImageData(fake_canvas2.getContext("2d").getImageData(0,0,newCanvasSize,newCanvasSize),0,0);
    return 1;
}
function calculatePoints(mousePos)//liczy punkty
{
    var toChangeColor=[184,3,255];
    var lenghtFromCenter=lenghtP1P2(mousePos,center_point);
    var color=getMouseCanvasPixelColor(MainCanvasVar.getContext("2d"),mousePos[0],mousePos[1]);
    var eangle=eangle3Points(center_point,root_corner_point,mousePos);
    if(lenghtFromCenter>offset_table[5]) return 0;
    else
    {
        if(isColorsEquel(color,toChangeColor)) {
            if (lenghtFromCenter < offset_table[0]) return 50;
            else if (lenghtFromCenter < offset_table[1]) return 25;
            else {
                if (lenghtFromCenter < offset_table[2])return points_table[Math.floor(eangle / 18)];
                else if (lenghtFromCenter < offset_table[3])return points_table[Math.floor(eangle / 18)] * 3;
                else if (lenghtFromCenter < offset_table[4])return points_table[Math.floor(eangle / 18)];
                else return points_table[Math.floor(eangle / 18)] * 2;
            }
        }
    }
    return -1;//wynik zwracany gdy trafimy na jakąś krawędź kursorm
}
function refreshScoreCanvas(nr_player_var)
{
    actualPlayerScore_canvasCtx.clearRect(0, 0,400 , 100);
    actualPlayerScore_canvasCtx.fillStyle='black';
    actualPlayerScore_canvasCtx.font = "20px Georgia";
    actualPlayerScore_canvasCtx.fillText('Aktualny stan gracza nr'+nr_player_var+' :', 25, 25);
    actualPlayerScore_canvasCtx.fillStyle='blue';
    actualPlayerScore_canvasCtx.fillText(getValueOfPlayer(nr_player_var,barChart_obj),275,25);
}
MainCanvasVar.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(MainCanvasVar, evt);
    //var color=getMouseCanvasPixelColor(MainCanvasVarCtx,mousePos.x,mousePos.y);
   // var fromCenter=eangle3Points(center_point,root_corner_point,[mousePos.x,mousePos.y]);
   // var score=calculatePoints([mousePos.x,mousePos.y]);
    changeColor([mousePos.x,mousePos.y]);
    var score=calculatePoints([mousePos.x,mousePos.y]);
    if(score>=0) {
        MainCanvasVarCtx.clearRect(0, 0, 50, 50);
        MainCanvasVarCtx.font = "20px Georgia";
        MainCanvasVarCtx.fillText(score, 25, 25);
    }
}, false);
var help_var_3=0;
var stan_przed_kolejka;
MainCanvasVar.addEventListener('click',function(evt){
    if(start_system) {
        var mousePos = getMousePos(MainCanvasVar, evt);
        var score = calculatePoints([mousePos.x, mousePos.y]);
        if(score==-1){}
        else {

            if(help_var_3==3)
            {
                help_var_3=0;
                current_player++;


                if(current_player>document.querySelector('#volume1').value)current_player=1;
                refreshScoreCanvas(current_player);
                stan_przed_kolejka=getValueOfPlayer(current_player,barChart_obj);
            }
            writeMessage('Gracz nr'+ current_player+' trafia w '+score);
           var ret_var= changeValueOfPlayer(current_player,score,barChart_obj);
            updateSelectedBar(barChart_obj);

            if(ret_var==10)
            {
                winnerFunction(current_player,barChart_obj);
                writeMessage('Zawodnik nr '+current_player+' wygrywa!!!!!!');
                start_system=0;
            }
            if(help_var_3==2)
            {
                if(current_player>document.querySelector('#volume1').value)
                {
                    current_player=1;
                    refreshScoreCanvas(current_player);
                }
                else if(current_player==document.querySelector('#volume1').value) refreshScoreCanvas(1);
                else
                    refreshScoreCanvas(current_player+1);
            }
            else refreshScoreCanvas(current_player);
            help_var_3++;
        }
    }
},false);
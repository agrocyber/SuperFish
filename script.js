let cvs = document.createElement("canvas");
cvs.className = 'canvas_class';
cvs.width = "620";
cvs.height = '580';
document.querySelector('div').appendChild(cvs);

let ctx = cvs.getContext('2d');

let imgFish = new Image();
let imgCoin = new Image();
let imgBadCoin = new Image();
let imgSea = new Image();
let cWidth=40;
let fWidth=40;
let startTime = new Date(); //время начала игры
let MaxCoins =10; //максимальное количество монет на канве

fish={
    x:30,
    y:200,
    width:fWidth,
    height:fWidth
};

let score=0;

coin = [];
coin[0]= {
    x:cvs.width,
    y:yPos()
};

badCoin = [];
badCoin[0]= {
    x:cvs.width,
    y:yPos()
};

imgFish.src = "img/fish.png";
imgCoin.src = "img/coin.png";
imgBadCoin.src = "img/bad_coin.png";
imgSea.src = "img/bg1.png";

document.addEventListener('keydown', event=>{
    switch(event.code){
        case'ArrowUp':
        case 'Space': fish.y -=25;
            break;
        case'ArrowDown':
        case 'KeyS': fish.y +=25;
            break;
        case'ArrowLeft': 
        case 'KeyA':fish.x -=25;
            break;
        case'ArrowRight':
        case 'KeyD': fish.x +=25;
            break;
    }
});

function draw(){    ctx.drawImage(imgSea,0,0);
    for (i=0; i<coin.length;i++){
        ctx.drawImage(imgCoin,coin[i].x,coin[i].y,cWidth,cWidth);
        coin[i].x--;
        if(coin[i].x===420 && coin.length<=MaxCoins){
            generateCoin();
        }
        //если монета долетела до левой границы канвы
        if (coin[i].x===0 ){
            coin.splice(i,1);//удаляем из массива
            if (coin.length<=MaxCoins)//если после удаления стало монет меньше максимального количества
                 generateCoin(); //генерируем новую монету
        }
        //если рыбка коснулась монеты
        if (Math.sqrt(Math.pow(fish.x-coin[i].x,2)+Math.pow(fish.y-coin[i].y,2)) < fish.width){
            score++;//увеличиваем счетчик
            if(fish.width<=60){  //увеличиваем рыбку
                fish.width++;
                fish.height++;
            }
            coin.splice(i,1);//удаляем монету из массива
            if(coin.length<=1 )//если длина массива стала меньше или равна 1
                generateCoin();//генерируем новую монету
         
        }
    }
         
    for (i=0; i<badCoin.length;i++){
        ctx.drawImage(imgBadCoin,badCoin[i].x,badCoin[i].y,cWidth,cWidth);
        badCoin[i].x--;
        if(badCoin[i].x===320){
            badCoin.push({
                x:cvs.width,
                y:yPos()
            });
        }
        if (Math.sqrt(Math.pow(fish.x-badCoin[i].x,2)+Math.pow(fish.y-badCoin[i].y,2)) < fish.width){
            
                location.reload();
            }
    //если монета долетела до левой границы экрана - удаляем ее из массива
        if (badCoin[i].x===0){
                badCoin.splice(i,1);
        }
    }
    //проверяем, чтобы рыбка не коснулась границ
    if (fish.x<=0 || 
        fish.x+fish.width>=620 ||
        fish.y<=0 ||
        fish.y+fish.width >= 580 )
             location.reload(); 
    

    ctx.drawImage(imgFish,fish.x,fish.y,fish.width,fish.height);
    fish.y++;

    ctx.fillStyle="#FFFFFF";
    ctx.font='14px Verdana';
    ctx.fillText ('Score: '+score,10,20);
    getTime();//отображаем время игры
   
    requestAnimationFrame(draw);

}
//генерация случайного числа - координаты y рыбки в пределах канвы
function yPos(){
    return Math.floor(Math.random()*(cvs.height-cWidth));
}
//генерация новых монет
function generateCoin(){
    coin.push({
        x: cvs.width,
        y: yPos()
    });

}
//отображение минут и секунд игры
function getTime(){
    let dateNow= new Date();//текущее время в миллисекундах
    let msPerSec = 1000;
    let time= new Date()-startTime; //время игры в миллисекундах
    
    sec =Math.floor(time/msPerSec);//количество секунд
    let minutes=Math.floor(sec/60);//количество минут
    //если минут больше 0, то выводим минуты и секунды
    if (minutes>0)
        ctx.fillText('Time: '+ minutes + "min. "+ (sec-minutes*60) + " sec",120,20);
    else //если минуты = 0, то выводим только секунды
        ctx.fillText('Time: '+ sec + " sec",120,20);

}

imgSea.onload=draw;//отрисовываем содержисое канвы после того, как загрузится самая большая картинка
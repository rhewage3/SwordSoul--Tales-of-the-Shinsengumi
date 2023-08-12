//57.53

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


//resizing the canvas
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);


const gravity = 0.7

//creating players
class Sprite {
    constructor({position, velocity, color = 'red'}){
        this.position = position;
        this.velocity = velocity;
        this.width = 50
        this.height = 150;
        this.lasKey
        this.attackBox = {
            position:this.position ,
            width: 100 ,
            height: 50,
        }
        this.color = color

    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y,this.width, this.height)

        //atackboc draw
        c.fillStyle = 'green';
        c.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y, 
            this.attackBox.width, 
            this.attackBox.height)
    }

    update(){
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


        //making the player stop at the bottom of the canvas
        if(this.position.y + this.height + this.velocity.y > canvas.height) {
            //stoppoing the velocity when the player hit the bottom of the canvas
            this.velocity.y = 0;
        }else{
            //only gravity is working when player is not on the bottom of the canvas
            this.velocity.y += gravity;

        }
    }
}


//player
const player = new Sprite({
     //player location that parsing to the sprite class constructor
    position:{
        x:0,
        y:0
    },
    //player velocity that parsing to the sprite class constructor
    velocity:{
        x:0,
        y:10
    }
});



//enemy
const enemy = new Sprite({
    //enemy location that parsing to the sprite class constructor
   position:{
       x:400,
       y:100
   },
   //enemy velocity that parsing to the sprite class constructor
   velocity:{
       x:0,
       y:0
   },
   color: 'blue'
});

//meovement keys
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }


}



//creating animation class to animate players
function animate(){
    window.requestAnimationFrame(animate)
    //background color of the canvas
    c.fillStyle =  'black'
    //to stop the painting effect we clearing the canvas every loop
    c.fillRect(0,0, canvas.width,canvas.height);
    player.update();
    enemy.update();
    // console.log('go')

    player.velocity.x = 0;
    //player movements
    if(keys.a.pressed && player.lasKey === 'a'){
        player.velocity.x = -7;
    }else if (keys.d.pressed && player.lasKey === 'd'){
        player.velocity.x = 7;
    }

    enemy.velocity.x = 0;
    //enemy movements
    if(keys.ArrowLeft.pressed && enemy.lasKey === 'ArrowLeft'){
        enemy.velocity.x = -7;
    }else if (keys.ArrowRight.pressed && enemy.lasKey === 'ArrowRight'){
        enemy.velocity.x = 7;
    }


    //detect collisions 
    if(player.attackBox.position.x + player.attackBox.width >= enemy.position.x && player.attackBox.position.x <= enemy.position.x + enemy.width){
        console.log('enemy')

    }
}

animate();


//when key is pressed
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        //player movement
        //moving player right
        case 'd':
            keys.d.pressed = true;
            player.lasKey = 'd';
        break;

        //moving player left
        case 'a':
            keys.a.pressed = true;
            player.lasKey = 'a';
        break;
        
        //jumping
        case 'w':
            player.velocity.y = -18
        break;


        //enemy movement
        //moving enemy right
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lasKey = 'ArrowRight';
        break;

        //moving enemy left
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lasKey = 'ArrowLeft';
        break;
        
        //jumping
        case 'ArrowUp':
            enemy.velocity.y = -18
        break;
    }
    console.log(event.key);
})

//when key is relased after pressing
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        //player movements
        //stopping moving player right
        case 'd':
            keys.d.pressed = false;
        break;

        //stopping from moving player left
        case 'a':
            keys.a.pressed = false;
        break;

        //stopping from  player jumping
        case 'w':
            keys.w.pressed = false;
        break;

    }


    switch(event.key){
        //enemy movements
        //stopping moving enemy right
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
        break;

        //stopping from moving enemy left
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        break;
    }
        
    
    console.log(event.key);
})


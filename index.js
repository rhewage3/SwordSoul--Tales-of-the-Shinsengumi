const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


//resizing the canvas
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height);


const gravity = 0.2

//creating players
class Sprite {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150

    }

    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y,50, this.height)
    }

    update(){
        this.draw()
        this.position.y = this.position.y += this.velocity.y


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
   }
});



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
}

animate();
//-------------------------------------------------------
// Base class for the game object
//-------------------------------------------------------


Game = function () {

}

Game.prototype.Load = function () {
    // load sound
    this.blyadSound = new buzz.sound("res/music/blyadfx.mp3");
    this.bleepSound = new buzz.sound("res/music/bleepfx.mp3");
    this.expSound = new buzz.sound("res/music/explosionfx.mp3");

    // load ambient music and play it
    this.SoundAmbient = new buzz.sound("res/music/gamemusic.mp3");
    this.SoundAmbient.loop().play();
    
    this.player = new Player();
    this.meteorRain = new MeteorRain();
    this.staticGraphics = new StaticGraphics();
    this.currentBoom = null;
}

Game.prototype.Calculate = function () {
    this.staticGraphics.Calculate( this.meteorRain.hitCounter );
    if ( this.meteorRain.hitCounter > 2 )
        return;
    
    this.meteorRain.heroIndexPosition = this.player.currentPos;
    
    if ( this.meteorRain.hitPosition != null )
    {
        this.currentBoom = new BoomAnim( this.meteorRain.hitPosition.x, this.meteorRain.hitPosition.y );
        this.meteorRain.hitPosition = null;
        this.expSound.play();
    }
    
    this.meteorRain.Calculate();
    this.player.Calculate(tickperframe);
    if ( this.currentBoom )
    {
        this.currentBoom.Calculate();
        if ( !this.currentBoom.active )
            this.currentBoom = null;
    }
}

Game.prototype.Render = function () {
    if ( this.meteorRain.hitCounter > 2 )
    {
        this.staticGraphics.Render();
        return;
    }
    
    this.staticGraphics.Render();
    this.player.Render();
    this.meteorRain.Render();
    if ( this.currentBoom )
        this.currentBoom.Render();
    
    // Draw info
	ctx.fillStyle = "#FF00AA";    
    ctx.font="15px Arial Black";
    ctx.fillText("Score: "+ this.meteorRain.catchCounter,20,40);
    //ctx.fillText("W: "+ canvas.width + " H: "+canvas.height,20,40);
}

//---------------------------------------------
// mouse input

Game.prototype.onmousedown = function (e) {
    //TODO: get side of screen and send left/right event
}
//-=-=-=-=-=-=-=So, maybe we will use it later-=-=-=-=-=-=-
Game.prototype.onmousemove = function (e) { }
Game.prototype.onmouseup = function (e) { }
//-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//---------------------------------------------
// keyboard input

Game.prototype.onkeydown = function (e) {
    // e.whitch contains charcode of pressed key
    
    if (e.which == 37) //handled left key event
    {
        this.bleepSound.play();
        this.player.MoveLeft();
    }
    if (e.which == 39) //hadled right key event
    {
        this.bleepSound.play();
        this.player.MoveRight();
    }
}

//-=-=-=-=-=-=-=So, maybe we will use it later-=-=-=-=-=-=-
Game.prototype.onkeypress = function (e) { }   
Game.prototype.onkeyup = function (e) { }
//-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-




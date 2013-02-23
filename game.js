//-------------------------------------------------------
// Base class for the game object
//-------------------------------------------------------


Game = function () {

}

Game.prototype.Load = function () {
    ///-=-=-=-=-=-=-SAVING IT FOR SOUND-=-=-=-=-=-=-=-=-=-=-=-
    /* load sound
    this.SoundJump = new buzz.sound("res/jump.ogg");
    this.SoundJump.play();

    // load ambient music and play it
    this.SoundAmbient = new buzz.sound("res/sound.ogg");
    this.SoundAmbient.loop().play();
    -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    this.player = new Player();
}

Game.prototype.Calculate = function () {
    
}

Game.prototype.Render = function () {
    this.player.Render();
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
        this.player.MoveLeft();
    if (e.which == 39) //hadled right key event
        this.player.MoveRight();
}

//-=-=-=-=-=-=-=So, maybe we will use it later-=-=-=-=-=-=-
Game.prototype.onkeypress = function (e) { }   
Game.prototype.onkeyup = function (e) { }
//-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-




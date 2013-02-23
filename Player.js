// ----------------------------------------
// sprite.js - very simple sprite class. 
// You can modify it for your needs
//-----------------------------------------

Player = function()
{
	this.spriteWidth  = 128;
	this.spriteHeight = 256;
	this.positions = [ new Vec2(100, 100), new Vec2(250, 100), new Vec2(450, 100), new Vec2(650, 100) ];
	this.currentPos = 0; //:int - id for place
	
	this.mySpr = new Sprite( { "baseUrl" : "res/player", "fps" : 30, "frames" : ["chelyaba_man.png", "chelyaba_man1.png", "chelyaba_man2.png", "chelyaba_man3.png"] } );
}

Player.prototype.MoveLeft = function()
{ 
	if ( this.currentPos > 0 )
		this.currentPos--;
	//this.mySpr.setFrame( 0 );
}
Player.prototype.MoveRight = function()
{
	if ( this.currentPos < (this.positions.length - 1) )
		this.currentPos++;
	//this.mySpr.setFrame( 1 );
}

Player.prototype.Calculate = function( dt )
{
	this.mySpr.update( dt );
}

Player.prototype.Render = function( )
{
	this.mySpr.draw( this.positions[this.currentPos].x, this.positions[this.currentPos].y );
}
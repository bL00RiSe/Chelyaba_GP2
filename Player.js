// ----------------------------------------
// sprite.js - very simple sprite class. 
// You can modify it for your needs
//-----------------------------------------

Player = function(  )
{
	this.width  = 128;
	this.height = 256;
	this.positions = [ new Vec2(100, 100), new Vec2(300, 100), new Vec2(500, 100), new Vec2(700, 100) ];
	this.currentPos = 0; //:int - id for place
	
	this.mySpr = new Sprite( { "baseUrl" : "res/player", "fps" : 30, "frames" : ["playerLeft.png", "playerRight.png"] } );
}

Player.prototype.MoveLeft = function()
{ this.currentPos = (this.currentPos > 0) ? --this.currentPos : (this.positions.length - 1); }
Player.prototype.MoveRight = function()
{ this.currentPos = (this.currentPos < (this.positions.length-1)) ? ++this.currentPos : 0; }

Player.prototype.Render = function( )
{
	this.mySpr.draw( this.positions[this.currentPos].x, this.positions[this.currentPos].y, width, height );
}
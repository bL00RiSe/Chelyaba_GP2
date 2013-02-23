
StaticGraphics = function()
{
	this.myImg = new Image();
	this.lives = 3;
	this.myImg.src = "res/background1.jpg";
}

StaticGraphics.prototype.Render = function( )
{
	ctx.drawImage( this.myImg, 0, 0 );
}
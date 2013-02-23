
StaticGraphics = function()
{
	this.lives = 3;
	this.mySpr = new Sprite( { "baseUrl" : "res/backgrounds", "fps" : 30, "frames" : ["background1.jpg", "background2.jpg", "background3.jpg", "backgr_gameover.jpg"] } );
}

StaticGraphics.prototype.Calculate = function( hitCount )
{
	this.mySpr.setFrame( hitCount );
}
StaticGraphics.prototype.Render = function( )
{
	this.mySpr.draw( 0, 0 );
}
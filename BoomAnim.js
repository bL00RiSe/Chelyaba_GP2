BoomAnim = function( x, y )
{
	this.lives = 3;
	this.scaleX = 1;
	this.scaleY = 1;
	this.alpha = 1;
	
	this.xPos = x;
	this.yPos = y;
	
	this.myImg = new Image();
	this.myImg.src = "res/background1.jpg";
}

BoomAnim.prototype.Calculate = function( )
{
	this.scaleX += 0.1;
	this.scaleY += 0.1;
	this.alpha -= 0.001;
}

BoomAnim.prototype.Render = function( )
{
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.translate(this.xPos, this.yPos);
	ctx.scale( this.scaleX, this.scaleY );
	ctx.globalAlpha = this.alpha;
	ctx.translate(-256, -256);
	ctx.drawImage( this.myImg, 0, 0 );
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	
	ctx.globalAlpha = 1;
}
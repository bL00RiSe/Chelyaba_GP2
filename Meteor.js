//meteor generator

MeteorRain = function () {
	this.meteorList = new Array();
	this.timer = 0;
	this.fireTimer = 0;
	
	this.start = [ new Vec2(0, 0), new Vec2(200, 0), new Vec2(500, 0), new Vec2(800, 0) ];
	this.finish = [ new Vec2(250, 500), new Vec2(350, 500), new Vec2(450, 500), new Vec2(550, 500) ];
	
	this.pathTime = 7000;
	this.fireDelay = 6000;
	this.heroIndexPosition = 0;
	this.topBucket = 200;
	this.catchCounter = 0;
	this.hitCounter = 0;
}

MeteorRain.prototype.AppendMeteor = function ()
{
	var newItem = null;
	
	this.meteorList.forEach(function(element){if (null==newItem && element.isFree) newItem = element; })
	
	if (null==newItem) 
	{
		newItem = new Meteor(this);
		this.meteorList.push(newItem);
	}
	
	newItem.index = Math.floor( Math.random() * 4);
	newItem.start = this.start[newItem.index].clone();
	newItem.finish = this.finish[newItem.index].clone();
	newItem.Start(this.timer);
	
	return newItem;
}

MeteorRain.prototype.Calculate = function ()
{
	this.timer += tickperframe;
	
	while (this.timer>this.fireTimer) 
	{
		this.fireTimer += this.fireDelay;
		this.AppendMeteor();
		
		//if (this.pathTime > 1000) this.pathTime -= 100;
		if (this.fireDelay > 1000) this.fireDelay -= 100;
	}
	
	var that = this;
	
	this.meteorList.forEach(
	function(element) { if ( !element.isFree ) element.Calculate(that.timer); })
}

MeteorRain.prototype.Render = function ()
{
	this.meteorList.forEach(function(element){if ( !element.isFree ) element.Render();})
}


Meteor = function (thatRain) {
	this.rain = thatRain;
	
	this.isFree = true;
	this.isVisible = false;
	this.index = 1;
	
	this.start = new Vec2(600,0);
	this.finish = new Vec2(300,300);
	this.pathTime = 6000;
	this.rotation = 1;
	this.startTime = 0;
	this.sprite = new Image();
    this.sprite.src = 'res/meteor.png';
	
	this.current = this.start.clone();
}

Meteor.prototype.Start = function (currentTime)
{
	this.pathTime = this.rain.pathTime;
	this.isFree = false;
	this.isVisible = true;
	this.startTime = currentTime;
	this.current.set(this.start);
	
	this.rotation = Math.atan2(this.finish.y - this.start.y, this.finish.x - this.start.x) - Math.PI*3/4;
}

Meteor.prototype.Calculate = function (currentTime)
{
	var progr = (currentTime-this.startTime)/this.pathTime;
	
	if (progr<1)
	{
		var result = this.finish.clone();
		result.subtract(this.start,false);
		result.multiply(progr,false);
		result.add(this.start,false);
		
		this.current = result;
		
		if (this.rain.heroIndexPosition == this.index && this.current.y > this.rain.topBucket)
		{
			this.isVisible = false;
			this.rain.catchCounter++;
			this.isFree = true;
		}
	}
	else
	{
		this.current.clone(this.finish);
		this.isVisible = false;
		this.rain.hitCounter++;
		this.isFree = true;
	}
}

Meteor.prototype.Render = function ()
{
	if (this.isVisible) 
	{
		//ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(this.current.x, this.current.y);
		ctx.rotate(this.rotation);
	    ctx.translate(-32, -32);
		ctx.drawImage( this.sprite, 0, 0 );
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		//ctx.restore();
	}
}
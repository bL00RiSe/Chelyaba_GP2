//meteor generator

MeteorRain = function () {
	this.meteorList = new Array();
	this.timer = 0;
	this.fireTimer = 0;
}

MeteorRain.prototype.AppendMeteor = function ()
{
	var newItem = null;
	
	this.meteorList.forEach(function(element){if (null==newItem && element.isFree) newItem = element; })
	
	if (null==newItem) 
	{
		newItem = new Meteor();
		this.meteorList.push(newItem);
	}
	
	newItem.Start();
	
	return newItem;
}

MeteorRain.prototype.Calculate = function ()
{
	this.timer += tickperframe;
	
	while (this.timer>this.fireTimer) 
	{
		this.fireTimer += 7000;
		this.AppendMeteor();
	}
	
	
	this.meteorList.forEach(function(element){if ( !element.isFree ) element.Calculate(this.timer);})
}

MeteorRain.prototype.Render = function ()
{
	this.meteorList.forEach(function(element){if ( !element.isFree ) element.Render();})
}


Meteor = function () {
	this.pathTime = 6000;
	
	this.isFree = true;
	this.isVisible = false;
	this.start = new Vec2(0,600);
	this.finish = new Vec2(300,300);
	this.startTime = 0;
	this.sprite = new Image();
    this.sprite.src = 'res/creature.png';
	
	this.current = this.start.clone();
}

Meteor.prototype.Start = function (_startTime)
{
	this.isFree = false;
	this.isVisible = true;
	this.startTime = _startTime;
	this.current.set(this.start);
}

Meteor.prototype.Calculate = function (currentTime)
{
	var progr = (currentTime-this.startTime)/this.pathTime;
	
	if (progr<1)
		this.current = (this.finish - this.start)*progr;
	else
	{
		this.current.set(this.finish);
		this.isVisible = false;
	}
}

Meteor.prototype.Render = function ()
{
	//if (this.isVisible) ctx.drawImage( this.sprite, this.current.x, this.current.y );
	if (this.isVisible) ctx.drawImage( this.sprite, 0, 0 );
}
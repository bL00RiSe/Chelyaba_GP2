//meteor generator

MeteorRain = function () {
	this.meteorList = new Array();
	this.timer = 0;
	this.fireTimer = 0;
	
	this.start = [ new Vec2(0, 0), new Vec2(200, 0), new Vec2(400, 0), new Vec2(600, 0) ];
	this.finish = [ new Vec2(300, 300), new Vec2(300, 300), new Vec2(300, 300), new Vec2(300, 300) ];
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
	
	var index = Math.floor( Math.random() * 3);
	
	newItem.start = this.start[index].clone();
	newItem.finish = this.finish[index].clone();
	newItem.Start(this.timer);
	
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
	
	var that = this;
	
	this.meteorList.forEach(
	function(element)
	{
		if ( !element.isFree ) element.Calculate(that.timer);
		})
}

MeteorRain.prototype.Render = function ()
{
	this.meteorList.forEach(function(element){if ( !element.isFree ) element.Render();})
}


Meteor = function () {
	this.pathTime = 6000;
	
	this.isFree = true;
	this.isVisible = false;
	this.start = new Vec2(600,0);
	this.finish = new Vec2(300,300);
	this.startTime = 0;
	this.sprite = new Image();
    this.sprite.src = 'res/creature.png';
	
	this.current = this.start.clone();
}

Meteor.prototype.Start = function (currentTime)
{
	this.isFree = false;
	this.isVisible = true;
	this.startTime = currentTime;
	this.current.set(this.start);
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
	}
	else
	{
		this.current.clone(this.finish);
		this.isVisible = false;
		this.isFree = true;
	}
}

Meteor.prototype.Render = function ()
{
	if (this.isVisible) 
		ctx.drawImage( this.sprite, this.current.x, this.current.y );
}
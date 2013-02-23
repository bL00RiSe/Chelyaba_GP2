//meteor generator

MeteorRain = function () {
	this.meteorList = new Array();
	this.timer = 0;
	this.fireTimer = 0;
}

MeteorRain.prototype.AppendMeteor = function ()
{
	var newItem = null;
	
	meteorList.forEach(function(element){if (null==newItem && element.isFree) newItem = element; })
	
	if (null==newItem) 
	{
		newItem = new Meteor();
		meteorList.push(newItem);
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
	
	
	meteorList.forEach(function(element){if ( !element.isFree ) element.Calculate(this.timer);})
}

MeteorRain.prototype.Draw = function ()
{
	meteorList.forEach(function(element){if ( !element.isFree ) element.Draw();})
}


Meteor = function () {
	this.pathTime = 6000;
	
	this.isFree = true;
	this.isVisible = false;
	this.start = new vec2(0,600);
	this.finish = new vec2(300,300);
	this.startTime = 0;
	this.sprite = new Image();
    this.sprite.src = 'res/creature.png';
	
	this.current = start.clone();
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
	progr = (currentTime-startTime)/pathTime;
	
	if (progr<1)
		this.current = (this.finish - this.start)*progr;
	else
	{
		this.current.set(this.finish);
		this.isVisible = false;
	}
}

Meteor.prototype.Draw = function ()
{
	if (this.isVisible) this.sprite.Draw();
}
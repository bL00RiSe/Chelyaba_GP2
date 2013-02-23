//meteor generator

MeteorRain = function () {
	this.meteorList = new Array();
	this.timer = 0;
}

MeteorRain.prototype.AppendMeteor = function ()
{
	var newItem = null;
	
	for(int i=0; null==newItem && i< meteorList.length; i++)
	{
		if (meteorList[i].isFree) newItem = meteorList[i];
	}
	
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
	meteorList.forEach(function(element){if ( !element.isFree ) element.Calculate();})
}

MeteorRain.prototype.Draw = function ()
{
	meteorList.forEach(function(element){if ( !element.isFree ) element.Draw();})
}


Meteor = function () {
	this.pathTime = 6000;
	
	this.isFree = true;
	this.start = new vec2(0,600);
	this.finish = new vec2(300,300);
	this.startTime = 0;
	
	
	this.current = start.clone();
}

Meteor.prototype.Start = function (_startTime)
{
	this.isFree = false;
	this.startTime = _startTime;
	this.current.set(this.start);
}

Meteor.prototype.Calculate = function (currentTime)
{
	this.current = (this.finish - this.start)*(currentTime-startTime)/pathTime;
}

Meteor.prototype.Draw = function ()
{
	
}
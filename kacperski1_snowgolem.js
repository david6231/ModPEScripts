// Snow Golem mod by kacperski1
// version 0.1

var gX;
var gY;
var gZ;
var preX;
var preY;
var preZ;
var direction;

var active = 0;
var tickCurrent = 0;
var tickDuration = 30;
var debugActive = 0;

var activationItem = 332;
var actBlock1 = 103;
var actBlock2 = 80;
var actBlock3 = 80;

function useItem(x,y,z,itemId,blockId)
{
	if(itemId == activationItem)
	{
		if(blockId == actBlock1 && getTile(x,y-1,z) == actBlock2 && getTile(x,y-2,z) == actBlock3)
		{
			gX = x;
			gY = y - 2;
			gZ = z;
			preX = x;
			preY = y - 2;
			preZ = z;
			direction = Math.floor((Math.random()*4)+1);
			active = 1;
		}

		if(blockId == actBlock2 && getTile(x,y+1,z) == actBlock1 && getTile(x,y-2,z) == actBlock3)
		{
			gX = x;
			gY = y - 1;
			gZ = z;
			preX = x;
			preY = y - 1;
			preZ = z;
			direction = Math.floor((Math.random()*4)+1);
			active = 1;
		}
		
		if(blockId == actBlock3 && getTile(x,y+1,z) == actBlock2 && getTile(x,y+2,z) == actBlock1)
		{
			gX = x;
			gY = y;
			gZ = z;
			preX = x;
			preY = y;
			preZ = z;
			direction = Math.floor((Math.random()*4)+1);
			active = 1;
		}
	}
}

function moveTick()
{
	tickCurrent++;
	if(tickCurrent >= tickDuration)
	{
		tickCurrent = 0;
		return 1;
	}
	return 0;
}

function modTick()
{
	if(active == 1)
	{
		if(moveTick())
		{
			if(Math.floor((Math.random()*8)+1) == 4)
			{
				direction = Math.floor((Math.random()*4)+1);
			}
			switch(direction)
			{
				case 1:
					if(getTile(gX+1,gY,gZ) == 0 && getTile(gX+1,gY+1,gZ) == 0 && getTile(gX+1,gY+2,gZ) == 0)
					{
						setTile(gX,gY,gZ,0);
						setTile(gX,gY+1,gZ,0);
						setTile(gX,gY+2,gZ,0);
						
						setTile(gX+1,gY,gZ,actBlock3);
						setTile(gX+1,gY+1,gZ,actBlock2);
						setTile(gX+1,gY+2,gZ,actBlock1);
						
						gX = gX+1;
					}
					break;
					
				case 2:
					if(getTile(gX-1,gY,gZ) == 0 && getTile(gX-1,gY+1,gZ) == 0 && getTile(gX-1,gY+2,gZ) == 0)
					{
						setTile(gX,gY,gZ,0);
						setTile(gX,gY+1,gZ,0);
						setTile(gX,gY+2,gZ,0);
						
						setTile(gX-1,gY,gZ,actBlock3);
						setTile(gX-1,gY+1,gZ,actBlock2);
						setTile(gX-1,gY+2,gZ,actBlock1);
						
						gX = gX-1;
					}
					break;

				case 3:
					if(getTile(gX,gY,gZ+1) == 0 && getTile(gX,gY+1,gZ+1) == 0 && getTile(gX,gY+2,gZ+1) == 0)
					{
						setTile(gX,gY,gZ,0);
						setTile(gX,gY+1,gZ,0);
						setTile(gX,gY+2,gZ,0);
						
						setTile(gX,gY,gZ+1,actBlock3);
						setTile(gX,gY+1,gZ+1,actBlock2);
						setTile(gX,gY+2,gZ+1,actBlock1);
						
						gZ = gZ+1;
					}
					break;
					
				case 4:
					if(getTile(gX,gY,gZ-1) == 0 && getTile(gX,gY+1,gZ-1) == 0 && getTile(gX,gY+2,gZ-1) == 0)
					{
						setTile(gX,gY,gZ,0);
						setTile(gX,gY+1,gZ,0);
						setTile(gX,gY+2,gZ,0);
						
						setTile(gX,gY,gZ-1,actBlock3);
						setTile(gX,gY+1,gZ-1,actBlock2);
						setTile(gX,gY+2,gZ-1,actBlock1);
						
						gZ = gZ-1;
					}
					break;
			}
		}
	}
}

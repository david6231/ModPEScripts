// Caves mod by kacperski1
// version 0.1

function generateCaves()
{
	var cX;
	var cY;
	var cZ;
	var smaY = 129;
	clientMessage("[Caves] Loading data...");
	for(var xx; xx < 256; xx++)
	{
		for(var zz; zz < 256; zz++)
		{
			for(var yy; yy < 128; yy++)
			{
				if(getTile(xx,yy,zz) == 2)
				{
					if(yy < smaY) {smaY = yy;}
				}
			}
		}
	}
	clientMessage("[Caves] Generating caves...");
	for(var xx; xx < 256; xx++)
	{
		for(var zz; zz < 256; zz++)
		{
			for(var yy; yy < smaY; yy++)
			{
				switch(getTile(xx,yy,zz))
				{
					case 3: setTile(xx,yy,zz,0);
					case 13: setTile(xx,yy,zz,0);
				}
			}
		}
	}
	clientMessage("[Caves] Caves generated! You can now disable this script!");
}

function useItem(x,y,z,itemId,blockId)
{
	if(itemId == 280)
	{
		generateCaves();
	}
}

// Minecart mod by kacperski1
// version 0.0.1

var MinecartBlockID = 48; //Mossy Cobblestone
var MinecartItemID = 421;
var RailBlockID = 42; //Iron Block

var Direction = 0;
var cMinX;
var cMinY;
var cMinZ;

var CTick = 0;
var MinecartTick = 10;
var riding = 0;

function setMinecartItem()
{
	ModPE.setItem(MinecartItemID, 7, 8, "Minecart");
}

function useItem(x, y, z, itemId, blockId, side)
{
	if(blockId == RailBlockID && itemId == MinecartItemID)
	{
		setTile(x, y+1, z, MinecartBlockID);
	}
	if(blockId == MinecartBlockID)
	{
		if(riding == 0)
		{
			cMinX = x;
			cMinY = y;
			cMinZ = z;
			setPosition(getPlayerEnt(),cMinX,cMinY + 1,cMinZ);
			riding = 1;
			preventDefault();
		}
		else {riding = 0;preventDefault();}
	}
}

function checkToMove(xx,yy,zz)
{
	if(getTile(xx,yy - 1,zz) == RailBlockID && getTile(xx,yy,zz) == 0)
	{
		setTile(cMinX,cMinY,cMinZ,0);
		setTile(xx,cMinY,cMinZ,MinecartBlockID);
		cMinX = xx;
		cMinY = yy;
		cMinZ = zz;
		setPosition(getPlayerEnt(), cMinX, cMinY + 2, cMinZ);
		CTick = 0;
		return 1;
	}
	else {return 0;}
}

function modTick()
{
	if(riding == 1)
	{
		CTick++;
		if(CTick == MinecartTick)
		{
			switch(Direction)
			{
				case 0:
					if(checkToMove(cMinX + 1,cMinY,cMinZ))
					{
						Direction = 0;
					}
					else
					{
						if(checkToMove(cMinX, cMinY, cMinZ + 1))
						{
							Direction = 1;
						}
						else
						{
							if(checkToMove(cMinX, cMinY, cMinZ - 1))
							{
								Direction = 2;
							}
							else
							{
								if(checkToMove(cMinX - 1, cMinY, cMinZ))
								{
									Direction = 3;
								}
							}
						}
						
					}
					break;
					
				case 1:
					if(checkToMove(cMinX,cMinY,cMinZ + 1))
					{
						Direction = 1;
					}
					else
					{
						if(checkToMove(cMinX + 1, cMinY, cMinZ))
						{
							Direction = 0;
						}
						else
						{
							if(checkToMove(cMinX - 1, cMinY, cMinZ))
							{
								Direction = 3;
							}
							else
							{
								if(checkToMove(cMinX, cMinY, cMinZ - 1))
								{
									Direction = 2;
								}
							}
						}
						
					}
					break;
					
				case 2:
					if(checkToMove(cMinX,cMinY,cMinZ - 1))
					{
						Direction = 2;
					}
					else
					{
						if(checkToMove(cMinX + 1, cMinY, cMinZ))
						{
							Direction = 0;
						}
						else
						{
							if(checkToMove(cMinX - 1, cMinY, cMinZ))
							{
								Direction = 3;
							}
							else
							{
								if(checkToMove(cMinX, cMinY, cMinZ + 1))
								{
									Direction = 1;
								}
							}
						}
						
					}
					break;
					
				case 3:
					if(checkToMove(cMinX - 1,cMinY,cMinZ))
					{
						Direction = 3;
					}
					else
					{
						if(checkToMove(cMinX, cMinY, cMinZ + 1))
						{
							Direction = 1;
						}
						else
						{
							if(checkToMove(cMinX, cMinY, cMinZ - 1))
							{
								Direction = 2;
							}
							else
							{
								if(checkToMove(cMinX + 1, cMinY, cMinZ))
								{
									Direction = 0;
								}
							}
						}
						
					}
					break;
			}
		}
	}
}

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
		}
		else {riding = 0;}
	}
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
					if(getTile(cMinX + 1,cMinY - 1,cMinZ) == RailBlockID && getTile(cMinX + 1,cMinY,cMinZ) == 0)
					{
						setTile(cMinX,cMinY,cMinZ,0);
						setTile(cMinX + 1,cMinY,cMinZ,MinecartBlockID);
						cMinX = cMinX + 1;
						setPosition(getPlayerEnt(), cMinX, cMinY + 2, cMinZ);
						CTick = 0;
					}
					else {Direction = 1;CTick--;}
					break;
					
				case 1:
					if(getTile(cMinX,cMinY - 1,cMinZ + 1) == RailBlockID && getTile(cMinX,cMinY,cMinZ + 1) == 0)
					{
						setTile(cMinX,cMinY,cMinZ,0);
						setTile(cMinX,cMinY,cMinZ + 1,MinecartBlockID);
						cMinZ = cMinZ + 1;
						setPosition(getPlayerEnt(), cMinX, cMinY + 2, cMinZ);
						CTick = 0;
					}
					else {Direction = 2;CTick--;}
					break;
					
				case 2:
					if(getTile(cMinX,cMinY - 1,cMinZ - 1) == RailBlockID && getTile(cMinX,cMinY,cMinZ - 1) == 0)
					{
						setTile(cMinX,cMinY,cMinZ,0);
						setTile(cMinX,cMinY,cMinZ - 1,MinecartBlockID);
						cMinZ = cMinZ - 1;
						setPosition(getPlayerEnt(), cMinX, cMinY + 2, cMinZ);
						CTick = 0;
					}
					else {Direction = 3;CTick--;}
					break;
					
				case 3:
					if(getTile(cMinX - 1,cMinY - 1,cMinZ) == RailBlockID && getTile(cMinX - 1,cMinY,cMinZ) == 0)
					{
						setTile(cMinX,cMinY,cMinZ,0);
						setTile(cMinX - 1,cMinY,cMinZ,MinecartBlockID);
						cMinX = cMinX - 1;
						setPosition(getPlayerEnt(), cMinX, cMinY + 2, cMinZ);
						CTick = 0;
					}
					else {Direction = 0;CTick--;}
					break;
			}
		}
	}
}

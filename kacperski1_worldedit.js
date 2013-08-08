// WorldEditPE mod by kacperski1
// version 0.1

var x1 = 0;
var y1 = 0;
var z1 = 0;
var x2 = 0;
var y2 = 0;
var z2 = 0;

function wMessage(msg)
{
	clientMessage("[WorldEdit] "+msg);
}

function procCmd(cmd)
{
	var Command = cmd.split(" ");
	switch(Command[0])
	{
		case "help":
			clientMessage("Available commands: /help, /wand, /set, /replace");
			break;
		
		case "/wand":
			addItemInventory(271,1); // Wooden Axe
			addItemInventory(290,1); // Wooden Hoe
			wMessage("Wands given to player! (use axe to position 1, hoe to position 2)");
			break;
			
		case "/set":
			if(Command[1] == 0) {wMessage("Not enough parameters!");}
			else
			{
				var lowestX = Math.min(x1, x2);
				var lowestY = Math.min(y1, y2);
				var lowestZ = Math.min(z1, z2);
				var highestX = Math.max(x1, x2);
				var highestY = Math.max(y1, y2);
				var highestZ = Math.max(z1, z2);
				var BlockNum = 0;

				for(var x = lowestX; x <= highestX; x++)
				{
					for(var y = lowestY; y <= highestY; y++)
					{
						for(var z = lowestZ; z <= highestZ; z++)
						{
							setTile(x,y,z,parseInt(Command[1]));
							BlockNum++;
						}
					}
				}
				wMessage("Successfully changed "+BlockNum+" blocks!");
			}
			break;
			
		case "/replace":
			if(Command[1] == 0 || Command[2] == 0) {wMessage("Not enough parameters!");}
			else
			{
				var lowestX = Math.min(x1, x2);
				var lowestY = Math.min(y1, y2);
				var lowestZ = Math.min(z1, z2);
				var highestX = Math.max(x1, x2);
				var highestY = Math.max(y1, y2);
				var highestZ = Math.max(z1, z2);
				var BlockNum = 0;

				for(var x = lowestX; x <= highestX; x++)
				{
					for(var y = lowestY; y <= highestY; y++)
					{
						for(var z = lowestZ; z <= highestZ; z++)
						{
							if(getTile(x,y,z) == Command[1])
							{
								setTile(x,y,z,parseInt(Command[2]));
								BlockNum++;
							}
						}
					}
				}
				wMessage("Successfully changed "+BlockNum+" blocks!");
			}
			break;
	}
}

function useItem(x,y,z,itemId,blockId)
{
	if(itemId == 271)
	{
		x1 = x;
		y1 = y;
		z1 = z;
		wMessage("Position #1 set.");
		preventDefault();
	}
	
	if(itemId == 290)
	{
		x2 = x;
		y2 = y;
		z2 = z;
		wMessage("Position #2 set.");
		preventDefault();
	}
}

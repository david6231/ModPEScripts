// WorldEditPE mod by kacperski1
// version 0.5

var x1 = 0;
var y1 = 0;
var z1 = 0;
var x2 = 0;
var y2 = 0;
var z2 = 0;
var clip;
var toundo;
var ux1;
var uy1;
var uz1;
var ux2;
var uy2;
var uz2;

function wMessage(msg)
{
	clientMessage("[WorldEdit] "+msg);
}

function saveToUndo(x1,y1,z1,x2,y2,z2)
{
			ux1 = lowestX;
			uy1 = lowestY;
			uz1 = lowestZ;
			ux2 = highestX;
			uy2 = highestY;
			uz2 = highestZ;

			toundo = new Array(wX);
			for (var x = 0; x < wX; ++x) 
			{
				toundo[x] = new Array(wY);
				for (var y = 0; y < wY; ++y) 
				{
					toundo[x][y] = new Array(wZ);
					for (var z = 0; z < wZ; ++z) 
					{
						toundo[x][y][z] = getTile(lowestX + x, lowestY + y, lowestZ + z);
					}
				}
			}
}

function undo()
{
	for(var x = ux1; x < ux2; x++)
	{
		for(var y = uy1; y < uy2; y++)
		{
			for(var z = uz1; z < uz2; z++)
			{
				setTile(x,y,z,toundo[x][y][z]);
			}
		}
	}
	wMessage("Undo successful!");
}

function procCmd(cmd)
{
	var Command = cmd.split(" ");
	switch(Command[0])
	{
		case "help":
			clientMessage("Available commands: /help, //wand, //set, //replace, //drain, //snow, //thaw, //hcuboid, //cut, //copy, //paste, //netherize, //unnetherize, //reactor, //untree, //selectall, //undo");
			break;
			
		case "/help":
			clientMessage("Available commands: /help, //wand, //set, //replace, //drain, //snow, //thaw, //hcuboid, //cut, //copy, //paste, //netherize, //unnetherize, //reactor, //untree, //selectall, //undo");
			break;
		
		case "/wand":
			addItemInventory(267,1); // Iron Sword
			addItemInventory(292,1); // Iron Hoe
			wMessage("Wands given to player! (use sword to position 1, hoe to position 2)");
			break;
			
		case "/set":
			//if(Command[1] == 0) {wMessage("Not enough parameters!");}
			//else
			//{
				saveToUndo(x1,y1,z1,x2,y2,z2)
				
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
			//}
			break;
			
		case "/replace":
			//if(Command[1] == 0 || Command[2] == 0) {wMessage("Not enough parameters!");}
			//else
			//{
				saveToUndo(x1,y1,z1,x2,y2,z2)
			
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
			//}
			break;
			
		case "/drain":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
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
						if(getTile(x,y,z) == 8 || getTile(x,y,z) == 9 || getTile(x,y,z) == 10 || getTile(x,y,z) == 11)
						{
							setTile(x,y,z,0);
							BlockNum++;
						}
					}
				}
			}
			wMessage("Successfully drained "+BlockNum+" blocks!");
			break;
			
		case "/snow":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
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
						if(getTile(x,y,z) != 0 && getTile(x,y,z) != 6 && getTile(x,y,z) != 8 && getTile(x,y,z) != 9 && getTile(x,y,z) != 10 && getTile(x,y,z) != 11 && getTile(x,y,z) != 30 && getTile(x,y,z) != 31 && getTile(x,y,z) != 32 && getTile(x,y,z) != 37 && getTile(x,y,z) != 38 && getTile(x,y,z) != 39 && getTile(x,y,z) != 40 && getTile(x,y,z) != 50 && getTile(x,y,z) != 51 && getTile(x,y,z) != 78 && getTile(x,y+1,z) == 0)
						{
							setTile(x,y+1,z,78);
							BlockNum++;
						}
					}
				}
			}
			wMessage("Successfully snowed "+BlockNum+" blocks!");
			break;
			
		case "/thaw":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
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
						if(getTile(x,y,z) == 78)
						{
							setTile(x,y,z,0);
							BlockNum++;
						}
					}
				}
			}
			wMessage("Successfully thawed "+BlockNum+" blocks!");
			break;
			
		case "/hcuboid":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
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
					setTile(x,y,lowestZ,parseInt(Command[1]));
					setTile(x,y,highestZ,parseInt(Command[1]));
					BlockNum += 2;
					for(var z = lowestZ; z <= highestZ; z++)
					{
						setTile(x,lowestY,z,parseInt(Command[1]));
						setTile(x,highestY,z,parseInt(Command[1]));
						setTile(lowestX,y,z,parseInt(Command[1]));
						setTile(highestX,y,z,parseInt(Command[1]));
						BlockNum += 4;
					}
				}
			}
			wMessage("Successfully created "+BlockNum+" blocks!");
			break;
			
		case "/copy":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
			var lowestX = Math.min(x1, x2);
			var lowestY = Math.min(y1, y2);
			var lowestZ = Math.min(z1, z2);
			var highestX = Math.max(x1, x2);
			var highestY = Math.max(y1, y2);
			var highestZ = Math.max(z1, z2);
			var wX = (highestX - lowestX) + 1;
			var wY = (highestY - lowestY) + 1;
			var wZ = (highestZ - lowestZ) + 1;
			var BlockNum = 0;
			
			clip = new Array(wX);
			for (var x = 0; x < wX; ++x) 
			{
				clip[x] = new Array(wY);
				for (var y = 0; y < wY; ++y) 
				{
					clip[x][y] = new Array(wZ);
					for (var z = 0; z < wZ; ++z) 
					{
						clip[x][y][z] = getTile(lowestX + x, lowestY + y, lowestZ + z);
						BlockNum++;
					}
				}
			}
			wMessage("Copied "+BlockNum+" blocks to clipboard");
			break;
			
		case "/paste":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
			var BlockNum = 0;
			for (var x = 0; x < clip.length; ++x) 
			{
				for (var y = 0; y < clip[0].length; ++y) 
				{
					for (var z = 0; z < clip[0][0].length; ++z) 
					{
						setTile(x1+x, y1+y, z1+z, clip[x][y][z]);
						BlockNum++;
					}
				}
			}
			wMessage("Successfully pasted "+BlockNum+" blocks!");
			break;
			
		case "/cut":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
			var lowestX = Math.min(x1, x2);
			var lowestY = Math.min(y1, y2);
			var lowestZ = Math.min(z1, z2);
			var highestX = Math.max(x1, x2);
			var highestY = Math.max(y1, y2);
			var highestZ = Math.max(z1, z2);
			var wX = (highestX - lowestX) + 1;
			var wY = (highestY - lowestY) + 1;
			var wZ = (highestZ - lowestZ) + 1;
			var BlockNum = 0;
			
			clip = new Array(wX);
			for (var x = 0; x < wX; ++x) 
			{
				clip[x] = new Array(wY);
				for (var y = 0; y < wY; ++y) 
				{
					clip[x][y] = new Array(wZ);
					for (var z = 0; z < wZ; ++z) 
					{
						clip[x][y][z] = getTile(lowestX + x, lowestY + y, lowestZ + z);
						setTile(lowestX + x, lowestY + y, lowestZ + z, 0);
						BlockNum++;
					}
				}
			}
			wMessage("Moved "+BlockNum+" blocks to clipboard");
			break;
			
		case "/netherize":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
			var lowestX = Math.min(x1, x2);
			var lowestY = Math.min(y1, y2);
			var lowestZ = Math.min(z1, z2);
			var highestX = Math.max(x1, x2);
			var highestY = Math.max(y1, y2);
			var highestZ = Math.max(z1, z2);
			
			for(var x = lowestX; x <= highestX; x++)
			{
				for(var y = lowestY; y <= highestY; y++)
				{
					for(var z = lowestZ; z <= highestZ; z++)
					{
						switch(getTile(x,y,z))
						{
							case 2: setTile(x,y,z,87);break;
							case 3: setTile(x,y,z,87);break;
							case 8: setTile(x,y,z,10);break;
							case 9: setTile(x,y,z,11);break;
							case 17: setTile(x,y,z,0);break;
							case 18: setTile(x,y,z,89);break;
							case 1: setTile(x,y,z,87);break;
							case 12: setTile(x,y,z,87);break;
							case 15: setTile(x,y,z,89);break;
							case 37: setTile(x,y,z,40);break;
							case 38: setTile(x,y,z,51);break;
							case 60: setTile(x,y,z,87);break;
							case 59: setTile(x,y,z,51);break;
							case 109: setTile(x,y,z,114);break;
							case 78: setTile(x,y,z,0);break;
						}
					}
				}
			}
			wMessage("Successfully Netherized!");
			break;
			
		case "/unnetherize":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
			var lowestX = Math.min(x1, x2);
			var lowestY = Math.min(y1, y2);
			var lowestZ = Math.min(z1, z2);
			var highestX = Math.max(x1, x2);
			var highestY = Math.max(y1, y2);
			var highestZ = Math.max(z1, z2);
			
			for(var x = lowestX; x <= highestX; x++)
			{
				for(var y = lowestY; y <= highestY; y++)
				{
					for(var z = lowestZ; z <= highestZ; z++)
					{
						switch(getTile(x,y,z))
						{
							case 87: if(getTile(x,y+1,z) == 0) 
									 {
										setTile(x,y,z,2);
									 } 
									 else if(getTile(x,y+5,z) == 0)
									 {
										setTile(x,y,z,3);
									 } 
									 else {setTile(x,y,z,1);}
									 ;break;
							case 10: setTile(x,y,z,8);break;
							case 11: setTile(x,y,z,9);break;
							case 89: setTile(x,y,z,18);break;
							case 37: setTile(x,y,z,40);break;
							case 51: setTile(x,y,z,38);break;
							case 114: setTile(x,y,z,109);break;
						}
					}
				}
			}
			wMessage("Successfully Unnetherized!");
			break;
			
		case "/reactor":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
			setTile(x1,y1+1,z1,4);
			setTile(x1-1,y1+1,z1,4);
			setTile(x1+1,y1+1,z1,4);
			setTile(x1,y1+1,z1-1,4);
			setTile(x1,y1+1,z1+1,4);
			setTile(x1-1,y1+1,z1-1,41);
			setTile(x1-1,y1+1,z1+1,41);
			setTile(x1+1,y1+1,z1-1,41);
			setTile(x1+1,y1+1,z1+1,41);
			setTile(x1,y1+2,z1,247);
			setTile(x1-1,y1+2,z1-1,4);
			setTile(x1-1,y1+2,z1+1,4);
			setTile(x1+1,y1+2,z1-1,4);
			setTile(x1+1,y1+2,z1+1,4);
			setTile(x1,y1+3,z1,4);
			setTile(x1-1,y1+3,z1,4);
			setTile(x1+1,y1+3,z1,4);
			setTile(x1,y1+3,z1-1,4);
			setTile(x1,y1+3,z1+1,4);
			wMessage("Nether Reactor created successfully1!");
			break;
			
		case "/untree":
			saveToUndo(x1,y1,z1,x2,y2,z2)
		
			var lowestX = Math.min(x1, x2);
			var lowestY = Math.min(y1, y2);
			var lowestZ = Math.min(z1, z2);
			var highestX = Math.max(x1, x2);
			var highestY = Math.max(y1, y2);
			var highestZ = Math.max(z1, z2);
			
			for(var x = lowestX; x <= highestX; x++)
			{
				for(var y = lowestY; y <= highestY; y++)
				{
					for(var z = lowestZ; z <= highestZ; z++)
					{
						if(getTile(x,y,z) == 17 || getTile(x,y,z) == 18 || getTile(x,y,z) == 37 || getTile(x,y,z) == 38 || getTile(x,y,z) == 39 || getTile(x,y,z) == 40)
						{
							setTile(x,y,z,0);
						}
					}
				}
			}
			wMessage("Successfully... untreed? :P");
			break;
			
		case "/selectall": //selectall taken from Arjay07's WorldEdit+SPC mod ;)
			x1 = 0
			y1 = 0
			z1 = 0
			x2 = 256
			y2 = 128
			z2 = 256
			wMessage("Whole world selected!");
			break;
			
		case "/undo":
			undo();
			break;
			
	}
}

function useItem(x,y,z,itemId,blockId)
{
	if(itemId == 267)
	{
		x1 = x;
		y1 = y;
		z1 = z;
		wMessage("Position #1 set.");
		preventDefault();
	}
	
	if(itemId == 292)
	{
		x2 = x;
		y2 = y;
		z2 = z;
		wMessage("Position #2 set.");
		preventDefault();
	}
}

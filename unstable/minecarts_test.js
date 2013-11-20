// Minecart mod by kacperski1
// version 0.0.3 UNSTABLE

var buttonWindow = null;

function leaveGame() {
  var activity = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
  activity.runOnUiThread(new java.lang.Runnable({ run: function() {
        if(buttonWindow != null) {
          buttonWindow.dismiss();
          buttonwindow = null;
        }
  }}));
}

var init = false;

var MinecartBlockID = 200;
var MinecartItemID = 421;
var RailBlockID = 201;

var Direction = 0;
var cMinX;
var cMinY;
var cMinZ;

var CTick = 0;
var MinecartTick = 5;
var riding = 0;

var st = "                    ";

function selectLevelHook() 
{
        if (!init) 
		{
                
			Block.defineBlock(MinecartBlockID, st+"Minecart"+st, [66, 66, 66, 66, 66,66], 42, true, 0); 
			Block.setShape(MinecartBlockID, 0.1, 0, 0.1, 1, 0.8, 1);
			
			Block.defineBlock(RailBlockID, st+"Rail"+st, [128,128,128,128,128,128], 42, true, 0);
			Block.setShape(RailBlockID, 0, 0, 0, 1, 0.0625, 1);
			
            init = true;
        }
}

function setMinecartItem()
{
	ModPE.setItem(MinecartItemID, 7, 8, st+"Minecart"+st);
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
		//else {riding = 0;preventDefault();}
	}
}

function checkToMove(xx,yy,zz)
{
	if(getTile(xx,yy - 1,zz) == RailBlockID && getTile(xx,yy,zz) == 0)
	{
		setTile(cMinX,cMinY,cMinZ,0);
		setTile(xx,yy,zz,MinecartBlockID);
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

function  showButton() {
  var activity = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();    
  activity.runOnUiThread(new java.lang.Runnable({ run: function() {
        try{
          buttonWindow = new android.widget.PopupWindow();
          var layout = new android.widget.RelativeLayout(activity);
          var button = new android.widget.Button(activity);
          button.setText("Leave");
          button.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
				riding = 0;
                }
          }));
          layout.addView(button);
          buttonWindow.setContentView(layout);
          buttonWindow.setWidth(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
          buttonWindow.setHeight(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
          buttonWindow.setBackgroundDrawable(new
android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
          buttonWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0);
        }catch(problem){
          print("Error: User can't dance. Or the button can't be drawn, I don't know yet.");
        }
  }}));
}
	try { buttonWindow.show

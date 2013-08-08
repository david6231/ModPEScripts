// Breeding test

var FollowingEntity;
var Rotation;

function getRealPitch()
{
  var realPitch = 0;
  
   if(getPitch() >= 0)
  { 
        
        for(var i = 0; i <= getPitch(); i += 360)
   {
          realPitch = getPitch() - i;
   }
        
   }

  else{
        
  for(var i = 0; i >= getPitch(); i -= 360)
   {
          realPitch = (-1) * (getPitch() +( i * (-1)));
   }
  }
  
  return realPitch;
}

function attackHook(attacker, victim)
{
  if(getCarriedItem() == 296)
	{
		FollowingEntity = victim;
		preventDefault();
	}
}

function modTick()
{
	Rotation = getRealPitch() - 180;
	setRot(FollowingEntity,Rotation,0);
}

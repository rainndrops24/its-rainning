let RainnDelMundo = function(x, y, mass) {
  this.x = x
  this.y = y
  this.mass = mass
}

function findClosestPellet(pellets){
  let pelletDist
  let pelletI = 0

  for(i = 0; i < pellets.length; i++){
    let xDist = Math.abs(pellets[i].x - this.x)
    let yDist = Math.abs(pellets[i].y - this.y)
    let hypot = (xDist**2 + yDist**2)**(1/2)
    if(pelletDist > hypot){
      pelletDist = hypot
      pelletI = i
    }
  }
  
    return pellets[pelletI]
  
}
//players is an array of all Player objects INCLUDING the player
//pellets is an array of all the Pellets in the game
RainnDelMundo.prototype.update = function(players, pellets, viruses) {

  //angle is between 0 and 2pi
  //speed is between 0 and 1
  //you naturally get slower the larger your cell gets!


  
  //farming phase: eat till 100 mass
  if(this.mass < 100){
    let pellet = findClosestPellet(pellets)
    let ang = Math.atan2(pellet.y - this.y, pellet.x - this.x)
    return { angle: ang, speed: 1 }
  }
  //checks to see if virus in proxim
  if(this.mass > 100){
      let xDist = Math.abs(viruses[0].x - this.x)
      let yDist = Math.abs(viruses[0].y - this.y)

      if(xDist < 75 || yDist < 75){
        let ang = Math.atan2(viruses[0].y - this.y, viruses[0].x - this.x)
        return { angle: -ang, speed: 1 }
      }
      
  }
  
  //if player within proximity
  //if big enough to eat: eat player
  if (players.length > 0) {
    //get the angle to player 1
    let ang = Math.atan2(players[0].y - this.y, players[0].x - this.x)
    let xDist = Math.abs(players[0].x - this.x)
    let yDist = Math.abs(players[0].y - this.y)

      if(players[0].mass < this.mass && xDist < 150 || yDist < 150){
        return { angle: ang, speed: 1 }
      }
      else if(players[0].mass > this.mass && xDist < 150 || yDist < 150){
        return { angle: -ang, speed: 1 }
      }
    
  }

   //else: eat pellets
  let pellet = findClosestPellet(pellets)
  let ang = Math.atan2(pellet.y - this.y, pellet.x - this.x)
  return { angle: ang, speed: 1 }
  


  
  /*if (pellets.length > 0) {
    let pellet = findClosestPellet(pellets)

    let xDist = Math.abs(pellet.x - this.x)
    let yDist = Math.abs(pellet.y - this.y)

    //console.log(xDist + " ," + yDist)

    //how fast we will move next
    let radius = agario.objectRadius(this)

    let xLinedUp = pellet.x < this.x + radius && pellet.x > this.x - radius
    let yLinedUp = pellet.y < this.y + radius && pellet.y > this.y - radius

    if (xLinedUp) {
      if (pellet.y < this.y) {
        return { angle: 3 * Math.PI / 2, speed: 1 }
      }
      else {
        return { angle: Math.PI / 2, speed: 1 }
      }
    }
    else if (yLinedUp) {
      if (pellet.x < this.x) {
        return { angle: Math.PI, speed: 1 }
      }
      else if (pellet.x > this.x) {
        return { angle: 0, speed: 1 }
      }
    }

    if (xDist < yDist) {
      if (pellet.x < this.x) {
        return { angle: Math.PI, speed: 1 }
      }
      else if (pellet.x > this.x) {
        return { angle: 0, speed: 1 }
      }
    }
    else {
      if (pellet.y < this.y) {
        return { angle: 3 * Math.PI / 2, speed: 1 }
      }
      else {
        return { angle: Math.PI / 2, speed: 1 }
      }
    }
  }*/

}


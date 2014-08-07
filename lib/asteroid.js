(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, color, radius) {
    Asteroids.MovingObject.call(this, radius, color, pos, vel);
    this.image = new Image();
    this.imgSrc = "http://images.clipartpanda.com/asteroid-clipart-PngMedium-moon-15892.png"
    this.loadImage();
  };

  Asteroid.COLORS = ["gray", "ccc", "bbb"]
  Asteroid.RADIUS = 20;
  Asteroid.MAXVELOCITY = 3;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function () {
    var centerX = Math.random() * DIM_X;
    var centerY = Math.random() * DIM_Y;
    var pos = [centerX, centerY];
    var vel = this.randomVec();
    var astRadius = Asteroid.RADIUS*Math.random()+10;
		var random_index = Math.floor(Math.random()*Asteroid.COLORS.length);
		
    return (new Asteroid(pos, vel, Asteroid.COLORS[random_index], astRadius));
  };

  Asteroid.randomVec = function (dimX, dimY) {
    var velX = Math.random() * Asteroid.MAXVELOCITY * (Math.random() < 0.5 ? 1 : -1 );
    var velY = Math.random() * Asteroid.MAXVELOCITY * (Math.random() < 0.5 ? 1 : -1 );

    return [velX, velY];
   };

  Asteroid.prototype.draw = function (ctx) {
      var x = 2 * this.radius
      // var y = 2 * this.radius
  ctx.drawImage(this.image, this.pos[0]-this.radius, this.pos[1]-this.radius, x, x);
  }

})(this);
(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});


  var Ship = Asteroids.Ship = function(radius, color, pos, vel) {
    Asteroids.MovingObject.call(this, radius, color, pos, vel);
    this.image = new Image();
    this.imgSrc = "http://img2.wikia.nocookie.net/__cb20130424224941/kirby/en/images/4/4c/KA_UFO_2.png"
    this.loadImage();
  }

  Ship.RADIUS = 18;
  Ship.COLOR = "green";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel[0] = (this.vel[0] + impulse[0])
    this.vel[1] = (this.vel[1] + impulse[1])
  };

  Ship.prototype.fireBullet = function(game) {
    if (!(this.vel[0] === 0 && this.vel[1] === 0)) {
      var vel = this.vel.slice();
      var velX = vel[0];
      var velY = vel[1];
      var bulletPos = this.pos.slice();
      var bulletSpeed = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2));
      bulletSpeed = bulletSpeed / Asteroids.Bullet.VELOCITYFACTOR;
      var bulletVel = [velX/bulletSpeed, velY/bulletSpeed];
      return (new Asteroids.Bullet(Asteroids.Bullet.RADIUS, Asteroids.Bullet.COLOR, bulletPos, bulletVel, game));
    }
    else {
      return null;
    }
  }

  Ship.prototype.draw = function(ctx) {
      // Asteroids.MovingObject.draw.call(this, ctx);
        var x = 2.5 * this.image.width/this.image.height * this.radius
        var y = 2.5 * this.radius
    ctx.drawImage(this.image, this.pos[0]-18, this.pos[1]-7, x, y);
  };

  Ship.prototype.draw = function (ctx) {
      var x = 2.2 * this.radius
      // var y = 2 * this.radius
  ctx.drawImage(this.image, this.pos[0]-this.radius, this.pos[1]-this.radius, x, x);
  }



})(this);
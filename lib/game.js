(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  DIM_X = 771;
  DIM_Y = 474;
  FPS = 30;
  NUM_ASTEROIDS = 10;

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship(Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR, [DIM_X/2,DIM_Y/2],[0,0]);
    this.timerId = null;
    this.highScore = 0;
    this.score = 0;
    this.particles = [];
  };

  Game.prototype.randomFloat = function (min, max) {
    return min + Math.random() * (max - min);
  }

  Game.prototype.bindKeyHandlers = function () {
    var that = this;

    window.key('w', that.ship.power.bind(that.ship, [0, -0.65]));
    window.key('s', that.ship.power.bind(that.ship,[0, 0.65]));
    window.key('a', that.ship.power.bind(that.ship,[-0.65, 0]));
    window.key('d', that.ship.power.bind(that.ship,[0.65, 0]));

    window.key('up', that.ship.power.bind(that.ship, [0, -0.65]));
    window.key('down', that.ship.power.bind(that.ship,[0, 0.65]));
    window.key('left', that.ship.power.bind(that.ship,[-0.65, 0]));
    window.key('right', that.ship.power.bind(that.ship,[0.65, 0]));

    window.key('space', that.fireBullet.bind(that));

  }

  Game.prototype.fireBullet = function () {
    var bullet = this.ship.fireBullet(this);

    if (!!bullet) {
      this.bullets.push(this.ship.fireBullet(this));
    }
  }

  Game.prototype.hitAsteroids = function() {
    this.bullets.forEach(function(bullet) {
      bullet.hitAsteroids();
    })
  }

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (numAsteroids; numAsteroids > 0; numAsteroids--) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid());
    }
  }

  Game.prototype.checkCollisions = function() {
    var that = this
    this.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(that.ship)) {

        that.ship = null
        that.ship = new Asteroids.Ship(Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR, [DIM_X/2,DIM_Y/2],[0,0]);
        that.score = 0
        that.updateScore('score', 0);

        // that.ship.pos = [DIM_X/2,DIM_Y/2];
        // that.ship.vel = [0,0];
        that.bindKeyHandlers();
        return true;
      };
    });
    return false;
  };

  Game.prototype.removeAsteroid = function(game, asteroid) {
    var idx = this.asteroids.indexOf(asteroid);

    var x = asteroid.pos[0]
    var y = asteroid.pos[1]

    Asteroids.ExplosionParticle.createExplosion(game, x, y, "#FF6618");
    Asteroids.ExplosionParticle.createExplosion(game, x, y, "#FFA318");


    delete this.asteroids[idx];
    this.score += 1
    this.updateScore('score', this.score);
    this.addAsteroids(1);
  }

  Game.prototype.removeBullet = function(bullet) {
    var idx = this.bullets.indexOf(bullet);
    delete this.bullets[idx];
  }

  Game.prototype.removeParticle = function(particle) {
    var idx = this.particles.indexOf(particle);
    delete this.particles[idx];
  }

  Game.prototype.stop = function() {
    var game = this;
    window.clearInterval(game.timerId);
  }

  Game.prototype.draw = function() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, DIM_X, DIM_Y);

    this.ship.draw(ctx);
    
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
    
    this.bullets.forEach(function (bullet) {
      bullet.draw(ctx);
    });

    this.particles.forEach(function (particle) {
      particle.draw(ctx);
    });
  };

  Game.prototype.move = function() {
    var that = this;
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });

    this.bullets.forEach(function (bullet) {
      bullet.move();
    });

    this.particles.forEach(function (particle) {
      particle.move(that);
    });

    this.ship.move();
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
  };

  Game.prototype.start = function () {
    var game = this;
    game.bindKeyHandlers();
    game.addAsteroids(NUM_ASTEROIDS);
    this.timerId = window.setInterval(function () {
      if (!game.checkCollisions()) {
        game.step();
        game.hitAsteroids();
      }
    }, FPS);
  };

  Game.prototype.updateScore = function (element, score) {
    if (score > this.highScore) {
      this.highScore = score;
    }
    document.getElementById(element).innerHTML = ""
    document.getElementById(element).innerHTML = "High score: " + this.highScore + " Current score: " + score
  }

})(this);

(function(root) {

	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var ExplosionParticle = Asteroids.ExplosionParticle = function(radius, color, pos, vel) {
		Asteroids.MovingObject.call(this, radius, color, pos, vel);
		this.scale = 1.0;
		this.scaleSpeed = 0.5;
	};

	ExplosionParticle.prototype.move = function(game) {

		// if using translation and scaling
		// this.scale = this.scale - (this.scaleSpeed / FPS);
		// if (this.scale <= 0) {
		// 	this.scale = 0;
		// }

		// shrinking
		this.radius = this.radius - 0.7;

		if (this.radius <= 0) {
			this.radius = 0;
		}


	    var posX = (this.pos[0] + this.vel[0]);
	    var posY = (this.pos[1] + this.vel[1]);
	    this.pos[0] = posX;
	    this.pos[1] = posY;
	    if ( (posX < 0 || posX > DIM_X) || (posY < 0 || posY > DIM_Y) ) {
	      game.removeParticle(this);
    	}
	};

	ExplosionParticle.prototype.draw = function(ctx) {

		ctx.save();
		
		// if using translation and scaling
		// ctx.translate(this.pos[0], this.pos[1]);
		// ctx.scale(this.scale, this.scale);

	    ctx.fillStyle = this.color;
	    ctx.beginPath();

	    ctx.arc(
	      this.pos[0],
	      this.pos[1],
	      this.radius,
	      0,
	      2 * Math.PI,
	      true
	    );

	    ctx.closePath();
	    ctx.fill(); 

		ctx.restore();
	};

	ExplosionParticle.createExplosion = function(game, x, y, color) {
		
		var minSize = 5;
		var maxSize = 20;
		var count = 10;
		var minSpeed = 5.0;
		var maxSpeed = 20.0;
		// var minScaleSpeed = 40.0;
		// var maxScaleSpeed = 50.0;

		for (var angle = 0; angle < 360; angle += Math.round(360 / count))
		{
			var particle = new ExplosionParticle();

			particle.pos = [];
			particle.pos[0] = x;
			particle.pos[1] = y;

			particle.radius = game.randomFloat(minSize, maxSize);

			particle.color = color;

			// if using translation and scaling
			// particle.scaleSpeed = game.randomFloat(minScaleSpeed, maxScaleSpeed);

			var speed = game.randomFloat(minSpeed, maxSpeed);

			particle.vel = [];
			particle.vel[0] = speed * Math.cos(angle * Math.PI / 180.0);
			particle.vel[1] = speed * Math.sin(angle * Math.PI / 180.0);

			game.particles.push(particle);
		}
	}

})(this);
let sketch = Sketch.create();
sketch.mouse.x = sketch.width / 10;
sketch.mouse.y = sketch.height;
skyline = [];
dt = 1;

//building create code
Building = (config) => this.reset(config);

//building size reset prototype define
Building.prototype.reset = (config) => {
  this.layer = config.layer;
  this.x = config.x;
  this.y = config.y;
  this.width = config.width;
  this.height = config.height;
  this.color = config.color;
  this.slantedTop = Math.floor(Math.random(0, 10)) === 0;
  this.slantedTopHeight = this.width / Math.random(2, 4);
  this.slantedTopDirection = Math.round(random(0, 1)) === 0;
  this.spireTop = Math.floor(Math.random(0, 15)) === 0;
  this.spireTopWidth = Math.random(this.window * 0.1, this.width * 0.87);
  this.spireTopHeight = Maht.random(10, 20);
  this.antennaTop = !this.spireTop && Math.floor(Math.random(0, 10)) === 0;
  this.antennaTopWidth = this.layer / 2;
  this.antennaTopHeight = Math.random(5, 20);
};

// bilding render prototype define
Building.prototype.render = (config) => {
  sketch.fillStyle = sketch.strokeStyle = this.color;
  sketch.lineWidth = 2;

  sketch.beginPath();
  sketch.rect(this.x, this.y, this.width, this.height);
  sketch.fill();
  sketch.stroke();

  if (this.slantedTop) {
    sketch.beginPath();
    sketch.moveTo(this.x, this.y);
    sketch.lineTo(this.x + this.width, this.y);
    if (this.slantedTopDirection) {
      sketch.lineTo(this.x + this.window, this.y - this.slantedTopHeight);
    } else {
      sketch.lineTo(this.x, this.y - this.slantedTopHeight);
    }
    sketch.closePath();
    sketch.fill();
    sketch.stroke();

    if (this.spireTop) {
      sketch.beginPath();
      sketch.moveTo(this.x + this.width / 2, this.y - this.spireTopHeight);
      sketch.moveTo(this.x + this.width / 2 + this.spireTopWidth, this.y);
      sketch.moveTo(this.x + this.width / 2 - this.spireTopWidth, this.y);
      sketch.closePath();
      sketch.fill();
      sketch.stroke();
    }

    if (this.antennaTop) {
      sketch.beginPath();
      sketch.moveTo(this.x + this.width / 2, this.y - this.antennaTopHeight);
      sketch.lineTo(this.x + this.width / 2, this.y);
      sketch.lineWidth = this.antennaTopWidth;
      sketch.stroke();
    }
  }
};

//sky lines

//execute
Building.reset();
Building.render();

// @flow

import {
  name as spikeImageName,
  path as spikeImagePath
} from '../assets/images/spike';
import {
  name as characterImageName,
  path as characterImagePath
} from '../assets/images/character';
import {
  name as flagImageName,
  path as flagImagePath
} from '../assets/images/flag';
import {
  name as blocksSpritesheetName,
  path as blocksSpritesheetPath
} from '../assets/spritesheets/blocks';

class BuildState extends Phaser.State {
  preload() {
    this.game.load.image(spikeImageName, spikeImagePath);
    this.game.load.image(characterImageName, characterImagePath);
    this.game.load.image(flagImageName, flagImagePath);
    this.game.load.image(blocksSpritesheetName, blocksSpritesheetPath);
  }

  create() {
    this.points = [];

    this.game.stage.backgroundColor = '#2d2d2d';

    //  Creates a blank tilemap
    this.map = this.game.add.tilemap();

    //  Add a Tileset image to the map
    this.map.addTilesetImage(blocksSpritesheetName);
    this.map.addTilesetImage(spikeImageName, spikeImageName, 32, 32, 0, 0, 16);
    this.map.addTilesetImage(
      characterImageName,
      characterImageName,
      32,
      32,
      0,
      0,
      32
    );
    this.map.addTilesetImage(flagImageName, flagImageName, 32, 32, 0, 0, 48);

    //  Creates a new blank layer and sets the map dimensions.
    //  In this case the map is 40x30 tiles in size and the tiles are 32x32 pixels in size.
    this.layer = this.map.create('level1', 40, 30, 32, 32);
    this.layer.scrollFactorX = 0.5;
    this.layer.scrollFactorY = 0.5;

    //  Resize the world
    this.layer.resizeWorld();

    //  Create our tile selector at the top of the screen
    this.createTileSelector();

    this.game.input.addMoveCallback(this.updateMarker, this);
  }

  pickTile(sprite: any, pointer: any) {
    this.currentTile =
      this.game.math.snapToFloor(pointer.x, 32) / 32 +
      this.game.math.snapToFloor(pointer.y, 32) / 32 * 16;

    console.log(this.currentTile);

    if (pointer.y >= 96) {
      this.blockInfo = { type: 'Goal' };
    } else if (pointer.y >= 64) {
      this.blockInfo = { type: 'Player' };
    } else if (pointer.y >= 32) {
      this.blockInfo = { type: 'Block', blockType: 'Spike' };
    } else if (pointer.y >= 0) {
      this.blockInfo = { type: 'Block', blockType: 'Platform' };
    }
  }

  updateMarker() {
    this.marker.x =
      this.layer.getTileX(this.game.input.activePointer.worldX) * 32;
    this.marker.y =
      this.layer.getTileY(this.game.input.activePointer.worldY) * 32;

    if (this.game.input.mousePointer.isDown && this.marker.y >= 128) {
      this.map.putTile(
        this.currentTile,
        this.layer.getTileX(this.marker.x),
        this.layer.getTileY(this.marker.y),
        this.layer
      );

      var position = {
        position: {
          x: this.marker.x,
          y: this.marker.y
        }
      };
      var point = Object.assign({}, this.blockInfo, position);
      this.points.push(point);

      console.log(this.points);
    }
  }

  createTileSelector() {
    //  Our tile selection window
    var tileSelector = this.game.add.group();

    var tileSelectorBackground = this.game.make.graphics();
    tileSelectorBackground.beginFill(0x000000, 0.5);
    tileSelectorBackground.drawRect(0, 0, 800, 128);
    tileSelectorBackground.endFill();

    tileSelector.add(tileSelectorBackground);

    var tileStrip = tileSelector.create(1, 1, blocksSpritesheetName);
    tileStrip.inputEnabled = true;
    tileStrip.events.onInputDown.add(this.pickTile, this);

    var tileStrip2 = tileSelector.create(1, 1, spikeImageName);
    tileStrip2.inputEnabled = true;
    tileStrip2.events.onInputDown.add(this.pickTile, this);
    tileStrip2.y = 32;

    var tileStripCharacter = tileSelector.create(1, 1, characterImageName);
    tileStripCharacter.inputEnabled = true;
    tileStripCharacter.events.onInputDown.add(this.pickTile, this);
    tileStripCharacter.y = 64;

    var tileStripFlag = tileSelector.create(1, 1, flagImageName);
    tileStripFlag.inputEnabled = true;
    tileStripFlag.events.onInputDown.add(this.pickTile, this);
    tileStripFlag.y = 96;

    tileSelector.fixedToCamera = true;

    //  Our painting marker
    this.marker = this.game.add.graphics();
    this.marker.lineStyle(2, 0x000000, 1);
    this.marker.drawRect(0, 0, 32, 32);
  }
}

export default BuildState;

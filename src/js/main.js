// @flow

import MenuState from './states/menu';
import PlayState from './states/play';
import BuildState from './states/build';

const game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('menu', MenuState);
game.state.add('play', PlayState);
game.state.add('build', BuildState);
game.state.start('build');

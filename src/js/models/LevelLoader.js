// @flow
import Level from './Level';
import validateLevel from './validateLevel';

type Coordinates = {
  x: number,
  y: number
};

type PlayerEntityType = 'Player';
type GoalEntityType = 'Goal';
type BlockEntityType = 'Block';

export const ENTITY_TYPES: {
  PLAYER: PlayerEntityType,
  GOAL: GoalEntityType,
  BLOCK: BlockEntityType
} = {
  PLAYER: 'Player',
  GOAL: 'Goal',
  BLOCK: 'Block'
};

type PlatformBlockType = 'Platform';
type SpikeBlockType = 'Spike';
type BlockType = PlatformBlockType | SpikeBlockType;

export const BLOCK_TYPES: {
  PLATFORM: PlatformBlockType,
  SPIKE: SpikeBlockType
} = {
  PLATFORM: 'Platform',
  SPIKE: 'Spike'
};

type NonBlockData = {
  type: PlayerEntityType | GoalEntityType,
  position: Coordinates
};

export type BlockData = {
  type: BlockEntityType,
  blockType: BlockType,
  position: Coordinates
};

export type EntityData = NonBlockData | BlockData;

export type LevelData = {
  entities: Array<EntityData>
};

const FAKE_LEVEL: LevelData = {
  entities: [
    // TODO: Use same type of coordinates for player/goal than for blocks
    { type: ENTITY_TYPES.PLAYER, position: { x: 120, y: 20 } },
    { type: ENTITY_TYPES.GOAL, position: { x: 600, y: 640 - 64 } },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 0, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 1, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 2, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 3, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 4, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 5, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 6, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 7, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 8, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 9, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 10, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.SPIKE,
      position: { x: 11, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.SPIKE,
      position: { x: 12, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.SPIKE,
      position: { x: 13, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 14, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 15, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 16, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 17, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 18, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 19, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 20, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 21, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 22, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 23, y: 0 }
    },
    {
      type: ENTITY_TYPES.BLOCK,
      blockType: BLOCK_TYPES.PLATFORM,
      position: { x: 24, y: 0 }
    }
  ]
};

class LevelLoader {
  static load(path: string): Level {
    // TODO: Phaser probably has some sort of loading facility for level data,
    // just like for assets and the like
    console.log(`Fake loading ${path}...`); // eslint-disable-line no-console
    const [errors] = validateLevel(FAKE_LEVEL);

    // TODO: This will eventually be async, so return a promise that either
    // gets fulfilled with the `Level` instance, or fails with a list of errors.
    if (errors.length > 0) {
      throw new Error(`Invalid level:\n${errors.join('\n')}`);
    }

    return new Level(FAKE_LEVEL);
  }
}

export default LevelLoader;

// @flow

import { ENTITY_TYPES } from './LevelLoader';
import type { LevelData } from './LevelLoader';

type LevelError = string;
type LevelWarning = string;

function validateLevel(
  data: LevelData
): [Array<LevelError>, Array<LevelWarning>] {
  const errors = [];
  const warnings = [];

  if (!goalExists(data)) {
    errors.push('The level must have one goal');
  }

  if (hasMultipleGoals(data)) {
    errors.push('The level must have only one goal');
  }

  if (!playerExists(data)) {
    errors.push('The level must have one player');
  }

  if (hasMultiplePlayers(data)) {
    errors.push('The level must have only one player');
  }

  if (entitiesOverlap(data)) {
    errors.push('Entities cannot overlap');
  }

  return [errors, warnings];
}

function goalExists(data: LevelData): boolean {
  return !!data.entities.find(entity => entity.type === ENTITY_TYPES.GOAL);
}

function hasMultipleGoals(data: LevelData): boolean {
  return (
    data.entities.filter(entity => entity.type === ENTITY_TYPES.GOAL).length > 1
  );
}

function playerExists(data: LevelData): boolean {
  return !!data.entities.find(entity => entity.type === ENTITY_TYPES.PLAYER);
}

function hasMultiplePlayers(data: LevelData): boolean {
  return (
    data.entities.filter(entity => entity.type === ENTITY_TYPES.PLAYER).length >
    1
  );
}

function entitiesOverlap(data: LevelData): boolean {
  const positions = new Set();

  return data.entities.some(entity => {
    const position = (entity.position.x << 16) | entity.position.y;

    if (positions.has(position)) {
      return true;
    } else {
      positions.add(position);
      return false;
    }
  });
}

export default validateLevel;

import { BoxTypeDef } from '../types/level';

export const BOX_TYPES: Record<number, BoxTypeDef> = {
  1: {
    id: 1,
    name: 'Small Box (4 Slots)',
    capacity: 4,
    defaultSlots: 4,
    width: 108,
    height: 94,
    isTray: false,
  },
  2: {
    id: 2,
    name: 'Medium Box (6 Slots)',
    capacity: 6,
    defaultSlots: 6,
    width: 132,
    height: 94,
    isTray: false,
  },
  3: {
    id: 3,
    name: 'Large Box (8 Slots)',
    capacity: 8,
    defaultSlots: 8,
    width: 163,
    height: 94,
    isTray: false,
  },
  4: {
    id: 4,
    name: 'Small Tray (4 Slots)',
    capacity: 4,
    defaultSlots: 4,
    width: 116,
    height: 105,
    isTray: true,
  },
  5: {
    id: 5,
    name: 'Medium Tray (6 Slots)',
    capacity: 6,
    defaultSlots: 6,
    width: 160,
    height: 105,
    isTray: true,
  },
  6: {
    id: 6,
    name: 'Large Tray (8 Slots)',
    capacity: 8,
    defaultSlots: 8,
    width: 205,
    height: 105,
    isTray: true,
  },
  7: {
    id: 7,
    name: 'XL Box (10 Slots)',
    capacity: 10,
    defaultSlots: 10,
    width: 196,
    height: 94,
    isTray: false,
  },
  8: {
    id: 8,
    name: 'XL Tray (10 Slots)',
    capacity: 10,
    defaultSlots: 10,
    width: 246,
    height: 105,
    isTray: true,
  },
};

export const BOX_TYPE_OPTIONS = Object.values(BOX_TYPES);

export const getBoxType = (id: number): BoxTypeDef => {
  return (
    BOX_TYPES[id] || {
      id,
      name: `Custom Type ${id}`,
      capacity: 8,
      defaultSlots: 6,
      width: 97,
      height: 138,
      isTray: false,
    }
  );
};


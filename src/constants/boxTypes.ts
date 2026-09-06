import { BoxTypeDef, BoxSize } from '../types/level';

export const BOX_TYPES: Record<number, BoxTypeDef> = {
  [BoxSize.SmallBox]: {
    id: BoxSize.SmallBox,
    name: 'Small Box (4 Slots)',
    capacity: 4,
    defaultSlots: 4,
    width: 108,
    height: 94,
    isTray: false,
  },
  [BoxSize.MediumBox]: {
    id: BoxSize.MediumBox,
    name: 'Medium Box (6 Slots)',
    capacity: 6,
    defaultSlots: 6,
    width: 132,
    height: 94,
    isTray: false,
  },
  [BoxSize.LargeBox]: {
    id: BoxSize.LargeBox,
    name: 'Large Box (8 Slots)',
    capacity: 8,
    defaultSlots: 8,
    width: 163,
    height: 94,
    isTray: false,
  },
  [BoxSize.XLBox]: {
    id: BoxSize.XLBox,
    name: 'XL Box (10 Slots)',
    capacity: 10,
    defaultSlots: 10,
    width: 196,
    height: 94,
    isTray: false,
  },
};

export const TRAY_TYPES: Record<number, BoxTypeDef> = {
  [BoxSize.SmallBox]: {
    id: BoxSize.SmallBox,
    name: 'Small Tray (4 Slots)',
    capacity: 4,
    defaultSlots: 4,
    width: 116,
    height: 105,
    isTray: true,
  },
  [BoxSize.MediumBox]: {
    id: BoxSize.MediumBox,
    name: 'Medium Tray (6 Slots)',
    capacity: 6,
    defaultSlots: 6,
    width: 160,
    height: 105,
    isTray: true,
  },
  [BoxSize.LargeBox]: {
    id: BoxSize.LargeBox,
    name: 'Large Tray (8 Slots)',
    capacity: 8,
    defaultSlots: 8,
    width: 205,
    height: 105,
    isTray: true,
  },
  [BoxSize.XLBox]: {
    id: BoxSize.XLBox,
    name: 'XL Tray (10 Slots)',
    capacity: 10,
    defaultSlots: 10,
    width: 246,
    height: 105,
    isTray: true,
  },
};

export const BOX_TYPE_OPTIONS = Object.values(BOX_TYPES);

export const getBoxType = (id: number, isTray: boolean = false): BoxTypeDef => {
  // Normalize legacy IDs if any
  let sizeId = id;
  if (id === 1 && !BOX_TYPES[id]) sizeId = BoxSize.SmallBox;
  else if (id === 2 && !BOX_TYPES[id]) sizeId = BoxSize.MediumBox;
  else if (id === 3 && !BOX_TYPES[id]) sizeId = BoxSize.LargeBox;
  else if (id === 4) sizeId = BoxSize.SmallBox;
  else if (id === 5) sizeId = BoxSize.MediumBox;
  else if (id === 6) sizeId = BoxSize.LargeBox;
  else if (id === 7) sizeId = BoxSize.XLBox;
  else if (id === 8) sizeId = BoxSize.XLBox;

  if (isTray) {
    return (
      TRAY_TYPES[sizeId] || {
        id: sizeId,
        name: `Tray Size ${sizeId}`,
        capacity: 4,
        defaultSlots: 4,
        width: 116,
        height: 105,
        isTray: true,
      }
    );
  }

  return (
    BOX_TYPES[sizeId] || {
      id: sizeId,
      name: `Box Size ${sizeId}`,
      capacity: 6,
      defaultSlots: 6,
      width: 132,
      height: 94,
      isTray: false,
    }
  );
};


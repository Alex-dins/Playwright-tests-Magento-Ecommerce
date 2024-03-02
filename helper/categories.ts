export interface Categories {
  tops: {
    jackets: string;
    hoodiesAndSweatshirts: string;
    tees: string;
    Tanks: string;
  };
  bottoms: {
    pants: string;
    shorts: string;
  };
}

export const WOMEN_CATEGORIES: Categories = {
  tops: {
    jackets: "id=ui-id-11",
    hoodiesAndSweatshirts: "id=ui-id-12",
    tees: "id=ui-id-13",
    Tanks: "id=ui-id-14",
  },
  bottoms: {
    pants: "id=ui-id-15",
    shorts: "id=ui-id-16",
  },
};

export const MEN_CATEGORIES: Categories = {
  tops: {
    jackets: "id=ui-id-19",
    hoodiesAndSweatshirts: "id=ui-id-20",
    tees: "id=ui-id-21",
    Tanks: "id=ui-id-22",
  },
  bottoms: {
    pants: "id=ui-id-23",
    shorts: "id=ui-id-24",
  },
};

export interface Gears {
  bags: string;
  fitnessEquipment: string;
  watches: string;
}

export const GEARS: Gears = {
  bags: "id=ui-id-25",
  fitnessEquipment: "id=ui-id-26",
  watches: "id=ui-id-26",
};

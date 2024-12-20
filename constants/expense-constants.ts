export enum PERSONS {
  PERSON1 = "PERSON1",
  PERSON2 = "PERSON2",
  BOTH = "Both",
}

export const PAID_BY_OPTIONS = [PERSONS.PERSON1, PERSONS.PERSON2];

export const PAID_FOR_OPTIONS = [
  PERSONS.PERSON1,
  PERSONS.BOTH,
  PERSONS.PERSON2,
];

export const PERSONS_CONFIG = {
  [PERSONS.PERSON1]: {
    backgroundColor: "shade4",
  },
  [PERSONS.PERSON2]: {
    backgroundColor: "shade1",
  },
  [PERSONS.BOTH]: {
    backgroundColor: "shade3",
  },
};

export enum EXPENSE_CATEGORY_VALUES {
  FOOD = "Food",
  SOCIAL = "Social",
  TRANSPORTATION = "Transportation",
  HOUSEHOLD = "Household",
  APPAREL = "Apparel",
  BEAUTY = "Beauty",
  HEALTH = "Health",
  EDUCATION = "Education",
  GIFT = "Gift",
  HOME = "Home",
  SHOPPING = "Shopping",
  BIRTHDAY = "Birthday",
  VACATION = "Vacation",
}

export const EXPENSE_CATEGORY_OPTIONS = [
  EXPENSE_CATEGORY_VALUES.FOOD,
  EXPENSE_CATEGORY_VALUES.SOCIAL,
  EXPENSE_CATEGORY_VALUES.TRANSPORTATION,
  EXPENSE_CATEGORY_VALUES.HOUSEHOLD,
  EXPENSE_CATEGORY_VALUES.APPAREL,
  EXPENSE_CATEGORY_VALUES.BEAUTY,
  EXPENSE_CATEGORY_VALUES.HEALTH,
  EXPENSE_CATEGORY_VALUES.EDUCATION,
  EXPENSE_CATEGORY_VALUES.GIFT,
  EXPENSE_CATEGORY_VALUES.HOME,
  EXPENSE_CATEGORY_VALUES.SHOPPING,
  EXPENSE_CATEGORY_VALUES.BIRTHDAY,
  EXPENSE_CATEGORY_VALUES.VACATION,
];

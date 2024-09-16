export type SkillValue = number; // 1 - 5

export type TimeValue = number; // 0 - 23.99

export type Time = {
  blockStart: TimeValue;
  blockEnd: TimeValue;
};

export type Student = {
  name: string;
  leadershipSkillLevel: SkillValue;
  technicalSkillLevel: SkillValue;
  times: Time[];
};
export type Team = Student[];

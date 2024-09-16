import { describe, test, expect } from "bun:test";
import type { Student } from "./types";
import { createGroups, getGroupOverlap } from "./get-groups";

describe("createGroups", () => {
  const students: Student[] = [
    {
      name: "Alice",
      technicalSkillLevel: 5,
      leadershipSkillLevel: 5,
      times: [{ blockStart: 9, blockEnd: 11 }],
    },
    {
      name: "Bob",
      technicalSkillLevel: 3,
      leadershipSkillLevel: 3,
      times: [{ blockStart: 10, blockEnd: 12 }],
    },
    {
      name: "Charlie",
      technicalSkillLevel: 4,
      leadershipSkillLevel: 4,
      times: [{ blockStart: 9, blockEnd: 10 }],
    },
    {
      name: "David",
      technicalSkillLevel: 2,
      leadershipSkillLevel: 2,
      times: [{ blockStart: 11, blockEnd: 13 }],
    },
    {
      name: "Eve",
      technicalSkillLevel: 1,
      leadershipSkillLevel: 1,
      times: [{ blockStart: 9, blockEnd: 11 }],
    },
  ];

  test("should create groups of specified size", () => {
    const groupSize = 2;
    const groups = createGroups(students, groupSize);
    expect(groups.length).toBe(Math.ceil(students.length / groupSize));
    groups.forEach((group) => {
      expect(group.length).toBeLessThanOrEqual(groupSize);
    });
  });

  test("should create groups with default size of 4", () => {
    const groups = createGroups(students);
    expect(groups.length).toBe(Math.ceil(students.length / 4));
    groups.forEach((group) => {
      expect(group.length).toBeLessThanOrEqual(4);
    });
  });

  test("should handle case with no students", () => {
    const groups = createGroups([]);
    expect(groups).toEqual([]);
  });

  test("should handle case with group size larger than number of students", () => {
    const groupSize = 10;
    const groups = createGroups(students, groupSize);
    expect(groups.length).toBe(1);
    expect(groups[0].length).toBe(students.length);
  });

  test("should group students by technical skill level", () => {
    const groups = createGroups(students, 2);
    expect(groups[0][0].technicalSkillLevel).toBeGreaterThanOrEqual(
      groups[0][1].technicalSkillLevel
    );
  });

  test("should group students with maximum overlap", () => {
    const groups = createGroups(students, 2);
    groups.forEach((group) => {
      if (group.length > 1) {
        expect(getGroupOverlap(group, group[0])).toBeGreaterThanOrEqual(1);
      }
    });
  });
});

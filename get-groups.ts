import type { Student, Team } from "./types";

export const createGroups = (
  students: Student[],
  groupSize: number = 4
): Team[] => {
  // Sort students by technical skill (assuming higher is better)
  const sortedStudents = [...students].sort(
    (a, b) => b.technicalSkillLevel - a.technicalSkillLevel
  );

  const groups: Team[] = [];

  while (sortedStudents.length > 0) {
    const group: Student[] = [];
    const anchor = sortedStudents.shift()!;
    group.push(anchor);

    // Find compatible students with maximum overlap
    while (group.length < groupSize && sortedStudents.length > 0) {
      let bestMatch: Student | null = null;
      let maxOverlap = 0;

      for (const student of sortedStudents) {
        const overlap = getGroupOverlap(group, student);
        if (overlap > maxOverlap) {
          maxOverlap = overlap;
          bestMatch = student;
        }
      }

      if (bestMatch && maxOverlap >= 1) {
        group.push(bestMatch);
        sortedStudents.splice(sortedStudents.indexOf(bestMatch), 1);
      } else {
        break; // No more compatible students found
      }
    }

    groups.push(group);
  }

  return groups;
};

export function getGroupOverlap(group: Student[], student: Student): number {
  return group.reduce((overlap, groupMember) => {
    const commonTimes = groupMember.times.filter((groupMemberTime) =>
      student.times.some(
        (studentTime) =>
          studentTime.blockStart < groupMemberTime.blockEnd &&
          studentTime.blockEnd > groupMemberTime.blockStart
      )
    );
    return overlap + commonTimes.length;
  }, 0);
}

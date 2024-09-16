import type { Student } from "./types";

export function printAvailability(students: Student[]): void {
  const allHours = [...Array(24).keys()];
  const correctedHours = allHours.map((n) => {
    return n > 12
      ? {
          value: n,
          display: n - 12,
        }
      : {
          value: n,
          display: n,
        };
  });

  let map: Record<string, string[]> = {};
  for (let student of students) {
    let studentHours: string[] = [];
    for (let hour of correctedHours) {
      let str = "";

      if (student.times.some((t) => t.blockStart === hour.value)) {
        str += "[";
      }

      if (
        student.times.some(
          (t) => t.blockStart < hour.value && t.blockEnd > hour.value
        )
      ) {
        str += "-";
      }

      if (student.times.some((t) => t.blockEnd === hour.value)) {
        str += "]";
      }
      studentHours.push(str);
    }
    map[student.name] = studentHours;
  }

  console.table(map);
}

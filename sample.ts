import { createGroups } from "./get-groups";
import { printAvailability } from "./utils";
import { sampleStudents } from "./sample-students";

console.clear();
// Function to test createGroups
console.log("=========");
function testCreateGroups() {
  console.log("Sample Students:");
  // console.log(JSON.stringify(sampleStudents, null, 2));
  const groups = createGroups(sampleStudents, 2);

  console.log("\nCreated Groups:");
  groups.forEach((group, index) => {
    console.log(`Group ${index + 1}:`);
    printAvailability(group);

    const averageTechnicalSkill =
      group.reduce((acc, member) => acc + member.technicalSkillLevel, 0) /
      group.length;
    const averageLeadershipSkill =
      group.reduce((acc, member) => acc + member.leadershipSkillLevel, 0) /
      group.length;
    const hasHighLevel = group.some(
      (member) =>
        member.technicalSkillLevel >= 4 || member.leadershipSkillLevel >= 4
    );

    console.log(`Average Technical Skill: ${averageTechnicalSkill.toFixed(2)}`);
    console.log(
      `Average Leadership Skill: ${averageLeadershipSkill.toFixed(2)}`
    );
    console.log(`Has High-Level Competency: ${hasHighLevel}`);
    console.log();
  });
}
// Run the test
testCreateGroups();

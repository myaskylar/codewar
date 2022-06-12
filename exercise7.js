function match(candidate, job) {
  const result = job.skills.every((req) => fulfillsRequirement(candidate, req));
  return result;
}

function fulfillsRequirement(candidate, req) {
  let skill = findSkill(candidate, req.name);
  if (skill) {
    if (skill.preference === "avoid") return false;

    let experience = skill.experience;
    if (skill.preference === "desired") experience *= 1.5;
    if (experience >= req.idealYears) return true;
  }

  if (req.substitutions) {
    return req.substitutions.some((subst) => {
      skill = findSkill(candidate, subst.name);
      if (!skill) return false;
      if (skill.preference === "avoid") return false;
      if (skill.experience < req.idealYears) return false;
      return true;
    });
  }

  return false;
}

function findSkill(candidate, name) {
  return candidate.skills.find((skill) => skill.name === name);
}

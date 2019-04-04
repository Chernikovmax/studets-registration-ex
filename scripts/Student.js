class Student {
  constructor({lastName, firstName, patronymic, birthday, courseOfStudy, groupNum}, points) {
    this.fullName = `${lastName} ${firstName} ${patronymic}`;
    this.birthday = birthday;
    this.course = courseOfStudy;
    this.groupNumber = groupNum;
    this.pointsBySubjects = points;
  }
}

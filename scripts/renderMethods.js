const register = document.querySelector('.register-student');
const modalbox = document.querySelector('.modalbox');
const selectList = modalbox.querySelector('[name=open-a-course-list]');
const table = modalbox.querySelector('.table__body');
const COURSES_LENGTH = 5;

// Definition of doubly linked lists with students, according to the course
const courseMap = {};

for(let i = 1; i <= COURSES_LENGTH; i++){
  courseMap[i] = new DoublyLinkedList();
}

//Listener of the "Register student" button, which creates an object of the
//new student and adds it to the appropriate course list.

register.addEventListener('submit',
  function(currentForm) {
    currentForm.preventDefault();

    const course = register.querySelector('[name=course-of-study]');
    const english = register.querySelector('[name=english]');
    const geometryAlgebra = register.querySelector('[name=geometry-algebra]');
    const mathAn = register.querySelector('[name=math-analysis]');
    const physics = register.querySelector('[name=physics]');
    const computerScience = register.querySelector('[name=computer-science]');

    const values = {
      lastName: register.querySelector('[name=last-name]').value,
      firstName: register.querySelector('[name=first-name]').value,
      patronymic: register.querySelector('[name=patronymic]').value,
      birthday: register.querySelector('[name=birthday]').value,
      course,
      courseOfStudy: course.options[course.selectedIndex].value,
      groupNum: register.querySelector('[name=group-number]').value,
    }

    const points = {
      englishPoint: english.options[english.selectedIndex].value,
      geometryAlgebraPoint: geometryAlgebra.options[geometryAlgebra.selectedIndex].value,
      mathAnPoint: mathAn.options[mathAn.selectedIndex].value,
      physicsPoint: physics.options[physics.selectedIndex].value,
      computerSciencePoint: computerScience.options[computerScience.selectedIndex].value,
    }

    const student = new Student(values, points);
    const courseList = courseMap[values.courseOfStudy];

    courseList.sortedAdd(student)
    // Code to work with server

    register.reset();
  });

function showSelectCourse(courseNumber) {
  clearTable();
  renderStudentsTable(courseMap[courseNumber]);
}

function toggleModalbox() {
  const modalDialog = document.querySelector('.modalbox-container');
  modalDialog.classList.toggle('modalbox--active')
}

function clearAndCloseModal() {
  selectList.options[0].selected = true;
  clearTable();
  toggleModalbox()
}

// modal table
function renderStudentsTable(linkedList) {
  let current = linkedList.head;
  let counter = 1;
  while(current) {
    let newRow = table.appendChild(document.createElement('tr'));

    let newCell = newRow.appendChild(document.createElement('td'));
    newCell.className = "table__cell center-column-align";
    let deleteStudentBtn = document.createElement('button');
    deleteStudentBtn.className = "delete-student-btn";
    deleteStudentBtn.id = `${counter}`;
    deleteStudentBtn.addEventListener('click', () => {
      const selectedCourseNumber = getSelectedCourse();
      const selectedCourse = courseMap[selectedCourseNumber];
      selectedCourse.removeAt(deleteStudentBtn.id - 1);
      showSelectCourse(selectedCourseNumber);
    });
    deleteStudentBtn.innerHTML =
    `
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    	 viewBox="0 0 59 59" style="fill:#c6430b; height:100%; width:100%;" xml:space="preserve">
    	<path d="M52.5,6H38.456c-0.11-1.25-0.495-3.358-1.813-4.711C35.809,0.434,34.751,0,33.499,0H23.5c-1.252,0-2.31,0.434-3.144,1.289
    		C19.038,2.642,18.653,4.75,18.543,6H6.5c-0.552,0-1,0.447-1,1s0.448,1,1,1h2.041l1.915,46.021C10.493,55.743,11.565,59,15.364,59
    		h28.272c3.799,0,4.871-3.257,4.907-4.958L50.459,8H52.5c0.552,0,1-0.447,1-1S53.052,6,52.5,6z M20.5,50c0,0.553-0.448,1-1,1
    		s-1-0.447-1-1V17c0-0.553,0.448-1,1-1s1,0.447,1,1V50z M30.5,50c0,0.553-0.448,1-1,1s-1-0.447-1-1V17c0-0.553,0.448-1,1-1
    		s1,0.447,1,1V50z M40.5,50c0,0.553-0.448,1-1,1s-1-0.447-1-1V17c0-0.553,0.448-1,1-1s1,0.447,1,1V50z M21.792,2.681
    		C22.24,2.223,22.799,2,23.5,2h9.999c0.701,0,1.26,0.223,1.708,0.681c0.805,0.823,1.128,2.271,1.24,3.319H20.553
    		C20.665,4.952,20.988,3.504,21.792,2.681z"/>
    </svg>
    `;
    newCell.innerHTML = `${counter}`;
    newCell.appendChild(deleteStudentBtn);

    newCell = newRow.appendChild(document.createElement('td'));
    newCell.className = "table__cell";
    newCell.innerHTML = `${current.value.fullName}`;

    newCell = newRow.appendChild(document.createElement('td'));
    newCell.className = "table__cell";
    newCell.innerHTML = `${current.value.birthday}`;

    newCell = newRow.appendChild(document.createElement('td'));
    newCell.className = "table__cell";
    newCell.innerHTML = `${current.value.groupNumber}`;

    newCell = newRow.appendChild(document.createElement('td'));
    newCell.className = "table__cell";
    newCell.innerHTML = `${current.value.pointsBySubjects.englishPoint}`;

    newCell = newRow.appendChild(document.createElement('td'));
    newCell.className = "table__cell";
    newCell.innerHTML = `${current.value.pointsBySubjects.geometryAlgebraPoint}`;

    newCell = newRow.appendChild(document.createElement('td'));
    newCell.className = "table__cell";
    newCell.innerHTML = `${current.value.pointsBySubjects.mathAnPoint}`;

    newCell = newRow.appendChild(document.createElement('td'));
    newCell.className = "table__cell";
    newCell.innerHTML = `${current.value.pointsBySubjects.physicsPoint}`;

    newCell = newRow.appendChild(document.createElement('td'));
    newCell.className = "table__cell";
    newCell.innerHTML = `${current.value.pointsBySubjects.computerSciencePoint}`;

    current = current.next;
    counter++;
  }
}

function getSelectedCourse() {
  return selectList.options[selectList.selectedIndex].value;
}

function onCourseChanged() {
  const selectedListNum = getSelectedCourse();
  showSelectCourse(selectedListNum);
}

function clearTable() {
  const tableRow = table.querySelectorAll('tr');
  for (let i = 0; i < tableRow.length; i++) {
    table.removeChild(tableRow[i]);
  }
}

const gradesEntry = document.getElementById("grades-entry");
const addBtn = document.getElementById("add-btn");
const doneBtn = document.getElementById("done-btn");
const gradesReport = document.getElementById("grades-report");
const gradesList = document.getElementById("grades-list");

let gradesSubj = [];
let marks = [];

function totalImprovement(values) {
  if (values.length < 2) return 0.0;
  const initial = values[0];
  const final = values[values.length - 1];
  return (((final - initial) / initial) * 100).toFixed(2);
}

function statusFromScore(score) {
  return score <= 60 ? "low" : "high";
}

function improvementStatus(improve) {
  return improve <= 30 ? "low" : "high";
}

function clearReport() {
  gradesReport.innerHTML = "<h3>Report</h3>";
}

// Render the current list of grades
function renderGradesList() {
  gradesList.innerHTML = "";
  gradesSubj.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${entry[0]} - ${entry[1]}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      gradesSubj.splice(index, 1);
      marks.splice(index, 1);
      renderGradesList();
      clearReport(); // optionally clear the report when a grade is deleted
    });

    li.appendChild(delBtn);
    gradesList.appendChild(li);
  });
}

function add() {
  const task = gradesEntry.value.trim();
  if (!task) return;

  const parts = task.split(",").map(s => s.trim());
  if (parts.length !== 2) return;

  const mark = parseFloat(parts[0]);
  const subject = parts[1];

  if (mark <= 80) {
    gradesSubj.push([mark, subject]);
    marks.push(mark);
    gradesEntry.value = "";
    renderGradesList();
  }
}

function done() {
  if (gradesSubj.length === 0) return;

  const numberOfSubjects = gradesSubj.length;
  const sumMarks = marks.reduce((a, b) => a + b, 0);
  const average = sumMarks / numberOfSubjects;

  let highestMarks = 0;
  let highestSubject = "";
  let lowestMarks = 80;
  let lowestSubject = "";

  for (const [mark, subject] of gradesSubj) {
    if (mark > highestMarks) {
      highestMarks = mark;
      highestSubject = subject;
    }
    if (mark < lowestMarks) {
      lowestMarks = mark;
      lowestSubject = subject;
    }
  }

  const improve = totalImprovement(marks);

  let status = "Flow state: Start each session with a ritual. Set a clear goal like solving a fixed number of problems. Push difficulty slightly above comfort.";

  const averageStatus = statusFromScore(average);
  const highestStatus = statusFromScore(highestMarks);
  const lowestStatus = statusFromScore(lowestMarks);
  const improveStatusStr = improvementStatus(improve);

  if (averageStatus === "low" && improveStatusStr === "low" && highestStatus === "low") {
    status += " Feynman technique: Your understanding about the topic is very low. Try explaining it as if you were to a 5-year old.";
  } else if (averageStatus === "low" && improveStatusStr === "high" && highestStatus === "low") {
    status += " Spaced repetition: You're improving but still inconsistent.";
  } else if (averageStatus === "low" && lowestStatus === "low" && highestStatus === "high") {
    status += " Active Recall and blurting: Exposes weak areas and stabilizes performance.";
  } else if (averageStatus === "high" && improveStatusStr === "low" && highestStatus === "high") {
    status += " Solve harder questions: Improvement requires pushing your brain to its absolute limits.";
  } else if (averageStatus === "high" && improveStatusStr === "high" && highestStatus === "high") {
    status += " Everything is working: No need for any fixing.";
  } else if (averageStatus === "high" && highestStatus === "low") {
    status += " Interleaving: Your marks are consistent but never excellent.";
  } else {
    status += " Try each method for 3 days each, and stick to what works best. Different methods fit different people.";
  }

  clearReport();

  gradesReport.innerHTML += `<p>Average = ${average.toFixed(2)}</p>`;
  gradesReport.innerHTML += `<p>Improvement = ${improve}%</p>`;
  gradesReport.innerHTML += `<p>Highest marks = ${highestMarks}</p>`;
  gradesReport.innerHTML += `<p>Best performing subject = ${highestSubject}</p>`;
  gradesReport.innerHTML += `<p>Least performing subject = ${lowestSubject}</p>`;
  gradesReport.innerHTML += `<p>Suggestion = ${status}</p>`;
}

addBtn.addEventListener("click", add);
doneBtn.addEventListener("click", done);
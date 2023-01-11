
const container = document.createElement("div");
container.id = "container";
container.style.height = "80vh";

const nav = document.createElement("div");
nav.id = "nav";

const textStartDate = document.createElement("p")
textStartDate.innerHTML = "Start Date &#8594;"
textStartDate.id = "textStartDate"
nav.appendChild(textStartDate)

const daySelection = document.createElement("select");
daySelection.id = "date-select";

const option1 = document.createElement("option");
option1.value = 13;
option1.textContent = "13";

const option2 = document.createElement("option");
option2.value = 28;
option2.textContent = "28";

daySelection.appendChild(option1);
daySelection.appendChild(option2);

nav.appendChild(daySelection);

container.appendChild(nav);
document.body.appendChild(container);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthSelection = document.createElement("select");
monthSelection.id = "month-select";

months.forEach((month) => {
  const option = document.createElement("option");
  option.value = month;
  option.textContent = month;
  monthSelection.appendChild(option);
});

const uploadFile = document.createElement('input');
uploadFile.id = 'input-file'
uploadFile.type = 'file';
uploadFile.accept = '.csv';

container.appendChild(uploadFile);


fetch('csv-to-json.json')
  .then(response => response.json())
  .then(data => {

    const lastName = document.createElement('select');

    data.names.forEach(item => {
      const ldap = document.createElement('option');
      ldap.value = item.lastname;
      ldap.text = item.lastname;
      lastName.add(ldap);
    });

    nav.appendChild(lastName);
  });



nav.appendChild(monthSelection);
const monthSelect = document.querySelector("#month-select");
monthSelect.addEventListener("change", generateDate);

const dateSelect = document.querySelector("#date-select");
dateSelect.addEventListener("change", generateDate);

const meDiv = document.createElement("div")
  meDiv.id = "meDiv"
  container.appendChild(meDiv)

function generateDate() {
  const selectedMonth = monthSelect.value;
  const selectedDate = parseInt(dateSelect.value, 10);

  const date = new Date();
  date.setMonth(months.indexOf(selectedMonth));

  if (selectedDate === 13) {
    date.setDate(27);
  } else if (selectedDate === 28) {
    date.setMonth(date.getMonth() + 1);
    date.setDate(12);
  }

  const dateElement = document.querySelector("#date");
  const textEndDate2 = document.querySelector("#textEndDate")
  if (dateElement) {
    dateElement.remove();
    textEndDate2.remove();
  }

  const newDateElement = document.createElement("div");
  newDateElement.id = "date";
  newDateElement.textContent = date.toLocaleDateString();
  nav.appendChild(newDateElement);

  const textEndDate = document.createElement("p")
  textEndDate.innerHTML = "&#8592; End Date"
  textEndDate.id = "textEndDate"
  nav.appendChild(textEndDate);

  const table = document.createElement("table");
  table.id = "TableToExport";
  table.style.display = "flex";
  table.style.justifyContent = "center";

  const tableElement = document.querySelector("#TableToExport");
  if (tableElement) {
    tableElement.remove();
  }

  const startDate = new Date(
    selectedMonth + " " + selectedDate + ", " + date.getFullYear()
  );
  const endDate = new Date(date);

  if (startDate > endDate) {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  while (startDate <= endDate) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = startDate.toLocaleDateString();
    row.appendChild(cell);
    table.appendChild(row);
    startDate.setDate(startDate.getDate() + 1);
  }

  meDiv.appendChild(table);
}

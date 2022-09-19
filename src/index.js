import "./styles.css";

async function func1() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let table = document.querySelector("tbody");
      const res = JSON.parse(xhr.responseText);
      const areas = res.dataset.dimension.Alue.category.label;
      const population = res.dataset.value;

      let i = 0;
      for (const key in areas) {
        if (areas.hasOwnProperty(key)) {
          let row = table.insertRow();
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);

          cell1.innerHTML = areas[key];
          cell2.innerHTML = population[i];
          i++;
        }
      }
    }
  };
  xhr.open(
    "GET",
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff ",
    true
  );
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(null);
}

async function func2() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let table = document.querySelector("tbody");
      let rows = table.rows;
      const res = JSON.parse(xhr.responseText);
      const workforce = res.dataset.value;

      for (let i = 0; i < workforce.length; i++) {
        let cell = rows[i].insertCell(2);
        let cell2 = rows[i].insertCell(3);

        cell.innerHTML = workforce[i];
        cell2.innerHTML =
          Math.round((workforce[i] / rows[i].cells[1].innerHTML) * 100) / 100;
        if (cell2.innerHTML > 0.45) {
          rows[i].style.backgroundColor = "#abffbd";
        } else if (cell2.innerHTML < 0.25) {
          rows[i].style.backgroundColor = "#ff9e9e";
        }
      }
    }
  };
  xhr.open(
    "GET",
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065 ",
    true
  );
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(null);
}

document.onload = func1();
document.onload = func2();

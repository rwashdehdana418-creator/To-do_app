function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if (task === "") return;

  createTaskElement(task);

  input.value = "";

  saveTasks();
}


// 🔥 دالة تنشئ المهمة (حتى نعيد استخدامها)
function createTaskElement(task) {
  let li = document.createElement("li");
  li.textContent = task;

  // زر الحذف
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = " 🗑️";

  deleteBtn.onclick = function(event) {
    event.stopPropagation();
    li.remove();
    saveTasks();
  };

  // تحديد كمكتمل
  li.onclick = function() {
    li.classList.toggle("done");
    saveTasks();
  };

  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
}


// 🔥 تحميل المهام عند فتح الصفحة
window.onload = function() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTaskElement(task);
  });
};


// 🔥 حفظ المهام
function saveTasks() {
  let tasks = [];
  let listItems = document.querySelectorAll("#taskList li");

  listItems.forEach(li => {
    tasks.push(li.firstChild.textContent);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
    getTasks,
  } from "./firebase.js";
  
  const taskForm = document.getElementById("task-form");
  const tasksContainer = document.getElementById("tasks-container");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getTasks();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    onGetTasks((querySnapshot) => {
      tasksContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const task = doc.data();
  
        tasksContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
      <p>${task.nome}</p>
      <p>${task.sexo}</p>
      <p>${task.email}</p>
      <p>${task.cpf}</p>
      <p>${task.rg}</p>
      <p>${task.telefone}</p>
      <p>${task.endereco}</p>
      <p>${task.numero}</p>
      <p>${task.cep}</p>
      <p>${task.bairro}</p>
      <p>${task.cidade}</p>
      <p>${task.uf}</p>
      <p>${task.complemento}</p>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Deletar
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Editar
        </button>
      </div>
    </div>`;
      });
  
      const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteTask(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getTask(e.target.dataset.id);
            const task = doc.data();
            taskForm["task-nome"].value = task.nome;
            taskForm["task-sexo"].value = task.sexo;
            taskForm["task-email"].value = task.email;
            taskForm["task-cpf"].value = task.cpf;
            taskForm["task-rg"].value = task.rg;
            taskForm["task-telefone"].value = task.telefone;
            taskForm["task-endereco"].value = task.endereco;
            taskForm["task-numero"].value = task.numero;
            taskForm["task-cep"].value = task.cep;
            taskForm["task-bairro"].value = task.bairro;
            taskForm["task-cidade"].value = task.cidade;
            taskForm["task-uf"].value = task.uf;
            taskForm["task-complemento"].value = task.complemento;
  
            editStatus = true;
            id = doc.id;
            taskForm["btn-task-form"].innerText = "Update";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const nome = taskForm["task-nome"];
    const sexo = taskForm["task-sexo"];
    const email = taskForm["task-email"]
    const cpf = taskForm["task-cpf"]
    const rg = taskForm["task-rg"]
    const telefone = taskForm["task-telefone"]
    const endereco = taskForm["task-endereco"]
    const numero = taskForm["task-numero"]
    const cep = taskForm["task-cep"]
    const bairro = taskForm["task-bairro"]
    const cidade = taskForm["task-cidade"]
    const uf = taskForm["task-uf"]
    const complemento = taskForm["task-complemento"]
  
    try {
      if (!editStatus) {
        await saveTask(nome.value,sexo.value,email.value,cpf.value,rg.value,telefone.value,endereco.value,numero.value,cep.value,bairro.value,cidade.value,uf.value,complemento.value);
      } else {
        await updateTask(id, {
          nome: nome.value,
          sexo: sexo.value,
          email: email.value,
          cpf: cpf.value,
          rg: rg.value,
          telefone: telefone.value,
          endereco: endereco.value,
          numero: numero.value,
          cep: cep.value,
          bairro: bairro.value,
          cidade: cidade.value,
          uf: uf.value,
          complemento: complemento.value,
        });
  
        editStatus = false;
        id = "";
        taskForm["btn-task-form"].innerText = "save";
      }
  
      taskForm.reset();
      title.focus();
    } catch (error) {
      console.log(error);
    }
  });
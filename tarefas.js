function renderizarTarefa(tarefaObj) {
  const { tarefa, data, hora } = tarefaObj;

  let info = tarefa;
  if (data && hora) {
    info += `<br>${data} 𖥕 ${hora}`;
  } else if (data) {
    info += `<br>${data}`;
  } else if (hora) {
    info += `<br>${hora}`;
  }

  document.getElementById('container').innerHTML += `
    <center>
      <div class="obj">
        ${info}
        <button onclick="removerElemento(this)" 
                class="fa fa-trash-o" 
                style="font-size:18px" 
                data-task="${tarefa}" 
                data-data="${data}" 
                data-hora="${hora}" 
                id="rm1">
        </button>
      </div>
    </center>
  `;
}

function adicionar() {
  const tarefa = document.getElementById('txt_user').value;
  const data = document.getElementById('dias1').value;
  const hora = document.getElementById('data1').value;

  if (tarefa === "") {
    alert('Adicione a Tarefa');
    return;
  }

  const novaTarefa = { tarefa, data, hora };

  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.push(novaTarefa);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));

  renderizarTarefa(novaTarefa);

  document.getElementById('txt_user').value = '';
  document.getElementById('dias1').value = '';
  document.getElementById('data1').value = '';
}

function removerElemento(botao) {
  const tarefa = botao.getAttribute("data-task");
  const data = botao.getAttribute("data-data");
  const hora = botao.getAttribute("data-hora");

  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas = tarefas.filter(item =>
    !(item.tarefa === tarefa && item.data === data && item.hora === hora)
  );

  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  botao.parentElement.remove();
}

window.addEventListener('DOMContentLoaded', () => {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  tarefas.forEach(tarefa => renderizarTarefa(tarefa));
});

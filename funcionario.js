function abrirCadastro() {
    document.getElementById("modal-cadastro").style.display = "block";
}

function fecharCadastro() {
    document.getElementById("modal-cadastro").style.display = "none";
}

function filtrarFuncionarios() {
    let input = document.getElementById("pesquisa");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("tabela-funcionarios");
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}

function editarFuncionario() {
    alert("Editar funcionário");
}

function excluirFuncionario() {
    if (confirm("Deseja realmente excluir este funcionário?")) {
        alert("Funcionário excluído");
    }
}

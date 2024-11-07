document.getElementById('adicionarItem').addEventListener('click', adicionarItem);
document.getElementById('selecionarTodos').addEventListener('change', selecionarTodosItens);

function adicionarItem() {
    // Captura os valores dos campos do formulário
    const funcionario = document.getElementById('funcionario').value;
    const epi = document.getElementById('epi').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataEntrega = document.getElementById('dataEntrega').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!funcionario || !epi || !quantidade || !dataEntrega) {
        alert("Por favor, preencha todos os campos obrigatórios: Funcionário, EPI, Quantidade e Data de Entrega.");
        return; // Impede a adição do item se algum campo estiver vazio
    }

    const tabela = document.getElementById('tabelaItens').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    
    // Checkbox para selecionar a linha
    const celulaSelecionar = novaLinha.insertCell(0);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    celulaSelecionar.appendChild(checkbox);

    // Adicionar valores à tabela
    novaLinha.insertCell(1).textContent = funcionario;
    novaLinha.insertCell(2).textContent = epi;
    novaLinha.insertCell(3).textContent = quantidade;
    novaLinha.insertCell(4).textContent = dataEntrega;

    // Limpa o formulário após adicionar o item
    document.getElementById('formEPI').reset();
}

function selecionarTodosItens() {
    const tabela = document.getElementById('tabelaItens').getElementsByTagName('tbody')[0];
    const checkboxes = tabela.querySelectorAll('input[type="checkbox"]');
    const selecionarTodos = document.getElementById('selecionarTodos').checked;

    checkboxes.forEach(checkbox => {
        checkbox.checked = selecionarTodos;
    });
}
document.getElementById("btnregistrar").addEventListener("click", () => {
    // Obter as linhas da tabela original
    const tabela = document.getElementById('tabelaItens').getElementsByTagName('tbody')[0];
    const linhas = tabela.getElementsByTagName('tr');

    // Criar um documento temporário
    const documentoTemporario = document.createElement('div');

    // Adicionar cabeçalho com declaração de responsabilidade
    const declaracao = document.createElement('p');
    declaracao.innerHTML = `
        Eu, <b>${document.getElementById('funcionario').value}</b>, declaro que recebi os Equipamentos de Proteção Individual (EPIs) abaixo listados e estou ciente de minha responsabilidade pelo uso adequado dos mesmos, conforme as normas da empresa.<br><br>
        <b>Itens recebidos:</b>
    `;
    documentoTemporario.appendChild(declaracao);

    // Criar tabela temporária para os itens selecionados
    const tabelaTemporaria = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Adicionar cabeçalho à tabela temporária
        thead.innerHTML = `
            <tr>
                <th>Funcionário</th>
                <th>EPI</th>
                <th>Quantidade</th>
                <th>Data</th>
            </tr>`;
        tabelaTemporaria.appendChild(thead);
        tabelaTemporaria.appendChild(tbody);

        // Percorrer as linhas e adicionar as selecionadas à tabela temporária
        Array.from(linhas).forEach(linha => {
            const checkbox = linha.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                const novaLinha = tbody.insertRow();
                for (let i = 1; i < linha.cells.length; i++) {
                    const novaCelula = novaLinha.insertCell(i - 1);
                    novaCelula.textContent = linha.cells[i].textContent;
                }
            }
        });

        // Adicionar a tabela ao documento temporário
        documentoTemporario.appendChild(tabelaTemporaria);

        // Adicionar espaço para assinatura
        const assinatura = document.createElement('p');
        assinatura.innerHTML = `<br><br>_____________________________________<br>Assinatura do Funcionário`;
        documentoTemporario.appendChild(assinatura);

        // Verificar se há itens selecionados
        if (tbody.rows.length === 0) {
            alert("Nenhum item foi selecionado para gerar o PDF.");
            return;
        }

    // Configurações do PDF
    const options = {
        margin: [20, 20, 20, 20],
        filename: "entrega_epi.pdf",
        html2canvas: { scale: 1.5 },
        jsPDF: { unit: "mm", format: "A4", orientation: "portrait" },
    };

    // Gerar o PDF com o documento temporário
    html2pdf().set(options).from(documentoTemporario).save();
});

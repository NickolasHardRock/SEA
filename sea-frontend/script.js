// API Base URL
const API_BASE = 'http://localhost:3000/api';

// Dados do frontend
let ocorrencias = [];
let destaques = [];
let turmas = [];
let usuarios = [];

// Funções para carregar dados da API
async function carregarUsuario() {
    try {
        const response = await fetch(`${API_BASE}/usuario`);
        if (!response.ok) throw new Error(`Erro ao buscar alunos: ${response.status}`);
        alunos = await response.json();
    } catch (error) {
        console.error('Erro ao carregar alunos:', error.message);
        alunos = [];
    }
}

async function carregarTurmas() {
    try {
        const response = await fetch(`${API_BASE}/turma`);
        if (!response.ok) throw new Error(`Erro ao buscar turmas: ${response.status}`);
        turmas = await response.json();
        atualizarTabelaTurmas();
        atualizarSelectTurmas();
        atualizarSelectTurmasListagem();
    } catch (error) {
        console.error('Erro ao carregar turmas:', error.message);
        turmas = [];
    }
}

async function carregarOcorrencias() {
    try {
        const response = await fetch(`${API_BASE}/ocorrencia`);
        if (!response.ok) throw new Error(`Erro ao buscar ocorrências: ${response.status}`);
        ocorrencias = await response.json();
    } catch (error) {
        console.error('Erro ao carregar ocorrências:', error.message);
        ocorrencias = [];
    }
}

async function carregarDestaques() {
    try {
        const response = await fetch(`${API_BASE}/destaquePositivo`);
        if (!response.ok) throw new Error(`Erro ao buscar destaques: ${response.status}`);
        destaques = await response.json();
    } catch (error) {
        console.error('Erro ao carregar destaques:', error.message);
        destaques = [];
    }
}

// Carregar todos os dados ao iniciar
async function carregarTodosDados() {
    await Promise.all([
        carregarUsuario(),
        carregarTurmas(),
        carregarOcorrencias(),
        carregarDestaques()
    ]);
}

// Mostrar página específica
function mostrarPagina(pagina) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');

    const page = document.getElementById(pagina);
    if (page) {
        page.style.display = 'block';
    }

    if (pagina === 'dashboard') {
        atualizarDashboard();
    }
}

// Atualizar Tabela de Turmas
function atualizarTabelaTurmas() {
    const tabela = document.getElementById('tabelaTurmas');
    if (!tabela) return;

    if (turmas.length > 0) {
        tabela.innerHTML = turmas.map(t => `
            <tr>
                <td>${t.id}</td>
                <td>${t.nome}</td>
                <td>
                    <button class="btn-sair" style="padding: 5px 10px; font-size: 12px;" onclick="deletarTurma(${t.id})">Excluir</button>
                </td>
            </tr>
        `).join('');
    } else {
        tabela.innerHTML = '<tr><td colspan="3" class="empty-message">Nenhuma turma cadastrada</td></tr>';
    }
}

// Atualizar Select de Turmas no form de Aluno
function atualizarSelectTurmas() {
    const select = document.getElementById('turmaAlunoSelect');
    if (!select) return;

    const options = turmas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
    select.innerHTML = '<option value="">Selecione uma turma</option>' + options;
}

// Atualizar Select de Turmas na listagem de alunos por turma
function atualizarSelectTurmasListagem(){
    const select = document.getElementById('filtroTurmaSelect');
    if(!select) return;

    const options = turmas.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
    select.innerHTML = '<option value="">Selecione uma turma</option>' + options;
}

// Criar Turma
async function criarTurma(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeTurma').value;

    try {
        const response = await fetch(`${API_BASE}/turma`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome })
        });

        if (!response.ok) throw new Error('Erro ao criar turma');

        alert('Turma criada com sucesso!');
        document.getElementById('formTurma').reset();
        await carregarTurmas();
    } catch (error) {
        alert(error.message);
    }
}

// Deletar Turma
async function deletarTurma(id) {
    if (!confirm('Deseja realmente excluir esta turma?')) return;

    try {
        const response = await fetch(`${API_BASE}/turma/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao excluir turma');

        alert('Turma excluída com sucesso!');
        await carregarTurmas();
    } catch (error) {
        alert(error.message);
    }
}

// Adicionar Aluno
async function adicionarAluno(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeAluno').value;
    const matricula = document.getElementById('matriculaAluno').value;
    const turma_id = document.getElementById('turmaAlunoSelect').value;
    const perfil = "Aluno"

    try {
        const response = await fetch(`${API_BASE}/usuario/NovoUsuario/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, matricula, turma_id,perfil })
        });

        if (!response.ok) throw new Error('Erro ao adicionar aluno');

        alert('Aluno adicionado com sucesso!');
        document.getElementById('formAdicionarAluno').reset();
        await carregarUsuario();
        mostrarPagina('dashboard');
    } catch (error) {
        alert(error.message);
    }
}

// Listar alunos por turma selecionada
function listarAlunosPorTurma(){
    const turmaId = document.getElementById('filtroTurmaSelect').value;
    const tabela = document.getElementById('tabelaAlunosTurma');
    const estatisticas = document.getElementById('estatisticasTurma');

    if(!turmaId){
        tabela.innerHTML = '<tr> <td colspan="3" class="empty-message"> Selecione uma turma para visualizar os alunos</td></tr>';
        estatisticas.style.display = 'none';
        return;
    }

    // Filtrar alunos pela turma selecionada
    const alunosDaTurma = alunos.filter(a => a.turma_id == turmaId);
    

    if(alunosDaTurma.length > 0){
        tabela.innerHTML =alunosDaTurma.map(aluno =>
            `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.matricula}</td>
                <td>${obterNomeTurma(aluno.turma_id)}</td>
                <td><span style="color: green; font-weight: bold;">Ativo</span></td>
            </tr>
            `).join('');
    }else{
        tabela.innerHTML = '<tr><td colspan="5" class="empty-message">Nenhum aluno encontrado nesta turma</td></tr>';
    }

    //Atualizar estatísticas da turma
    atualizarEstatisticasTurma(turmaId,alunosDaTurma);
    estatisticas.style.display = 'block';

}

// Obter nome da turma pelo ID
function atualizarEstatisticasTurma(turmaId,alunosDaTurma){
    //Total de Alunos
    document.getElementById('totalAlunosTurma').textContent = alunosDaTurma.length;


    // Alunos com ocorrências
    const alunosComOcorrecias = new Set(
        ocorrencias
            .filter(o => alunosDaTurma.some(a => a.id == o.aluno_id))
            .map(o => o.aluno_id)
    ).size;
    document.getElementById('alunosComOcorrencias').textContent = alunosComOcorrecias;

    // Alunos com destaques 
    const alunoComDestaques = new Set(
        destaques
            .filter(d => alunosDaTurma.some(a => a.id == d.aluno_id))
            .map(o => o.aluno_id)
    ).size;
    document.getElementById('alunosComDestaques').textContent = alunoComDestaques;
}

// Obter nome da turma pelo ID
function obterNomeTurma(turmaId) {
    const turma = turmas.find(t => t.id == turmaId);
    return turma ? turma.nome : '-';
}

// Atualizar dashboard
function atualizarDashboard() {
    const statCards = document.querySelectorAll('.stat-number');
    if (statCards.length >= 3) {
        statCards[0].textContent = ocorrencias.length;
        statCards[1].textContent = destaques.length;
        statCards[2].textContent = new Set(ocorrencias.map(o => o.aluno_id)).size;
    }

    const listaOcorrencias = document.getElementById('listaOcorrenciasRecentes');
    const ocorrenciasVazias = document.getElementById('ocorrenciasVazias');

    if (listaOcorrencias && ocorrenciasVazias) {
        if (ocorrencias.length > 0) {
            ocorrenciasVazias.style.display = 'none';
            listaOcorrencias.innerHTML = ocorrencias.slice(-3).reverse().map(o => `
                <div class="activity-item">
                    <p>${o.descricao}</p>
                    <span class="date">${formatarData(o.datahora)}</span>
                </div>
            `).join('');
        } else {
            ocorrenciasVazias.style.display = 'block';
            listaOcorrencias.innerHTML = '';
        }
    }
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async function () {
    await carregarTodosDados();

    console.log(carregarTurmas())

    const formTurma = document.getElementById('formTurma');
    if (formTurma) formTurma.addEventListener('submit', criarTurma);

    const formAdicionarAluno = document.getElementById('formAdicionarAluno');
    if (formAdicionarAluno) formAdicionarAluno.addEventListener('submit', adicionarAluno);

    mostrarPagina('dashboard');
});
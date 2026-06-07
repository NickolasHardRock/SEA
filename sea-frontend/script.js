// API Base URL
const API_BASE = 'http://localhost:3000/api';

// Dados do frontend
let ocorrencias = [];
let destaques = [];
let alunos = [];
let usuarios = [];

// Funções para carregar dados da API
async function carregarAlunos() {
    try {
        const response = await fetch(`${API_BASE}/aluno`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar alunos: ${response.status}`);
        }
        alunos = await response.json();
        console.log('Alunos carregados:', alunos);
    } catch (error) {
        console.error('Erro ao carregar alunos:', error.message);
        alunos = [];
    }
}

async function carregarOcorrencias() {
    try {
        const response = await fetch(`${API_BASE}/ocorrencia`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar ocorrências: ${response.status}`);
        }
        ocorrencias = await response.json();
        console.log('Ocorrências carregadas:', ocorrencias);
    } catch (error) {
        console.error('Erro ao carregar ocorrências:', error.message);
        ocorrencias = [];
    }
}

async function carregarDestaques() {
    try {
        const response = await fetch(`${API_BASE}/destaquePositivo`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar destaques: ${response.status}`);
        }
        destaques = await response.json();
        console.log('Destaques carregados:', destaques);
    } catch (error) {
        console.error('Erro ao carregar destaques:', error.message);
        destaques = [];
    }
}

async function carregarUsuarios() {
    try {
        const response = await fetch(`${API_BASE}/usuario`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.status}`);
        }
        usuarios = await response.json();
        console.log('Usuários carregados:', usuarios);
    } catch (error) {
        console.error('Erro ao carregar usuários:', error.message);
        usuarios = [];
    }
}

// Carregar todos os dados ao iniciar
async function carregarTodosDados() {
    await Promise.all([
        carregarAlunos(),
        carregarOcorrencias(),
        carregarDestaques(),
        carregarUsuarios()
    ]);
}

// Inicializar dados de exemplo
function inicializarDados() {
    if (alunos.length === 0) {
        alunos = [

            { id_aluno: 1, matricula: 2026001, nome: "João Silva", turma: "Turma A" },
            { id_aluno: 2, matricula: 2026002, nome: "Maria Santos", turma: "Turma B" },
            { id_aluno: 3, matricula: 2026003, nome: "Pedro Oliveira", turma: "Turma A" },


        ];
    }
}

// Mostrar página específica
function mostrarPagina(pagina) {
    // Esconder todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');

    // Mostrar página selecionada
    const page = document.getElementById(pagina);
    if (page) {
        page.style.display = 'block';
    }

    // Se for dashboard, atualizar dados
    if (pagina === 'dashboard') {
        atualizarDashboard();
    }
}

// Atualizar dashboard
function atualizarDashboard() {
    // Atualizar estatísticas
    const statCards = document.querySelectorAll('.stat-number');
    statCards[0].textContent = ocorrencias.length;
    statCards[1].textContent = destaques.length;
    statCards[2].textContent = new Set(ocorrencias.map(o => o.aluno_id)).size;

    // Atualizar ocorrências recentes
    const listaOcorrencias = document.getElementById('listaOcorrenciasRecentes');
    const ocorrenciasVazias = document.getElementById('ocorrenciasVazias');

    if (ocorrencias.length > 0) {
        ocorrenciasVazias.style.display = 'none';
        listaOcorrencias.innerHTML = ocorrencias
            .slice(-3)
            .reverse()
            .map(o => `
                <div class="activity-item">
                    <p>${o.descricao}</p>
                    <span class="date">${formatarData(o.datahora)}</span>
                </div>
            `)
            .join('');
    } else {
        ocorrenciasVazias.style.display = 'block';
        listaOcorrencias.innerHTML = '';
    }

    // Atualizar destaques recentes
    const listaDestaques = document.getElementById('listaDestaquesRecentes');
    const destaquesVazios = document.getElementById('destaquesVazios');

    if (destaques.length > 0) {
        destaquesVazios.style.display = 'none';
        listaDestaques.innerHTML = destaques
            .slice(-3)
            .reverse()
            .map(d => `
                <div class="activity-item">
                    <p>${d.descricao}</p>
                    <span class="date">${formatarData(d.datahora)}</span>
                </div>
            `)
            .join('');
    } else {
        destaquesVazios.style.display = 'block';
        listaDestaques.innerHTML = '';
    }
}

// Formatar data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Obter nome do tipo de ocorrência
function getNomeTipo(tipo) {
    const tipos = {
        1: 'Comportamento',
        2: 'Atraso',
        3: 'Rendimento',
        4: 'Material',
    };
    return tipos[tipo] || 'N/A';
}

// Obter nome da gravidade
function getNomeGravidade(gravidade) {
    const gravidades = {
        1: 'Leve',
        2: 'Média',
        3: 'Alta',
    };
    return gravidades[gravidade] || 'N/A';
}

// Obter classe CSS da gravidade
function getClasseGravidade(gravidade) {
    const classes = {
        1: 'gravidade-leve',
        2: 'gravidade-media',
        3: 'gravidade-alta',
    };
    return classes[gravidade] || '';
}

// Registrar ocorrência
async function registrarOcorrencia(e) {
    e.preventDefault();

    const alunoId = parseInt(document.getElementById('alunoId').value);
    const tipo = parseInt(document.getElementById('tipoOcorrencia').value);
    const gravidade = parseInt(document.getElementById('gravidade').value);
    const descricao = document.getElementById('descricao').value;
    const acaoTomada = document.getElementById('acaoTomada').value;

    if (!alunoId || !tipo || !gravidade || !descricao) {
        alert('Preencha todos os campos obrigatórios');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/ocorrencia`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataHora: new Date().toISOString(),
                tipoOcorrencia: tipo,
                descricao: descricao,
                acaoTomada: acaoTomada,
                alunoId: alunoId,
                registroPor: 1,
                gravidadeId: gravidade,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar ocorrência: ${response.status}`);
        }

        alert('Ocorrência registrada com sucesso!');
        document.getElementById('formOcorrencia').reset();
        await carregarOcorrencias();
        mostrarPagina('dashboard');
    } catch (error) {
        console.error('Erro ao registrar ocorrência:', error);
        alert('Erro ao registrar ocorrência: ' + error.message);
    }
}

// Registrar destaque
async function registrarDestaque(e) {
    e.preventDefault();

    const alunoId = parseInt(document.getElementById('alunoIdDestaque').value);
    const descricao = document.getElementById('descricaoDestaque').value;

    if (!alunoId || !descricao) {
        alert('Preencha todos os campos obrigatórios');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/destaquePositivo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dataHora: new Date().toISOString(),
                descricao: descricao,
                registrado: 1,
                alunoId: alunoId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar destaque: ${response.status}`);
        }

        alert('Destaque positivo registrado com sucesso!');
        document.getElementById('formDestaque').reset();
        await carregarDestaques();
        mostrarPagina('dashboard');
    } catch (error) {
        console.error('Erro ao registrar destaque:', error);
        alert('Erro ao registrar destaque: ' + error.message);
    }
}

// Buscar aluno por matrícula
async function buscarAluno(e) {
    e.preventDefault();

    const matricula = parseInt(document.getElementById('matriculaBusca').value);
    const aluno = alunos.find(a => a.matricula === matricula);

    const resultadoBusca = document.getElementById('resultadoBusca');

    if (aluno) {
        // Mostrar resultado
        document.getElementById('alunoNome').textContent = aluno.nome || 'N/A';
        document.getElementById('alunoMatricula').textContent = aluno.matricula;
        document.getElementById('alunoTurma').textContent = aluno.turma || 'N/A';
        document.getElementById('alunoStatus').textContent = 'Ativo';

        // Ocorrências do aluno
        const ocorrenciasAluno = ocorrencias.filter(o => o.aluno_id === aluno.id_aluno);
        const ocorrenciasHistorico = document.getElementById('ocorrenciasHistorico');
        if (ocorrenciasAluno.length > 0) {
            ocorrenciasHistorico.innerHTML = ocorrenciasAluno
                .map(o => `
                    <div class="activity-item">
                        <p>${o.descricao}</p>
                        <span class="date">${formatarData(o.datahora)}</span>
                    </div>
                `)
                .join('');
        } else {
            ocorrenciasHistorico.innerHTML = '<p>Nenhuma ocorrência registrada</p>';
        }

        // Destaques do aluno
        const destaquesAluno = destaques.filter(d => d.aluno_id === aluno.id_aluno);
        const destaquesHistorico = document.getElementById('destaquesHistorico');
        if (destaquesAluno.length > 0) {
            destaquesHistorico.innerHTML = destaquesAluno
                .map(d => `
                    <div class="activity-item">
                        <p>${d.descricao}</p>
                        <span class="date">${formatarData(d.datahora)}</span>
                    </div>
                `)
                .join('');
        } else {
            destaquesHistorico.innerHTML = '<p>Nenhum destaque registrado</p>';
        }

        resultadoBusca.style.display = 'block';
    } else {
        alert('Aluno não encontrado');
        resultadoBusca.style.display = 'none';
    }
}

// Listar ocorrências com filtros
function listarOcorrenciasComFiltros() {
    const filtroTipo = document.getElementById('filtroTipo').value;
    const filtroGravidade = document.getElementById('filtroGravidade').value;
    const filtroPeriodo = document.getElementById('filtroPeriodo').value;

    let ocorrenciasFiltrads = ocorrencias;

    if (filtroTipo) {
        ocorrenciasFiltrads = ocorrenciasFiltrads.filter(o => o.tipo_ocorrencia === parseInt(filtroTipo));
    }

    if (filtroGravidade) {
        ocorrenciasFiltrads = ocorrenciasFiltrads.filter(o => o.gravidade_id === parseInt(filtroGravidade));
    }

    if (filtroPeriodo) {
        ocorrenciasFiltrads = ocorrenciasFiltrads.filter(o => {
            const dataObj = new Date(o.datahora);
            const mes = dataObj.getMonth() + 1;
            const ano = dataObj.getFullYear();
            const filtroMes = filtroPeriodo.split('-')[1];
            const filtroAno = filtroPeriodo.split('-')[0];
            return mes === parseInt(filtroMes) && ano === parseInt(filtroAno);
        });
    }

    // Preencher tabela
    const tabelaOcorrencias = document.getElementById('tabelaOcorrencias');
    if (ocorrenciasFiltrads.length > 0) {
        tabelaOcorrencias.innerHTML = ocorrenciasFiltrads
            .map(o => {
                const aluno = alunos.find(a => a.id_aluno === o.aluno_id);
                return `
                    <tr>
                        <td>${formatarData(o.datahora)}</td>
                        <td>${aluno ? aluno.nome : 'N/A'}</td>
                        <td>${getNomeTipo(o.tipo_ocorrencia)}</td>
                        <td>
                            <span class="gravidade-badge ${getClasseGravidade(o.gravidade_id)}">
                                ${getNomeGravidade(o.gravidade_id)}
                            </span>
                        </td>
                        <td>${o.descricao}</td>
                    </tr>
                `;
            })
            .join('');
    } else {
        tabelaOcorrencias.innerHTML = '<tr><td colspan="5" class="empty-message">Nenhuma ocorrência encontrada</td></tr>';
    }
}

// Limpar filtros
function limparFiltros() {
    document.getElementById('filtroTipo').value = '';
    document.getElementById('filtroGravidade').value = '';
    document.getElementById('filtroPeriodo').value = '';
    listarOcorrenciasComFiltros();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async function () {
    // Carregar todos os dados da API
    await carregarTodosDados();

    // Formulário de ocorrência
    const formOcorrencia = document.getElementById('formOcorrencia');
    if (formOcorrencia) {
        formOcorrencia.addEventListener('submit', registrarOcorrencia);
    }

    // Formulário de destaque
    const formDestaque = document.getElementById('formDestaque');
    if (formDestaque) {
        formDestaque.addEventListener('submit', registrarDestaque);
    }

    // Formulário de busca
    const formBusca = document.getElementById('formBusca');
    if (formBusca) {
        formBusca.addEventListener('submit', buscarAluno);
    }

    // Filtros de ocorrências
    const filtroTipo = document.getElementById('filtroTipo');
    const filtroGravidade = document.getElementById('filtroGravidade');
    const filtroPeriodo = document.getElementById('filtroPeriodo');

    if (filtroTipo) {
        filtroTipo.addEventListener('change', listarOcorrenciasComFiltros);
    }
    if (filtroGravidade) {
        filtroGravidade.addEventListener('change', listarOcorrenciasComFiltros);
    }
    if (filtroPeriodo) {
        filtroPeriodo.addEventListener('change', listarOcorrenciasComFiltros);
    }

    // Botão sair
    const btnSair = document.getElementById('btnSair');
    if (btnSair) {
        btnSair.addEventListener('click', function () {
            if (confirm('Deseja sair do sistema?')) {
                alert('Você foi desconectado');
            }
        });
    }

    // Mostrar dashboard por padrão
    mostrarPagina('dashboard');
});

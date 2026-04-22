

async function getUsuario() {
    const Usuarios = "http://localhost:3000/api/usuario";
    try {
        const response = await fetch(Usuarios);
        if (!response.ok) {
            throw new Error(`Respsonse status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.error(error.message);
    }
}


async function getUsuarioId(id) {
    const url = `http://localhost:3000/api/usuario/id/{id}`
    try {
        const response = await fetch(url)
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error("Usuario não encontrado", error.message)
    }
}

async function getOcorrencia() {
    const Ocorrencia = "http://localhost:3000/api/ocorrencia";
    try {
        const response = await fetch(Ocorrencia);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result)
        return result;

    } catch (error) {
        console.error(error.message);
    }
}

async function getDestaquePositivo() {
    const DestaquePositivo = "http://localhost:3000/api/destaquePositivo";
    try {
        const response = await fetch(DestaquePositivo);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

async function criarOcorrencia(novaOcorrencia) {
    const url = "http://localhost:3000/api/ocorrencia/NovaOcorrencia";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaOcorrencia)
        });

        const result = await response.json();
        console.log("Resposta do servidor:", result);
    } catch (error) {
        console.error("Erro ao criar ocorrência:", error.message);
    }
}

async function criarDestaque(novoDestaque) {
    const url = "http://localhost:3000/api/destaquePositivo/NovoDestaque";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoDestaque)
        })
        const result = await response.json()
        console.log("Resposta do servidor:", result)
    } catch (error) {
        console.error("Erro ao criar o Destaque:", error.message)
    }
}

// // Inicializar dados de exemplo
// function inicializarDados() {
//     alunos = [
//         { id: 1, matricula: 2026001, nome: "João Silva", turma: "Turma A" },
//         { id: 2, matricula: 2026002, nome: "Maria Santos", turma: "Turma B" },
//         { id: 3, matricula: 2026003, nome: "Pedro Oliveira", turma: "Turma A" },
//     ];

//     ocorrencias = [
//         {
//             id: 1,
//             aluno_id: 1,
//             tipo: 1,
//             gravidade: 2,
//             descricao: "Comportamento inadequado em sala",
//             data: new Date(2026, 2, 28),
//         },
//         {
//             id: 2,
//             aluno_id: 2,
//             tipo: 2,
//             gravidade: 1,
//             descricao: "Atraso na chegada à aula",
//             data: new Date(2026, 2, 27),
//         },
//     ];

//     destaques = [
//         {
//             id: 1,
//             aluno_id: 1,
//             descricao: "Excelente desempenho em matemática",
//             data: new Date(2026, 2, 26),
//         },
//         {
//             id: 2,
//             aluno_id: 2,
//             descricao: "Ajudou colegas em atividade de grupo",
//             data: new Date(2026, 2, 25),
//         },
//     ];
// }

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
async function atualizarDashboard() {

    const ocorrencias = await getOcorrencia();
    const destaques = await getDestaquePositivo();


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
                    <span class="date">${(formatarData(o.datahora))}</span>
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
function registrarOcorrencia(e) {
    e.preventDefault();

    const tipo = parseInt(document.getElementById('tipoOcorrencia').value);
    const descricao = document.getElementById('descricao').value;
    const acaoTomada = document.getElementById('acaoTomada').value;
    const registradoPorID = parseInt(document.getElementById('registradoPorId').value);
    const alunoId = parseInt(document.getElementById('alunoId').value);

    const gravidade = parseInt(document.getElementById('gravidade').value);


    if (!alunoId || !tipo || !gravidade || !descricao || !registradoPorID || !acaoTomada) {
        alert('Preencha todos os campos obrigatórios');
        return;
    }

    const novaOcorrencia = {
        dataHora: new Date(),
        tipoOcorrencia: tipo,
        descricao: descricao,
        acaoTomada: acaoTomada,
        registradoPor: registradoPorID,
        alunoId: alunoId,
        gravidadeId: gravidade
    };

    criarOcorrencia(novaOcorrencia);
    alert('Ocorrência registrada com sucesso!');

    // Limpar formulário
    document.getElementById('formOcorrencia').reset();
    mostrarPagina('dashboard');
}

// Registrar destaque
function registrarDestaque(e) {
    e.preventDefault();

    const alunoId = parseInt(document.getElementById('alunoIdDestaque').value);
    const descricao = document.getElementById('descricaoDestaque').value;
    const registrado = parseInt(document.getElementById('resgistradoPor').value)


    if (!alunoId || !descricao) {
        alert('Preencha todos os campos obrigatórios');
        return;
    }

    const novoDestaque = {
        dataHora: new Date(),
        descricao: descricao,
        registrado: registrado,
        alunoId: alunoId
    };

    criarDestaque(novoDestaque);
    alert('Destaque positivo registrado com sucesso!');

    // Limpar formulário
    document.getElementById('formDestaque').reset();
    mostrarPagina('dashboard');
}

// Registrar aluno
function registrarAluno(e){
    e.preventDefault()

    document.getElementById('formAluno').reset()
    mostrarPagina('dashboard')
}

// Buscar aluno por matrícula
function buscarAluno(e) {
    e.preventDefault();

    const matricula = parseInt(document.getElementById('matriculaBusca').value);
    const aluno = getUsuarioId()
    // const aluno = alunos.find(a => a.matricula === matricula);

    const resultadoBusca = document.getElementById('resultadoBusca');

    if (aluno) {
        // Mostrar resultado
        document.getElementById('alunoNome').textContent = aluno.nome;
        document.getElementById('alunoMatricula').textContent = aluno.matricula;
        document.getElementById('alunoTurma').textContent = aluno.turma;
        document.getElementById('alunoStatus').textContent = 'Ativo';

        // Ocorrências do aluno
        const ocorrenciasAluno = ocorrencias.filter(o => o.aluno_id === aluno.id);
        const ocorrenciasHistorico = document.getElementById('ocorrenciasHistorico');
        if (ocorrenciasAluno.length > 0) {
            ocorrenciasHistorico.innerHTML = ocorrenciasAluno
                .map(o => `
                    <div class="activity-item">
                        <p>${o.descricao}</p>
                        <span class="date">${formatarData(o.data)}</span>
                    </div>
                `)
                .join('');
        } else {
            ocorrenciasHistorico.textContent = 'Nenhuma ocorrência registrada';
        }

        // Destaques do aluno
        const destaquesAluno = destaques.filter(d => d.aluno_id === aluno.id);
        const destaquesHistorico = document.getElementById('destaquesHistorico');
        if (destaquesAluno.length > 0) {
            destaquesHistorico.innerHTML = destaquesAluno
                .map(d => `
                    <div class="activity-item">
                        <p>${d.descricao}</p>
                        <span class="date">${formatarData(d.data)}</span>
                    </div>
                `)
                .join('');
        } else {
            destaquesHistorico.textContent = 'Nenhum destaque registrado';
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
    const filtroTurma = document.getElementById('filtroTurma').value;

    let ocorrenciasFiltrads = ocorrencias;

    if (filtroTipo) {
        ocorrenciasFiltrads = ocorrenciasFiltrads.filter(o => o.tipo === parseInt(filtroTipo));
    }

    if (filtroGravidade) {
        ocorrenciasFiltrads = ocorrenciasFiltrads.filter(o => o.gravidade === parseInt(filtroGravidade));
    }

    if (filtroPeriodo) {
        ocorrenciasFiltrads = ocorrenciasFiltrads.filter(o => {
            const mes = o.data.getMonth() + 1;
            const ano = o.data.getFullYear();
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
                const aluno = alunos.find(a => a.id === o.aluno_id);
                return `
                    <tr>
                        <td>${formatarData(o.data)}</td>
                        <td>${aluno ? aluno.nome : 'N/A'}</td>
                        <td>${getNomeTipo(o.tipo)}</td>
                        <td>
                            <span class="gravidade-badge ${getClasseGravidade(o.gravidade)}">
                                ${getNomeGravidade(o.gravidade)}
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
    document.getElementById('filtroTurma').value = '';
    listarOcorrenciasComFiltros();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // inicializarDados();

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

    // Formulário de aluno
    const formAluno  = document.getElementById('formAluno')
    if(formAluno){
        formAluno.addEventListener('submit',registrarAluno)
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
    const filtroTurma = document.getElementById('filtroTurma');

    if (filtroTipo) {
        filtroTipo.addEventListener('change', listarOcorrenciasComFiltros);
    }
    if (filtroGravidade) {
        filtroGravidade.addEventListener('change', listarOcorrenciasComFiltros);
    }
    if (filtroPeriodo) {
        filtroPeriodo.addEventListener('change', listarOcorrenciasComFiltros);
    }
    if (filtroTurma) {
        filtroTurma.addEventListener('change', listarOcorrenciasComFiltros);
    }

    // Botão sair
    const btnSair = document.getElementById('btnSair');
    if (btnSair) {
        btnSair.addEventListener('click', function () {
            if (confirm('Deseja sair do sistema?')) {
                alert('Você foi desconectado');
                // Em produção, redirecionar para login
            }
        });
    }

    // Mostrar dashboard por padrão
    mostrarPagina('dashboard');

});

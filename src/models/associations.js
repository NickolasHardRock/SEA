import Aluno from './AlunoModel.js';
import Usuario from './UsuarioModel.js';
import Ocorrencia from './OcorrenciaModel.js';
import DestaquePositivo from './DestaquePositivoModel.js';

// Definição das associações
Aluno.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Aluno.hasMany(DestaquePositivo, { foreignKey: 'aluno_id', as: 'destaques' });
Aluno.hasMany(Ocorrencia, { foreignKey: 'aluno_id', as: 'ocorrencias' });

DestaquePositivo.belongsTo(Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
DestaquePositivo.belongsTo(Usuario, { foreignKey: 'registrado_por', as: 'registradoPor' });

Ocorrencia.belongsTo(Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
Ocorrencia.belongsTo(Usuario, { foreignKey: 'registrado_por', as: 'registradoPor' });

// Exporta todos os modelos com as associações aplicadas
export { Aluno, Usuario, Ocorrencia, DestaquePositivo };

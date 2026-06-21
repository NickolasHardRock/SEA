
import Usuario from './UsuarioModel.js';
import Ocorrencia from './OcorrenciaModel.js';
import DestaquePositivo from './DestaquePositivoModel.js';
import Turma from './turmaModel.js';

// Definição das associações

Turma.hasMany(Usuario, { foreignKey: 'turma_id', as: 'usuarios' });
Usuario.belongsTo(Turma, { foreignKey: 'turma_id', as: 'turma' });

Usuario.hasMany(DestaquePositivo, { foreignKey: 'usuario_id', as: 'destaques' });
Usuario.hasMany(Ocorrencia, { foreignKey: 'usuario_id', as: 'ocorrencias' });

DestaquePositivo.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
DestaquePositivo.belongsTo(Usuario, { foreignKey: 'registrado_por', as: 'registradoPor' });

Ocorrencia.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });
Ocorrencia.belongsTo(Usuario, { foreignKey: 'registrado_por', as: 'registradoPor' })

// Exporta todos os modelos com as associações aplicadas
export { Usuario, Ocorrencia, DestaquePositivo, Turma };

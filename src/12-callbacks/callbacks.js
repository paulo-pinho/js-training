
export const callbackDef = {
    definicoes: [
        'Função que será chamada quando algo vai acontecer',
        '#Chamada não atendida',
        ''
    ],
    vantagens: [
        '????'
    ],
    desvantagens: [
        'Não é garantido por tipo',
        'Encadeamento complexo e difícil de ler e manter conforme o código for evoluindo',
        'Não garante o tratamento de erros'
    ]
};

export const simpleCallback = (callback = () => 'Empty callback') => {

    return callback('My first callback');
};

export const chamarApiRest = (apiPath, callbackSucesso, callbackErro)  => {

    if (apiPath == '/api/treinamento') {
        return callbackSucesso('sucesso');
    } else {
        return callbackErro('API não encontrada');
    };
}
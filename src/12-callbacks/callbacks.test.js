import { simpleCallback, simplePromise, chamarApiRest } from './callbacks';

test('simple callback', () => {
    const result = simpleCallback(value => `Callback with value: ${value} was called`);
    expect(result).toEqual('Callback with value: My first callback was called');
});

test('simple callback with default value', () => {
    const result = simpleCallback();
    expect(result).toEqual('Empty callback');
});

/**
 * Segundo exemplo encadeando vários callbacks
 */
test('callback hell', () => {

    simpleCallback(firstResult => {
        console.log('First result: ', firstResult);
        simpleCallback(secondResult => {
            console.log('Second result: ', secondResult);
            simpleCallback(thirdResult => {
                console.log('Third result: ', thirdResult);
                simpleCallback(fourthResult => {
                    console.log('Fourth result: ', fourthResult);
                });
            });
        });
    });
});

/**
 * Exercício 1.
 * 
 * Criar uma função que simule uma requisição http para uma API REST (seja criativo).
 * Essa função deverá receber outras duas como argumento: uma função em caso de sucesso e outra em caso de falha.
 * De de acordo com o comportamento da sua api a função de sucesso ou falha deverá ser invocada.
 * 
 * Caso o requisição seja feita no /jstraining/api/#onomedasuaapi então deve retornar um json com o resultado que você quiser; Caso contrário um erro deverá ser retornado.
 * 
 * Obs
 *  - Não precisa colocar a asserção dos testes, apenas simular o comportamento de uma requisição normal.
 *  - Você deve chamar a sua função dentro do bloco de testes abaixo 'http mock with callbacks'
 */
test('http mock with callbacks', () => {
    
    const funcaoSucesso = resultado => {
        return `Resultado da execução da API: ${resultado}`;
    };

    const funcaoErro = erro => {
        return `Erro ao executar API: ${erro}`;
    };

    const result = chamarApiRest('/api/treinamento', funcaoSucesso, funcaoErro);
    expect(result).toEqual('Resultado da execução da API: sucesso')

    const result2 = chamarApiRest('/api/treinamento2', funcaoSucesso, funcaoErro);
    expect(result2).toEqual('Erro ao executar API: API não encontrada')
});

/**
 * Exercício 2.
 * 
 * Chamar a função que foi criada duas vezes, garantindo a sua ordem de execução.
 *
 */
test('http mock with callbacks chaining', () => {
    const funcaoSucesso = resultado => {
        return `Resultado da execução da API: ${resultado}`;        
    };

    const funcaoErro = erro => {
        console.log(`Erro ao executar API: ${erro}. Tentando novamente...`);
        return chamarApiRest('/api/treinamento', funcaoSucesso, funcaoErro)
    };

    const result = chamarApiRest('/api/treinamento2', funcaoSucesso, funcaoErro)
    expect(result).toEqual('Resultado da execução da API: sucesso')
});
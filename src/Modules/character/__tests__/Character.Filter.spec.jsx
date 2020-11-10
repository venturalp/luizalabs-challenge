const { getMessage } = require('../Character.Filter')

describe('test Char filter', () => {
  it('test getMessage', () => {
    expect(getMessage()).toEqual('Nenhum herói encontrado')
    expect(getMessage(100)).toEqual('Encontrados 100 heróis')
    expect(getMessage(1)).toEqual('Encontrado 1 herói')
  })
})

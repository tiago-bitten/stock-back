class Utils {
    /**
     * GERAR SENHA ALEATÓRIA
     * 
     * @param length number
     * @return string
     */
    public randomPassword = (length: number = 12): string => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        return Array.from({ length }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');
    }

    /**
     * VALIDAR CPF
     * 
     * @param cpf string
     * @return boolean
     */
    public cpfValidate = (cpf: string): boolean => {
        let Soma = 0;
        let Resto = 0;
      
        cpf = cpf.replace(/[^\d]/g, '');
        
        if (cpf.length !== 11)
           return false
        
        if ([
          '00000000000',
          '11111111111',
          '22222222222',
          '33333333333',
          '44444444444',
          '55555555555',
          '66666666666',
          '77777777777',
          '88888888888',
          '99999999999',
          ].indexOf(cpf) !== -1)
          return false
      
        for (let i=1; i<=9; i++)
          Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
      
        Resto = (Soma * 10) % 11
      
        if ((Resto == 10) || (Resto == 11)) 
          Resto = 0
      
        if (Resto != parseInt(cpf.substring(9, 10)) )
          return false
      
        Soma = 0
      
        for (let i = 1; i <= 10; i++)
          Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
      
        Resto = (Soma * 10) % 11
      
        if ((Resto == 10) || (Resto == 11)) 
          Resto = 0
      
        if (Resto != parseInt(cpf.substring(10, 11) ) )
          return false
      
        return true
    };
}
export default new Utils();
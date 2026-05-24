export class NumberFormatter{
    
    public formatToMoney = (amount: number, currency = 'BRL') =>{
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    }

}


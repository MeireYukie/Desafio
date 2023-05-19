import { LightningElement, track } from 'lwc';

export default class inputCpf extends LightningElement {
  @track cpf = '';
  @track isCpfValid = false;
  @track errorMessage = '';

  handleCpfChange(event) {
    this.cpf = event.target.value;
    this.validateCpf();
  }

  validateCpf() {
    const cpf = this.cpf.replace(/[^\d]+/g, '');

    if (cpf === '') {
      // CPF está vazio, exiba uma mensagem de erro
      this.errorMessage = 'Preencha o campo CPF';
      this.isCpfValid = false;
    } else if (
      cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      // CPF inválido, exiba uma mensagem de erro
      this.errorMessage = 'CPF inválido.';
      this.isCpfValid = false;
    } else {
      // CPF válido
      this.errorMessage = '';
      this.isCpfValid = true;
    }
  }
}

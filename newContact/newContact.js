import { LightningElement, api } from 'lwc';
import contactObject from '@salesforce/schema/Contact' //Importa o objeto Contact do Salesforce.
import CPF__c from '@salesforce/schema/Contact.CPF__c';
//import RecordTypeId from '@salesforce/schema/Contact.RecordTypeId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//Importa a classe ShowToastEvent do módulo lightning/platformShowToastEvent para exibir mensagens de toast.

export default class NewContact extends LightningElement {

    contactObject = contactObject; //Declara uma propriedade leadObject e a inicializa com o valor do objeto leadObject importado anteriormente.
    CPF__cField = CPF__c;
    /*RecordTypeIdField = RecordTypeId;*/

    @api recordId
    //Anotação @api que torna a propriedade recordId acessível para outros componentes.

    handleContactCreated(event) {
        //Declaração de um método chamado handleLeadCreated que é executado quando um novo Contato é criado.

        console.log(event.detail); //Exibe os detalhes do evento no console.
        this.dispatchEvent( //Dispara um evento personalizado do tipo ShowToastEvent para exibir uma mensagem de toast com título, mensagem e variante de sucesso.
            new ShowToastEvent({
                title: 'Parabéns!',
                message: 'Novo Contato foi criado com sucesso!',
                variant: 'success',
            }))

        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        ); //Obtém todos os campos de entrada dentro do componente usando querySelectorAll.
        if (inputFields) { //Verifica se foram encontrados campos de entrada.
            inputFields.forEach(field => {
                field.reset(); //Reseta o valor de cada campo de entrada para o seu estado original.
            });
        }
    }

    handleError(event) { //Declaração de um método chamado handleError que é executado quando ocorre um erro.
        console.log(event.detail);
        this.dispatchEvent( //Dispara um evento personalizado do tipo ShowToastEvent para exibir uma mensagem de toast de erro com título, mensagem e variante de erro.
            new ShowToastEvent({
                title: 'Preencha os dados corretamente',
                message: event.detail.message,
                variant: 'error',
            }),
        );
    }

    handleReset() { //Declaração de um método chamado handleReset que é executado quando o botão de reset é clicado.
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );

        if (inputFields) {
            inputFields.forEach(field => {
                field.reset(); //Reseta o valor de cada campo de entrada para o seu estado original.
            });
        }
    }

    handleInputMask(event) {
        let cpf = event.target.value.replace(/\D/g, '');
        if (cpf.length === 11) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        event.target.value = cpf;
    }
}
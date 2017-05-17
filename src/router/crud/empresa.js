export default {
  apiUrl: '/empresa',
  form: {
    title: 'Dados da empresa',
    fields: [
      { title: 'Nome', model: 'nome', validation: 'required' },
      { title: 'E-mail', model: 'email', type: 'required|email', validation: 'email' },
      { title: 'Nome Responsável', model: 'nomeResponsavel', validation: 'required' },
      { title: 'Telefone', model: 'telefone', type: 'telefone', validation: 'required' },
      { title: 'Celular', model: 'celular', type: 'telefone' },
      { title: 'CPF/CNPJ', model: 'cpfCnpj', type: 'cpfCnpj' },
      { title: 'Endereço', model: 'endereco', type: 'endereco', mergeToPrincipal: true },
      { title: 'Razão Social', model: 'razaoSocial' },
      { title: 'Inscrição Estadual', model: 'inscricaoEstadual' },
      { title: 'Inscrição Municipal', model: 'inscricaoMunicipal' }
    ],
    successMessage: 'Dados da empresa atualizados'
  },
  route: '/',
  descriptionField: 'nome'
}


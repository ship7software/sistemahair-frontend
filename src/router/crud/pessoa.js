const get = (url, title, specificFields) => {
  let ret = {
    apiUrl: url,
    breadcrumbs: [
      {
        text: 'Início',
        icon: 'home'
      },
      'Cadastros',
      title
    ],
    search: {
      pageTitle: title,
      table: {
        fields: [
          {
            model: 'nome',
            header: 'Nome'
          }
        ],
        canEdit: true,
        canDelete: true,
        hasActivate: true,
        editUrl: url + '/',
        descriptionField: 'nome'
      },
      sort: {
        nome: 1
      },
      filterFieldTitle: 'Nome',
      filterFieldModel: 'nome'
    },
    form: {
      title: 'Cadastro de ' + title,
      fields: [
        { title: 'Nome', model: 'nome', validation: 'required' },
        { title: 'Telefone', model: 'telefone', validation: 'required', type: 'telefone' },
        { title: 'E-mail', model: 'email', type: 'email', validation: 'email' }
      ]
    },
    route: url,
    descriptionField: 'nome'
  }

  if (specificFields) {
    ret.form.fields = ret.form.fields.concat(specificFields)
  }

  ret.form.fields = ret.form.fields.concat([
    { title: 'Data de Nascimento', model: 'dataNascimento', type: 'date' },
    { title: 'CPF/CNPJ', model: 'cpfCnpj', type: 'cpfCnpj' },
    { title: 'Endereço', model: 'endereco', type: 'endereco', mergeToPrincipal: true },
    { title: 'Razão Social', model: 'razaoSocial' },
    { title: 'Inscrição Estadual', model: 'inscricaoEstadual' },
    { title: 'Inscrição Municipal', model: 'inscricaoMunicipal' },
    { title: 'Nome Responsável', model: 'nomeResponsavel' }
  ])

  return ret
}

export default get

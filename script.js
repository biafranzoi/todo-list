// bibliotecas e códigos de terceiros
const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  }
}

formatador(new Date('2024-04-01'))

// object {}
 const atividade = {
    nome: "Almoço",
    data: new Date("2024-07-08 11:00"),
    finalizada: false
   }
 
 // lista, array, vetor... [a (0), b (1), c(2))
 let atividades = [
  atividade,
  {
    nome: "Academia em grupo",
    data: new Date("2024-07-09 15:00"),
    finalizada: false
  },
  {
    nome: "Gaming session",
    data: new Date("2024-07-09 18:00"),
    finalizada: false
  },
  {
    nome: "Jantar",
    data: new Date("2024-07-11 20:00"),
    finalizada: false
  }
]

// atividades = []

 // arrow function
 const criarAtividade = (atividade) => {
  
  let input = `
    <input
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox"
    `
  
  // verifica se a atividade está finalizada, se sim marca o checkbox (adiciona 'checked')
  if(atividade.finalizada) {
    input += 'checked'
  }

  input += '>'

const formatar = formatador(atividade.data)

  return `
    <div>
    ${input}
    <span>${atividade.nome}</span>
    <time>
      ${formatar.dia.semana.longo},
      dia ${formatar.dia.numerico}
      de ${formatar.mes}
      às ${formatar.hora}h
    </time>
  </div>
  `
 }

const atualizarLista = () => {
  const section = document.querySelector('section')
  section.innerHTML = ''

  // verifica se a lista está vazia
  if(atividades.length == 0) {
    section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
    return
  }

  // pega um item da lista, cria a variável e usa
  for(let atividade of atividades) {
    section.innerHTML += criarAtividade(atividade)
  } 
}

atualizarLista()

const salvarAtividade = (event) => {7
  event.preventDefault()
  const dadosFormulario = new FormData(event.target)

  const nome = dadosFormulario.get('atividade')
  const dia = dadosFormulario.get('dia')
  const hora = dadosFormulario.get('hora')
  const data = `${dia} ${hora}`

   const novaAtividade = {
    nome,
    data,
    finalizada: false
   }

  const atividadeExiste = atividades.find((atividade) => {
    return atividade.data == novaAtividade.data
  })

  if(atividadeExiste) {
    return alert('Já existe outra atividade agendada para este horário. Por favor, selecione outro horário para a nova atividade.')
  }


  atividades = [novaAtividade, ...atividades]
  atualizarLista()
} 

const criarDiasSelect = () => {
  const dias = [
    "2024-02-28",
    "2024-02-29",
    "2024-03-01",
    "2024-03-02",
    "2024-03-03",
  ]

  let diasSelect = ''

  for(let dia of dias) {
    const formatar = formatador(dia)
    const diaFormatado = `
      ${formatar.dia.numerico} de
      ${formatar.mes}
      `

    diasSelect += `
    <option value="${dia}">${diaFormatado}</option>
    `
  }

  document
    .querySelector('select[name="dia"]')
    .innerHTML = diasSelect

}

criarDiasSelect()


const criarHorasSelect = () => {
  let horasDisponiveis = ''

  for(let i = 6; i < 23; i++) {
    const hora = String(i).padStart(2, '0')
    horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
    horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
  }

  document
    .querySelector('select[name="hora"]')
    .innerHTML = horasDisponiveis
}
criarHorasSelect()

const concluirAtividade = (event) => {
  const input = event.target
  const dataInput = input.value

  const atividade = atividades.find((atividade) => {
    return atividade.data == dataInput
  })

  if(!atividade) {
    return
  }

  atividade.finalizada = !atividade.finalizada
}
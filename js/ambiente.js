const salario = document.querySelector('#salario')
const valeTransporte = document.querySelector('#selectVT')
const valeAlimentacao = document.querySelector('#selectVA')
const campoVA = document.querySelector('#valeAlimentacao')
var fgts = 0
var alqVT = 0
var valorVT = 0
var alqINSS = 0
var valorINSS = 0
var alqIRRF = 0
var valorIRRF = 0
var totaldeducoes = 0
var totaldescontos = 0
var salarioLiquido = 0
var valorVA = 0



function firstAction(){    
        const alertaSalario = document.querySelector('.alertaSalario')
        const alertaVA = document.querySelector('.alertaVA')

        if(salario.value == 0){
            alertaSalario.style.visibility = "visible"
        }else{
            if(valeAlimentacao.value == 2 && campoVA.value == 0 ){
                alertaVA.style.visibility = "visible"
            }else{
                AliquotaValeTransporte()
                calcularVA()
                calculoINSS()
                calculoIRRF()
                calculos()
                imprimindoResultados()
            }
        }




        
    
}

//Verificar se possui ou não adesão ao vale transporte
function AliquotaValeTransporte(){
    if(verificarValeTransporte(valeTransporte.value)){
        alqVT = 0.06
    }else{
        alqVT = 0
    }
}

function verificarValeTransporte(verificarVT){
    if(verificarVT == 1){
        return true
    }else{
        return false
    }
}

//Verificar se possui ou não adesão ao VA/VR
function calcularVA(){
    if(adesaoValeAlimentacao(valeAlimentacao.value)){        
        valorVA = Number(campoVA.value) * 0.2
    }else{
        valorVA = 0
    }
}

function changeVA(){    
    if(adesaoValeAlimentacao(valeAlimentacao.value)){
        campoVA.style.display = "block"
    }else{
        campoVA.style.display = "none"
    }
}

function adesaoValeAlimentacao(verificarVA){
    if(verificarVA == 2){
        return true
    }else{
        return false
    }
}

//Verificar Alíquota e Valor de INSS
function calculoINSS(){
    if(salario.value <= 1212){
        alqINSS = 0.075
        valorINSS = Number(salario.value) * alqINSS
    }else if(salario.value <= 2427.35){
        alqINSS = 0.09
        valorINSS = 1212 * 0.075
        valorINSS += (Number(salario.value)- 1212) * alqINSS
    }else if(salario.value <= 3641.03){
        alqINSS = 0.12
        valorINSS = 1212 * 0.075
        valorINSS += (2427.35 - 1212) * 0.09
        valorINSS += (Number(salario.value) - 2427.35) * alqINSS
    }else if(salario.value <= 7087.22){
        alqINSS = 0.14
        valorINSS = 1212 * 0.075
        valorINSS += (2427.35 - 1212) * 0.09
        valorINSS += (3641.03 - 2427.35) * 0.12
        valorINSS += (Number(salario.value) - 3641.03) * alqINSS
    }else{
        alqINSS = 0
        valorINSS = 0
    }
}

//Verificar Imposto de Renda Retido na fonte
function calculoIRRF(){
    let baseIRRF = Number(salario.value) - valorINSS

    if(baseIRRF <= 1903.98){
        alqIRRF = 0
        valorIRRF = 0
    }else if(baseIRRF <= 2826.65){
        alqIRRF = 0.075
        valorIRRF = (baseIRRF * alqIRRF) - 142.80
    }else if(baseIRRF <= 3751.05){
        alqIRRF = 0.15
        valorIRRF = (baseIRRF * alqIRRF) - 354.80
    }else if(baseIRRF <= 4664.68){
        alqIRRF = 0.225
        valorIRRF = (baseIRRF * alqIRRF) - 636.13
    }else{
        alqIRRF = 0.275
        valorIRRF = (baseIRRF * alqIRRF) - 869.36
    }
    
    
}



//Retorno dos Calculos
function calculos(){
    fgts = Number(salario.value) * 0.08
    valorVT = Number(salario.value) * alqVT

    deducoes()
    descontos()

    console.log(`fgts R$: ${fgts.toFixed(2)}`)
    console.log(`vale transporte: R$ ${valorVT.toFixed(2)}`)
    console.log(`aliquota máxima inss ${(alqINSS * 100).toFixed(1)}%`)
    console.log(`inss R$ ${valorINSS.toFixed(2)}`)
    console.log(`alíquota irrf ${(alqIRRF * 100).toFixed(1)}%`)
    console.log(`irrf R$ ${valorIRRF.toFixed(2)}`)
    console.log(`Total de deduções R$ ${totaldeducoes.toFixed(2)}`)
    console.log(`Total de descontos R$ ${totaldescontos.toFixed(2)}`)
    console.log(`Salário Líquido R$ ${salarioLiquido.toFixed(2)}`)
}
//Calculo de todas as dedeçoes
function deducoes(){
    let resultados = [fgts, valorVT, valorINSS, valorIRRF, valorVA]
    for(i = 0; i < resultados.length; i++){
        totaldeducoes += Number(resultados[i])
    }
}
//Calculo de todos os descontos - essencial pois o fgts não é desconto
function descontos(){
    let resultados = [valorVT, valorINSS, valorIRRF, valorVA]
    for(i = 0; i < resultados.length; i++){
        totaldescontos += Number(resultados[i])        
    }
    salarioLiquido = Number(salario.value) - totaldescontos
}

//Impressão de Resultados em tabela no HTML
function imprimindoResultados(){
    const section = document.querySelector('section')
    const divResultado = document.createElement('div')
    divResultado.setAttribute('id','Resultados')
    const tabela = document.createElement('table')
    tabela.setAttribute('id','tabela')    
    section.appendChild(divResultado)
    divResultado.appendChild(tabela)


    const lprincipal = document.createElement('tr')
    const lcp1 = document.createElement('th')
    lcp1.setAttribute('class','cabecalho')
    lcp1.innerText = "Descrição"
    const lcp = document.createElement('th')
    lcp.setAttribute('class','cabecalho')
    lcp.innerText = "Dados"
    lprincipal.appendChild(lcp1)
    lprincipal.appendChild(lcp)
    tabela.appendChild(lprincipal)

    const linhaSalario = document.createElement('tr')
    const colSalario = document.createElement('td')
    colSalario.innerText = "Salário Bruto"
    const colSalarioDados = document.createElement('td')
    colSalarioDados.innerText =`R$ ${Number(salario.value).toFixed(2)}`
    linhaSalario.appendChild(colSalario)
    linhaSalario.appendChild(colSalarioDados)
    tabela.appendChild(linhaSalario)

    const linhaFgts = document.createElement('tr')
    const colFgts = document.createElement('td')
    colFgts.setAttribute('class','desconto')
    colFgts.innerText = "FGTS - (8%)"
    const colFgtsDados = document.createElement('td')
    colFgtsDados.setAttribute('class','desconto')
    colFgtsDados.innerText = `R$ ${fgts.toFixed(2)}`
    linhaFgts.appendChild(colFgts)
    linhaFgts.appendChild(colFgtsDados)
    tabela.appendChild(linhaFgts)
     
    const linhaINSS = document.createElement('tr')
    const colINSS = document.createElement('td')
    colINSS.setAttribute('class','desconto')
    colINSS.innerText = `INSS - (${(alqINSS * 100).toFixed(1)}%)`
    const colINSSDados = document.createElement('td')
    colINSSDados.setAttribute('class','desconto')
    colINSSDados.innerText = `R$ ${valorINSS.toFixed(2)}`
    linhaINSS.appendChild(colINSS)
    linhaINSS.appendChild(colINSSDados)
    tabela.appendChild(linhaINSS)

    const linhaIRRF = document.createElement('tr')
    const colIRRF = document.createElement('td')
    colIRRF.setAttribute('class','desconto')
    colIRRF.innerText = `IRRF - (${(alqIRRF * 100).toFixed(1)}%)`
    const colIRRFDados = document.createElement('td')
    colIRRFDados.setAttribute('class','desconto')
    colIRRFDados.innerText = `R$ ${valorIRRF.toFixed(2)}`
    linhaIRRF.appendChild(colIRRF)
    linhaIRRF.appendChild(colIRRFDados)
    tabela.appendChild(linhaIRRF)

    if(alqVT != 0 ){
        const linhaVT = document.createElement('tr')
        const colVT = document.createElement('td')
        colVT.setAttribute('class','desconto')
        colVT.innerText = `VT - (${(alqVT * 100).toFixed(1)}%)`
        const colVTDados = document.createElement('td')
        colVTDados.setAttribute('class','desconto')
        colVTDados.innerText = `R$ ${valorVT.toFixed(2)}`
        linhaVT.appendChild(colVT)
        linhaVT.appendChild(colVTDados)
        tabela.appendChild(linhaVT)
    }

    if(valorVA != 0){
        const linhaVA = document.createElement('tr')
        const colVA = document.createElement('td')
        colVA.setAttribute('class','desconto')
        colVA.innerText = `VA - (20%)`
        const colVADados = document.createElement('td')
        colVADados.setAttribute('class','desconto')
        colVADados.innerText = `R$ ${valorVA.toFixed(2)}`
        linhaVA.appendChild(colVA)
        linhaVA.appendChild(colVADados)
        tabela.appendChild(linhaVA)
    }

    
    const linhadeducao = document.createElement('tr')
    const coldeducao = document.createElement('td')
    coldeducao.setAttribute('class','desconto deducoes')
    coldeducao.innerText = `Total de Deduções`
    const coldeducaoDados = document.createElement('td')
    coldeducaoDados.setAttribute('class','desconto deducoes')
    coldeducaoDados.innerText = `R$ ${totaldeducoes.toFixed(2)}`
    linhadeducao.appendChild(coldeducao)
    linhadeducao.appendChild(coldeducaoDados)
    tabela.appendChild(linhadeducao)

    const linhadescontos = document.createElement('tr')
    const coldescontos = document.createElement('td')
    coldescontos.setAttribute('class','totaldesconto')
    coldescontos.innerText = `Total de Descontos`
    const coldescontosDados = document.createElement('td')
    coldescontosDados.setAttribute('class','totaldesconto')
    coldescontosDados.innerText = `R$ ${totaldescontos.toFixed(2)}`
    linhadescontos.appendChild(coldescontos)
    linhadescontos.appendChild(coldescontosDados)
    tabela.appendChild(linhadescontos)

    const linhaSaliquido = document.createElement('tr')
    const colSaliquido= document.createElement('td')
    colSaliquido.setAttribute('class','totaLiquido')
    colSaliquido.innerText = `Salário Líquido`
    const colSaliquidoDados = document.createElement('td')
    colSaliquidoDados.setAttribute('class','totaLiquido')
    colSaliquidoDados.innerText = `R$ ${salarioLiquido.toFixed(2)}`
    linhaSaliquido.appendChild(colSaliquido)
    linhaSaliquido.appendChild(colSaliquidoDados)
    tabela.appendChild(linhaSaliquido)

}

function reiniciar(){
    location.reload()
}

function esconderAlertaSalario(){
    const alertaSalario = document.querySelector('.alertaSalario')
    alertaSalario.style.visibility = "hidden"
}

function esconderAlertaVA(){
    const alertaVA = document.querySelector('.alertaVA')
    alertaVA.style.visibility = "hidden"
}
<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import ImagePreviewDialog from './components/ImagePreviewDialog.vue'

const navItems = [
  { name: 'Início', href: '#inicio' },
  { name: 'Sobre nós', href: '#sobre' },
  { name: 'Soluções', href: '#solucoes' },
  { name: 'Perícia', href: '#pericia' },
  { name: 'Planos', href: '#planos' },
  { name: 'Contato', href: '#contato' },
]

const systemLinks = [
  { name: 'Acesso ERP', href: 'https://sys.maisgerencia.com.br/login' },
  { name: 'Acesso Consultas e Serviços', href: 'https://servicos.maisautocar.com.br' },
  { name: 'Acesso AutoCar Perícia', href: 'https://ws.autocarpericia.com.br/index/maisgerencia/?sel=login' },
]

const heroDashboardImage = 'https://maisautocar.com.br/lovable-uploads/635b67bb-ead1-461f-bb36-ca141900628f.png'
const solucoesTopRightImage = 'https://maisautocar.com.br/assets/gestao-estoque-qWZLpoUx.webp'

const heroStats = [
  { target: 2000, label: 'empresas confiam', unit: ' mil', useLocale: true },
  { target: 1, label: 'negociações realizadas', unit: ' milhão', useLocale: false },
  { target: 30, label: 'veículos gerenciados', unit: ' mil', useLocale: false },
]

const clients = [
  { name: 'Localiza', logo: 'https://maisautocar.com.br/clients/localiza-logo-new.jpg' },
  { name: 'Unidas', logo: 'https://maisautocar.com.br/clients/unidas-logo-new.jpg' },
  { name: 'Primeira Mão', logo: 'https://maisautocar.com.br/clients/primeira-mao-logo-new.jpg' },
  { name: 'Grupo Barigui', logo: 'https://maisautocar.com.br/clients/grupo-barigui-logo.webp' },
  { name: 'Fonte Prime Veículos', logo: 'https://maisautocar.com.br/clients/fonte-prime.jpeg' },
  { name: '1961 Autos', logo: 'https://maisautocar.com.br/clients/1961-autos.jpeg' },
  { name: "D'Motos", logo: 'https://maisautocar.com.br/clients/dmotos.jpeg' },
  { name: 'Eclipse Veículos', logo: 'https://maisautocar.com.br/clients/eclipse-veiculos.jpeg' },
  { name: 'Heraldo Veículos', logo: 'https://maisautocar.com.br/clients/heraldo-veiculos.jpeg' },
  { name: 'Igor Veículos', logo: 'https://maisautocar.com.br/clients/igor-veiculos.jpeg' },
  { name: 'New Motors', logo: 'https://maisautocar.com.br/clients/new-motors.jpeg' },
  { name: 'Up Motos', logo: 'https://maisautocar.com.br/clients/up-motos.jpeg' },
  { name: 'Josimar Veículos', logo: 'https://maisautocar.com.br/clients/josimar-veiculos.jpeg' },
]

const marqueeClients = [...clients, ...clients]

const solutions = [
  {
    icon: 'mdi-car-multiple',
    title: 'Cadastros Simplificados',
    description: 'Cadastre veículos e clientes com rapidez e facilidade, agilizando suas operações diárias.',
    image: 'https://maisautocar.com.br/assets/cadastros-simplificados-vRxB7zmK.webp',
  },
  {
    icon: 'mdi-file-document-edit',
    title: 'Contratos Inteligentes',
    description: 'Emita contratos de compra, venda, test-drive e suas operações de forma rápida e direta.',
    image: 'https://maisautocar.com.br/assets/contratos-inteligentes-lw55TtQT.webp',
  },
  {
    icon: 'mdi-warehouse',
    title: 'Gestão de Estoque',
    description: 'Gerencie seu estoque de veículos de forma eficiente, mantendo tudo atualizado e organizado.',
    image: 'https://maisautocar.com.br/assets/gestao-estoque-qWZLpoUx.webp',
  },
  {
    icon: 'mdi-steering',
    title: 'Test-Drive',
    description: 'Agende, gerencie e acompanhe test-drives sem complicações, proporcionando experiência excepcional.',
    image: 'https://maisautocar.com.br/assets/test-drive-Bsj9BgKN.webp',
  },
  {
    icon: 'mdi-transfer',
    title: 'Entradas e Saídas',
    description: 'Controle as entradas e saídas de veículos de maneira prática, mantendo registros precisos.',
    image: 'https://maisautocar.com.br/assets/entradas-saidas-BbHOQV_J.webp',
  },
  {
    icon: 'mdi-cash-multiple',
    title: 'Lançamentos Financeiros',
    description: 'Realize lançamentos financeiros de forma rápida e segura, garantindo gestão eficiente.',
    image: 'https://maisautocar.com.br/assets/lancamentos-financeiros-CihdiYyh.webp',
  },
]

const solutionHighlights = [
  { icon: 'mdi-chart-line', text: 'Relatórios avançados' },
  { icon: 'mdi-shield-check', text: 'Segurança de dados' },
  { icon: 'mdi-cloud-check', text: 'Backup automático' },
  { icon: 'mdi-cards-outline', text: 'Interface intuitiva' },
  { icon: 'mdi-rocket-launch', text: 'Performance otimizada' },
  { icon: 'mdi-car-cog', text: 'Especializado em veículos' },
]

const aboutCards = [
  {
    title: 'Quem Somos',
    text: 'Somos especialistas em soluções tecnológicas para o mercado automotivo. Nossa missão é simplificar e otimizar a gestão de concessionárias e revendas de veículos através de um sistema completo e intuitivo.',
  },
  {
    title: 'Nossa Visão',
    text: 'Ser a plataforma líder em gestão automotiva no Brasil, reconhecida pela excelência em tecnologia, suporte e resultados entregues aos nossos clientes.',
  },
  {
    title: 'Nossos Valores',
    values: [
      'Inovação constante e tecnologia de ponta',
      'Compromisso com o sucesso do cliente',
      'Transparência e ética em todas as relações',
      'Suporte excepcional e atendimento humanizado',
    ],
  },
]

const aboutStats = [
  { icon: 'mdi-timer-sand-complete', value: '10+', label: 'Anos de Experiência' },
  { icon: 'mdi-account-group', value: '1200+', label: 'Clientes Satisfeitos' },
  { icon: 'mdi-star-check', value: '98%', label: 'Taxa de Satisfação' },
  { icon: 'mdi-car-info', value: '100k+', label: 'Veículos Gerenciados' },
]

const periciaItems = [
  {
    icon: 'mdi-file-search',
    title: 'Laudo Pericial Veicular',
    description: 'Acesso completo ao histórico do veículo, multas, dívidas e restrições.',
  },
  {
    icon: 'mdi-alert-circle-check',
    title: 'Infrações Detalhadas',
    description: 'Foco em infrações PRF, DER, Prefeituras e outros órgãos.',
  },
  {
    icon: 'mdi-shield-car',
    title: 'Averiguação de Autenticidade',
    description: 'Verificação de reparos, adulterações e autenticidade do veículo.',
  },
  {
    icon: 'mdi-receipt-text-check',
    title: 'Detalhes Fiscais',
    description: 'Informações sobre IPVA, licenciamento, DPVAT e outras taxas.',
  },
  {
    icon: 'mdi-clipboard-text-clock',
    title: 'Serviços Veiculares',
    description: "Emissão de CRLV's, comunicado de venda, ATPV's.",
  },
  {
    icon: 'mdi-cash-check',
    title: 'Análise de Crédito',
    description: 'Consultas especializadas para análise de crédito.',
  },
]

const plans = [
  {
    name: 'Plano 1.0',
    price: 'R$ 97,90',
    period: '/mês',
    description: 'Ideal para pequenas revendas',
    checkoutUrl: 'https://www.asaas.com/c/oqpxg3drxo3rc2r1',
    popular: false,
    features: [
      'Até 15 veículos',
      '1 Usuário',
      '1 Filial',
      'Dashboard interativo',
      'Clientes / Fornecedores',
      'Emissor de Contratos',
      'Vendas',
      'Financeiro',
      'Test Drive',
      'Controle de Estoque',
      'Relatórios completos',
      'Checklist',
      'Anexos e Documentos (2GB)',
      'Atendimento Humanizado',
      'Treinamento Gratuito',
      'Consultas veiculares',
      'Serviços Veiculares',
      '❌ Nota fiscal',
      '🔜 Integrador de anúncios (em breve)',
      '🔜 CRM (em breve)',
    ],
  },
  {
    name: 'Plano 1.6',
    price: 'R$ 197',
    period: '/mês',
    description: 'Ideal para revendas em crescimento',
    checkoutUrl: 'https://www.asaas.com/c/r05v8cec6wx5zxbt',
    popular: false,
    features: [
      'Até 30 veículos',
      '3 Usuários',
      '2 Filiais',
      'Dashboard interativo',
      'Clientes / Fornecedores',
      'Emissor de Contratos',
      'Vendas',
      'Financeiro',
      'Test Drive',
      'Controle de Estoque',
      'Relatórios completos',
      'Checklist',
      'Anexos e Documentos (5GB)',
      'Atendimento Humanizado',
      'Treinamento Gratuito',
      'Consultas/laudo veiculares',
      'Serviços Veiculares',
      'Limitado 30 notas fiscais/mês',
      '🔜 Integrador de anúncios (em breve)',
      '🔜 CRM (em breve)',
    ],
  },
  {
    name: 'Plano 2.0',
    price: 'R$ 267',
    period: '/mês',
    description: 'Para revendas que querem o melhor',
    checkoutUrl: 'https://www.asaas.com/c/q06mlq1zamsji77f',
    popular: true,
    features: [
      'Veículos ilimitados',
      'Usuários ilimitados',
      'Filiais ilimitadas',
      'Dashboard interativo',
      'Clientes / Fornecedores',
      'Emissor de Contratos',
      'Vendas',
      'Financeiro',
      'Test Drive',
      'Controle de Estoque',
      'Relatórios completos',
      'Checklist',
      'Anexos e Documentos (10GB)',
      'Atendimento Humanizado',
      'Treinamento Gratuito',
      'Consultas/laudo veiculares',
      'Serviços Veiculares',
      'Notas fiscais ilimitadas',
      '🔜 Integrador de anúncios (em breve)',
      '🔜 CRM (em breve)',
    ],
  },
]

const quickLinks = [
  { name: 'Início', href: '#inicio' },
  { name: 'Sobre nós', href: '#sobre' },
  { name: 'Soluções', href: '#solucoes' },
  { name: 'Planos', href: '#planos' },
  { name: 'Representante', href: 'https://deal-maker-link.lovable.app/assinador-de-contratos' },
]

const footerSolutions = ['Gestão de Estoque', 'Contratos', 'Financeiro', 'Test-Drive']

const socialLinks = [
  { icon: 'mdi-facebook', href: 'https://www.facebook.com/share/1CTqVgvQ6k/?mibextid=wwXIfr' },
  { icon: 'mdi-instagram', href: 'https://www.instagram.com/maisgerenciaautocar/' },
  { icon: 'mdi-youtube', href: '#' },
  { icon: 'mdi-whatsapp', href: 'https://wa.me/5544991740995' },
]

const diferentials = [
  'Suporte Humanizado',
  'Acesso Web',
  'Acesso mobile',
  'Sem custos para treinamentos',
  'Inovações semanais',
]

const mobileMenuOpen = ref(false)
const leadDialogOpen = ref(false)
const showWhatsappTip = ref(false)
const isHeaderScrolled = ref(false)
const animatedHeroValues = ref(heroStats.map(() => 0))
const heroCountersStarted = ref(false)
const heroSectionRef = ref(null)
const hoveredSolutionIndex = ref(-1)
const hoveredSolutionRow = ref(-1)
const solutionCardsPerRow = ref(3)
const imagePreviewOpen = ref(false)
const imagePreviewSrc = ref('')
const imagePreviewTitle = ref('')
const imagePreviewStartIndex = ref(0)
const imagePreviewList = ref([])

let scrollRafId = 0
let lastKnownScrollY = 0
let revealObserver = null

const lead = reactive({
  nomeEmpresa: '',
  cnpj: '',
  email: '',
  telefone: '',
  quantidadeVeiculos: '',
  necessidade: '',
})

const snackbar = reactive({
  show: false,
  text: '',
  color: 'error',
})

const whatsappPhone = '5544991740995'
const quoteText = 'Olá! Gostaria de mais informações sobre o sistema.'
const quoteWhatsappUrl = computed(() => `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(quoteText)}`)

const currentYear = new Date().getFullYear()

function formatHeroCounter(stat, value) {
  const number = Math.floor(value)
  const formatted = stat.useLocale ? number.toLocaleString('pt-BR') : String(number)
  return `+${formatted}${stat.unit}`
}

function runHeroCounters() {
  if (heroCountersStarted.value) return
  heroCountersStarted.value = true

  const duration = 1800
  const targets = heroStats.map((stat) => stat.target)
  const start = performance.now()

  const animate = (timestamp) => {
    const globalProgress = Math.min((timestamp - start) / duration, 1)

    animatedHeroValues.value = targets.map((target, index) => {
      const delay = index * 0.12
      const progress = Math.min(Math.max((globalProgress - delay) / (1 - delay), 0), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      return target * eased
    })

    if (globalProgress < 1) {
      requestAnimationFrame(animate)
      return
    }

    animatedHeroValues.value = [...targets]
  }

  requestAnimationFrame(animate)
}

function updateHeroParallax(scrollY) {
  if (!heroSectionRef.value) return

  const progress = Math.min(Math.max(scrollY / 500, 0), 1)
  heroSectionRef.value.style.setProperty('--hero-top-shift', `${progress * 108}px`)
  heroSectionRef.value.style.setProperty('--hero-top-scale', String(1 + progress * 0.28))
  heroSectionRef.value.style.setProperty('--hero-bottom-shift', `${progress * 122}px`)
  heroSectionRef.value.style.setProperty('--hero-bottom-scale', String(1 + progress * 0.26))
  heroSectionRef.value.style.setProperty('--hero-backdrop-shift', `${progress * 140}px`)
  heroSectionRef.value.style.setProperty('--hero-backdrop-scale', String(1 + progress * 0.3))
}

function updateScrollVisualState() {
  lastKnownScrollY = window.scrollY
  isHeaderScrolled.value = lastKnownScrollY > 8

  if (scrollRafId) return

  scrollRafId = requestAnimationFrame(() => {
    updateHeroParallax(lastKnownScrollY)
    scrollRafId = 0
  })
}

function getSolutionCardsPerRow() {
  if (window.innerWidth >= 1280) return 3
  if (window.innerWidth >= 960) return 2
  return 1
}

function updateSolutionCardsPerRow() {
  solutionCardsPerRow.value = getSolutionCardsPerRow()
  if (hoveredSolutionIndex.value !== -1) {
    hoveredSolutionRow.value = Math.floor(hoveredSolutionIndex.value / solutionCardsPerRow.value)
  }
}

function setHoveredSolution(index) {
  hoveredSolutionIndex.value = index
  hoveredSolutionRow.value = Math.floor(index / solutionCardsPerRow.value)
}

function clearHoveredSolution() {
  hoveredSolutionIndex.value = -1
  hoveredSolutionRow.value = -1
}

function toggleSolutionOnTouch(index) {
  if (!window.matchMedia('(hover: none)').matches) return
  if (hoveredSolutionIndex.value === index) {
    clearHoveredSolution()
    return
  }
  setHoveredSolution(index)
}

function setupScrollReveal() {
  const groups = [
    { selector: '.clients-section .section-mini-title', effectClass: 'reveal-fx-clients' },
    { selector: '.clients-section .marquee-shell', effectClass: 'reveal-fx-clients' },
    { selector: '#solucoes .section-header', effectClass: 'reveal-fx-solucoes' },
    { selector: '#solucoes .solution-card', isCard: true, delayStep: 95, effectClass: 'reveal-fx-solucoes' },
    { selector: '#solucoes .highlight-card', isCard: true, delayStep: 90, effectClass: 'reveal-fx-solucoes' },
    { selector: '#solucoes .highlight-item', isCard: true, delayStep: 70, effectClass: 'reveal-fx-solucoes' },
    { selector: '#sobre .section-header', effectClass: 'reveal-fx-sobre' },
    { selector: '#sobre .about-card', isCard: true, delayStep: 95, effectClass: 'reveal-fx-sobre' },
    { selector: '#sobre .about-stat-card', isCard: true, delayStep: 95, effectClass: 'reveal-fx-sobre' },
    { selector: '#pericia .section-header', effectClass: 'reveal-fx-pericia' },
    { selector: '#pericia .pericia-card', isCard: true, delayStep: 95, effectClass: 'reveal-fx-pericia' },
    { selector: '#planos .section-header', effectClass: 'reveal-fx-planos' },
    { selector: '#planos .plan-col', isCard: true, delayStep: 95, effectClass: 'reveal-fx-planos' },
    { selector: '#planos .diferentials', isCard: true, delayStep: 80, effectClass: 'reveal-fx-planos' },
    { selector: '#planos .diferentials-item', isCard: true, delayStep: 70, effectClass: 'reveal-fx-planos' },
    { selector: 'footer#contato .footer-grid > .v-col', isCard: true, delayStep: 110, effectClass: 'reveal-fx-footer' },
    { selector: 'footer#contato .footer-contact div', delayStep: 65, effectClass: 'reveal-fx-footer' },
    { selector: 'footer#contato .footer-link', delayStep: 55, effectClass: 'reveal-fx-footer' },
    { selector: 'footer#contato .community-qr', isCard: true, delayStep: 80, effectClass: 'reveal-fx-footer' },
    { selector: 'footer#contato .social-links a', isCard: true, delayStep: 65, effectClass: 'reveal-fx-footer' },
    { selector: 'footer#contato .footer-bottom', isCard: true, delayStep: 110, effectClass: 'reveal-fx-footer' },
    { selector: 'footer#contato .footer-bottom-links a', delayStep: 55, effectClass: 'reveal-fx-footer' },
  ]

  const targets = []

  groups.forEach((group) => {
    document.querySelectorAll(group.selector).forEach((element, index) => {
      element.classList.add('scroll-reveal')
      if (group.isCard) {
        element.classList.add('scroll-reveal-card')
      }
      if (group.effectClass) {
        element.classList.add(group.effectClass)
      }

      const step = group.delayStep ?? 80
      element.style.setProperty('--reveal-delay', `${Math.min(index, 7) * step}ms`)
      targets.push(element)
    })
  })

  if (!targets.length) return

  if (!('IntersectionObserver' in window)) {
    targets.forEach((element) => element.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      revealObserver?.unobserve(entry.target)
    })
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -6% 0px',
  })

  targets.forEach((element) => revealObserver?.observe(element))
}

onMounted(() => {
  updateSolutionCardsPerRow()
  updateScrollVisualState()
  setupScrollReveal()
  window.addEventListener('resize', updateSolutionCardsPerRow)
  window.addEventListener('scroll', updateScrollVisualState, { passive: true })
  runHeroCounters()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSolutionCardsPerRow)
  window.removeEventListener('scroll', updateScrollVisualState)
  if (scrollRafId) {
    cancelAnimationFrame(scrollRafId)
    scrollRafId = 0
  }
  if (revealObserver) {
    revealObserver.disconnect()
    revealObserver = null
  }
})

watch(leadDialogOpen, (isOpen) => {
  if (!isOpen) {
    resetLead()
  }
})

function notify(text, color = 'info') {
  snackbar.text = text
  snackbar.color = color
  snackbar.show = true
}

function goTo(hash) {
  const section = document.querySelector(hash)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  mobileMenuOpen.value = false
}

function openExternal(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function openImagePreview({ src = '', title = '', images = [], startIndex = 0 }) {
  const normalizedImages = Array.isArray(images) ? images.filter((item) => !!item?.src || typeof item === 'string') : []
  imagePreviewList.value = normalizedImages
  imagePreviewStartIndex.value = Math.max(0, Number(startIndex) || 0)
  imagePreviewSrc.value = src || (typeof normalizedImages[0] === 'string' ? normalizedImages[0] : normalizedImages[0]?.src || '')
  imagePreviewTitle.value = title
  imagePreviewOpen.value = true
}

function openHeroImagePreview() {
  openImagePreview({
    src: heroDashboardImage,
    title: 'Sistema AutoCar',
    images: [{ src: heroDashboardImage, title: 'Sistema AutoCar' }],
    startIndex: 0,
  })
}

function openSolutionImagePreview(index) {
  const gallery = solutions.map((item) => ({ src: item.image, title: item.title }))
  const selected = gallery[index] || gallery[0]
  if (!selected) return

  openImagePreview({
    src: selected.src,
    title: selected.title,
    images: gallery,
    startIndex: index,
  })
}

function formatCnpj(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 14)
  if (!digits) return ''
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`
  if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`
  if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`
}

function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  if (digits.length < 3) return `(${digits}`
  if (digits.length < 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length < 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function updateLead(field, value) {
  if (field === 'cnpj') {
    lead.cnpj = formatCnpj(value)
    return
  }
  if (field === 'telefone') {
    lead.telefone = formatPhone(value)
    return
  }
  lead[field] = value
}

function resetLead() {
  lead.nomeEmpresa = ''
  lead.cnpj = ''
  lead.email = ''
  lead.telefone = ''
  lead.quantidadeVeiculos = ''
  lead.necessidade = ''
}

function submitLead() {
  if (!lead.nomeEmpresa || !lead.cnpj || !lead.email || !lead.telefone) {
    notify('Por favor, preencha todos os campos obrigatórios.', 'error')
    return
  }

  const message = `*Nova solicitação de cadastro - AutoCar*%0A%0A📝 *Dados da Empresa:*%0A• Nome: ${lead.nomeEmpresa}%0A• CNPJ: ${lead.cnpj}%0A• E-mail: ${lead.email}%0A• Telefone: ${lead.telefone}%0A%0A🚗 *Informações do Negócio:*%0A• Quantidade de veículos: ${lead.quantidadeVeiculos || 'Não informado'}%0A• Necessidade: ${lead.necessidade || 'Não especificada'}%0A%0AData/Hora: ${new Date().toLocaleString('pt-BR')}`
  const url = `https://wa.me/${whatsappPhone}?text=${message}`

  window.open(url, '_blank', 'noopener,noreferrer')
  notify("A conversa foi aberta no WhatsApp. Clique em 'Enviar' para nos enviar seus dados.", 'success')
  resetLead()
  leadDialogOpen.value = false
}
</script>

<template>
  <v-app>
    <v-app-bar :class="['top-nav', { scrolled: isHeaderScrolled }]" flat height="84">
      <v-container class="topbar-wrap">
        <div class="topbar-left">
          <button class="logo-button" @click="goTo('#inicio')">
            <img src="https://maisautocar.com.br/lovable-uploads/autocar-logo-white.png" alt="AutoCar Logo" class="site-logo">
          </button>
        </div>

        <nav class="d-none d-lg-flex nav-list topbar-center">
          <a v-for="item in navItems" :key="item.href" :href="item.href" class="nav-link" @click.prevent="goTo(item.href)">
            {{ item.name }}
          </a>
        </nav>

        <div class="d-none d-lg-flex align-center ga-3 topbar-right">
          <v-menu location="bottom" offset="10">
            <template #activator="{ props }">
              <v-btn v-bind="props" variant="flat" class="btn-primary-nav" append-icon="mdi-chevron-down" height="40">
                Acesso ao Sistema
              </v-btn>
            </template>

            <v-list class="access-menu" density="compact" nav>
              <v-list-item
                v-for="link in systemLinks"
                :key="link.href"
                class="access-menu-item"
                :title="link.name"
                rounded="lg"
                @click="openExternal(link.href)"
              />
            </v-list>
          </v-menu>

          <v-btn variant="outlined" class="btn-outline-nav" height="40" @click="leadDialogOpen = true">
            Cadastre-se
            <v-icon icon="mdi-arrow-right" size="16" class="ml-1" />
          </v-btn>
        </div>

        <v-btn
          class="d-lg-none"
          variant="text"
          icon
          :aria-label="mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <v-icon :icon="mobileMenuOpen ? 'mdi-close' : 'mdi-menu'" />
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer
      v-model="mobileMenuOpen"
      location="right"
      temporary
      class="mobile-drawer"
    >
      <div class="mobile-drawer-body">
        <a
          v-for="item in navItems"
          :key="`mobile-${item.href}`"
          :href="item.href"
          class="mobile-nav-link"
          @click.prevent="goTo(item.href)"
        >
          {{ item.name }}
        </a>

        <v-menu class="mt-4" location="bottom" offset="10">
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="flat" block class="btn-primary-nav" append-icon="mdi-chevron-down">
              Acesso ao Sistema
            </v-btn>
          </template>
          <v-list class="access-menu" density="compact" nav>
            <v-list-item
              v-for="link in systemLinks"
              :key="`mobile-link-${link.href}`"
              class="access-menu-item"
              :title="link.name"
              rounded="lg"
              @click="openExternal(link.href)"
            />
          </v-list>
        </v-menu>

        <v-btn block variant="outlined" class="btn-outline-nav mt-3" @click="leadDialogOpen = true">
          Cadastre-se
        </v-btn>
      </div>
    </v-navigation-drawer>

    <v-main>
      <section id="inicio" ref="heroSectionRef" class="hero-section">
        <div class="hero-background">
          <img
            :src="heroDashboardImage"
            alt=""
            aria-hidden="true"
            class="hero-bg-image hero-bg-top-left"
            loading="lazy"
          >
          <img
            :src="heroDashboardImage"
            alt=""
            aria-hidden="true"
            class="hero-bg-image hero-bg-bottom-right"
            loading="lazy"
          >
          <div class="hero-blob hero-blob-a" />
          <div class="hero-blob hero-blob-b" />
          <div class="hero-blob hero-blob-c" />
        </div>

        <v-container class="hero-content">
          <div class="hero-layout">
            <article class="hero-copy">
              <h1 class="hero-title">
                Sistema completo para
                <br>
                <span>gestão de lojas</span> de
                <br>
                veículos multimarcas
              </h1>

              <p class="hero-subtitle">
                CRM + Gestão Administrativa + Financeira + Nota Fiscal Eletrônica + Site + Contratos + Consultas veiculares + Integradores
              </p>

              <div class="hero-actions">
                <v-btn size="x-large" class="btn-hero hero-cta" @click="leadDialogOpen = true">
                  Agendar Apresentação
                  <v-icon icon="mdi-arrow-right" size="18" class="ml-2" />
                </v-btn>
              </div>

              <div class="hero-metrics">
                <div class="hero-metrics-divider" />
                <div class="hero-stats">
                  <div v-for="(stat, idx) in heroStats" :key="stat.label" class="stat-item">
                    <strong>{{ formatHeroCounter(stat, animatedHeroValues[idx]) }}</strong>
                    <span>{{ stat.label }}</span>
                  </div>
                </div>
              </div>
            </article>

            <div class="hero-media">
              <div class="hero-image-card">
                <img
                  :src="heroDashboardImage"
                  alt=""
                  aria-hidden="true"
                  class="hero-image-backdrop"
                  loading="lazy"
                >
                <img
                  :src="heroDashboardImage"
                  alt="AutoCar - Sistema de Gestão para Revendas de Veículos"
                  class="hero-image-main previewable-image"
                  @click="openHeroImagePreview"
                >
                <div class="floating-chip chip-top">
                  <strong>+2000</strong>
                  <span>Clientes ativos</span>
                </div>
                <div class="floating-chip chip-bottom">
                  <strong>99.9%</strong>
                  <span>Uptime garantido</span>
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </section>

      <section class="clients-section">
        <v-container>
          <h3 class="section-mini-title">
            Empresas que <span>confiam</span> em nós
          </h3>
        </v-container>

        <div class="marquee-shell">
          <div class="marquee-track">
            <div v-for="(client, idx) in marqueeClients" :key="`client-${idx}`" class="logo-pill">
              <img :src="client.logo" :alt="client.name">
            </div>
          </div>
        </div>
      </section>

      <div class="section-divider" />

      <section id="solucoes" class="section-block section-muted">
        <div class="solucoes-background" aria-hidden="true">
          <img
            :src="solucoesTopRightImage"
            alt=""
            aria-hidden="true"
            class="solucoes-bg-image solucoes-bg-top-right"
            loading="lazy"
          >
          <img
            :src="heroDashboardImage"
            alt=""
            aria-hidden="true"
            class="solucoes-bg-image solucoes-bg-bottom-left"
            loading="lazy"
          >
          <div class="solucoes-blob solucoes-blob-top-left" />
          <div class="solucoes-blob solucoes-blob-bottom-right" />
        </div>

        <v-container>
          <header class="section-header">
            <h2>Oferecemos uma <span>Gestão Simplificada</span> para sua Revenda</h2>
            <p>Sistema completo para gestão de lojas de veículos multimarcas.</p>
          </header>

          <v-row
            class="mb-10 solutions-grid"
            @mouseleave="clearHoveredSolution"
          >
            <v-col v-for="(item, idx) in solutions" :key="item.title" cols="12" md="6" lg="4">
              <v-card
                class="solution-card"
                :class="{
                  'is-hovered': hoveredSolutionIndex === idx,
                  'is-row-expanded': hoveredSolutionRow === Math.floor(idx / solutionCardsPerRow),
                }"
                @mouseenter="setHoveredSolution(idx)"
                @focusin="setHoveredSolution(idx)"
                @focusout="clearHoveredSolution"
                @click="toggleSolutionOnTouch(idx)"
              >
                <v-card-text>
                  <div class="solution-icon">
                    <v-icon :icon="item.icon" size="30" />
                  </div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                  <div class="solution-media">
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="solution-image previewable-image"
                      @click.stop="openSolutionImagePreview(idx)"
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-card class="highlight-card">
            <v-card-title class="justify-center text-center">
              Um sistema projetado para atender <span>todas as suas necessidades</span>
            </v-card-title>
            <v-card-text>
              <div class="highlight-grid">
                <div v-for="item in solutionHighlights" :key="item.text" class="highlight-item">
                  <div class="highlight-icon">
                    <v-icon :icon="item.icon" />
                  </div>
                  <span>{{ item.text }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-container>
      </section>

      <div class="section-divider" />

      <section id="sobre" class="section-block">
        <v-container>
          <header class="section-header">
            <h2><span>Sobre</span> Nós</h2>
            <p>Transformando a gestão de concessionárias com tecnologia e inovação.</p>
          </header>

          <v-row class="mb-8">
            <v-col v-for="card in aboutCards" :key="card.title" cols="12" lg="4">
              <v-card class="about-card h-100">
                <v-card-text>
                  <h3>{{ card.title }}</h3>
                  <p v-if="card.text">{{ card.text }}</p>
                  <ul v-else class="value-list">
                    <li v-for="value in card.values" :key="value">
                      <span>•</span>{{ value }}
                    </li>
                  </ul>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <div class="about-stats-grid">
            <v-card v-for="stat in aboutStats" :key="stat.label" class="about-stat-card">
              <v-card-text class="text-center">
                <v-icon :icon="stat.icon" size="34" class="mb-3 about-stat-icon" />
                <strong>{{ stat.value }}</strong>
                <span>{{ stat.label }}</span>
              </v-card-text>
            </v-card>
          </div>
        </v-container>
      </section>

      <div class="section-divider" />

      <section id="pericia" class="section-block">
        <v-container>
          <header class="section-header">
            <h2>AutoCar <span>Perícia</span></h2>
            <p>Já pensou em fazer uma AutoCar Perícia em seu veículo em poucos cliques? Utilize nossa consulta AUTO PERÍCIA e tenha acesso completo aos dados que você precisa.</p>
          </header>

          <v-row>
            <v-col v-for="item in periciaItems" :key="item.title" cols="12" md="6" lg="4">
              <v-card class="pericia-card h-100">
                <v-card-text class="d-flex ga-4">
                  <div class="pericia-icon-wrap">
                    <v-icon :icon="item.icon" size="28" />
                  </div>
                  <div>
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <div class="section-divider" />

      <section id="planos" class="section-block section-muted">
        <v-container>
          <header class="section-header">
            <h2>Escolha o <span>plano ideal</span> para sua revenda</h2>
            <p>Planos flexíveis que crescem junto com seu negócio.</p>
          </header>

          <v-row>
            <v-col v-for="plan in plans" :key="plan.name" cols="12" lg="4" class="plan-col">
              <v-card class="plan-card h-100 d-flex flex-column" :class="{ popular: plan.popular }">
                <div v-if="plan.popular" class="popular-tag">
                  <v-icon icon="mdi-star" size="16" class="mr-1" />
                  Mais Popular
                </div>

                <v-card-text class="plan-header">
                  <h3>{{ plan.name }}</h3>
                  <div class="plan-price">{{ plan.price }} <span>{{ plan.period }}</span></div>
                  <p>{{ plan.description }}</p>
                </v-card-text>

                <v-card-text class="pt-0 plan-body">
                  <ul class="plan-feature-list">
                    <li v-for="feature in plan.features" :key="feature">
                      <v-icon icon="mdi-check" size="20" />
                      <span>{{ feature }}</span>
                    </li>
                  </ul>

                  <div class="plan-actions">
                    <v-btn
                      variant="outlined"
                      block
                      class="plan-btn-outline"
                      @click="openExternal('https://wa.me/5544991710995?text=' + encodeURIComponent('Gostaria de contratar este plano'))"
                    >
                      Conheça Mais
                    </v-btn>
                    <v-btn block class="plan-btn-solid" @click="openExternal(plan.checkoutUrl)">
                      Contratar agora
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <div class="diferentials">
            <p>Veja nossos diferenciais</p>
            <div class="diferentials-grid">
              <div v-for="item in diferentials" :key="item" class="diferentials-item">
                <v-icon icon="mdi-check" size="20" />
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </v-container>
      </section>
    </v-main>

    <footer id="contato" class="footer-section">
      <v-container>
        <v-row class="footer-grid">
          <v-col cols="12" lg="3">
            <img src="https://maisautocar.com.br/lovable-uploads/autocar-logo-white.png" alt="AutoCar Logo" class="footer-logo">
            <p class="footer-description">
              A solução completa para gestão de revendas de veículos. Simplifique suas operações e foque no que realmente importa: vender mais.
            </p>
            <div class="footer-contact">
              <div><v-icon icon="mdi-email-outline" size="16" /> contato@maisgerencia.com.br</div>
              <div><v-icon icon="mdi-phone-outline" size="16" /> (44) 99174-0995</div>
              <div><v-icon icon="mdi-map-marker-outline" size="16" /> Cianorte, PR</div>
            </div>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <h3>Links Rápidos</h3>
            <a
              v-for="link in quickLinks"
              :key="link.name"
              :href="link.href"
              class="footer-link"
              @click.prevent="link.href.startsWith('#') ? goTo(link.href) : openExternal(link.href)"
            >
              {{ link.name }}
            </a>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <h3>Soluções</h3>
            <a v-for="item in footerSolutions" :key="item" href="#" class="footer-link">
              {{ item }}
            </a>
          </v-col>

          <v-col cols="12" lg="3">
            <h3>Nossa Comunidade</h3>
            <p class="community-text">
              Aponte sua câmera para o QRcode e entre para nossa comunidade e fique por dentro das principais notícias do segmento.
            </p>
            <img
              src="https://maisautocar.com.br/lovable-uploads/50c54b7b-83e3-4875-920d-ce0e6cab0c9c.png"
              alt="QR Code para nossa comunidade WhatsApp"
              class="community-qr"
            >
            <div class="social-links">
              <a v-for="social in socialLinks" :key="social.icon" :href="social.href" target="_blank" rel="noopener noreferrer">
                <v-icon :icon="social.icon" size="18" />
              </a>
            </div>
          </v-col>
        </v-row>

        <div class="footer-bottom">
          <p>© {{ currentYear }} AutoCar. Todos os direitos reservados.</p>
          <div class="footer-bottom-links">
            <a href="#">Termos de Uso</a>
            <a href="#">Política de Privacidade</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </v-container>
    </footer>

    <div class="floating-whatsapp" @mouseenter="showWhatsappTip = true" @mouseleave="showWhatsappTip = false">
      <transition name="fade-slide">
        <div v-if="showWhatsappTip" class="wa-tooltip">
          <div class="wa-avatar">A</div>
          <div>
            <strong>Atendente</strong>
            <p>Clique aqui e fale com nosso time</p>
          </div>
        </div>
      </transition>

      <a :href="quoteWhatsappUrl" target="_blank" rel="noopener noreferrer" aria-label="Contatar via WhatsApp" class="wa-button">
        <v-icon icon="mdi-whatsapp" size="38" />
      </a>
    </div>

    <v-dialog v-model="leadDialogOpen" max-width="640">
      <v-card class="lead-card">
        <v-btn
          icon
          variant="text"
          size="small"
          class="lead-close-btn"
          aria-label="Fechar modal"
          @click="leadDialogOpen = false"
        >
          <v-icon icon="mdi-close" size="20" />
        </v-btn>

        <v-card-title class="lead-title">Cadastre-se no AutoCar</v-card-title>

        <v-card-text class="lead-body">
          <form class="lead-form" @submit.prevent="submitLead">
            <div class="lead-form-grid">
              <div class="lead-field">
                <label for="lead-nome">Nome da Empresa *</label>
                <input
                  id="lead-nome"
                  type="text"
                  class="lead-control lead-control-input"
                  placeholder="Digite o nome da empresa"
                  :value="lead.nomeEmpresa"
                  @input="updateLead('nomeEmpresa', $event.target.value)"
                >
              </div>

              <div class="lead-field">
                <label for="lead-cnpj">CNPJ *</label>
                <input
                  id="lead-cnpj"
                  type="text"
                  maxlength="18"
                  inputmode="numeric"
                  class="lead-control lead-control-input"
                  placeholder="00.000.000/0000-00"
                  :value="lead.cnpj"
                  @input="updateLead('cnpj', $event.target.value)"
                >
              </div>

              <div class="lead-field">
                <label for="lead-email">E-mail *</label>
                <input
                  id="lead-email"
                  type="email"
                  class="lead-control lead-control-input"
                  placeholder="seu@email.com"
                  :value="lead.email"
                  @input="updateLead('email', $event.target.value)"
                >
              </div>

              <div class="lead-field">
                <label for="lead-telefone">Telefone/WhatsApp *</label>
                <input
                  id="lead-telefone"
                  type="text"
                  maxlength="15"
                  inputmode="numeric"
                  class="lead-control lead-control-input"
                  placeholder="(00) 00000-0000"
                  :value="lead.telefone"
                  @input="updateLead('telefone', $event.target.value)"
                >
              </div>

              <div class="lead-field lead-field-full">
                <label for="lead-quantidade">Quantidade de veículos em estoque</label>
                <input
                  id="lead-quantidade"
                  type="text"
                  class="lead-control lead-control-input"
                  placeholder="Ex: 50 veículos"
                  :value="lead.quantidadeVeiculos"
                  @input="updateLead('quantidadeVeiculos', $event.target.value)"
                >
              </div>

              <div class="lead-field lead-field-full">
                <label for="lead-necessidade">Descreva sua necessidade</label>
                <textarea
                  id="lead-necessidade"
                  class="lead-control lead-control-textarea"
                  placeholder="Conte-nos mais sobre como podemos ajudar sua revenda..."
                  :value="lead.necessidade"
                  @input="updateLead('necessidade', $event.target.value)"
                ></textarea>
              </div>
            </div>

            <div class="lead-actions">
              <v-btn variant="outlined" class="lead-btn lead-btn-cancel" @click="leadDialogOpen = false">
                Cancelar
              </v-btn>
              <v-btn type="submit" class="lead-btn lead-btn-submit">
                <v-icon icon="mdi-send-outline" size="17" />
                Enviar via WhatsApp
              </v-btn>
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <ImagePreviewDialog
      v-model="imagePreviewOpen"
      :src="imagePreviewSrc"
      :title="imagePreviewTitle"
      :image-list="imagePreviewList"
      :start-index="imagePreviewStartIndex"
    />

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3500">
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

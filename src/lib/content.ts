export const LOCALES = ["pt", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const profile = {
  name: "Marcus Vinícius Carneiro dos Santos",
  shortName: "Marcus Vinícius",
  email: "akyriu@hotmail.com",
  phone: "+55 19 99477-0193",
  phoneHref: "tel:+5519994770193",
  github: "https://github.com/akyriuu",
  githubHandle: "akyriuu",
  linkedin: "https://www.linkedin.com/in/marcusvin%C3%ADcius-/",
  linkedinHandle: "in/marcusvinícius-",
  resumePdf: "/marcus-vinicius-backend.pdf",
} as const;

type Metric = { value: string; label: string };
type Project = {
  id: string;
  name: string;
  kind: string;
  summary: string;
  stack: string[];
  highlights: string[];
};
type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
};
type Decision = {
  id: string;
  title: string;
  problem: string;
  approach: string;
  outcome: string;
};
type StackGroup = { group: string; items: string[] };
type Education = { title: string; kind: string; org: string; period: string };

export type Dictionary = {
  locale: Locale;
  meta: { title: string; description: string };
  role: string;
  nav: { id: string; label: string }[];
  hero: {
    badge: string;
    lines: string[];
    ctaProjects: string;
    ctaDecisions: string;
    ctaResume: string;
    cubeHint: string;
    cubeKeys: string;
    cubeSolve: string;
  };
  metrics: { title: string; items: Metric[] };
  summary: { title: string; body: string };
  projects: {
    title: string;
    subtitle: string;
    items: Project[];
    highlightsLabel: string;
  };
  experience: { title: string; subtitle: string; items: Experience[] };
  decisions: { title: string; subtitle: string; items: Decision[] };
  decisionLabels: { problem: string; approach: string; outcome: string };
  stack: { title: string; subtitle: string; groups: StackGroup[] };
  education: { title: string; subtitle: string; items: Education[] };
  contact: {
    title: string;
    body: string;
    availability: string;
    copy: string;
    copied: string;
  };
  ui: {
    prev: string;
    next: string;
    pageCounter: (from: number, to: number, total: number) => string;
    profileLink: string;
    downloadPdf: string;
    backHome: string;
    resumeTitle: string;
    langLabel: string;
    skipToContent: string;
    builtWith: string;
  };
};

const pt: Dictionary = {
  locale: "pt",
  meta: {
    title: "Marcus Vinícius — Desenvolvedor Backend | Node.js, NestJS, AWS",
    description:
      "Backend em Node.js, NestJS e TypeScript. Pagamentos assíncronos com AWS Lambda e SQS FIFO, mensageria, idempotência e PostgreSQL com Prisma.",
  },
  role: "Desenvolvedor Backend",
  nav: [
    { id: "projetos", label: "Projetos" },
    { id: "experiencia", label: "Experiência" },
    { id: "decisoes", label: "Decisões" },
    { id: "stack", label: "Stack" },
    { id: "contato", label: "Contato" },
  ],
  hero: {
    badge: "Node.js · NestJS · TypeScript · AWS",
    lines: [
      "Escrevo backend de pagamentos — a parte do sistema onde errar custa dinheiro de verdade.",
      "Filas, idempotência e fronteiras transacionais explícitas: nada é cobrado duas vezes, nada se perde quando o broker cai.",
      "Não precisa acreditar em mim. Pode conferir.",
    ],
    ctaProjects: "Projetos",
    ctaDecisions: "Decisões técnicas",
    ctaResume: "Currículo",
    cubeHint: "brinque com o cubo — arraste, clique ou aperte",
    cubeKeys: "arraste / toque /",
    cubeSolve: "resolver",
  },
  metrics: {
    title: "Números do que já entreguei",
    items: [
      { value: "15+", label: "endpoints REST em produção" },
      { value: "5", label: "recursos AWS via IaC" },
      { value: "80%", label: "menos reprocessamento em lote" },
      { value: "100%", label: "webhooks com assinatura verificada" },
      { value: "60s", label: "detecção de falha na DLQ" },
      { value: "C2", label: "inglês — domínio pleno" },
    ],
  },
  summary: {
    title: "Resumo",
    body: "Desenvolvedor Backend focado em Node.js, NestJS e TypeScript para construção de APIs REST e sistemas distribuídos orientados a eventos. Atuo em processamento assíncrono de pagamentos com AWS Lambda, SQS FIFO, SNS, S3, CloudWatch e IAM provisionados via Infrastructure as Code com Serverless Framework, e em mensageria com RabbitMQ, Transactional Outbox, dead letter queue e políticas de retry com backoff exponencial. Domínio de PostgreSQL e Prisma ORM em modelagem relacional, migrations versionadas, índices compostos, constraints de unicidade, controle de concorrência otimista e pessimista e garantias de idempotência. Experiência em integrações de pagamento com Stripe, Mercado Pago e PIX, incluindo Checkout e webhooks com verificação de assinatura HMAC, além de cache e rate limiting com Redis. Complemento o back-end com React e Next.js no front-end. Aplico Clean Code, SOLID, Design Patterns e máquinas de estado, com testes em Jest, Vitest, Supertest e Testcontainers, containerização em Docker e Docker Compose, LocalStack e CI/CD com GitHub Actions.",
  },
  projects: {
    title: "Projetos",
    subtitle: "Sistemas que construí e o que cada um resolve",
    highlightsLabel: "O que importa",
    items: [
      {
        id: "payments-pipeline",
        name: "Pipeline de Pagamentos Assíncrono",
        kind: "AWS Serverless",
        summary:
          "Processamento de pagamentos end-to-end fora do ciclo da requisição HTTP: 2 funções Lambda e 5 recursos AWS provisionados via Infrastructure as Code com Serverless Framework.",
        stack: ["Node.js", "TypeScript", "AWS Lambda", "SQS FIFO", "SNS", "S3", "CloudWatch", "Serverless Framework"],
        highlights: [
          "Retirei a chamada ao provider do ciclo da requisição HTTP, isolando latência de terceiros do tempo de resposta da API.",
          "Adotei o contrato de partial batch failure do SQS e reduzi em 80% o reprocessamento de mensagens em lotes com falha isolada.",
          "Política de retry em 2 camadas (3 tentativas de cobrança e 5 recebimentos) com roteamento para dead letter queue e alarme de detecção em até 60 segundos.",
        ],
      },
      {
        id: "idempotent-charges",
        name: "Cobrança Idempotente",
        kind: "Consistência",
        summary:
          "Garantia de cobrança única por requisição mesmo sob retries, concorrência e falhas parciais de infraestrutura.",
        stack: ["PostgreSQL", "Prisma ORM", "NestJS", "SQS"],
        highlights: [
          "Chave de idempotência combinada com unique index no banco, fechando a janela de duplicidade no nível do schema.",
          "Controle de concorrência otimista por UPDATE condicional, sem lock global e sem perder escrita concorrente.",
          "Replay da mesma chave ao provider em cada retry, para que a tentativa repetida seja reconhecida como a mesma cobrança.",
        ],
      },
      {
        id: "transactional-outbox",
        name: "Outbox Transacional",
        kind: "Mensageria",
        summary:
          "Entrega at-least-once de eventos de domínio mesmo com o broker indisponível, aplicada tanto sobre SQS/SNS quanto sobre RabbitMQ.",
        stack: ["RabbitMQ", "SQS", "SNS", "PostgreSQL", "Prisma ORM"],
        highlights: [
          "Evento e mudança de estado gravados na mesma transação, eliminando a janela entre commit no banco e publicação no broker.",
          "Publicação assíncrona com backoff exponencial e dead letter queue para mensagens que esgotam as tentativas.",
          "Mesmo padrão reaproveitado em dois brokers diferentes, sem acoplar o domínio ao transporte.",
        ],
      },
      {
        id: "gateway-integrations",
        name: "Integrações de Pagamento",
        kind: "Stripe · Mercado Pago · PIX",
        summary:
          "Dois provedores de pagamento integrados cobrindo Checkout, cobranças PIX e webhooks autenticados antes de qualquer mudança de status.",
        stack: ["Stripe", "Mercado Pago", "PIX", "NestJS", "HMAC", "Webhooks"],
        highlights: [
          "Verificação de assinatura HMAC em todo webhook recebido, com 100% de rejeição de notificações não autenticadas antes da atualização de status.",
          "Checkout e cobranças PIX cobertos pelo mesmo fluxo de máquina de estado do pagamento.",
          "Fronteira transacional explícita em volta da chamada ao gateway, para que erro de infraestrutura pós-autorização não marque como recusado um pagamento já cobrado.",
        ],
      },
      {
        id: "marketplace",
        name: "Marketplace Full-Stack",
        kind: "Full-stack",
        summary:
          "Uma das 3 aplicações full-stack que entreguei com React.js, Next.js e NestJS, com checkout e regras de negócio críticas cobertas por testes.",
        stack: ["Next.js", "React", "NestJS", "PostgreSQL", "Prisma ORM", "Jest", "Vitest"],
        highlights: [
          "Autenticação com JWT, refresh tokens e guards de rota, com validação de payloads via class-validator e Zod.",
          "Schemas modelados em Prisma ORM e PostgreSQL com migrations versionadas, índices compostos e constraints de unicidade.",
          "Validação de entrada em 100% dos endpoints de escrita.",
        ],
      },
      {
        id: "svg-service",
        name: "Serviço de SVG Dinâmico",
        kind: "Serverless",
        summary:
          "Serviço serverless de geração dinâmica de SVG em produção na Vercel, dimensionado para picos de tráfego.",
        stack: ["Next.js", "Node.js", "Redis", "Vercel"],
        highlights: [
          "Cache Redis com TTL de 10s reduzindo a carga de leitura no banco.",
          "Rate limiting por IP sustentando picos de tráfego com fallback resiliente.",
          "Deploy em produção com ambiente serverless e degradação controlada sob falha do cache.",
        ],
      },
      {
        id: "dev-environment",
        name: "Ambiente Reproduzível & CI/CD",
        kind: "DevEx",
        summary:
          "Ambiente de desenvolvimento padronizado e operacional em 2 comandos, com AWS emulada localmente e pipeline automatizado.",
        stack: ["Docker", "Docker Compose", "LocalStack", "GitHub Actions", "Testcontainers", "Supertest"],
        highlights: [
          "Docker Compose e LocalStack emulando os recursos AWS, sem dependência de conta na nuvem para desenvolver.",
          "Testcontainers e Supertest para testes de integração contra dependências reais, não mocks.",
          "CI/CD com GitHub Actions, code review e versionamento via Git/GitHub.",
        ],
      },
    ],
  },
  experience: {
    title: "Experiência",
    subtitle: "O que fiz, com números",
    items: [
      {
        role: "Desenvolvedor Backend",
        company: "Freelancer",
        location: "Conchal, São Paulo",
        period: "Jan 2026 – Presente",
        current: true,
        bullets: [
          "Desenvolvi APIs REST com Node.js, TypeScript e NestJS, entregando 15+ endpoints de autenticação, gestão de produtos e processamento de pagamentos, com JWT, refresh tokens, guards de rota e validação de payloads com class-validator e Zod.",
          "Projetei o processamento assíncrono de pagamentos end-to-end com 2 funções Lambda e 5 recursos AWS (SQS FIFO, dead letter queue, SNS, S3 e CloudWatch) provisionados via Infrastructure as Code, retirando a chamada ao provider do ciclo da requisição HTTP.",
          "Garanti cobrança única por requisição combinando chave de idempotência com unique index, controle de concorrência otimista por UPDATE condicional e replay da mesma chave ao provider em cada retry.",
          "Reduzi em 80% o reprocessamento de mensagens em lotes com falha isolada ao adotar o contrato de partial batch failure do SQS.",
          "Implementei política de retry em 2 camadas (3 tentativas de cobrança e 5 recebimentos) com roteamento para dead letter queue e alarme de detecção em até 60 segundos.",
          "Corrigi classe de falha crítica em que erro de infraestrutura posterior à autorização marcava como recusados pagamentos já cobrados no provider, isolando a chamada ao gateway atrás de uma fronteira transacional explícita.",
          "Modelei outbox transacional garantindo entrega at-least-once de eventos de domínio mesmo com o broker indisponível, padrão aplicado tanto sobre SQS/SNS quanto sobre RabbitMQ.",
          "Integrei 2 provedores de pagamento (Stripe e Mercado Pago), cobrindo Checkout, cobranças PIX e webhooks com verificação de assinatura HMAC, garantindo 100% de rejeição de notificações não autenticadas antes da atualização de status.",
          "Reduzi a carga de leitura no banco com cache Redis de TTL 10s e rate limiting por IP, sustentando picos de tráfego em serviço serverless com fallback resiliente e deploy em produção na Vercel.",
          "Modelei e mantive schemas com Prisma ORM e PostgreSQL, aplicando migrations versionadas, índices compostos e constraints de unicidade, com validação de entrada em 100% dos endpoints de escrita.",
          "Entreguei 3 aplicações full-stack com React.js, Next.js e NestJS, incluindo marketplace com checkout e serviço serverless de geração dinâmica de SVG, com testes em Jest e Vitest sobre as regras de negócio críticas.",
          "Padronizei ambiente de desenvolvimento reproduzível com Docker Compose e LocalStack, operacional em 2 comandos, com code review e versionamento via Git/GitHub.",
        ],
      },
    ],
  },
  decisions: {
    title: "Decisões técnicas",
    subtitle: "Os problemas difíceis, e por que resolvi desse jeito",
    items: [
      {
        id: "transactional-boundary",
        title: "A chamada ao gateway não pode morar dentro da transação",
        problem:
          "Uma classe de falha crítica: erro de infraestrutura posterior à autorização marcava como recusados pagamentos que já tinham sido cobrados no provider. O dinheiro saía do cliente e o sistema dizia que não.",
        approach:
          "Isolei a chamada ao gateway atrás de uma fronteira transacional explícita, separando o efeito externo irreversível do commit local reversível.",
        outcome:
          "Falha de infraestrutura depois da autorização deixou de produzir estado divergente entre provider e banco.",
      },
      {
        id: "idempotency",
        title: "Idempotência precisa ser garantida pelo banco, não pela aplicação",
        problem:
          "Retry automático, duplo clique e reentrega de fila são a regra, não a exceção. Verificação em código perde a corrida sob concorrência.",
        approach:
          "Chave de idempotência com unique index, controle de concorrência otimista por UPDATE condicional e replay da mesma chave ao provider em cada retry.",
        outcome:
          "Cobrança única por requisição, com a duplicidade barrada no nível do schema e não por convenção.",
      },
      {
        id: "partial-batch-failure",
        title: "Um item ruim não deve derrubar o lote inteiro",
        problem:
          "Uma única mensagem com falha fazia o lote inteiro do SQS voltar para a fila, reprocessando mensagens que já tinham sido tratadas com sucesso.",
        approach:
          "Adotei o contrato de partial batch failure do SQS, reportando apenas os identificadores das mensagens que realmente falharam.",
        outcome: "80% menos reprocessamento em lotes com falha isolada.",
      },
      {
        id: "retry-dlq",
        title: "Retry sem observabilidade é só perda de mensagem mais lenta",
        problem:
          "Tentar de novo indefinidamente esconde falha permanente; desistir na primeira tentativa transforma instabilidade momentânea em erro de negócio.",
        approach:
          "Política de retry em 2 camadas (3 tentativas de cobrança e 5 recebimentos) com backoff exponencial, roteamento para dead letter queue e alarme no CloudWatch.",
        outcome:
          "Falha permanente isolada na DLQ com detecção em até 60 segundos, em vez de descoberta por reclamação de cliente.",
      },
      {
        id: "outbox",
        title: "Broker fora do ar não pode significar evento perdido",
        problem:
          "Publicar o evento depois do commit cria uma janela em que o estado mudou no banco mas ninguém foi notificado.",
        approach:
          "Outbox transacional: evento persistido na mesma transação da mudança de estado e publicado depois por um worker, com o mesmo padrão sobre SQS/SNS e RabbitMQ.",
        outcome:
          "Entrega at-least-once de eventos de domínio mesmo com o broker indisponível.",
      },
      {
        id: "cache-ratelimit",
        title: "Cache curto resolve mais que cache esperto",
        problem:
          "Picos de tráfego em serviço serverless multiplicavam leituras idênticas no banco a cada invocação.",
        approach:
          "Cache Redis com TTL de 10s e rate limiting por IP, com fallback resiliente para o caso de o cache estar indisponível.",
        outcome:
          "Carga de leitura reduzida e picos sustentados em produção na Vercel, sem invalidação complexa.",
      },
    ],
  },
  decisionLabels: {
    problem: "Problema",
    approach: "Decisão",
    outcome: "Resultado",
  },
  stack: {
    title: "Stack",
    subtitle: "Ferramentas que uso em produção",
    groups: [
      {
        group: "Core",
        items: ["Node.js", "TypeScript", "NestJS", "REST APIs", "Event-Driven"],
      },
      {
        group: "AWS & IaC",
        items: ["Lambda", "SQS FIFO", "SNS", "S3", "CloudWatch", "IAM", "Serverless Framework", "LocalStack"],
      },
      {
        group: "Dados",
        items: ["PostgreSQL", "Prisma ORM", "Migrations", "Índices compostos", "Redis"],
      },
      {
        group: "Mensageria",
        items: ["RabbitMQ", "Transactional Outbox", "Dead Letter Queue", "Retry com backoff", "Idempotência"],
      },
      {
        group: "Pagamentos",
        items: ["Stripe", "Mercado Pago", "PIX", "Checkout", "Webhooks HMAC", "Máquinas de estado"],
      },
      {
        group: "Front-end",
        items: ["React", "Next.js"],
      },
      {
        group: "Qualidade",
        items: ["Jest", "Vitest", "Supertest", "Testcontainers", "Clean Code", "SOLID", "Design Patterns"],
      },
      {
        group: "Infra & CI/CD",
        items: ["Docker", "Docker Compose", "GitHub Actions", "Git/GitHub", "Vercel"],
      },
    ],
  },
  education: {
    title: "Formação & certificações",
    subtitle: "",
    items: [
      {
        title: "Fundamentos de Inteligência Artificial no Azure — AI-900",
        kind: "Certificação",
        org: "Fundação Bradesco / Microsoft",
        period: "2026",
      },
      {
        title: "Administrando Banco de Dados",
        kind: "Curso complementar",
        org: "Fundação Bradesco",
        period: "2026",
      },
      {
        title: "Recursos Humanos",
        kind: "Técnico",
        org: "ETEC Pedro Ferreira Alves",
        period: "Conclusão em Dezembro 2021",
      },
    ],
  },
  contact: {
    title: "Tem projeto ou oportunidade?",
    body: "Aberto a posições backend e freelances em Node.js, NestJS e AWS. Respondo rápido.",
    availability: "Disponível para novos projetos",
    copy: "Copiar e-mail",
    copied: "Copiado",
  },
  ui: {
    prev: "Anterior",
    next: "Próximo",
    pageCounter: (from, to, total) => `${from}–${to} de ${total}`,
    profileLink: "Mais no GitHub",
    downloadPdf: "Baixar PDF",
    backHome: "Voltar ao início",
    resumeTitle: "Currículo",
    langLabel: "Idioma",
    skipToContent: "Pular para o conteúdo",
    builtWith: "Feito com Next.js e Tailwind CSS",
  },
};

const en: Dictionary = {
  locale: "en",
  meta: {
    title: "Marcus Vinícius — Backend Developer | Node.js, NestJS, AWS",
    description:
      "Backend engineer working in Node.js, NestJS and TypeScript. Async payment processing on AWS Lambda and SQS FIFO, messaging, idempotency and PostgreSQL with Prisma.",
  },
  role: "Backend Developer",
  nav: [
    { id: "projetos", label: "Projects" },
    { id: "experiencia", label: "Experience" },
    { id: "decisoes", label: "Decisions" },
    { id: "stack", label: "Stack" },
    { id: "contato", label: "Contact" },
  ],
  hero: {
    badge: "Node.js · NestJS · TypeScript · AWS",
    lines: [
      "I write payment backends — the part of the system where being wrong costs real money.",
      "Queues, idempotency and explicit transactional boundaries: nothing gets charged twice, nothing is lost when the broker goes down.",
      "Don't take my word for it. Look below.",
    ],
    ctaProjects: "Projects",
    ctaDecisions: "Technical decisions",
    ctaResume: "Resume",
    cubeHint: "play with the cube — drag, click, or press",
    cubeKeys: "drag / tap /",
    cubeSolve: "solve",
  },
  metrics: {
    title: "What I have shipped, in numbers",
    items: [
      { value: "15+", label: "REST endpoints in production" },
      { value: "5", label: "AWS resources via IaC" },
      { value: "80%", label: "less batch reprocessing" },
      { value: "100%", label: "webhooks signature-verified" },
      { value: "60s", label: "dead letter failure detection" },
      { value: "C2", label: "English — full proficiency" },
    ],
  },
  summary: {
    title: "Summary",
    body: "Backend developer focused on Node.js, NestJS and TypeScript for building REST APIs and event-driven distributed systems. I work on asynchronous payment processing with AWS Lambda, SQS FIFO, SNS, S3, CloudWatch and IAM provisioned as Infrastructure as Code with the Serverless Framework, and on messaging with RabbitMQ, the Transactional Outbox pattern, dead letter queues and retry policies with exponential backoff. Strong command of PostgreSQL and Prisma ORM for relational modeling, versioned migrations, composite indexes, uniqueness constraints, optimistic and pessimistic concurrency control and idempotency guarantees. Experience integrating payments with Stripe, Mercado Pago and PIX, including Checkout and webhooks with HMAC signature verification, plus caching and rate limiting with Redis. I complement the backend with React and Next.js on the front end. I apply Clean Code, SOLID, design patterns and state machines, with tests in Jest, Vitest, Supertest and Testcontainers, containerization with Docker and Docker Compose, LocalStack and CI/CD with GitHub Actions.",
  },
  projects: {
    title: "Projects",
    subtitle: "Systems I built and what each one solves",
    highlightsLabel: "What matters",
    items: [
      {
        id: "payments-pipeline",
        name: "Async Payments Pipeline",
        kind: "AWS Serverless",
        summary:
          "End-to-end payment processing moved out of the HTTP request cycle: 2 Lambda functions and 5 AWS resources provisioned as Infrastructure as Code with the Serverless Framework.",
        stack: ["Node.js", "TypeScript", "AWS Lambda", "SQS FIFO", "SNS", "S3", "CloudWatch", "Serverless Framework"],
        highlights: [
          "Took the provider call out of the HTTP request cycle, isolating third-party latency from API response time.",
          "Adopted the SQS partial batch failure contract and cut reprocessing of batches with isolated failures by 80%.",
          "Two-layer retry policy (3 charge attempts and 5 receive attempts) with dead letter queue routing and failure detection within 60 seconds.",
        ],
      },
      {
        id: "idempotent-charges",
        name: "Idempotent Charges",
        kind: "Consistency",
        summary:
          "A single charge per request guaranteed even under retries, concurrency and partial infrastructure failures.",
        stack: ["PostgreSQL", "Prisma ORM", "NestJS", "SQS"],
        highlights: [
          "Idempotency key backed by a unique index in the database, closing the duplication window at the schema level.",
          "Optimistic concurrency control via conditional UPDATE, with no global lock and no lost concurrent writes.",
          "The same key is replayed to the provider on every retry, so the repeated attempt is recognized as the same charge.",
        ],
      },
      {
        id: "transactional-outbox",
        name: "Transactional Outbox",
        kind: "Messaging",
        summary:
          "At-least-once delivery of domain events even while the broker is unavailable, applied over both SQS/SNS and RabbitMQ.",
        stack: ["RabbitMQ", "SQS", "SNS", "PostgreSQL", "Prisma ORM"],
        highlights: [
          "Event and state change written in the same transaction, removing the window between database commit and broker publish.",
          "Asynchronous publishing with exponential backoff and a dead letter queue for messages that exhaust their attempts.",
          "The same pattern reused across two different brokers, without coupling the domain to the transport.",
        ],
      },
      {
        id: "gateway-integrations",
        name: "Payment Integrations",
        kind: "Stripe · Mercado Pago · PIX",
        summary:
          "Two payment providers integrated covering Checkout, PIX charges and webhooks authenticated before any status change.",
        stack: ["Stripe", "Mercado Pago", "PIX", "NestJS", "HMAC", "Webhooks"],
        highlights: [
          "HMAC signature verification on every inbound webhook, rejecting 100% of unauthenticated notifications before updating status.",
          "Checkout and PIX charges covered by the same payment state machine flow.",
          "An explicit transactional boundary around the gateway call, so a post-authorization infrastructure error cannot mark an already-charged payment as declined.",
        ],
      },
      {
        id: "marketplace",
        name: "Full-Stack Marketplace",
        kind: "Full-stack",
        summary:
          "One of the 3 full-stack applications I delivered with React.js, Next.js and NestJS, with checkout and critical business rules covered by tests.",
        stack: ["Next.js", "React", "NestJS", "PostgreSQL", "Prisma ORM", "Jest", "Vitest"],
        highlights: [
          "Authentication with JWT, refresh tokens and route guards, with payload validation through class-validator and Zod.",
          "Schemas modeled in Prisma ORM and PostgreSQL with versioned migrations, composite indexes and uniqueness constraints.",
          "Input validation on 100% of write endpoints.",
        ],
      },
      {
        id: "svg-service",
        name: "Dynamic SVG Service",
        kind: "Serverless",
        summary:
          "Serverless dynamic SVG generation service running in production on Vercel, sized for traffic spikes.",
        stack: ["Next.js", "Node.js", "Redis", "Vercel"],
        highlights: [
          "Redis cache with a 10s TTL reducing read load on the database.",
          "Per-IP rate limiting sustaining traffic spikes with a resilient fallback.",
          "Deployed to production on a serverless runtime with controlled degradation when the cache fails.",
        ],
      },
      {
        id: "dev-environment",
        name: "Reproducible Environment & CI/CD",
        kind: "DevEx",
        summary:
          "A standardized development environment running in 2 commands, with AWS emulated locally and an automated pipeline.",
        stack: ["Docker", "Docker Compose", "LocalStack", "GitHub Actions", "Testcontainers", "Supertest"],
        highlights: [
          "Docker Compose and LocalStack emulating the AWS resources, so development needs no cloud account.",
          "Testcontainers and Supertest for integration tests against real dependencies instead of mocks.",
          "CI/CD with GitHub Actions, code review and versioning through Git/GitHub.",
        ],
      },
    ],
  },
  experience: {
    title: "Experience",
    subtitle: "What I did, with numbers",
    items: [
      {
        role: "Backend Developer",
        company: "Freelance",
        location: "Conchal, São Paulo",
        period: "Jan 2026 – Present",
        current: true,
        bullets: [
          "Built REST APIs with Node.js, TypeScript and NestJS, delivering 15+ endpoints for authentication, product management and payment processing, with JWT, refresh tokens, route guards and payload validation through class-validator and Zod.",
          "Designed end-to-end asynchronous payment processing with 2 Lambda functions and 5 AWS resources (SQS FIFO, dead letter queue, SNS, S3 and CloudWatch) provisioned as Infrastructure as Code, taking the provider call out of the HTTP request cycle.",
          "Guaranteed a single charge per request by combining an idempotency key with a unique index, optimistic concurrency control via conditional UPDATE and replay of the same key to the provider on every retry.",
          "Cut reprocessing of batches with isolated failures by 80% by adopting the SQS partial batch failure contract.",
          "Implemented a two-layer retry policy (3 charge attempts and 5 receive attempts) with dead letter queue routing and failure detection within 60 seconds.",
          "Fixed a critical failure class where a post-authorization infrastructure error marked already-charged payments as declined, by isolating the gateway call behind an explicit transactional boundary.",
          "Modeled a transactional outbox guaranteeing at-least-once delivery of domain events even while the broker was unavailable, applying the pattern over both SQS/SNS and RabbitMQ.",
          "Integrated 2 payment providers (Stripe and Mercado Pago), covering Checkout, PIX charges and webhooks with HMAC signature verification, rejecting 100% of unauthenticated notifications before any status update.",
          "Reduced database read load with a 10s TTL Redis cache and per-IP rate limiting, sustaining traffic spikes on a serverless service with a resilient fallback and production deployment on Vercel.",
          "Modeled and maintained schemas with Prisma ORM and PostgreSQL, applying versioned migrations, composite indexes and uniqueness constraints, with input validation on 100% of write endpoints.",
          "Delivered 3 full-stack applications with React.js, Next.js and NestJS, including a marketplace with checkout and a serverless dynamic SVG generation service, with Jest and Vitest tests over the critical business rules.",
          "Standardized a reproducible development environment with Docker Compose and LocalStack, running in 2 commands, with code review and versioning through Git/GitHub.",
        ],
      },
    ],
  },
  decisions: {
    title: "Technical decisions",
    subtitle: "The hard problems, and why I solved them this way",
    items: [
      {
        id: "transactional-boundary",
        title: "The gateway call cannot live inside the transaction",
        problem:
          "A critical failure class: a post-authorization infrastructure error marked payments as declined that had already been charged at the provider. The customer was charged and the system said otherwise.",
        approach:
          "I isolated the gateway call behind an explicit transactional boundary, separating the irreversible external effect from the reversible local commit.",
        outcome:
          "An infrastructure failure after authorization no longer produces divergent state between provider and database.",
      },
      {
        id: "idempotency",
        title: "Idempotency has to be enforced by the database, not the application",
        problem:
          "Automatic retries, double clicks and queue redelivery are the rule, not the exception. A check in application code loses the race under concurrency.",
        approach:
          "An idempotency key with a unique index, optimistic concurrency control via conditional UPDATE, and replay of the same key to the provider on every retry.",
        outcome:
          "A single charge per request, with duplication blocked at the schema level rather than by convention.",
      },
      {
        id: "partial-batch-failure",
        title: "One bad item should not take down the whole batch",
        problem:
          "A single failing message sent the entire SQS batch back to the queue, reprocessing messages that had already succeeded.",
        approach:
          "I adopted the SQS partial batch failure contract, reporting only the identifiers of the messages that actually failed.",
        outcome: "80% less reprocessing on batches with isolated failures.",
      },
      {
        id: "retry-dlq",
        title: "Retrying without observability is just losing messages more slowly",
        problem:
          "Retrying forever hides permanent failure; giving up on the first attempt turns momentary instability into a business error.",
        approach:
          "A two-layer retry policy (3 charge attempts and 5 receive attempts) with exponential backoff, dead letter queue routing and a CloudWatch alarm.",
        outcome:
          "Permanent failures isolated in the dead letter queue with detection within 60 seconds, instead of being discovered through a customer complaint.",
      },
      {
        id: "outbox",
        title: "A broker outage cannot mean a lost event",
        problem:
          "Publishing the event after the commit creates a window where state changed in the database but nobody was notified.",
        approach:
          "Transactional outbox: the event is persisted in the same transaction as the state change and published later by a worker, with the same pattern over SQS/SNS and RabbitMQ.",
        outcome:
          "At-least-once delivery of domain events even while the broker is unavailable.",
      },
      {
        id: "cache-ratelimit",
        title: "A short cache solves more than a clever cache",
        problem:
          "Traffic spikes on a serverless service multiplied identical database reads on every invocation.",
        approach:
          "A Redis cache with a 10s TTL and per-IP rate limiting, with a resilient fallback for when the cache is unavailable.",
        outcome:
          "Read load reduced and spikes sustained in production on Vercel, with no complex invalidation.",
      },
    ],
  },
  decisionLabels: {
    problem: "Problem",
    approach: "Decision",
    outcome: "Outcome",
  },
  stack: {
    title: "Stack",
    subtitle: "Tools I use in production",
    groups: [
      {
        group: "Core",
        items: ["Node.js", "TypeScript", "NestJS", "REST APIs", "Event-Driven"],
      },
      {
        group: "AWS & IaC",
        items: ["Lambda", "SQS FIFO", "SNS", "S3", "CloudWatch", "IAM", "Serverless Framework", "LocalStack"],
      },
      {
        group: "Data",
        items: ["PostgreSQL", "Prisma ORM", "Migrations", "Composite indexes", "Redis"],
      },
      {
        group: "Messaging",
        items: ["RabbitMQ", "Transactional Outbox", "Dead Letter Queue", "Retry with backoff", "Idempotency"],
      },
      {
        group: "Payments",
        items: ["Stripe", "Mercado Pago", "PIX", "Checkout", "HMAC webhooks", "State machines"],
      },
      {
        group: "Front-end",
        items: ["React", "Next.js"],
      },
      {
        group: "Quality",
        items: ["Jest", "Vitest", "Supertest", "Testcontainers", "Clean Code", "SOLID", "Design Patterns"],
      },
      {
        group: "Infra & CI/CD",
        items: ["Docker", "Docker Compose", "GitHub Actions", "Git/GitHub", "Vercel"],
      },
    ],
  },
  education: {
    title: "Education & certifications",
    subtitle: "",
    items: [
      {
        title: "Azure AI Fundamentals — AI-900",
        kind: "Certification",
        org: "Fundação Bradesco / Microsoft",
        period: "2026",
      },
      {
        title: "Database Administration",
        kind: "Complementary course",
        org: "Fundação Bradesco",
        period: "2026",
      },
      {
        title: "Human Resources",
        kind: "Technical degree",
        org: "ETEC Pedro Ferreira Alves",
        period: "Completed December 2021",
      },
    ],
  },
  contact: {
    title: "Got a project or opportunity?",
    body: "Open to backend roles and freelance work in Node.js, NestJS and AWS. I reply fast.",
    availability: "Available for new projects",
    copy: "Copy email",
    copied: "Copied",
  },
  ui: {
    prev: "Prev",
    next: "Next",
    pageCounter: (from, to, total) => `${from}–${to} of ${total}`,
    profileLink: "More on GitHub",
    downloadPdf: "Download PDF",
    backHome: "Back home",
    resumeTitle: "Resume",
    langLabel: "Language",
    skipToContent: "Skip to content",
    builtWith: "Built with Next.js and Tailwind CSS",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { pt, en };

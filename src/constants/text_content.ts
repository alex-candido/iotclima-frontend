// src/constants/text_content.ts

export const APP_TEXT = {
  GLOBAL: {
    APP_NAME: "MeteoIoT",
  },
  AUTH_PAGES: {
    SIGN_IN: {
      TITLE: "Entrar",
      DESCRIPTION: "Entre com seu email e senha para acessar o sistema",
      EMAIL_LABEL: "Email",
      EMAIL_PLACEHOLDER: "seu@email.com",
      PASSWORD_LABEL: "Senha",
      PASSWORD_PLACEHOLDER: "••••••••",
      FORGOT_PASSWORD_LINK: "Esqueceu a senha?",
      REMEMBER_ME_LABEL: "Lembrar de mim",
      LOGIN_BUTTON: "Entrar",
      LOGIN_LOADING_BUTTON: "Entrando...",
      DEMO_CREDENTIALS_TITLE: "Credenciais de demonstração:",
      DEMO_CREDENTIALS_ADMIN: "admin@example.com / Admin@123",
      OR_CONTINUE_WITH: "Ou continue com",
      NO_ACCOUNT_QUESTION: "Não tem uma conta?",
      SIGN_UP_LINK: "Cadastre-se",
      GOOGLE_LOGIN_BUTTON: "Google",
      MICROSOFT_LOGIN_BUTTON: "Microsoft",
    },
    SIGN_UP: {
      TITLE: "Criar Conta",
      DESCRIPTION: "Crie sua conta para começar a monitorar o clima",
      USERNAME_LABEL: "Nome de Usuário",
      USERNAME_PLACEHOLDER: "seu_usuario",
      USERNAME_TOO_SHORT: "O nome de usuário deve ter pelo menos 3 caracteres.",
      EMAIL_LABEL: "Email",
      EMAIL_PLACEHOLDER: "seu@email.com",
      PASSWORD_LABEL: "Senha",
      PASSWORD_PLACEHOLDER: "••••••••",
      CONFIRM_PASSWORD_LABEL: "Confirmar Senha",
      AGREE_TERMS_TEXT_PART1: "Concordo com os",
      TERMS_OF_SERVICE_LINK_TEXT: "Termos de Serviço",
      AGREE_TERMS_TEXT_PART2: "e",
      PRIVACY_POLICY_LINK_TEXT: "Política de Privacidade",
      AGREE_TERMS_REQUIRED: "Você precisa concordar com os termos de serviço.",
      CREATE_ACCOUNT_BUTTON: "Criar Conta",
      CREATING_ACCOUNT_LOADING: "Criando conta...",
      HAS_ACCOUNT_QUESTION: "Já tem uma conta?",
      SIGN_IN_LINK: "Faça login",
      OR_CONTINUE_WITH: "Ou continue com",
    },
    RESET_PASSWORD: {
      TITLE: "Redefinir Senha",
      DESCRIPTION: "Crie uma nova senha para sua conta.",
      NEW_PASSWORD_LABEL: "Nova Senha",
      CONFIRM_NEW_PASSWORD_LABEL: "Confirmar Nova Senha",
      RESET_PASSWORD_BUTTON: "Redefinir Senha",
      RESETTING_PASSWORD_LOADING: "Redefinindo...",
      SUCCESS_MESSAGE: "Sua senha foi redefinida com sucesso!",
      RETURN_TO_LOGIN_BUTTON: "Voltar para o Login",
      INVALID_LINK_TITLE: "Link Inválido", // NOVO
      INVALID_LINK_DESCRIPTION: "O link de redefinição de senha é inválido ou expirou. Por favor, solicite um novo.", // NOVO
      REQUEST_NEW_LINK_BUTTON: "Solicitar Novo Link", // NOVO
    },
    FORGOT_PASSWORD: { // <<<< ATUALIZADO AQUI >>>>
      TITLE: "Esqueci a Senha",
      DESCRIPTION: "Digite seu email para receber um link de redefinição de senha.",
      DESCRIPTION_SUCCESS: "Enviamos um email com instruções para redefinir sua senha.", // NOVO
      EMAIL_LABEL: "Email",
      EMAIL_PLACEHOLDER: "seu@email.com",
      REQUEST_BUTTON: "Redefinir Senha",
      REQUESTING_LOADING: "Enviando...",
      SUCCESS_MESSAGE_PART1: "Verifique sua caixa de entrada e siga as instruções enviadas para", // NOVO
      DID_NOT_RECEIVE_EMAIL: "Não recebeu o email? Verifique sua pasta de spam ou", // NOVO
      TRY_AGAIN_LINK: "tente novamente", // NOVO
      RETURN_TO_LOGIN_BUTTON: "Voltar para o Login",
    },
  },
  ADMIN_LAYOUT: {
    DASHBOARD_LINK: "Dashboard",
    USERS_LINK: "Usuários",
    PLACES_LINK: "Locais",
    STATIONS_LINK: "Estações",
    SENSORS_LINK: "Sensores",
    RECORDS_LINK: "Registros",
    EVENTS_LINK: "Eventos",
    LOGS_LINK: "Logs",
    ACCOUNT_LINK: "Minha Conta",
    SETTINGS_LINK: "Configurações",
    MAP_VIEW_LINK: "Visualização no Mapa",
    LOGOUT_BUTTON: "Sair",
  },
  DASHBOARD_PAGE: {
    TOTAL_USERS_CARD_TITLE: "Total de Usuários",
    ACTIVE_STATIONS_CARD_TITLE: "Estações Ativas",
    // ...
  },
  COMMON_UI: {
    SAVE_BUTTON: "Salvar",
    CANCEL_BUTTON: "Cancelar",
    EDIT_BUTTON: "Editar",
    DELETE_BUTTON: "Deletar",
    CREATE_BUTTON: "Criar",
  }
};
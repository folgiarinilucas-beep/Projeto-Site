FixHoje — Protótipo Web (MVP)
=============================

O pacote contém um protótipo estático (frontend) para o marketplace de serviços FixHoje,
com demos simuladas de fluxo de Cliente, Prestador e Admin. Não há backend real neste pacote.
Use este protótipo para validar fluxos, apresentar a investidores, ou testar UX.

Como usar (localmente)
----------------------
1. Descompacte o arquivo fixhoje_site.zip
2. Abra `index.html` em um navegador (Chrome/Edge/Firefox)
3. Teste as páginas:
   - client.html => Simula pedido de serviço
   - provider.html => Simula cadastro de prestador e aceite de job
   - admin.html => Visualiza métricas simuladas
4. Os dados são salvos no localStorage do navegador (apenas para demo).

Hospedagem
----------
Recomendo hospedar como site estático em Netlify, Vercel ou GitHub Pages.
- Para Netlify: basta arrastar a pasta do site para o painel "Sites" do Netlify.
- Para Vercel: `vercel` CLI ou conectar o repositório Git.
- Para GitHub Pages: subir a pasta para um repo e ativar Pages.

Próximos passos para transformar em app real
--------------------------------------------
- Desenvolver backend (API REST) com autenticação, banco de dados (ex: PostgreSQL).
- Integração com gateway de pagamentos (ex: Stripe, Pagar.me, Gerencianet ou PIX via API).
- Verificação de prestadores (upload de documentos, conferência manual ou automática).
- Implementar sistema de avaliação, disputa, e repasse de pagamentos (calcula comissão 30%). 
- Aplicativos móveis nativos (Flutter/React Native) ou PWA com push notifications.
- Hospedar backend em AWS/Hetzner/Render/Google Cloud e configurar SSL e escalabilidade.

Contato
------
Se quiser, eu posso:
- Gerar protótipo com backend básico (simulação) para demonstrar fluxo de pagamento e repasse.
- Gerar mockups em alta resolução das telas (PNG) para uso em pitch.
- Preparar documento técnico com estimativa de custos para MVP (desenvolvimento + infraestrutura).

---
Criado automaticamente como resposta ao pedido do usuário.

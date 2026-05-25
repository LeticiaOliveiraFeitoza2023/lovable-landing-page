/**
 * Privacidade.tsx — Política de Privacidade da FeelFlow
 * LGPD (Lei 13.709/2018) — Controladora: FeelFlow
 */

import logo from "@/assets/Horizontal_2.png";

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-background text-ink font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 lg:px-10 py-5 border-b border-border/40">
        <a href="/" aria-label="Voltar ao início">
          <img src={logo} alt="FeelFlow" className="h-10 w-auto" />
        </a>
        <a
          href="/"
          className="text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-200"
        >
          Voltar ao site
        </a>
      </nav>

      {/* Conteúdo */}
      <main className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <h1 className="text-[32px] lg:text-[40px] font-semibold tracking-tight mb-3">
          Política de Privacidade
        </h1>
        <p className="text-[13px] text-ink-soft/70 mb-12">
          Última atualização: maio de 2025
        </p>

        <div className="flex flex-col gap-10 text-[15px] leading-[1.8] text-ink/75">

          <section>
            <h2 className="text-[19px] font-semibold text-ink mb-4">1. Quem somos</h2>
            <p>
              A <strong>FeelFlow</strong> é a controladora dos dados pessoais coletados neste
              site. Somos uma empresa especializada em transformação de operações empresariais,
              com sede no Brasil, e operamos em conformidade com a Lei Geral de Proteção de
              Dados (LGPD — Lei 13.709/2018).
            </p>
            <p className="mt-3">
              Contato: <a href="mailto:contato@feelflow.com.br" className="text-primary hover:underline">contato@feelflow.com.br</a>
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink mb-4">2. Dados que coletamos</h2>
            <p>Coletamos os seguintes dados pessoais quando você preenche nossos formulários:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5 text-ink/70">
              <li>Nome completo</li>
              <li>E-mail corporativo</li>
              <li>Número de telefone / WhatsApp</li>
              <li>Nome da empresa e cargo</li>
              <li>Segmento de atuação e porte da empresa</li>
              <li>Principais desafios operacionais (campo aberto ou múltipla escolha)</li>
              <li>Preferência de contato</li>
            </ul>
            <p className="mt-4">
              Também coletamos dados de navegação de forma automática (cookies analíticos),
              conforme descrito na seção 6.
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink mb-4">3. Para que usamos seus dados</h2>
            <p>Seus dados são usados exclusivamente para:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5 text-ink/70">
              <li>Realizar o diagnóstico operacional solicitado (Mergulho Operacional™)</li>
              <li>Entrar em contato pelo canal de sua preferência</li>
              <li>Enviar materiais e conteúdos relevantes sobre operações empresariais (somente com seu consentimento)</li>
              <li>Melhorar nossos produtos e serviços</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink mb-4">4. Base legal</h2>
            <p>
              O tratamento dos seus dados é fundamentado nas seguintes bases legais previstas
              na LGPD (art. 7):
            </p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5 text-ink/70">
              <li><strong>Execução de contrato</strong> — para realizar o diagnóstico solicitado</li>
              <li><strong>Legítimo interesse</strong> — para contato comercial relacionado ao serviço solicitado</li>
              <li><strong>Consentimento</strong> — para envio de comunicações de marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink mb-4">5. Compartilhamento</h2>
            <p>
              A FeelFlow não vende, aluga ou cede seus dados pessoais a terceiros.
              Podemos compartilhar dados com prestadores de serviço essenciais ao nosso
              funcionamento (como plataformas de e-mail e CRM), sempre sob contratos de
              sigilo e em conformidade com a LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink mb-4">6. Cookies e rastreamento</h2>
            <p>
              Utilizamos cookies analíticos (como o Google Analytics) para entender como os
              visitantes interagem com o site e melhorar a experiência. Esses cookies não
              identificam você pessoalmente.
            </p>
            <p className="mt-3">
              Você pode desativar cookies a qualquer momento nas configurações do seu
              navegador. Isso pode afetar algumas funcionalidades do site.
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink mb-4">7. Retenção</h2>
            <p>
              Mantemos seus dados pelo período necessário para prestar o serviço solicitado
              ou enquanto houver relacionamento comercial. Após o encerramento, os dados
              são deletados ou anonimizados, salvo obrigação legal de retenção.
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink mb-4">8. Seus direitos</h2>
            <p>Conforme a LGPD, você tem direito a:</p>
            <ul className="list-disc list-inside mt-3 flex flex-col gap-1.5 text-ink/70">
              <li>Confirmar a existência de tratamento dos seus dados</li>
              <li>Acessar seus dados</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Solicitar a portabilidade dos seus dados</li>
              <li>Revogar consentimento a qualquer momento</li>
              <li>Opor-se ao tratamento realizado com base em legítimo interesse</li>
            </ul>
            <p className="mt-4">
              Para exercer seus direitos, entre em contato:{" "}
              <a href="mailto:contato@feelflow.com.br" className="text-primary hover:underline">
                contato@feelflow.com.br
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink mb-4">9. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados
              contra acesso não autorizado, perda ou destruição, incluindo criptografia em
              trânsito (HTTPS) e controles de acesso restritos.
            </p>
          </section>

          <section>
            <h2 className="text-[19px] font-semibold text-ink mb-4">10. Contato e DPO</h2>
            <p>
              Para dúvidas, solicitações ou reclamações sobre privacidade, entre em contato:
            </p>
            <p className="mt-3">
              <strong>FeelFlow</strong><br />
              E-mail:{" "}
              <a href="mailto:contato@feelflow.com.br" className="text-primary hover:underline">
                contato@feelflow.com.br
              </a>
            </p>
            <p className="mt-3 text-[13px] text-ink-soft/60">
              Se não ficar satisfeito com nossa resposta, você pode registrar reclamação
              junto à Autoridade Nacional de Proteção de Dados (ANPD) em{" "}
              <a
                href="https://www.gov.br/anpd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.gov.br/anpd
              </a>.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6 text-center">
        <p className="text-[12px] text-ink-soft/40">
          © {new Date().getFullYear()} FeelFlow. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

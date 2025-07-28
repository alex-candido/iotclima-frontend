"use client"

import { Container } from "@/components/base/container";
import { Footer } from "@/components/layouts/footer";
import { Button } from "@/components/ui/button";
import { Github, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/base/logo";

export function FooterSection() {
  return (
    <Footer>
      <div className="bg-gray-900 text-white py-16 px-4">
        <Container className="flex-col">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Logo className="text-blue-400" />
                <span className="text-2xl font-bold">IotClima</span>
              </div>
              <p className="text-gray-400">Sistema inteligente de monitoramento meteorológico para o estado do Ceará.</p>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800 bg-transparent">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800 bg-transparent">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#overview" className="hover:text-white transition-colors">
                    Visão Geral
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-white transition-colors">
                    Arquitetura
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#stations" className="hover:text-white transition-colors">
                    Estações
                  </a>
                </li>
                <li>
                  <a href="#technology" className="hover:text-white transition-colors">
                    Tecnologia
                  </a>
                </li>
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentação
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Suporte
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status do Sistema
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@weathernet-ce.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+55 (85) 9999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Fortaleza, Ceará - Brasil</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center w-full text-gray-400">
            <p>IotClima &copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>
        </Container>
      </div>
    </Footer>
  )
}
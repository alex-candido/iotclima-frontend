// src/components/home/hero-section.tsx

import { Container } from "@/components/base/container";
import { Section } from "@/components/base/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Map, MapPin, Thermometer, Wind } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <Section className="hero-section">
      <Container>
        <div className="content mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            🌦️ Sistema de Monitoramento em Tempo Real
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Monitoramento
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Meteorológico
            </span>
            <br />
            Inteligente
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Sistema inteligente de coleta e análise de dados meteorológicos em
            tempo real, cobrindo 72 cidades do estado do Ceará através de
            estações automatizadas com ESP32.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="px-8 py-3 text-lg">
              <Link
                href="/maps"
                className="flex items-center gap-2 font-semibold text-sm"
              >
                <Map className="w-4 h-4 stroke-[2.5]" /> 
                Acessar Maps
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
              <Link
                href="/docs"
                className="font-semibold text-sm"
              >
                Ver Documentação
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">72</div>
              <div className="text-gray-600">Estações Ativas</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                <Thermometer className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600">Monitoramento</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3">
                <Droplets className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">1min</div>
              <div className="text-gray-600">Atualização</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3">
                <Wind className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <div className="text-gray-600">Cobertura CE</div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

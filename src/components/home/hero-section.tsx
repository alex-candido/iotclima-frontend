// src/components/home/hero-section.tsx

import { Container } from "@/components/base/container";
import { Section } from "@/components/base/section";
import { Showcase } from "@/components/base/showcase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShowcaseView } from "@/types/showcase";
import {
  ArrowRight,
  Droplets,
  MapPin,
  Thermometer,
  Wind
} from "lucide-react";
import Link from "next/link";

const mapViews: ShowcaseView[] = [
  {
    id: "overview",
    title: "Visão Geral",
    icon: "MapPin",
    image: "",
    description:
      "Visualize todas as 72 estações meteorológicas distribuídas estrategicamente pelo estado do Ceará",
  },
  {
    id: "temperature",
    title: "Temperatura",
    icon: "Thermometer",
    image: "",
    description:
      "Mapa de calor com temperaturas em tempo real de todas as estações ativas",
  },
  {
    id: "humidity",
    title: "Umidade",
    icon: "Droplets",
    image: "",
    description:
      "Níveis de umidade relativa do ar distribuídos geograficamente pelo estado",
  },
  {
    id: "wind",
    title: "Vento",
    icon: "Wind",
    image: "",
    description:
      "Direção e velocidade do vento com indicadores visuais em tempo real",
  },
  {
    id: "visibility",
    title: "Visibilidade",
    icon: "Eye",
    image: "",
    description:
      "Condições de visibilidade atmosférica e qualidade do ar por região",
  },
  {
    id: "filters",
    title: "Filtros",
    icon: "Filter",
    image: "",
    description:
      "Sistema de filtros avançados para análise personalizada dos dados",
  },
];

export function HeroSection() {
  return (
    <Section className="hero-section">
      <Container>
        <div className="content flex flex-col items-center w-full text-center">
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
                Explorar Sistema
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg bg-transparent"
            >
              <Link href="/docs" className="font-semibold text-sm">
                Ver Documentação
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
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

          <Showcase views={mapViews} initialView="overview" />
        </div>
      </Container>
    </Section>
  );
}

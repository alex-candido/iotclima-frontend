// src/components/home/header-section.tsx
import { Container } from "@/components/base/container";
import { Logo } from "@/components/base/logo";
import { NavbarEnd } from "@/components/base/nav-end";
import { NavbarStart } from "@/components/base/nav-start";
import { Header } from "@/components/layouts/header";

export function HeaderSection() {
  return (
    <Header>
      <Container>
        <Logo />
        <NavbarStart />
        <NavbarEnd />
      </Container>
    </Header>
  );
}

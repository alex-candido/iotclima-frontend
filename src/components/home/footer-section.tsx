// src/components/home/footer-section.tsx
import { Container } from "../base/container";
import { Footer } from "../layouts/footer";

export function FooterSection() {
  return (
    <Footer>
      <Container>
        <p>IotClima &copy; {new Date().getFullYear()} All rights reserved.</p>
      </Container>
    </Footer>
  );
}

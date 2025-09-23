import React from "react";

import {
  Html,
  Body,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/components";
import { ContactFormType } from "@/components/contact-section";

export default function ContactFormEmail({ message, email }: ContactFormType) {
  return (
    <Html>
      <Preview>New message from your portfolio site</Preview>
      <Tailwind>
        <Body className="bg-gray-100">
          <Container>
            <Section className="bg-white border-black/10 my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                You received the following message from your portfolio
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>{"The sender's email is:"} {email}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

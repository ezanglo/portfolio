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
import { ContactFormType } from "@/lib/schemas/contact";

export default function ContactFormEmail({
  name,
  email,
  projectType,
  budget,
  timeline,
  message,
}: ContactFormType) {
  const isCasual = projectType === "Just Want to Chat";

  return (
    <Html>
      <Preview>
        {isCasual ? "New message from your portfolio site" : "New project inquiry from your portfolio site"}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100">
          <Container>
            <Section className="bg-white border-black/10 my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">{isCasual ? "New message" : "New project inquiry"}</Heading>
              <Text>
                <strong>From:</strong> {name} ({email})
              </Text>
              {!isCasual && (
                <>
                  <Text>
                    <strong>Project type:</strong> {projectType}
                  </Text>
                  <Text>
                    <strong>Budget:</strong> {budget}
                  </Text>
                  <Text>
                    <strong>Timeline:</strong> {timeline}
                  </Text>
                </>
              )}
              <Hr />
              <Text>{message}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

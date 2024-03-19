import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/external-link";
import { IconArrowRight } from "@/components/ui/icons";
import ReactMarkdown from "react-markdown";

type Message = {
  heading: string;
  message: string;
};

type EmptyScreenProps = {
  userQuery: string;
  elaborateAnswer: string;
  followUpQuestions: Message[];
  submitMessage: (message: string) => void;
};

export function EmptyScreen({
  userQuery,
  elaborateAnswer,
  followUpQuestions,
  submitMessage,
}: EmptyScreenProps) {
  console.log("userQuery:", userQuery);
  console.log("elaborateAnswer:", elaborateAnswer);
  console.log("followUpQuestions:", followUpQuestions);

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8 mb-4">
        <h1 className="mb-2 text-lg font-semibold">{userQuery}</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          {elaborateAnswer}
        </p>
        <p className="leading-normal text-muted-foreground">
          Try a follow-up question:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {followUpQuestions.map((question, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={async () => {
                submitMessage(question.message);
              }}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {question.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

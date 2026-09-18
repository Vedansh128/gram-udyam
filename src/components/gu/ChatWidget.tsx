import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const CHATBOT_URL = "https://www.chatbase.co/chatbot-iframe/vgB_OoSL6OXttUilbHVNl";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3 print:hidden">
      {open ? (
        <div className="glass-panel h-[min(70vh,560px)] w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-border shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-card/80 px-4 py-2.5">
            <span className="text-sm font-semibold">Gram Udyam Assistant</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <iframe
            src={CHATBOT_URL}
            title="Gram Udyam Assistant"
            className="h-[calc(100%-44px)] w-full border-0 bg-background"
            allow="clipboard-write; microphone"
          />
        </div>
      ) : null}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}

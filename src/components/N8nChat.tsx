import { useState } from "react";
import { Bot, X, MessageCircle } from "lucide-react";

export function N8nChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FAB - Sağ alt köşede */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="absolute bottom-20 right-3 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 transition-all duration-200 active:scale-95 hover:shadow-xl"
          aria-label="AI Asistan"
        >
          <Bot className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Chat Container - Sağ alttan yukarı doğru açılır */}
      {open && (
        <div className="absolute bottom-20 right-3 z-[10000] w-[300px] rounded-2xl overflow-hidden shadow-2xl bg-white">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="text-[14px] font-semibold text-white">AI Asistan</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              title="Kapat"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Iframe Container - 320px yükseklik */}
          <div className="relative w-full h-[320px] bg-white">
            <iframe
              src="https://bilaltrn9.app.n8n.cloud/webhook/d6d6ce5f-3dfe-4f4b-bb81-d91f65b37db9/chat"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              allow="microphone"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      )}
    </>
  );
}

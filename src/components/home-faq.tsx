"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { homeFaqs } from "@/content/home";

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="v-faq-list">
      {homeFaqs.map((item, index) => {
        const open = openIndex === index;
        const panelId = `home-faq-panel-${index}`;
        return (
          <article className={`v-faq-item${open ? " is-open" : ""}`} key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                {item.question}
                <ChevronDown size={20} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} className="v-faq-answer" hidden={!open}>
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

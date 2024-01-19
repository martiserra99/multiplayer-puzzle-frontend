import { useState } from "react";

import { LinkIcon, CheckIcon } from "@heroicons/react/20/solid";

export default function CopyLink() {
  const [copied, setCopied] = useState(false);
  function handleClick() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  if (copied) {
    return (
      <button
        onClick={handleClick}
        disabled
        className="inline-flex items-center gap-x-2 rounded-md bg-white/5 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm"
      >
        <CheckIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Copied
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={copied}
      className="inline-flex items-center gap-x-2 rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-white/15 active:bg-white/20"
    >
      <LinkIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      Copy link
    </button>
  );
}

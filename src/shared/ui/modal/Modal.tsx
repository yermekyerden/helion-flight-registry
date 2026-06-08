import { useId, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { modalContent as content } from './modal.content';
import { useModalFocusManagement } from './useModalFocusManagement';

type ModalProps = {
  children: ReactNode;
  description?: string;
  eyebrow?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const style = {
  overlay:
    'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm',
  dialog:
    'max-h-[calc(100vh-4rem)] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-700 bg-white p-6 shadow-2xl outline-none dark:bg-slate-900',
  header:
    'flex items-start justify-between gap-4 border-b border-zinc-200 pb-5 dark:border-slate-800',
  eyebrow:
    'text-xs font-semibold tracking-[0.25em] text-amber-700 uppercase dark:text-amber-400',
  title: 'mt-2 text-2xl font-semibold text-zinc-950 dark:text-zinc-100',
  description:
    'mt-2 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-slate-400',
  closeButton:
    'rounded-xl border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-amber-600 hover:text-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-400 dark:hover:text-amber-400 dark:focus:ring-offset-slate-900',
  body: 'pt-6',
} as const;

export function Modal({
  children,
  description,
  eyebrow,
  isOpen,
  onClose,
  title,
}: ModalProps) {
  const descriptionId = useId();
  const titleId = useId();

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useModalFocusManagement({
    dialogRef,
    initialFocusRef: closeButtonRef,
    isOpen,
    onClose,
  });

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={style.overlay} onMouseDown={handleOverlayMouseDown}>
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className={style.dialog}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className={style.header}>
          <div>
            {eyebrow ? <p className={style.eyebrow}>{eyebrow}</p> : null}

            <h2 className={style.title} id={titleId}>
              {title}
            </h2>

            {description ? (
              <p className={style.description} id={descriptionId}>
                {description}
              </p>
            ) : null}
          </div>

          <button
            aria-label={content.closeButtonAriaLabel}
            className={style.closeButton}
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            {content.closeButtonLabel}
          </button>
        </header>

        <div className={style.body}>{children}</div>
      </div>
    </div>,
    document.body,
  );

  function handleOverlayMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (isOutsideDialogClick(event)) {
      onClose();
    }
  }
}

function isOutsideDialogClick(event: MouseEvent<HTMLDivElement>) {
  return event.target === event.currentTarget;
}

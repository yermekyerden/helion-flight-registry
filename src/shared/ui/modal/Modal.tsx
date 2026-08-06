import { useId, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/class-name/cn';
import { themeClassNames } from '@/shared/ui/theme/themeClassNames';

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
    'fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/75 px-4 py-8 backdrop-blur-sm',
  dialog:
    'app-scrollbar max-h-[calc(100vh-4rem)] w-full max-w-3xl overflow-y-auto rounded-3xl border p-6 shadow-2xl shadow-zinc-950/10 outline-none dark:shadow-black/70',
  header: 'flex items-start justify-between gap-4 border-b pb-5',
  eyebrow: 'text-xs font-semibold tracking-[0.25em] uppercase',
  title: 'mt-2 text-2xl font-semibold',
  description: 'mt-2 max-w-2xl text-sm leading-6',
  closeButton: 'rounded-xl px-3 py-2 text-sm font-semibold transition',
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
        className={cn(style.dialog, themeClassNames.surface.modal)}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className={cn(style.header, themeClassNames.border.divider)}>
          <div>
            {eyebrow ? (
              <p className={cn(style.eyebrow, themeClassNames.text.eyebrow)}>
                {eyebrow}
              </p>
            ) : null}

            <h2
              className={cn(style.title, themeClassNames.text.primary)}
              id={titleId}
            >
              {title}
            </h2>

            {description ? (
              <p
                className={cn(style.description, themeClassNames.text.muted)}
                id={descriptionId}
              >
                {description}
              </p>
            ) : null}
          </div>

          <button
            aria-label={content.closeButtonAriaLabel}
            className={cn(
              style.closeButton,
              themeClassNames.action.secondary,
              themeClassNames.focus.ring,
            )}
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

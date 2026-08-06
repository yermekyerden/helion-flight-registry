import { useEffect, useRef, type RefObject } from 'react';

type UseModalFocusManagementParams = {
  dialogRef: RefObject<HTMLDivElement | null>;
  initialFocusRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  onClose: () => void;
};

const focusableElementSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function useModalFocusManagement({
  dialogRef,
  initialFocusRef,
  isOpen,
  onClose,
}: UseModalFocusManagementParams) {
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElementRef.current = getCurrentFocusedElement();

    const restoreBodyScroll = lockBodyScroll();

    initialFocusRef.current?.focus();

    return () => {
      restoreBodyScroll();
      previouslyFocusedElementRef.current?.focus();
    };
  }, [initialFocusRef, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleDocumentKeyDown(event: KeyboardEvent) {
      if (isEscapeKey(event)) {
        onClose();
        return;
      }

      if (isTabKey(event)) {
        keepFocusInsideDialog(event, dialogRef.current);
      }
    }

    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [dialogRef, isOpen, onClose]);
}

function getCurrentFocusedElement() {
  if (document.activeElement instanceof HTMLElement) {
    return document.activeElement;
  }

  return null;
}

function lockBodyScroll() {
  const previousBodyOverflow = document.body.style.overflow;

  document.body.style.overflow = 'hidden';

  return () => {
    document.body.style.overflow = previousBodyOverflow;
  };
}

function isEscapeKey(event: KeyboardEvent) {
  return event.key === 'Escape';
}

function isTabKey(event: KeyboardEvent) {
  return event.key === 'Tab';
}

function keepFocusInsideDialog(
  event: KeyboardEvent,
  dialogElement: HTMLDivElement | null,
) {
  if (!dialogElement) {
    return;
  }

  const focusableElements = getFocusableElements(dialogElement);

  if (focusableElements.length === 0) {
    focusDialog(event, dialogElement);
    return;
  }

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (isFocusOutsideDialog(dialogElement)) {
    event.preventDefault();
    firstFocusableElement.focus();
    return;
  }

  if (shouldMoveFocusToLastElement(event, firstFocusableElement)) {
    event.preventDefault();
    lastFocusableElement.focus();
    return;
  }

  if (shouldMoveFocusToFirstElement(event, lastFocusableElement)) {
    event.preventDefault();
    firstFocusableElement.focus();
  }
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableElementSelector),
  ).filter((element) => !element.hasAttribute('disabled'));
}

function focusDialog(event: KeyboardEvent, dialogElement: HTMLDivElement) {
  event.preventDefault();
  dialogElement.focus();
}

function isFocusOutsideDialog(dialogElement: HTMLDivElement) {
  return !dialogElement.contains(document.activeElement);
}

function shouldMoveFocusToLastElement(
  event: KeyboardEvent,
  firstFocusableElement: HTMLElement,
) {
  return event.shiftKey && document.activeElement === firstFocusableElement;
}

function shouldMoveFocusToFirstElement(
  event: KeyboardEvent,
  lastFocusableElement: HTMLElement,
) {
  return !event.shiftKey && document.activeElement === lastFocusableElement;
}

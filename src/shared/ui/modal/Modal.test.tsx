import { fireEvent, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithUser } from '@/shared/lib/test/renderWithUser';

import { Modal } from './Modal';

describe('Modal', () => {
  it('does not render the dialog when it is closed', () => {
    renderWithUser(
      <Modal isOpen={false} onClose={vi.fn()} title="Clearance packet">
        <p>Modal body</p>
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders an accessible dialog when it is open', () => {
    renderWithUser(
      <Modal
        description="Manual intake protocol"
        eyebrow="Clearance packet"
        isOpen
        onClose={vi.fn()}
        title="Legacy Pilot Intake"
      >
        <button type="button">Confirm packet</button>
      </Modal>,
    );

    const dialog = screen.getByRole('dialog', {
      name: 'Legacy Pilot Intake',
    });

    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Clearance packet')).toBeInTheDocument();
    expect(screen.getByText('Manual intake protocol')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Confirm packet' }),
    ).toBeInTheDocument();
  });

  it('moves focus to the close button when the dialog opens', async () => {
    const { user } = renderWithUser(<ModalHost />);

    await user.click(screen.getByRole('button', { name: 'Open modal' }));

    expect(screen.getByRole('button', { name: 'Close modal' })).toHaveFocus();
  });

  it('restores focus to the previously focused element when the dialog closes', async () => {
    const { user } = renderWithUser(<ModalHost />);

    const openButton = screen.getByRole('button', { name: 'Open modal' });

    await user.click(openButton);
    await user.keyboard('{Escape}');

    expect(openButton).toHaveFocus();
  });

  it('closes when the close button is clicked', async () => {
    const handleClose = vi.fn();
    const { user } = renderWithUser(
      <Modal isOpen onClose={handleClose} title="Legacy Pilot Intake">
        <p>Modal body</p>
      </Modal>,
    );

    await user.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes when Escape is pressed', async () => {
    const handleClose = vi.fn();
    const { user } = renderWithUser(
      <Modal isOpen onClose={handleClose} title="Legacy Pilot Intake">
        <p>Modal body</p>
      </Modal>,
    );

    await user.keyboard('{Escape}');

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the overlay is clicked outside the dialog', () => {
    const handleClose = vi.fn();

    renderWithUser(
      <Modal isOpen onClose={handleClose} title="Legacy Pilot Intake">
        <p>Modal body</p>
      </Modal>,
    );

    const dialog = screen.getByRole('dialog');
    const overlay = dialog.parentElement;

    expect(overlay).not.toBeNull();

    if (!overlay) {
      return;
    }

    fireEvent.mouseDown(overlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when the dialog itself is clicked', () => {
    const handleClose = vi.fn();

    renderWithUser(
      <Modal isOpen onClose={handleClose} title="Legacy Pilot Intake">
        <p>Modal body</p>
      </Modal>,
    );

    fireEvent.mouseDown(screen.getByRole('dialog'));

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('locks body scroll while the dialog is open and restores it after close', async () => {
    const { user } = renderWithUser(<ModalHost />);

    await user.click(screen.getByRole('button', { name: 'Open modal' }));

    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');

    expect(document.body.style.overflow).toBe('');
  });
});

function ModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={openModal} type="button">
        Open modal
      </button>

      <Modal
        description="Manual intake protocol"
        isOpen={isOpen}
        onClose={closeModal}
        title="Legacy Pilot Intake"
      >
        <button type="button">Confirm packet</button>
      </Modal>
    </>
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
}
